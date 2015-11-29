/**
 * Created by tobias on 26.11.2015.
 */
var express = require('express');
var router = express.Router();
var DonatedResult = require('../util/db/schemas/donatedResultSchema');

router.post('/', function(req,res){

    if(req.body.data){
        // do it asynchronously and send the response right away
        // the user experience should not suffer only because
        // of the database operations.
        process.nextTick(function(){
            var databaseEntry;
            var schemaParams = {};

            schemaParams.userAgent = req.headers['user-agent'];
            schemaParams.date = new Date();
            schemaParams.strength = req.body.data;

            databaseEntry = new DonatedResult(schemaParams);
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
