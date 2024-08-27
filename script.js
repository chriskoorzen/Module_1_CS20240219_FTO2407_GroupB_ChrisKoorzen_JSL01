function validateSyntax() {
    let input = document.getElementById('petInput').value.trim();   // Get input and clear whitespace
    
    // Check if input starts with 'pet_' and followed by alphanumeric characters
    // Regex:
    //              ^   =  match only from start of input or string
    //           pet_   =  match the characters 'pet_' exactly and in that order
    //          \d{4}   =  match 4 digits exactly
    //      [^\s\d\W_]  =  match anything except whitespace (\s), digits (\d), non-word characters (\W) and underscore
    //                     (the alphabet only by exclusion)
    //                     equivalent to [a-zA-Z]
    //                     it will not match any input following an "illegal" character
    //              +   =  match preceding specifier atleast once
    //                     is "greedy", which means it will continue to match as long as specifier is true
    //                     equivalent to {1, }
    
    const petRegex = /^pet_\d{4}[^\s\d\W_]+/;

    let match = input.match(petRegex); // will return null if no match is found
    let status, message = "";
    
    if ( !(match===null) ){
        status = "success";
        message = "Your pet's name is: " + match[0].slice(8);


        // Do advanced validation eg.
        // Birth Year cannot be greater than current year
        let date = new Date();
        if (Number(match[0].slice(4, 8)) > date.getFullYear()){
            status = "fail";
            message = "Birth Year cannot be greater than current year";
        }
        // Pet name must be minimum length
        if (match[0].slice(8).length < 3){
            status = "fail";
            message = "Pet name must be at least 3 characters";
        }
        // Pet name cannot be obscene or other words restricted by law
        // etc.

    } else {
        status = "fail";
    }

    setStatus(status, message);
}

function alternateValidation() {
    let input = document.getElementById('petInput').value.trim();   // Get input and clear whitespace
    let status, message = "";


    // Step 1: String is atleast the required minimum length (4 "pet_" + 4 digits + min 1 letter) and starts with "pet_"

    if (input.length > 8 && input.startsWith("pet_")){

        // Step 2: Check if next 4 characters are digits
        //      We have to check each individual character because while
        //      something like parseInt("a240") will return NaN,
        //      something like parseInt("2a14") will return 2, a valid integer.

        const birthYearDigitArray = input.slice(4, 8).split('');

        if (birthYearDigitArray.every( char => { return Number.isInteger(Number.parseInt(char)); } )){
            
            // Step 3: Check if the pet name includes any funny characters (non-alphabet).

            //   This is a MASSIVE search space (think foreign character sets like Japanese, Chinese, 
            //   Indonesian, Hebrew, Arabic, Cyrillic etc. and includes things like emojis) because 
            //   JavaScript uses the UTF-16 character set natively (65536 possible characters).
            //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters

            //   However, we can constrict this search space dramatically by confining our search to the
            //   English alphabet only (sufficient for this challenge).
            //   Anything that doesn't match fails the test.

            //   Drawing inspiration from the ASCII character set, which is backwards compatible with UTF 
            //   and includes the entire English alphabet, we only have to check for two (compound) conditions:
            //   Does the tested character codepoint live between codepoints 65-90 for uppercase letters,
            //   or 97-122 for lowercase letters (inclusive)?
            //   https://www.ascii-code.com/
            
            const petNameCharArray = input.slice(8).split('');

            if (petNameCharArray.every( char => { let cp=char.codePointAt(0); return (cp > 64 && cp < 91) || (cp > 96 && cp < 123) } )){
                
                // Passed all elementary tests
                status = "success";
                message = "Your pet's name is: " + petNameCharArray.join("");

            } else {
                status = "fail";
            }

        } else {
            status = "fail";
        }

    } else {
        status = "fail";
    }


    setStatus(status, message);
}

async function setStatus(status, message){
    // Set message
    const statusDisplay = document.getElementById('result');
    const messageDisplay = document.getElementById('message');
    let statusMessage;

    if (status === "success"){
        statusMessage = "Valid Syntax 🟢";
    } else if (status === "fail"){
        statusMessage = "Invalid Syntax 🔴";
    }

    statusDisplay.innerText = statusMessage;
    messageDisplay.innerText = message;

    // Wait 3 seconds then clear message
    await sleep(3000);
    statusDisplay.innerText = "";
    messageDisplay.innerText = "";
}


// ----- Utility functions -----
function sleep(ms) {
    return new Promise(
        doesnt_matter => {
            return setTimeout(doesnt_matter, ms)
        }
    );
}  