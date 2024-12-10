const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Reviews');  // include beacuse of populate does'nt work
const router = express.Router()   //mini instance
const {isLoggedIn , isProductAuthor , validateProduct , isSeller} = require('../middleware');
// const {showAllProducts} = require('../controllers/product');

// to show all the products
router.get('/products',isLoggedIn, async(req,res)=>{
    try{
    let products =  await Product.find({});
    res.render('products/product', {products} );
    }

    catch(e)
    {
        res.status(500).render('error', {err:e.message})
    }
});

//to show form for adding new product
router.get('/product/new' ,isLoggedIn, (req,res)=>{
    try{
        res.render('products/new')
    }
    catch(e){
        res.status(500).render('error', {err:e.message})
    }
})

//to actually add the product   
router.post('/products', validateProduct , isLoggedIn , isSeller , async(req,res)=>{
    try {
        let {name,img,price,desc} = req.body;
        await Product.create({name,img,price,desc,author:req.user._id});
        req.flash('success' , 'product added successfully');
        res.redirect('/products');
    }
    catch(e)
    {
        res.status(500).render('error', {err:e.message})
    }
})

//show particular product
router.get('/products/:id',isLoggedIn, async(req,res)=>
{
    try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews')//populate is use to show all reviews with particular product;
    res.render('products/show',{foundProduct , msg:req.flash('msg')});
    }
    catch(e)
    {
        res.status(500).render('error', {err:e.message})
    }
})

//to edit a particular product
router.get('/products/:id/edit',isLoggedIn, async(req,res)=>
    {
        try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit',{foundProduct});
        }
        catch(e)
        {
            res.status(500).render('error', {err:e.message})
        }
    })

// to actually edit a product in db

router.patch('/products/:id',validateProduct,isLoggedIn, async(req,res)=>
{
    try{    
    let {id} = req.params;
    let {name,img,price,desc} = req.body;
    await Product.findByIdAndUpdate(id , {name,img,price,desc})  //findByIdAndUpdate
    req.flash('success' , 'product edited successfully')
    res.redirect(`/products/${id}`)
}
catch(e)
{
    res.status(500).render('error', {err:e.message});
}
})

///to actually delete product form db
router.delete('/products/:id' ,isLoggedIn, isProductAuthor , async(req,res)=>
{
    try{
    let {id} = req.params;
    const product = await Product.findById(id);
    for(let id of product.reviews)
        {
            await Review.findByIdAndDelete(id);
        }
    await Product.findByIdAndDelete(id);
    req.flash('success' , 'product deleted successfully')
    res.redirect('/products');
}
catch(e)
{
    res.status(500).render('error', {err:e.message})
}
})

module.exports = router;

