const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./models/Tour_models');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
})
      .then(() => console.log("Database connection succesfull!"))
      .catch(() => console.log("Error Connecting"));


const fileData = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));


const importData = async () => {
      try {
            await Tour.create(fileData);
            console.log("Succesfully Imported!");
      } catch (error) {
            console.log(error);
      }
}

const deleteData = async () => {
      try {
            await Tour.deleteMany();
            console.log("Succesfully Deleted!");
      } catch (error) {
            console.log(error);
      }
}

importData();