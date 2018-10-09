const express = require("express");
const PORT = process.env.PORT || 3000;
let app = express()
// Sets up the Express app to handle data parsing
app.use(express.static("addressbook")); // myApp will be the same folder name.
app.get("/", function (req, res,next) {
 res.redirect('/'); 
});

app.listen(PORT, function() {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
  });
  