const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || '[your mongo URI here]';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: '[your collection name here]',
  })
  .then(() => console.log('connected to mongo DB'))
  .catch((err) => console.error(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
