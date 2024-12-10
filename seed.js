const mongoose = require('mongoose')

const Product = require('./models/Product')

let products = [

    {
        name: "Iphone 15",
        img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGlwaG9uZSUyMDE0fGVufDB8fDB8fHww",
        price: 150000,
        desc: "lele or chapri banja"
    },

    {
        name:"Macbook Pro",
        img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price: 250000,
        desc: "apni dono kidney bechkar lele"
    },

    {
        name:"Apple Watch",
        img:"https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFwcGxlJTIwJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
        price:80000,
        desc:"Sone ki Watch lelo without charger"
    },

    {
        name:"Vivo T3X",
        img:"https://images.unsplash.com/photo-1671445791136-049a3f151e3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dml2byUyMHBob25lfGVufDB8fDB8fHww",
        price:15000,
        desc: "Most affordable phone"
    },
    

    {
        name:"Vivo T3X",
        img:"https://images.unsplash.com/photo-1671445791136-049a3f151e3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dml2byUyMHBob25lfGVufDB8fDB8fHww",
        price:15000,
        desc: "Most affordable phone"
    },

    {
        name:"Samsung Galaxy S23",
        img:"https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbXN1bmclMjBwaG9uZSUyMHMyM3xlbnwwfHwwfHx8MA%3D%3D",
        price:130000,
        desc:"1 kidney bech de"
    }

]

    async function seedDB()
    {
        await Product.insertMany(products);
        console.log("Data seeded successfully");
    }

    module.exports = seedDB;

