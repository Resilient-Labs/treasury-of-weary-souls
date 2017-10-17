var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var ssid = process.env.TOWS_SSID || '1HmO3TypMMJFnWoQddTgeWwl_l7GUi-BQOl2bgJkEv-w';
var GSPREADSHEET_DATA = new GoogleSpreadsheet(ssid);


// Authenticate with the Google Spreadsheets API.
function getSpreadsheetData() {
  GSPREADSHEET_DATA.useServiceAccountAuth(creds, function (err) {

    // Get all of the rows from the spreadsheet.
    GSPREADSHEET_DATA.getRows(1, function (err, rows) {
      console.log(rows);
    });
  });
}

GSPREADSHEET_DATA.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  GSPREADSHEET_DATA.getRows(1, function (err, rows) {
    console.log(rows);
  });
});

// export const getSpreadsheetData = getSpreadsheetData;
