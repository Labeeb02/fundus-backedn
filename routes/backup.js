const router=require('express').Router();
const User=require('../models/User');
const fetch=require('node-fetch');




url = 'https://sheet.best/api/sheets/2f67d76a-f785-4443-a881-a0d3c55a83e6'

router.get('/store',async (req,res)=>{
    //read all users
    try{
        const users=await User.find();
        
        fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
        })
        .then((r) => r.json())
        .then((data) => {
            // The response comes here
            res.status(200).json(data);
        })
        .catch((error) => {
            // Errors are reported there
            res.status(500).json(error);
        });

    }
    catch(err){
        console.log("err",err);
        res.status(400).send(err);
    }
       
})

router.get('/check',async (req,res)=>{
   fetch(url)
  .then((response) => response.json())
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((error) => {
    res.status(400).send(error);
  });
})

module.exports=router;