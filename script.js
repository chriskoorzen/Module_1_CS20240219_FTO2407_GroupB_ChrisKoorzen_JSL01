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