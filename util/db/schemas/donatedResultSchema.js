/**
 * Created by Tobi on 31/05/15.
 */
var mongoose = require('mongoose');

var donatedResultSchema = mongoose.Schema({
    userAgent : String, // server side
    date : Date, // server side

    strength : { // strength estimate returned from zxcvbn2,
        score : Number,
        guesses : Number,
        guesses_log10 : Number,
        crack_time_seconds : {
            online_throttling_100_per_hour : Number,
            online_no_throttling_10_per_second : Number,
            offline_slow_hashing_1e4_per_second : Number,
            offline_fast_hashing_1e10_per_second : Number
        },
        crack_time_display : {
            online_throttling_100_per_hour : String,
            online_no_throttling_10_per_second : String,
            offline_slow_hashing_1e4_per_second : String,
            offline_fast_hashing_1e10_per_second : String
        },
        sequence : Array,
        // this is actually not needed. for the sake of completeness, we keep the comment to quickly enable it.
        /*feedback : {
            warning : String,
            suggestions : Array
        },*/
        calc_time : Number,
        // meta info (own calculations)
        length : Number, // length of the password.
        digits : Number, // # of digits
        lowercase : Number, // # of lowercase letters
        specialChars : Number, // # of special chars
        uppercase : Number // # of uppercase letters
    }
},{collection : 'donatedResults'});

module.exports = mongoose.model('DonatedResult', donatedResultSchema);
