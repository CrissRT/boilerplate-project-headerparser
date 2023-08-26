// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;

  if (!inputDate) {
    // If no date is provided, use the current date
    const currentDate = new Date();
    const utcFormatted = currentDate.toUTCString();
    res.send({
      unix: currentDate.getTime(),
      utc: utcFormatted
    });
  } else {
    let parsedDate = new Date(inputDate);
    if(!inputDate.includes("-") && !inputDate.includes(" ")) {
      const intInputDate = parseInt(inputDate);
      parsedDate = new Date(intInputDate);
    }
    
    if (isNaN(parsedDate)) {
      // Invalid date provided
      res.status(400).json({ error : "Invalid Date" });
    } else {
      const utcFormatted = parsedDate.toUTCString();
      res.send({
        unix: parsedDate.getTime(),
        utc: utcFormatted
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
