const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const db = require("../db/db.json");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../db/helpers/fsUtils");
// GET Route for retrieving diagnostic information
router.get("/notes", (req, res) => {
  console.info(`${req.method} request received for feedback`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  //   readFromFile('./db/diagnostics.json').then((data) =>
  // console.log(db)
  //     res.json(db)
  //   );
});

// POST Route for a error logging
router.post("/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    //   fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // Convert string into JSON object
    //       const parsedNotes = JSON.parse(data);

    //       // Add a new review
    //       parsedNotes.push(newNote);

    //       // Write updated reviews back to the file
    //       fs.writeFile(
    //         './db/db.json',
    //         JSON.stringify(parsedNotes, null, 4),
    //         (writeErr) =>
    //           writeErr
    //             ? console.error(writeErr)
    //             : console.info('Successfully updated notes!')
    //       );
    //     }
    //   });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);

    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

router.delete("/notes/:id", (req, res) =>
  readFromFile("./db/db.json").then((data) => {
    const parsedData = JSON.parse(data);
    console.info(parsedData);
    const filterNotes = parsedData.filter((notes) => notes.id != req.params.id);

    writeToFile("./db/db.json", filterNotes);
    console.info(filterNotes);
    res.status(201).json("notes has to be deleted");
  })
);

module.exports = router;
