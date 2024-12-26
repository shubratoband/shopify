const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local'); 
const User = require('./models/User')
const dotenv = require('dotenv')
dotenv.config();

const productRoutes = require('./routes/product'); // pratyek incoming request var chalel
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

  //mongoose connection with database
mongoose.connect(process.env.MONGO_URL) 

.then(()=>
    console.log("DB connected successfully")
)
.catch((err)=>
    console.log("DB error",err)
)

//configSession for the purpose of using express.session 
let configSession = {   
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:
    {                       //cookie accept http request
        httpOnly:true,
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true})); //middleware for req.body
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PASSPORT
passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next)=>
{
    res.locals.currentUser = req.user;
    res.locals.success =  req.flash('success')
    res.locals.error =  req.flash('error')
    next();
})

//seeding database
// seedDB()

app.use(productRoutes); // har incoming request pe path check kiya jaaye
app.use(reviewRoutes);
app.use(userRoutes);
app.use(cartRoutes);

app.listen(4040, ()=>
{
    console.log("server connected to port 4040");
    
})