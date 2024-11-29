// Define elements
let inputbox = document.querySelector('.input-box input');  // input box
let option = document.querySelectorAll('.option input');   // option buttons
let lengthslider = document.querySelector('.pass-length input');    // password length slider
let passIndicator = document.querySelector('.pass-indicator');  // password strength indicator
let generateBtn = document.querySelector('.generate-btn');   // generate button


// Password character use in password generation
let characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbol: '!$%&|[](){}:;.,*+-#@<>~'
};

// Password generation function
function generatePass() {
    let staticpass = "";
    let randompass = "";
    let excludeDuplicate = false;
    let passlength = lengthslider.value;

    option.forEach(opt => {
        if (opt.checked) {
            if (opt.id !== 'exc-duplicate' && opt.id !== 'spaces') {
                staticpass += characters[opt.id];
            } else if (opt.id === "spaces") {
                staticpass += ` `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passlength; i++) {
        let randomchar = staticpass[Math.floor(Math.random() * staticpass.length)];

        if (excludeDuplicate) {
            !randompass.includes(randomchar) || randomchar === " " ? randompass += randomchar : i--;
        } else {
            randompass += randomchar;
        }
    }

    inputbox.value = randompass;
}

// Password strength indicator update
function UpdatePasswordIndicator() {
    passIndicator.id = lengthslider.value <= 8 ? 'weak' : lengthslider.value <= 16 ? 'medium' : 'strong';
}

// Update slider value
function Updateslider() {
    document.querySelector('.pass-length span').innerText = lengthslider.value;
    generatePass();
    UpdatePasswordIndicator();
}
Updateslider(); // Initial call

// Copy Password Functionality
document.addEventListener("DOMContentLoaded", function () {
    const copybtn = document.getElementById("copybutton");

    function copyPassword() {
        if (inputbox && navigator.clipboard) {
            navigator.clipboard.writeText(inputbox.value)
                .then(() => {
                    copybtn.innerText = "✔";
                    copybtn.style.color = "#4285f4";

                    setTimeout(() => {
                        copybtn.innerText = "Copied";
                        copybtn.style.color = "#707070";
                    }, 1500);
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        }
    }

    if (copybtn) copybtn.addEventListener("click", copyPassword);
    if (lengthslider) lengthslider.addEventListener("input", Updateslider);
    if (generateBtn) generateBtn.addEventListener("click", generatePass);
});
