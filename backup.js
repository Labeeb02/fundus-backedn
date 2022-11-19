const User=require('./models/User');
const dotenv = require('dotenv');
const {Octokit}=require('@octokit/rest');
const nodemailer=require('nodemailer');
dotenv.config();

const mail=async (msg)=>{
    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'blood_bank01@yahoo.com',
            pass: 'tdqjivgthjqpoica'
        }
    });
    const mailOptions = {
        from: 'blood_bank01@yahoo.com',
        to: 'image.fundus@gmail.com',
        subject: 'Backup',
        text: msg,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        }
    });
}

const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
})

const backup=async ()=>{
    //read all users
    try{
        const users=await User.find();
        
        var buff = Buffer.from(JSON.stringify(users)).toString("base64")
        //get yyyymmddhhmmss
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        var filename=year+'_'+month+'_'+day+'_'+hour+'_'+minute+'_'+second;
        resp = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Fundus01',
            repo: 'image-fundus',
            path: 'users'+filename+'.json',
            message: 'daily backup commit',
            committer: {
              name: 'Fundus01',
              email: 'Image.fundus@gmail.com'
            },
            content: buff
        })

        await mail('Backup Successful');
    }
    catch(err){

        await mail('Backup Failed'+' - '+err);
    }
       
}

module.exports={backup,mail};