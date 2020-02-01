// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var noteData = require("../data/db.json");
var fs = require('fs');
var path = require("path");
const uuidv4 = require('uuid/v4');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {

    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    }
    noteData.push(note);
    let data = JSON.stringify(noteData);
    fs.writeFileSync(path.join(__dirname, "../data/db.json"), data);
    res.json(true);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
  let targetId = 1  ;
  app.delete("/api/notes/:id", function (req, res) {
  
    const foundNote = noteData.find(note => note.id === targetId)
    const foundNoteIndex = noteData.indexOf(foundNote)
    noteData.splice(foundNoteIndex, targetId);
    let data = JSON.stringify(noteData);
    fs.writeFileSync(path.join(__dirname, "../data/db.json"), data);
    res.json(true);
    
  });

  // app.post("/api/notes", function (req, res) {
  //   // Empty out the arrays of data
  //   noteData.length = 0;


  //   res.json({ ok: true });
  // });
};
