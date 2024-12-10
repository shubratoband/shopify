const express = require('express');
const router = express.Router()   //mini instance
const User = require('../models/User');
const passport = require('passport');
const flash = require('connect-flash')

router.get('/register', (req,res)=>
    {
        res.render('auth/signup');
    }
)

// to actually add user into database(DB) using local-passport-mongoose
router.post('/register', async(req,res)=>
{
    try{
    let {email , username , password , role} =  req.body;
    const user = new User({email , username , role})
    const newUser = await User.register(user,password);
    // res.redirect('/login')
    req.login(newUser, function(err) {
        if (err) { return next(err); } //next(err) means you return to the next middleware with that error
         req.flash('success' , 'welcome , you are registered successfully');
        return res.redirect('/products');
      }); 
    }
    
    catch(e)
    {
        req.flash('error', e.message);
        return res.redirect('/register')
    }
})

//login form
router.get('/login', (req,res)=>
{
    res.render('auth/login')
})

//to check user exist in DB or not
router.post('/login' ,
    passport.authenticate('local', 
        { failureRedirect: '/login',
          failureMessage: true 
        }),
        (req,res)=>
        {   
            // console.log(req.user,'shubh');  //req.user store all info of use into in it
            req.flash('success' , 'welcome back');
            res.redirect('/products')
        
        })


        //logout
        router.get('/logout' , (req,res)=>
        {
            ()=>
            {
                req.logout()  // logout is a function and is always used in callback function
            }
            req.flash('success' , 'goodbye freinds , see you again');
            res.redirect('/login')
        })
        module.exports = router;        


