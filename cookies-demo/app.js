const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// app.use(cookieParser())
app.use(cookieParser('secret'))

app.get('/' , (req,res)=>
{
    res.send(req.signedCookies);
    console.log(req.cookies); 
})

app.get('/signedcookies' ,(req,res)=>
{
    res.cookie('male','yes',{signed:true})
    res.send("cookies sent successfully")
})



// app.get('/setcookie', (req,res)=>
// {
//     res.cookie('text','capital');
//     res.cookie('theme','dark');
//     res.cookie('subscription','premium');
//     res.send("server store cokies in your computer")
// })

// app.get('/getcookies' , (req,res)=>{
//     let {text , theme , subscription} = req.cookies;
//     res.send(`theme is ${theme} , text is ${text} , subscription is ${subscription}`)
// })

app.listen(8080, ()=>
{
    console.log("SERVER CONNECTED TO PORT 8080");
})