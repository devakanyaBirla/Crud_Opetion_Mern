import mongoose from "mongoose";

const dbcon = async()=>{
    try {
      await mongoose.connect(process.env.DB_URL);
        console.log("mongodb conencted....");
        
    } catch (error) {
        console.log(error);  
    }
}

export default dbcon;