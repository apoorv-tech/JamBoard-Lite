const mongoose = require('mongoose');

const mongoAtlasUri = process.env.MONGO_URI;
const connectdb = async()=>{
    // try {
    //     const conn = await mongoose.connect("mongodb+srv://userDetails:<UJ3uMBcJ0XcdL36b>@cluster0.dmali.mongodb.net/users?retryWrites=true&w=majority",{
    //         useNewUrlParser:true,
    //         useUnifiedTopology:true,
    //         useFindAndModify:false
        
    //     })
    //     console.log(`MONGODB connected `);
    // } catch (err) {
    //     console.log("error is found here");
    //     console.log(err);
    //     process.exit(1);

    // }
    try {
        // Connect to the MongoDB cluster
         mongoose.connect(
          mongoAtlasUri,
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log(`Mongoose is connected ${mongoose.connection.host}`)
        );
    
      } catch (e) {
        console.log("could not connect");
      }
}

module.exports = connectdb;