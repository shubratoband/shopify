const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Reviews');
const router = express.Router()   //mini instance
// const {validateReview} = require('../middleware');

router.post('/products/:id/review',async(req,res)=>
{
    try{
    let {id} = req.params;
    const {rating,comment} = req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});

    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','review added successfully');
    res.redirect(`/products/${id}`)
    }
    catch(e)
    {
        res.status(500).render('error', {err:e.message})
    }
})

module.exports = router;        


