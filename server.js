// GLOBAL VARIABLES
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const morg = require("morgan");
const GoogleSpreadsheet = require('google-spreadsheet');
const GoogleSpreasdheetCredentials = require('./backend/client_secret.json');
const States = require('./backend/states.js');
const stringify = require("json-stringify-pretty-compact")

const PORT = process.env.PORT || 5001;
const app = express();

class State {
    constructor(name, abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
    }
}

// logging for request to the console
app.use(morg("dev"));

// Configure body parser for AJAX requests
app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    var allowedOrigins = ['https://www.treasuryofwearysouls.com', 'https://treasuryofwearysouls.com', 
    'https://nameless-fjord-54746.herokuapp.com', 'https://treasury-of-weary-souls.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, ETag');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Cache-Control', 'public, max-age=31557600');
    return next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    console.log("IN PRODUCTION BUILD SERVING");
    console.log(__dirname)
    console.log( path.join(__dirname + '/client/build/index.html') )
    // app.use(express.static("app/build"));
    app.use(express.static(path.join(__dirname, '/client/build')));
    // app.get('/map', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/build/index.html'));
    // });
    // app.get('/post', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/build/index.html'));
    // });
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/build/index.html'));
    // });
}

// Create a document object using the ID of the spreadsheet - obtained from its URL.
let ssid = process.env.TOWS_SSID || '1HmO3TypMMJFnWoQddTgeWwl_l7GUi-BQOl2bgJkEv-w';
let GoogleSpreadsheetData = new GoogleSpreadsheet(ssid);

// HELPER METHODS
function filterOutDuplicates(arr) {
    let seen = {};
    let out = [];
    const len = arr.length;
    let j = 0;
    for(let i = 0; i < len; i++) {
        let item = arr[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

function filterOnlyStates(arr) {
    let usa_states_abbr = arr.filter((abbr) => {
        for (let state in States.states) {
            if (state == abbr) {
                return state == abbr;
            }
        }
    })
    return usa_states_abbr;
}

function mapArrValuesToCount(arr) {
    return arr.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});
}

// ROUTES
app.get('/api/slaves', (req, res) => {
    GoogleSpreadsheetData.useServiceAccountAuth(GoogleSpreasdheetCredentials, function (err) {
        // Get all of the rows from the spreadsheet.
        GoogleSpreadsheetData.getRows(1, function (err, rows) {
            let data = rows;
            res.json(data);
        });
    });
})

app.get('/api/wearysouls', (req, res) => {
    GoogleSpreadsheetData.useServiceAccountAuth(GoogleSpreasdheetCredentials, function (err) {
        // Get all of the rows from the spreadsheet.
        GoogleSpreadsheetData.getRows(1, function (err, rows) {
            let data = []
            for (var row in rows) {
                var stateObj = States.states.filter(function( state ) {
                    return state.abbreviation == String(rows[row].slavestate);
                });
                let state = function() {
                    return stateObj.length > 0 ? stateObj[0].state : null
                }
                let stateId = function() {
                    return stateObj.length > 0 ? stateObj[0].id : null
                }

                let wearySoul = {
                    name: rows[row].slave,
                    city: rows[row].slavecity,
                    state_abbreviated: rows[row].slavestate,
                    state: state(),
                    state_id: stateId(),
                    insurancefirm: rows[row].insurancefirm,
                    owner: rows[row].slaveowners,
                    occupation: rows[row].occupation == "" ? "NL" : rows[row].occupation
                }
                data.push(wearySoul);
            }
            res.json(data);
        });
    });
})

app.get('/api/slaveowners', (req, res) => {
    GoogleSpreadsheetData.useServiceAccountAuth(GoogleSpreasdheetCredentials, function (err) {
        // Get all of the rows from the spreadsheet.
        GoogleSpreadsheetData.getRows(1, function (err, rows) {
            let data = rows;
            let slaveowners = [];
            // Get all of the slave owners from the Spreadsheet
            for (var owner in data) {
                // console.log(data[owner].slaveowners);
                slaveowners.push(data[owner].slaveowners);
            }
            res.json(slaveowners);
        });
    });
})
// Retrieve all of the states that slave owners and slaves were in
// output: An Array of State Objects with properties of abbreviation and name
app.get('/api/states', (req, res) => {
    GoogleSpreadsheetData.useServiceAccountAuth(GoogleSpreasdheetCredentials, function (err) {
        // Get all of the rows from the spreadsheet.
        GoogleSpreadsheetData.getRows(1, function (err, rows) {
            let data = rows;
            let ownerstate = [];
            // Get all of the slave owners' states from the Spreadsheet
            for (var state in data) {
                ownerstate.push(data[state].ownerstate);
            }
            let filtered = filterOutDuplicates(ownerstate);
            let only_states = filterOnlyStates(filtered);
            let arr = [];
            for (let state in only_states) {
                let name = States.states[only_states[state]];
                let abbreviation = only_states[state];

                let new_state = new State(name, abbreviation);
                // push the states unabbreviated into an array
                arr.push(new_state);
            }
            res.json( arr );
        });
    });
})

app.get('/api/insurancefirms', (req, res) => {
    GoogleSpreadsheetData.useServiceAccountAuth(GoogleSpreasdheetCredentials, function (err) {
        // Get all of the rows from the spreadsheet.
        GoogleSpreadsheetData.getRows(1, function (err, rows) {
            let data = rows;
            let insurancefirms = [];
            // Get all of the slave owners' states from the Spreadsheet
            for (var insurer in data) {
                insurancefirms.push(data[insurer].insurancefirm);
            }
            insurancefirms.sort();
            var countMap = mapArrValuesToCount(insurancefirms)
            res.json(countMap);
        });
    });
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });
app.get('*', function (req, res) {
    console.log("do you even reach me?");
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT);

console.log(`App listening on ${PORT}`);