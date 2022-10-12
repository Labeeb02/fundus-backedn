const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        googleId:{
            type:String,
            required:true,
        },
        lastAccessed:{
            type:Number,
            default:0
        },
        pictures:[
            {
                    id:{
                        type:Number,
                        required:true
                    },
                    ps:{
                        type:String,
                        required:true
                    },
                    mac:{
                        type:String,
                        required:true
                    },
                    perim:{
                        nasal: 
                        {
                            type:String,
                            required:true
                        },
                        temporal:{
                            type:String,
                            required:true
                        },
                        superior: {
                            type:String,
                            required:true
                        },
                        inferior: {
                            type:String,
                            required:true
                        },
                    },
                    dp:{
                        type:String,
                        required:true
                    },
                    meta_pm:{
                        category:{
                            type:String,
                            required:true
                        },
                        lesions:{
                            type:[String],
                            required:true
                        }
                    },
                    other:{
                        type:[String],
                        required:true
                    }
            }   
        ]
        
    },{timestamps:true}
);

module.exports=mongoose.model('User',userSchema);