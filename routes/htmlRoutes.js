// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // CSS styling sheets -> Called by notes.html -> Serve styles.css
  app.get('/assets/css/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
  });
  // index.js -> Called by notes.html -> Serve index.js
  app.get('/assets/js/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
