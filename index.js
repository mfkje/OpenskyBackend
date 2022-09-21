const express       = require('express');
const morgan        = require('morgan');
const multer        = require('multer');
const cors          = require('cors');
const mongoose      = require('mongoose');
const path          = require('path');

const app = express();
const port = 3001;

// Models
const Nft = require('./models/Nft');

// Add Routes
const registerRoute = require('./routes/register-route');
const authRoute = require('./routes/auth-route');
const nftRoute = require('./routes/nft-route');

// dot enviroments
require('dotenv').config();
// Loading database
require('./database');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});

app.use(multer({storage}).single('nft-image'));

app.get('/', (req, res) => {
  res.send('<h1>Hello Mr. White!</h1>');
})

// API
app.use("/api/", registerRoute);
app.use("/api/auth/", authRoute);
app.use("/api/nft/", nftRoute);

app.post('/api/nft/my-nft', async(req, res)=> {
  const userId = req.body.userId
  const nfts = await Nft.aggregate([
    {$match: {userId: mongoose.Types.ObjectId(userId)}}
  ])
  if (nfts) {
    res.send(nfts)
  }else{
    res.send('Error').status(400)
  }
})

app.post('/api/nft/all-nft', async(req, res) => {
  //const nfts = await Nft.find().populate('userId')
  const nfts = await Nft.aggregate(
      [
        {
          $lookup:{
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {$unwind: "$userDetails"}
      ]
    )
    console.log("****results***", nfts);
  if (nfts) {
    res.send(nfts)
  }else{
    res.send('Error').status(400)
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
})
