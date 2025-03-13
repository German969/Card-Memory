import mongoose, {ConnectOptions} from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { // Updated here
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Database connection failed:', err.message);
      process.exit(1); // Exit process with failure
    }
  }
};

export default connectDB;
