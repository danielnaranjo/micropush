require('dotenv').config()

var $express = require('./_express');

var $fcm = require('./_fcm');

require('now-env');
/*
if(process.env.ios_enabled){
  var $apn = require('./_apn');
  $apn.init({
    token: {
      key: process.env.ios_p8,
      keyId: process.env.ios_keyid,
      teamId: process.env.ios_teamid
    },
    production: true
  });
}*/
$fcm.init({
  token: process.env.cloudmessaging
})

$express.init({
  view: {
    body: {
      "response": "success"
    }
  },
  routes: {
    post: {
      "/": function(req, res){
        let body = req.body;
        let tokens = body.type.split(".")
        let os = tokens[1];
        if(tokens[0].toLowerCase() === '$push') {
          //if(os === 'ios') {
          //  $apn.send(body.options);
          //} else if (os === 'android') {
            $fcm.send(body.options);
          //}
        }
        $express.respond({
          req: req,
          res: res,
          response: { model: "", view: "body" }
        })
      }
    }
  }
});
