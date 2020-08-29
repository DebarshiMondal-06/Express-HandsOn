const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
})
      .then(() => console.log("Database connection succesfull!"))
      .catch(() => console.log("Error Connecting"));


// Building a Tour Schema ***************************
const TourSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            unique: true
      },
      rating: {
            type: Number,
            default: 4.5
      },
      price: {
            type: Number,
            required: [true, 'A tour must have a Price']
      }
});
const Tour = mongoose.model('Tour', TourSchema);
// Ends here Schema **************************



// Creating a Document or Row **************************************
const testTour = new Tour({
      name: "Singapore Hikers",
      rating: 4.7,
      price: 450
});
testTour
      .save() // returns the document under promises...................
      .then((doc) => console.log(doc))
      .catch((err) => console.log("Error :", err));

// Ends ****************************




const port = process.env.PORT_NO || 8000;
app.listen(port, () => {
      console.log(`App is running on Port : ${port}.......`);
});

