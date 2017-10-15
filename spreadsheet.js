var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
 
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var ssid = process.env.TOWS_SSID || '1HmO3TypMMJFnWoQddTgeWwl_l7GUi-BQOl2bgJkEv-w';
var doc = new GoogleSpreadsheet(ssid);

 
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {
 
  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});