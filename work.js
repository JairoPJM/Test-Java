var express = require("express");
var bodyParser = require('body-parser');
var logfmt = require("logfmt");
var request = require("request");
var spawn = require('child_process').spawn;

try {
  var googlegeocodekey = require('./environment').googlegeocodekey; // hidden with .gitignore
} catch(err) {
  googlegeocodekey = process.env.googlegeocodekey; // for heroku
}

var app = express();

app.use(logfmt.requestLogger());
app.use(bodyParser.urlencoded({ extended: true }));

function spokanevalley_submit(actionid, desc, res) {
  
  console.log("Action ID: " + actionid);
  console.log("Description: " + desc);
  
  var child = spawn("casperjs", ["test", "spokanevalley/submit.js", "--actionid=" + actionid, "--desc=" + desc]);
  
  child.stdout.on('data', function (data) {
    data = data.toString();
    //console.log(data); //REQUIRED FOR DEBUGGING CASPER - uncomment to see casper data log
    if (data.search("Tracking Number:") === 0) {
      
      var tracking_number = data.substr(17, data.length - 18);
      console.log("Tracking Number: " + tracking_number);
      res.json(201, { tracking_number: tracking_number });
      
    } else if (data.search("Error:") === 0) {
      
      var response = data.substr(7, data.length - 8);
      res.json(422, { error: response });
      var error = new Error(response);
      console.log(error.stack);
      
    }
    
  });
  
}

function spokanevalley_update(tracking_number, desc, res) {
  
  console.log("Tracking Number: " + tracking_number);
  console.log("Description: " + desc);
  
  var child = spawn("casperjs", ["test", "spokanevalley/update.js", "--desc=" + desc, "--tracking_number=" + tracking_number]);
  
  child.stdout.on('data', function (data) {
    data = data.toString();
    //console.log(data); //REQUIRED FOR DEBUGGING CASPER - uncomment to see casper data log
    if (data.search("Tracking Number:") === 0) {
      
      var tracking_number = data.substr(17, data.length - 18);
      console.log("Tracking Number: " + tracking_number);
      res.json(201, { tracking_number: tracking_number });
      
    } else if (data.search("Error:") === 0) {
      
      var response = data.substr(7, data.length - 8);
      res.json(422, { error: response });
      var error = new Error(response);
      console.log(error.stack);
      
    }
    
  });
  
}

function spokanevalley_status(tracking_number, showall, res) {
  
  console.log("Tracking Number: " + tracking_number);
  
  request.post(
    'http://www.egovlink.com/spokanevalley/action_request_lookup.asp',
    { form: { REQUEST_ID: tracking_number } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var results = [];
          var id = 0;
          var jsdom = require("jsdom");
          
          jsdom.env(body, ["http://code.jquery.com/jquery.js"],
          function (errors, window) {
            
            window.$(window.$("div:contains('Status  - Date of Activity') ~ div").get().reverse()).each(function () {
              var comment = window.$(this).text();
              if (id % 2 == 1) {
                var start = comment.search(' - ');
                var status = comment.substr(0, start);
                var date = comment.substr(start + 3, comment.length - start);
                var userbracket = window.$(this).next('div').children('strong').text();
                var user = userbracket.substr(1, userbracket.length - 4);
                var message = window.$(this).next('div').children('em').text();
                if ((showall === false && user == "City of Spokane Valley") || showall !== false) {
                  results.push({id: tracking_number + 'x' + id, date: date, status: status, user: user, message: message});
                }
              }
              id++;
            });
            console.log("results: " + JSON.stringify(results));
            res.json(200, results);
            return;
          });
        } else { res.json(400, error); return; }
    }
  );
  
}

function inverseMercator(x, y) {
  var lon = (x / 20037508.34) * 180;
  var lat = (y / 20037508.34) * 180;

  lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);

  return [lat, lon];
  }

function convert(ll) {
    var xy = [
        6378137.0 * ll[0] * Math.PI / 180,
        6378137.0 * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * Math.PI / 180)))
    ];
    var MAXEXTENT = 20037508.342789244;
    // if xy value is beyond maxextent (e.g. poles), return maxextent.
    (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
    (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
    (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
    (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
    return xy;
}

function crime_status(startdate, enddate, lat, long, res) {
  
  console.log("Start Date: " + startdate);
  console.log("End Date: " + enddate);
  console.log("Lat, Long: " + lat + ', ' + long);
  
  /* OLD CODE TO RETRIEVE LAT/LONG FROM GOOGLE MAPS
  request.get(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' + citystate + '&key=' + googlegeocodekey,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var results = JSON.parse(body);
        var lat = results['results'][0]['geometry']['location']['lat'];
        var long = results['results'][0]['geometry']['location']['lng'];
        console.log('Lat: ' + lat, 'Long: ' + long);
  */ 
  
  try {
    
    var coords = convert([long, lat]);
    console.log("coords: " + coords);
    var xmin = coords[0] - 6114.962262975;
    var xmax = coords[0] + 6114.962262975;
    var ymin = coords[1] - 2718.2918184635;
    var ymax = coords[1] + 2718.2918184635;
    
    // Types of crime to show: Arson (AR), Assault (AS), Burglary (BU), Disturbing the Peace (DP), Drugs/Alcohol Violations (DR), DUI (DU), Fraud (FR), Homicide (HO), Motor Vehicle Theft (VT), Robbery (RO), Sex Crimes (SX), Theft/Larceny (TH), Vandalism (VA), Vehicle Break-in/Theft (VB), Weapons (WE)
    var urlparams = '?db=' + startdate + '+00:00:00&de=' + enddate + '+00:00:00&ccs=AR,AS,BU,DP,DR,DU,FR,HO,VT,RO,SX,TH,VA,VB,WE&xmin=' + xmin + '&ymin=' + ymin + '&xmax=' + xmax + '&ymax=' + ymax;
    console.log('http://www.crimemapping.com/DetailedReport.aspx' + urlparams);
    request.get(
      'http://www.crimemapping.com/DetailedReport.aspx' + urlparams,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var jsdom = require("jsdom");
    
            jsdom.env(body, ["http://code.jquery.com/jquery.js"],
            function (errors, window) {
              var rows = window.$('.report-grid').find('tr');
              var crime_desc = '',
                  crime_datetime = '',
                  crime_loc = '',
                  c1 = '',
                  c2 = '',
                  c3 = '',
                  crime_x = '',
                  crime_y = '',
                  crime_coords = [],
                  crimes = [],
                  id = '';
              
              for (var i=2; i < rows.length; i++) {
                crime_desc = rows[i].childNodes[1].childNodes[0].childNodes[0].nodeValue;
                crime_datetime = rows[i].childNodes[5].childNodes[0].childNodes[0].nodeValue;
                crime_loc = rows[i].attributes.onclick.value;
                c1 = crime_loc.indexOf(',');
                c2 = crime_loc.indexOf(',', c1 + 1);
                c3 = crime_loc.indexOf(',', c2 + 1);
                crime_x = crime_loc.substr(c1 + 3, c2 - c1 - 4);
                crime_y = crime_loc.substr(c2 + 3, c3 - c2 - 4);
                crime_coords = inverseMercator(crime_x, crime_y);
                id = ''.concat(Date.parse(crime_datetime, 'MM/d/yyyy h:m a'), Math.abs(crime_x), Math.abs(crime_y));
                
                crimes.push({'id': id, 'description': crime_desc, 'datetime': crime_datetime, 'lat': crime_coords[0], 'long': crime_coords[1]});
                
              }
              
              console.log("crimes: " + JSON.stringify(crimes));
              res.json(200, crimes);
              return;
            });
            
            
          } else { res.json(400, error); return; }
      }
    );
    
  } catch(err) {
    console.log(err);
    res.json(400, err);
  }
  
}

app.post('/new', function(req, res) {
  var actionid = req.body.actionid,
      desc = req.body.desc;
  
  if (actionid === undefined && desc === undefined) {
    actionid = req.query.actionid;
    desc = req.query.desc;
  }
  if (actionid === undefined || desc === undefined) {
    res.json(422, { error: "ActionID and Description are required!" });
  } else {
    spokanevalley_submit(actionid, desc, res);
  }
});

app.get('/status/:tracking_number', function(req, res) {
  var tracking_number = req.params.tracking_number;
  var showall = req.query.showall;
  
  if (!showall || showall==='false') { showall = false; }
  
  if (tracking_number === undefined) {
    res.json(422, { error: "tracking_number is required!" });
  } else {
    spokanevalley_status(tracking_number, showall, res);
  }
});

app.put('/update', function(req, res) {
  var tracking_number = req.body.tracking_number,
      desc = req.body.desc;
    
  if (tracking_number === undefined && desc === undefined) {
    tracking_number = req.query.tracking_number;
    desc = req.query.desc;
  }
  if (tracking_number === undefined || desc === undefined) {
    res.json(422, { error: "tracking_number and description (desc) are required!" });
  } else {
    spokanevalley_update(tracking_number, desc, res);
  }
});

app.get('/', function(req, res) {
  res.send(404, 'Oops, nothing here!');
});

// CRIME MAPPING API

app.get('/crime', function(req, res) {
  var startdate = req.query.startdate;
  var enddate = req.query.enddate;
  var lat = req.query.lat;
  var long = req.query.long;
  if (startdate === undefined || enddate === undefined || lat === undefined || long === undefined) {
    res.json(422, { error: "startdate, enddate (ie 6/19/2014) and lat/long are required!" });
  } else {
    crime_status(startdate, enddate, lat, long, res);
  }
});

var port = Number(process.env.PORT);
app.listen(port, function() {
  console.log("Listening on " + port);
});



