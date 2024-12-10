const mongoose = require('mongoose')

const productSchema = new mongoose.Schema( {
    name: {
        type:String,
        trim:true,
        required:true
    },
    img: {
        type:String,
        // default
        trim:true
    },
    price: {
        type:Number,
        required:true
    },
    desc: {
        type:String,
        trim: true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:
    [
        
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }  
        
    ]
})

let Product = mongoose.model('Product',productSchema);
module.exports = Product;