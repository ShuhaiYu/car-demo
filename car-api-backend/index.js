const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const carRoutes = require('./routes/car');
const authRoutes = require('./routes/auth');

app.use('/car', carRoutes);
app.use('/', authRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// test
app.get('/', (req, res) => {
  res.send('Hello World');
});
