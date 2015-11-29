/**
 * this is a wrapper around the zxcvbn2 password strength result function.
 * It's purpose is to strip all plain text passwords and tokens thereof, allowing
 * more ethically correct logs of password strength statistics.
 * @param result zxcvbn result, version 4.2.0 (29.11.2015)
 * @returns {*}
 */
function anonymizeResult(result){

    var anonymous_match_sequence = [];
    var password = result.password;
    var uppercaseMatches = password.match(/[A-Z]/g);
    var lowercaseMatches = password.match(/[a-z]/g);
    var digits = password.match(/[0-9]/g);
    var specialChars = password.match(/[@'#\.\$;%\^&\+=!"\(\)\*,-\/:<>\?§ ]/g);


    result.length = password.length;
    // we don't want to save the password in plain text.
    delete result.password;
    delete result.feedback;

    if(result.sequence){
        result.sequence.forEach(function(matchObj){
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

    result.sequence = anonymous_match_sequence;
    result.lowercase = lowercaseMatches ? lowercaseMatches.length : 0;
    result.uppercase = uppercaseMatches ? uppercaseMatches.length : 0;
    result.digits = digits ? digits.length : 0;
    result.specialChars = specialChars ? specialChars.length : 0;
    return result;
}