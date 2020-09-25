const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./models/Tour_models');
const Review = require('./models/Review_model');
const User = require('./models/User_models');
// const { deleteMany } = require('./models/Tour_models');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
})
      .then(() => console.log("Database connection succesfull!"))
      .catch(() => console.log("Error Connecting"));


const fileTData = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));
const fileRData = JSON.parse(fs.readFileSync('./dev-data/data/reviews.json'));
const fileUData = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));


const importData = async () => {
      try {
            // await Tour.create(fileTData);
            // await Review.create(fileRData);
            await User.create(fileUData, { validateBeforeSave: false });
            console.log("Succesfully Imported!");
      } catch (error) {
            console.log(error);
      }
}

const deleteData = async () => {
      try {
            // await User.deleteMany();
            // await Review.deleteMany();
            // await Tour.deleteMany();
            console.log("Succesfully Deleted!");
      } catch (error) {
            console.log(error);
      }
}

importData();
// deleteData();