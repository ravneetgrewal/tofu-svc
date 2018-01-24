var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

aws.config.update({region:'us-east-1'});

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    var dateTime = Date.now();
    var ip = getEc2Ip();
    res.json({MyTofu: "Tofu is timstamped - " + dateTime + " IP: "+ip});
});

function getEc2Ip(){
	var ec2 = new aws.EC2({apiVersion: '2016-11-15'});
	var params = {
  	Filters: [
     		{Name: 'domain', Values: ['vpc']}
  	]};
	ec2.describeAddresses(params, function(err, data) {
		console.log(data);
		console.log(err);
   		if (err) {
      			return "Could not get IP: " + err;
   		} else {
      			return JSON.stringify(data.Addresses);
   		}
	});
}

module.exports = router;
