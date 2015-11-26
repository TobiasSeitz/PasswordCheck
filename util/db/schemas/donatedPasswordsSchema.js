/**
 * Created by Tobi on 31/05/15.
 */
var mongoose = require('mongoose');

var donatedPasswordsSchema = mongoose.Schema({
    participantID : String,
    userAgent : String, // server side
    date : Date, // server side
    strength : { // strength estimate returned from zxcvbn2,
        calc_time : Number,
        crack_time : Number,
        crack_time_display : String,
        digits : Number, // # of digits
        entropy : Number,
        length : Number, // length of the password.
        lowercase : Number, // # of lowercase letters
        match_sequence : {
            type : Array, "default" : []
        },
        score : Number,
        specialChars : Number, // # of special chars
        uppercase : Number // # of uppercase letters
    }
},{collection : 'donatedPasswords'});

module.exports = mongoose.model('DonatedPasswords', donatedPasswordsSchema);
