import mongoose from "mongoose";
import "dotenv/config";


const mongoURI = `${process.env.DB_URL}`;
 
 const restConnection  = () => {mongoose
  .connect(String(mongoURI))
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });
}

  export default restConnection