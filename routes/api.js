const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const db = require('../db/db.json');
// GET Route for retrieving diagnostic information
router.get('/notes', (req, res) => {
//   readFromFile('./db/diagnostics.json').then((data) =>
console.log(db)
    res.json(db)
//   );
});

// POST Route for a error logging
router.post('/', (req, res) => {
  
});

module.exports = router;
