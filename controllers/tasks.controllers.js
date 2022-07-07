const {response} = require("express");
const Task = require("../models/task");
const TaskRegister = require("../models/taskRegister");


const registerTask = async (req, res = response) => {

    try {
      
     

            const newRegister = new TaskRegister(req.body);

            await newRegister.save();
          
            res.status(201).json({
                status: true,
                message: 'Tarea registrada con éxito',
                newRegister
            })
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
   

}


const create = async (req, res = response) => {

    try {
      
     

            const newTask = new Task(req.body);

            await newTask.save();
          
            res.status(201).json({
                status: true,
                message: 'Tarea registrada con éxito',
                newTask
            })
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
   

}


const getAll = async (req, res = response) => {

    const page = Number(req.query.page) || 1;

    try {
    
        console.log("TRY");

        const [tareas, totalResults] = await Promise.all([
            Task.find()
                .skip((page - 1 )*20)
                .limit(20),  
                Task.countDocuments()
        ]);


        res.status(200).json({
            status: true,
            tareas,
            totalResults
        })

    

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'Hable con el administrador'
    })
}

   

} 



module.exports = {
    create,
    getAll,
    registerTask
}