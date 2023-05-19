const express = require('express');
const app = express();
const path = require('path');
const collection = require('./mongodb');
const port = 3000;

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css/style.css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));

app.get('', (req, res) => {
    res.render('index')
})
app.get('/signIn', (req, res) => {
    res.render('signIn')
})
app.post('/signIn',async (req,res)=>{
    
    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.password === req.body.password){
            res.render("home")
        }else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Ooops! You've entered wrong input");
    }
    })



app.get('/signUp', (req, res) => {
    res.render('SignUp')
})
app.post('/signUp',async (req,res)=>{

const data={
    email:req.body.email,
    password:req.body.password
}

await collection.insertMany([data])
res.render('home')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

