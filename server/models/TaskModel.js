const mongoose = require('mongoose');

const URI =
  process.env.MONGO_URI ||
  'mongodb+srv://deveneciaj:obKVE1uYSRpSnIFJ@cluster0.ymsz0u1.mongodb.net/';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'grad-app-rewrite',
  })
  .then(() => console.log('Connected to Mongo database.'))
  .catch((err) => console.error(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
