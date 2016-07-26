var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.set('port', (process.env.PORT || 5000));

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/newAdvocate', function(req, res) {
    var body = req.body;

    res.send("success");

    var obj = {
        'campaigns': [9549],
        'firstname': body.firstname,
        'lastname': body.lastname,
        'email': body.email,
        'phone': parseInt(body.phone),
        'address1': body.address1,
        'zip5': parseInt(body.zip5),
        'smsOptin': parseInt(body.smsOptin),
        'emailOptin': parseInt(body.emailOptin)
    };

    console.log(obj);

    request.post(
        'https://api.phone2action.com/2.0/advocates', {
            json: obj,
            auth: {
                user: 'zFtM7nmxd4DNHLiorLkn-EVtyWRRA',
                pass: 'zconbe4sZfHPqdQxxFs-$Tj2UCiwL'

            }
        },
        function(error, response, body) {
            console.log(error, response, body);
            // if (error) {
            // 	console.log(error, response.statusCode);
            // 	return;
            // }
            // console.log(response);
            // if (!error && response.statusCode == 200) {
            //     console.log(response);
            // }
        });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
