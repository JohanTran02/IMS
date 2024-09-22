import mongoose from "mongoose";
import "dotenv/config";


const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@imscluster.zenqj.mongodb.net/?retryWrites=true&w=majority&appName=imscluster;`;
 
 const restConnection  = () => {mongoose
  .connect(String(process.env.DB_URL))
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });
}

  export default restConnection