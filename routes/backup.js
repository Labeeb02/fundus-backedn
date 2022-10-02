const router=require('express').Router();
const User=require('../models/User');
const fetch=require('node-fetch');
const fs = require("fs");
const { gitCommitPush } = require("git-commit-push-via-github-api");



url = 'https://sheet.best/api/sheets/2f67d76a-f785-4443-a881-a0d3c55a83e6'

// router.get('/store',async (req,res)=>{
    
//     gitCommitPush({
//         // commit to https://github.com/azu/commit-to-github-test
//         owner: "Fundus01",
//         repo: "image-fundus",
//         // commit files
//         files: [
//             { path: "test.json", content: fs.readFileSync(__dirname + "/test.json") }
//         ],
//         fullyQualifiedRef: "heads/master",
//         forceUpdate: false, // optional default = false
//         commitMessage: "HELLO"
//     })
//     .then(res => {
//         res.status(200).send(res);
//     })
//     .catch(err => {
//         res.status(400).send(err);
//     });
       
// })

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