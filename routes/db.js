const router=require('express').Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');

router.get('/check',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            try{
                const updatedUser=await User.findByIdAndUpdate(req.user.id,{ 
                    "$set": {[`pictures.$[outer]`]:{id:req.params.photoId,...(req.body)}}
                },{ 
                    "arrayFilters": [{ "outer.id": req.params.photoId }],"new": true
                });
                
                res.status(200).json(updatedUser);
            }catch(err){
                res.status(400).send({message:"Error in updating"});
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})


router.post('/update/:photoId',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            try{
                const updatedUser=await User.findByIdAndUpdate(req.user.id,{ 
                    "$set": {[`pictures.$[outer]`]:{id:req.params.photoId,...(req.body)},
                            "lastAccessed":req.params.photoId}
                },{ 
                    "arrayFilters": [{ "outer.id": req.params.photoId }],"new": true
                });
                
                res.status(200).json(updatedUser);
            }catch(err){
                res.status(400).send({message:"Error in updating"});
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

router.get('/getImage/:photoId',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            if(user.pictures.length>=req.params.photoId)
            {
                res.status(200).json(user.pictures[req.params.photoId-1]);
            }
            else
            {
                res.status(404).send('Image Not Found');
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

//find unmatching images
router.get('/getUnmatched',async (req,res)=>{
    try{
        var users=await User.find();

        var unmatched=[];

        if(users)
        {
            for(var i=0;i<users[0].pictures.length;i++)
            {
                var image;
                var flag=0;
                for(var j=0;j<users.length;j++)
                {
                    img=users[j].pictures[i];
                    if(img.dp=="NILL")
                    {
                        continue;
                    }
                    else
                    {
                        //console.log(img);
                        if(flag==0)
                        {
                            image=img;
                            flag=1;
                        }
                        else
                        {
                            if(image.dp!=img.dp || image.ps!=img.ps || image.mac!=img.mac || image.peri.nasal!=img.peri.nasal || image.peri.temporal!=img.peri.temporal || image.peri.superior!=img.peri.superior || image.peri.inferior!=img.peri.inferior || image.meta_pm.category!=img.meta_pm.category || image.meta_pm.lesions!=img.meta_pm.lesions || image.other!=img.other)
                            {
                                unmatched.push(i);
                            }
                        }
                    }

                }
            }
            //console.log(image);
            //console.log("Unmatched Images: "+unmatched);
            //console.log(unmatched);
            res.status(200).json(unmatched);
        }
        else
        {
            res.status(404).send('Users Not Found');
        }


    }catch(err){
        res.status(400).send(err);
    }
})


module.exports=router;