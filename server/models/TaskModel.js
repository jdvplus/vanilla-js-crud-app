const mongoose = require('mongoose');

// access env variables within Express server
const dotenv = require('dotenv');
dotenv.config();

const myURI = '<your Mongo DB URI here>';
const URI = process.env.MONGO_URI || myURI;

const connectToDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'grad-app-rewrite',
    });
    console.log('Connected to Mongo DB.');
  } catch (error) {
    console.error(error);
  }
};

connectToDB(); // initiate database connection

// create task schema & model
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
