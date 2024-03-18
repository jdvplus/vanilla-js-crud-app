const mongoose = require('mongoose');

// required to access env variables in Express
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGO_URI || '<your Mongo DB URI here>';

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

const Schema = mongoose.Schema;

// create task schema
const taskSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
