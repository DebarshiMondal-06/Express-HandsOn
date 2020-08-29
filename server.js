const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
})
      .then(() => console.log("Database connection succesfull!"))
      .catch(() => console.log("Error Connecting"));



const port = process.env.PORT_NO || 8000;
app.listen(port, () => {
      console.log(`App is running on Port : ${port}.......`);
});

