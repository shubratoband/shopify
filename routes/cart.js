const express = require('express');
const router = express.Router()   //mini instance
const  {isLoggedIn}  = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

///route to see the cart
router.get('/user/cart' ,isLoggedIn, async(req,res)=>
{
   let userId = req.user._id; 
   let user = await User.findById(req.user._id).populate('cart');   //to get the cart
   let totalAmount = user.cart.reduce((sum,curr)=> sum + curr.price, 0)
   res.render('cart/cart', {user , totalAmount})
})

//actually adding the product to cart
router.post('/user/:productId/add', isLoggedIn , async(req,res)=>
{
    let {productId} = req.params;  //product id
    let userId = req.user._id;   //User id
    let product = await Product.findById(productId); //to get all product info
    let user = await User.findById(userId); //to get all user info
    user.cart.push(product); //to add cart products to particular user using his id
    await user.save();
    res.redirect('/user/cart');
})

router.get('/product/payment/:id',async(req,res)=>
{

  let user = req.user;
  let products = await User.findById({_id : user._id}).populate("cart");
  console.log(products.cart);
   
    const session = await stripe.checkout.sessions.create({
        line_items:
          Array.from(products.cart).map((item)=> {
           return {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency :"inr",
                    
                    product_data: {
                      name: `${item.name}`,
                    },
                    unit_amount: `${item.price}` * 100,
                },
                    quantity: 1,
                };
           
          }),
      //     {
      //       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //   price_data: {
      //       currency :"inr",
            
      //       product_data: {
      //         name: "T-Shirt",
      //       },
      //       unit_amount: 300 * 100,
      //   },
        
      //       quantity: 1,
      //   },
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      // price_data: {
      //     currency :"inr",
          
      //     product_data: {
      //       name: "T-Shirt",
      //     },
      //     unit_amount: 600 * 100,
      // },
      
      //     quantity: 1,
      // },
      
        mode: 'payment',
        success_url: "http://localhost:8080/success",
        cancel_url: "http://localhost:8080/cancel",
    });
    
      res.redirect(303, session.url);
});

module.exports = router;        
