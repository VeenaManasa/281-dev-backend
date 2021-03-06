/**
 * Created by avinash on 4/30/17.
 */

var mongoUrl = 'mongodb://avinash:avinash@ds155727.mlab.com:55727/user';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = {

    deleteProject: function(req, res) {

        MongoClient.connect(mongoUrl, function (err, db) {

            if (err) {
                console.log('into error of mongo');
                res.status(400).json({
                    message: 'Connection to database failed !!',
                    error: err
                });
            }

            insertDocument(db, req.body, function () {
                console.log('into insert doc');
                res.status(200).json({
                    message: 'Project deleted from DB!!'
                });
            });

        });

        var insertDocument = function (db, data, callback) {
            console.log('into insert doc function');
            console.log(data);
            var string = JSON.stringify(data);
            var objectValue = JSON.parse(string);
            var id = objectValue['id'];
            console.log(id);
            db.collection('project', function(err, collection) {
                if(err){
                    res.status(500).json({
                        message: 'Failed to delete project in DB!!'
                    });
                } else {
                    collection.deleteOne({id: id});
                }
                callback();
            });
        }
    }
};