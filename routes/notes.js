const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const db = require('../db/db.json');
const { readFromFile, readAndAppend } = require('../db/helpers/fsUtils')
// GET Route for retrieving diagnostic information
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
//   readFromFile('./db/diagnostics.json').then((data) =>
// console.log(db)
//     res.json(db)
//   );
});

// POST Route for a error logging
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit feedback`);

    const notes = req.body;
    const newNote = {

        notes
    }

    readAndAppend(newNote, './db/db.json');
  
});

module.exports = router;
