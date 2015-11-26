/**
 * Created by tobias on 29.05.2015.
 */
var getPasswordStrengthEstimate = require('zxcvbn2');


/**
 * this is a wrapper around the zxcvbn2 password strength estimate function.
 * It's purpose is to strip all plain text passwords and tokens thereof, allowing
 * more ethically correct logs of password strength statistics.
 * @param password the password to check
 * @param user_info additional words to put into the
 * @returns {*}
 */
var estimateStrengthAnonymously = function(password,user_info){

    var estimate = getPasswordStrengthEstimate(password, user_info);
    var anonymous_match_sequence = [];
    var uppercaseMatches = password.match(/[A-Z]/g);
    var lowercaseMatches = password.match(/[a-z]/g);
    var digits = password.match(/[0-9]/g);
    var specialChars = password.match(/[@'#\.\$;%\^&\+=!"\(\)\*,-\/:<>\?§]/g);



    // we don't want to save the password in plain text.
    delete estimate.password;

    if(estimate.match_sequence){
        estimate.match_sequence.forEach(function(matchObj){
            delete matchObj.token;
            delete matchObj.matched_word;
            delete matchObj.sub_display;
            delete matchObj.graph;

            // we can't store stuff in the mongodb that has a dollar in it!
            // so we replace that key with "char_$"
            if(matchObj.sub && matchObj.sub['$']){
                matchObj.sub['char_$'] = matchObj.sub['$'];
                delete matchObj.sub['$'];
            }
            anonymous_match_sequence.push(matchObj);
        });
    }
    estimate.match_sequence = anonymous_match_sequence;

    estimate.lowercase = lowercaseMatches ? lowercaseMatches.length : 0;
    estimate.uppercase = uppercaseMatches ? uppercaseMatches.length : 0;
    estimate.digits = digits ? digits.length : 0;
    estimate.specialChars = specialChars ? specialChars.length : 0;
    return estimate;
};

module.exports = estimateStrengthAnonymously;