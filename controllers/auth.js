const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/register', async(req,res)=>{

    try{
        const newUser = new User({email:req.body.email , username:req.body.username , name:req.body.name});
        await sendMail(req.body.email);
        const regUser = await User.register(newUser,req.body.password );
        
        console.log('success',`${req.body.name} has been registered successfully`);
        res.redirect('/login');
    }catch(err){
        console.log('error',err.message);
        res.redirect('/register');
    }

});
router.post('/login',passport.authenticate('local', {
    failureRedirect:'/login',
    successRedirect:"/dashboard",
}),  
(req,res)=>{

        res.json({msg:"User logged in successfully"});
        //res.redirect("/"); 
});

router.get('/dashboard',(req, res)=>{
    res.json({
        msg:"YOU ARE IN DASHBOARD PAGE"
    })
})

module.exports = router;