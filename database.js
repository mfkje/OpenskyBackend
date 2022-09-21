const mongoose = require('mongoose');
const dbName = "myFirstDb";
//const MONGODB_URI = "mongodb://localhost/openskyDB"
const MONGODB_URI = "mongodb+srv://Eric:hamelin666@cluster0.fbotyrb.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(bd => console.log("Database is onLine..."))
.catch(err => console.log(err))