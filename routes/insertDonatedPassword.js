/**
 * Created by tobias on 26.11.2015.
 */
var express = require('express');
var router = express.Router();
var Research = require('../util/db/schemas/donatedPasswordsSchema');

router.post('/', function(req,res){

    if(req.body.data){
        process.nextTick(function(){
            var data = req.body.data;
            var databaseEntry;

            data.userAgent = req.headers['user-agent'];
            data.date = new Date();

            databaseEntry = new Research(data);
            databaseEntry.save(function(err,doc){
                if(err){
                    console.warn('Could not store research Data');
                }

            })
        });
        res.json({
            status : 200,
            message: 'OK'
        })
    }
    else{
        res.status(1000).json({
            status : 1000,
            message: 'No data provided'
        })
    }

});

module.exports = router;
