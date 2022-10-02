const router=require('express').Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
const passport=require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/callback', passport.authenticate('google', 
    {failureRedirect: '/failed', session: false}), (req, res) => {

        const jwt = req.user.token;
        const id=req.user.id;
        const last=req.user.last;
        req.session = {jwt}
        res.redirect('https://fundus-image.netlify.app?id='+id+'&jwt='+jwt+'&last='+last);

});


module.exports=router;

