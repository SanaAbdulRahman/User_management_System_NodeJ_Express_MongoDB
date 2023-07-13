const express=require('express');
const mongoose=require('mongoose');
const {body,validationResult}=require('express-validator');
const app=express();
const path=require('path');
const bcrypt=require('bcryptjs');

const port=8080 || process.env.PORT;

//const user=require('./models/user');
const User = require('./models/user');
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/UserDB',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to mongoDB")
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
connectDB();
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
//console.log(__dirname);



app.get('/',(req,res)=>{
    res.render('register');
})
app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/logout',(req,res)=>{
    res.redirect('/login');
})

app.post('/home',[
    body('userName').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage(' Email address required'),
    body('password').trim().isLength({min :6}).withMessage('Password must be atleast 6 characters'),
    body('confirmPassword').trim().custom((value,{req})=>value===req.body.password).withMessage('Password do not match'),
],

async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array() });
      }

      const { userName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('register', { errors: [{ msg: 'Email already exists' }] });
      }

      const hashedPassword=await bcrypt.hash(password,10);
      const user = new User({ userName, email, password: hashedPassword });
      await user.save();

      res.render('home',{userName});
    } catch (error) {
      console.log(error);
      res.render('error');
    }
  }
);


app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
})