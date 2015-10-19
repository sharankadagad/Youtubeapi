var express = require('express');
var router = express.Router();
var google = require('googleapis');
var ReadJson = require("r-json");

var OAuth2Client = google.auth.OAuth2;
const CREDENTIALS = ReadJson("/home/natraj/Downloads/credentials.json");
var CLIENT_ID = CREDENTIALS.web.client_id;
var CLIENT_SECRET = CREDENTIALS.web.client_secret;
var REDIRECT_URL = CREDENTIALS.web.redirect_uris[0];
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
/* GET home page. */
var url;
var token1 = null;
router.get('/', function(req, res) {
    var code = req.query.code;
    if(token1==null){
    oauth2Client.getToken(code, function(err, tokens){
        oauth2Client.setCredentials(tokens);
        token1=tokens;
        google.options({ auth: oauth2Client });
    });}

 res.render('index', { title: '', pval: ''});

});


router.post('/',function (req, res) {
    // Prepare output in JSON format
    response = {
        sresult:req.body.Searchval
    };
    if(String(response.sresult).length == 0)
        res.render('index', { title: '', pval: 'errorempty', title1: ''});
    else{
    //res.end(JSON.stringify(response));
    youtube = google.youtube('v3');
    var ptval;
    youtube.search.list({part:'snippet', q: String(response.sresult), type: 'playlist'},function(err, response1) {
        var points = [];
        var titles = [];
        var counts=Object.keys(response1.items).length
        for (var i = 0; i < Object.keys(response1.items).length; i++) {
            points[i] = response1.items[i].id.playlistId;
            titles[i] = response1.items[i].snippet.title;
        }
        ptval=String(response1.items[0].id.playlistId);
        res.render('index', { title: points.toString(), pval: ptval, title1: titles.toString()});
    });}
});

getAccessToken(oauth2Client);
function getAccessToken(oauth2Client) {
    // generate consent page url
    url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: 'https://www.googleapis.com/auth/youtube' // can be a space-delimited string or an array of scopes
    });
    require("openurl").open(url);
}


module.exports = router;
