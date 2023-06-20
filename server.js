// Import module
const express = require('express');
const cors = require('cors');

// init server
const app = express();

// allow domain
var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse request to json
app.use(express.json());

// parse request to x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connet to database
const db = require('./app/models');
db.sequelizeConnection
  .sync()
  .then(() => {
    console.log('sync to database success!');
  })
  .catch((err) => {
    console.log(`failed to sync ! ${err.message}`);
  });
//Import biodata controller
const biodataController = require('./app/controllers/biodata.controller');

// create biodata route
app.post('/', (req, res) => {
  biodataController.create(req, res);
});

// find all biodata route
app.get('/', (req, res) => {
  biodataController.findAll(req, res);
});

// find biodata with id route
app.get('/:id', (req, res) => {
  biodataController.findOne(req, res);
});

// delete biodata with id route
app.delete('/:id', (req, res) => {
  biodataController.delete(req, res);
});

// Update biodata with id route
app.put('/:id', (req, res) => {
  biodataController.update(req, res);
});
// app.put('/:id', (req, res) => {
//   biodataController.updateOne(req, res);
// });

// pacth biodata with id route
app.patch('/:id', (req, res) => {
  biodataController.pacth(req, res);
});

// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
