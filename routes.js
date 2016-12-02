var Rabbit = require('./db.js');

module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
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

    app.get('/rabbits', function(req, res){
        Rabbit.find({}, function(err, allRabbits){
        res.render('rabbitlist.ejs',{allRabbits : allRabbits});
        });
    })

    app.get('/form', function(req, res){
        console.log(req.body);
        if (req.body){
            console.log("form has data");
            res.render('form.ejs',{ rabbit : req.body});
        }
        else {
            console.log("empty form");
            res.render('form');
        }
    })



}
