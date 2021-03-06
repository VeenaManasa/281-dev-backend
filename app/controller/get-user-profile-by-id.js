/**
 * Created by avinash on 4/30/17.
 */

var mongoUrl = 'mongodb://avinash:avinash@ds155727.mlab.com:55727/user';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
module.exports = {

    getUserProfileByID: function (req, res) {
        console.log("in get user by id");
        MongoClient.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            getUserbyId(req.body, db, function () {
                db.close();
            });
        });

        var getUserbyId = function (body, db, callback) {
            var usersCollection = db.collection('user_profile');
            var string = JSON.stringify(body);
            var objectValue = JSON.parse(string);
            var id = objectValue['id'];
            usersCollection.findOne({id: id}, function (err, doc) {
                res.contentType('application/json');
                res.write(JSON.stringify(doc));
                res.end();
                callback();
            });
        }
    }
};