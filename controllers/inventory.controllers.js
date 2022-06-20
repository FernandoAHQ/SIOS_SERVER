const {response} = require("express");
const Department = require("../models/department");
const Computer = require("../models/computer");

const create = async (req, res = response) => {

    var category = req.params.category;


        switch(category){
            case 'computers':{

                
                                    try {
                                        const {department} = req.body;

                                        const depdb = await Department.findById(department);
                                        const pcdb = await Computer.findOne({folio: req.body.folio})



                                        if(!depdb){
                                            console.log("NO DEPARTMENT IDENTIFIED");

                                            return res.status(400).json({
                                                status: false,
                                                message: `El departamento  ${ department } no existe.`,
                                            })
                                        }

                                        if(pcdb){
                                            return res.status(400).json({
                                                status: false,
                                                message: `Ya existe una computadora con el folio: ${ req.body.folio }.`,
                                            })
                                        }

                                            const newComputer = new Computer(req.body);
                                            newComputer.encargado = depdb.user;

                                            await newComputer.save();
                                          
                                            res.status(201).json({
                                                status: true,
                                                message: 'Computadora registrada con éxito',
                                                newComputer
                                            })
                                        

                                        
                                    } catch (error) {
                                        console.log(error);
                                        res.status(500).json({
                                            status: false,
                                            message: 'Hable con el administrador'
                                        })
                                    }

                break;
            }


            default:{
                return res.status(400).json({
                    status: false,
                    message: `${ category } no es una categoría valida.`,
                })
            }
        }

   

}

const getAll = async (req, res = response) => {

    var category = req.params.category;


        switch(category){
            case 'computers':{

                
                                
                                        const page = Number(req.query.page) || 1;


                                        try {
                                    
                                    
                                            const [computers, totalResults] = await Promise.all([
                                                Computer.find()
                                                    .skip((page - 1 )*20)
                                                    .limit(20)
                                                    .populate('department')
                                                    .populate('encargado'),  
                                                    Computer.countDocuments()
                                            ]);
                                    
                                    
                                            res.status(200).json({
                                                status: true,
                                                computers,
                                                totalResults
                                            })
                                    
                                        

                                        
                                    } catch (error) {
                                        console.log(error);
                                        res.status(500).json({
                                            status: false,
                                            message: 'Hable con el administrador'
                                        })
                                    }

                break;
            }


            default:{
                return res.status(400).json({
                    status: false,
                    message: `${ category } no es una categoría valida.`,
                })
            }
        }

   

}



module.exports = {
    create,
    getAll
}