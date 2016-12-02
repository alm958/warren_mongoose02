var Rabbit = require('./db.js');
var moment = require('moment');

module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
    })

    app.post('/rabbits/new',function(req, res){
        console.log(req.body);
        if (req.body.name.length > 1){

          // retrieve timezone offset from the body OR (||) set to 0 (no change)
          var offset = req.body.timezoneOffset || 0;

          // modify the dob based on the offset information
          var dob = moment(req.body.dob).add(offset, 'minutes');

          // remove timezone offset from the body object
          delete(req.body.timezoneOffset);

          // reassign dob with the timezone offset modified version
          req.body.dob = dob;

          // continue with normal rabbit creation
          Rabbit.create(req.body, function(err, newrabbit){
              console.log(newrabbit);
              res.redirect('/rabbits');
          });
        }
        else {
            res.status(404);
            res.sendFile(__dirname+'/views/error.ejs');
        }
    })

    app.get('/rabbits', function(req, res){
        Rabbit.find({}, function(err, allRabbits){
            res.render('rabbitlist.ejs',{allRabbits : allRabbits});
        });

    })

    app.get('/form', function(req, res){
        console.log(req.query);
        if (req.query.id){
            req.query.dob = moment(req.query.dob.slice(4,15),"MMM DD YYYY").format("YYYY-MM-DD");
            console.log("form has data");
            console.log(req.query);
            res.render('form',{ rabbit : req.query});
        }
        else {
            console.log("empty form");
            res.render('form');
        }
    })



}
