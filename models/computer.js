

const { Schema, model } = require('mongoose');



const ComputerSchema = Schema({

    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },

    folio: {
        type: String,
        required: true
    },

    macAddress: {
        type: String,
     //   required: true
    },
    encargado: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: "Active"
    },

});


ComputerSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Computer', ComputerSchema );

