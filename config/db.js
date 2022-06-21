import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log(
      `MongoDB is in the House !: ${conn.connection.host}`
    );
  } catch (err) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
