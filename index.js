const {backup,mail} = require('./backup');
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const authRouter = require('./routes/auth')
const dbRouter = require('./routes/db')
const cors = require('cors')
const User=require('./models/User')
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser')



dotenv.config()
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())
const port=process.env.PORT || 5000

mongoose.connect((process.env.MONGO_URI))
.then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('Error:', err.message)
})

images = []
for(var i=1;i<99;i++)
{
    images.push(
      {
        id:i,
        dp: "NILL",
        ps: "NILL",
        mac: "NILL",
        peri: {
          nasal: "Nasal",
          temporal: "Temporal",
          superior: "Superior",
          inferior: "inferior"
        },
        other: [],
        meta_pm: {
            category:'NILL',
            lesions:[]
        },
      }
    )
}

passport.use(
    new GoogleStrategy(
    {
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL:'https://image-fundus.herokuapp.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, 
    callback) => {
      // Extract email from profile
      try{
      const email = profile.emails[0].value;
    
      if (!email) {
        throw new BadRequestError('Login failed');
      }
    
      // Check if user already exist in database
      const existingUser = await User.findOne({ email 
        });
    
      if (existingUser) {
        // Generate JWT
        const tkn = jwt.sign(
          { id: existingUser.id },
          process.env.JWT_KEY,
          { expiresIn: '10m' }
        );
    
        // Update existing user
        // existingUser.token = tkn
        // await existingUser.save();
    
        return callback(null, {id:existingUser.id ,token: tkn,last:existingUser.lastAccessed});
      } else {
    
        // Build a new User
        const user = new User({
          email,
          googleId: profile.id,
          pictures: images
        });
    
        // Generate JWT for new user
          const tkn = jwt.sign(
          { id: user.id },
          process.env.JWT_KEY,
          { expiresIn: '10m' }
        );
       
        // Update new user
        // user.token = tkn;
    
        await user.save();
    
        return callback(null, {id: user.id,token: tkn,last:0});
        }
        }catch(err){
            
            console.log(err)
            return callback(err)
        }
      }
    ));

app.use(passport.initialize());

app.use('/auth', authRouter)
app.use('/db',dbRouter)
app.use('/failed', (req, res) => res.send('You Failed to log in!'))
app.use('/', (req, res) => res.send('Hello World!'))

app.listen(port,console.log(`listening at ${port}`))

backup()
setInterval(backup, 1000*60*60*24);

