var Rabbit = require('./db.js');
var moment = require('moment');

module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
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

    app.post('/rabbits/new',function(req, res){
        console.log(req.body);
        if (req.body.name.length > 1){
            Rabbit.create(req.body, function(err, newrabbit){
                console.log(newrabbit);
                res.redirect('/rabbits');
            })
        }
        else {
            res.status(404);
            res.sendFile(__dirname+'/views/error.ejs');
        }
    })

    app.post('/rabbits/update',function(req, res){
        console.log("in update rabbit");
        console.log(req.body);
        if (req.body.name.length > 1){
            Rabbit.update({_id:req.body._id},req.body, function(err, newrabbit){
                console.log(newrabbit);
                res.redirect('/rabbits');
            })
        }
        else {
            res.status(404);
            res.sendFile(__dirname+'/views/error.ejs');
        }
    })

    app.post('/rabbits/destroy',function(req, res){
        console.log("in destroy rabbit");
        console.log(req.body);
        Rabbit.remove({_id:req.body.id},function(err, result){
            console.log(result);
            res.redirect('/rabbits');
        })
    })

    app.get('/rabbits/show',function(req, res){
        console.log("in show rabbit");
        console.log(req.query);
        res.render('show', { rabbit : req.query});
    })





}
