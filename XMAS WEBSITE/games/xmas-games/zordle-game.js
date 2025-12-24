document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("zordle-grid-container");
    const keyboardContainer = document.getElementById("keyboard-container");
    const clueBox = document.getElementById("clue-box");
    const continueButton = document.getElementById("continue-button");
    const clueImage = document.getElementById("clue-image");


    const WORD_LENGTH = 5;
    const NUM_GUESSES = 6;
    let currentRow = 0;
    let currentTile = 0;
    let currentGuess = "";
    let isGameOver = false;

    // --- !!! CHANGE THIS TO YOUR SECRET WORD !!! ---
    const word_bank = ["BEACH", "MINTS", "VASES", "OTTER", "BELLY",
         "TEXTS", "SLEEP", "TAFFY", "GUMMY", "CHEESE", "BUNNY", "GAMES",
         "CRABS", "SNOWY", "ALIEN", "DATES", "GRAPE", "SWEET", "CARDS",
         "SMILE", "DRESS", "TEETH", "METRO", "LIGHT", "KITES", "PRIDE",
         "SHIPS", "CHAIN", "CAKES", "HEART", "ROBOT", "DRINKS",
         "MUSIC", "SONGS", "COMFY"];

    const picture_bank =["../../assets/images/23D2DDA3-4CCF-417C-BF36-3E4832E1BDD7_1_105_c.jpeg", 
        '../../assets/images/839C57AF-55C8-4C73-AFEF-295700AF1DE5_1_105_c.jpeg',
        '../../assets/images/317CC145-0952-4CEF-93F6-9DEC6C6170EB_4_5005_c.jpeg',
        '../../assets/images/C06148C6-BF98-4988-AEF0-6CB51B84F4E5_1_105_c.jpeg',
        '../../assets/images/10F19B24-2003-45DC-9DF8-774AE22F922B_1_105_c.jpeg',
        '../../assets/images/808DC9D7-20C1-44E1-A847-5CA9554A7EC4_1_105_c.jpeg',
        '../../assets/images/E69A6805-5374-448A-BCD0-005D81137419_1_105_c.jpeg',
        '../../assets/images/7C4D8178-E2AC-43CD-BC3B-901B8DD7E0B7_1_105_c.jpeg',
        '../../assets/images/E42BE0A6-1F29-49C0-86E7-6C1635B270A0_1_105_c.jpeg',
        '../../assets/images/CFE056BF-4854-44AE-9838-567DD4B46C13_4_5005_c.jpeg',
        '../../assets/images/685524FB-FEEF-47DC-9640-99FB7EB47E18_1_105_c.jpeg',
        '../../assets/images/3C0E61A1-655C-4880-A2A1-4224035D2C3C_1_105_c.jpeg',
        '../../assets/images/B3306287-BC58-40DE-B9B1-29F58AF35A9B_1_105_c.jpeg',
        '../../assets/images/68DA169C-16BE-4BF4-9E9C-15DEFDD8851F_1_102_o.jpeg',
        '../../assets/images/DDD75AE4-1F62-4B5E-A1D6-2405DBF5F4CC_1_105_c.jpeg',
        '../../assets/images/EEEC707B-54BB-4015-8F85-20265B380B52_1_105_c.jpeg',
        '../../assets/images/A0B8E956-3DCF-49EA-9806-15DC71635719_1_105_c.jpeg',
        '../../assets/images/A2B2C970-8766-43A7-9488-598ED57A947C_1_105_c.jpeg',
        '../../assets/images/6726F2D0-4EA4-45F5-B7A0-FFB950F2A20E_1_105_c.jpeg',
        '../../assets/images/4126B5DD-3203-4113-A75D-A85E2F6E710D_1_105_c.jpeg',
        '../../assets/images/C11222E5-BB39-4ADD-9660-5A64ACCF81E8_1_105_c.jpeg',
        '../../assets/images/FFF1D67B-67A3-4E31-BEE0-5B05B4ED6D6E_4_5005_c.jpeg',
        '../../assets/images/27F562F5-3165-4768-B783-9F8DDC595EA9_4_5005_c.jpeg',
        '../../assets/images/37FA673C-EC69-41FF-A484-1E909AA8C10F_1_102_a.jpeg',
        '../../assets/images/6EAE8D25-3F1C-4919-A5C0-8671ABF04C66_4_5005_c.jpeg',
        '../../assets/images/00CA905A-40F1-4484-9BD1-D770D391CF04_1_102_a.jpeg',
        '../../assets/images/49902155-05FF-4874-B1F5-14850CDDAAE0_1_105_c.jpeg',
        '../../assets/images/C7CF3596-6EFD-482D-9E3A-0545795BE8A1_4_5005_c.jpeg',
        '../../assets/images/564AA8D7-11AD-4EF3-8436-BB1FAC243573_1_105_c.jpeg',
        '../../assets/images/EAB8FF0C-2F8F-4F97-8C43-49E62D0A2E7A_4_5005_c.jpeg',
        '../../assets/images/43B905EB-B347-4FA4-918E-81BBC5DD49EA_4_5005_c.jpeg',
        '../../assets/images/924ECC06-84A5-43E1-B947-4E76F95DBC09_1_105_c.jpeg',
        '../../assets/images/A3D11B05-9473-44DC-8BDE-080040458B19_1_105_c.jpeg',
        '../../assets/images/F614671E-A9E4-47BB-B571-C161ED6455AA_1_105_c.jpeg',
        '../../assets/images/51497F78-0642-4E38-9EF7-EB736AF8FAD2_1_105_c.jpeg'];

    const SECRET_IDX = Math.floor(Math.random() * word_bank.length);
    const SECRET_WORD = word_bank[SECRET_IDX];
    const SECRET_PICTURE = picture_bank[SECRET_IDX]

    // --- KEYBOARD LAYOUT ---
    const KEYBOARD_ROWS = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
    ];

    // --- INITIALIZATION ---
    createGrid();
    createKeyboard();
    initializeInputListeners();

    // --- GRID CREATION ---
    function createGrid() {
        for (let i = 0; i < NUM_GUESSES; i++) {
            let row = document.createElement("div");
            row.className = "zordle-row";
            row.id = `row-${i}`;
            for (let j = 0; j < WORD_LENGTH; j++) {
                let tile = document.createElement("div");
                tile.className = "zordle-tile";
                tile.id = `row-${i}-tile-${j}`;
                tile.setAttribute('data-state', 'empty'); 
                row.appendChild(tile);
            }
            grid.appendChild(row);
        }
    }

    // --- KEYBOARD CREATION ---
    function createKeyboard() {
        KEYBOARD_ROWS.forEach(rowKeys => {
            let rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";
            rowKeys.forEach(key => {
                let keyButton = document.createElement("button");
                keyButton.textContent = key;
                keyButton.className = "keyboard-key";
                keyButton.setAttribute("data-key", key);
                if (key === "ENTER" || key === "DEL") {
                    keyButton.classList.add("big-key");
                }
                rowDiv.appendChild(keyButton);
            });
            keyboardContainer.appendChild(rowDiv);
        });
    }

    // --- INPUT HANDLING ---
    function initializeInputListeners() {
        document.addEventListener("keydown", (e) => {
            if (isGameOver) return;
            let key = e.key.toUpperCase();
            if (key === "ENTER") handleInput("ENTER");
            else if (key === "BACKSPACE") handleInput("DEL");
            else if (/^[A-Z]$/.test(key)) handleInput(key);
        });

        keyboardContainer.addEventListener("click", (e) => {
            if (isGameOver) return;
            const target = e.target.closest(".keyboard-key");
            if (target) {
                handleInput(target.getAttribute("data-key"));
                target.blur();
            }
        });
    }

    function handleInput(key) {
        if (key === "ENTER") {
            submitGuess();
        } else if (key === "DEL") {
            deleteLetter();
        } else {
            addLetter(key);
        }
    }

    // --- GAME LOGIC ---
    function addLetter(letter) {
        if (currentTile < WORD_LENGTH && currentRow < NUM_GUESSES) {
            const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
            tile.textContent = letter;
            tile.setAttribute('data-state', 'filled');
            currentGuess += letter;
            currentTile++;
        }
    }

    function deleteLetter() {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
            tile.textContent = "";
            tile.setAttribute('data-state', 'empty');
            currentGuess = currentGuess.slice(0, -1);
        }
    }

    function submitGuess() {
        if (currentGuess.length !== WORD_LENGTH) {
            shakeRow();
            return;
        }

        const results = checkGuess(currentGuess, SECRET_WORD);
        revealResults(results);
        updateKeyboard(results, currentGuess);

        if (currentGuess === SECRET_WORD) {
            winGame();
        } else {
            currentRow++;
            currentTile = 0;
            currentGuess = "";
            if (currentRow >= NUM_GUESSES) {
                loseGame();
            }
        }
    }

    function checkGuess(guess, secret) {
        let results = Array(WORD_LENGTH).fill("absent");
        let secretArr = secret.split("");
        let guessArr = guess.split("");

        // Green pass
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArr[i] === secretArr[i]) {
                results[i] = "correct";
                secretArr[i] = null;
                guessArr[i] = null;
            }
        }

        // Yellow pass
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArr[i] && secretArr.includes(guessArr[i])) {
                results[i] = "present";
                secretArr[secretArr.indexOf(guessArr[i])] = null;
            }
        }
        return results;
    }

    // --- UI UPDATES ---
    function revealResults(results) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
            // This line triggers the CSS colors!
            setTimeout(() => {
                tile.setAttribute('data-state', results[i]);
            }, i * 100); 
        }
    }

    function updateKeyboard(results, guess) {
        for (let i = 0; i < WORD_LENGTH; i++) {
            const keyTile = document.querySelector(`.keyboard-key[data-key='${guess[i]}']`);
            const currentState = keyTile.getAttribute("data-state");
            const newState = results[i];

            if (newState === "correct") {
                keyTile.setAttribute("data-state", "correct");
            } else if (newState === "present" && currentState !== "correct") {
                keyTile.setAttribute("data-state", "present");
            } else if (newState === "absent" && currentState !== "correct" && currentState !== "present") {
                keyTile.setAttribute("data-state", "absent");
            }
        }
    }

    function shakeRow() {
        const row = document.getElementById(`row-${currentRow}`);
        row.classList.add("shake-row");
        setTimeout(() => row.classList.remove("shake-row"), 500);
    }

    // --- END GAME STATES ---
    function winGame() {
        isGameOver = true;

        // Debugging logs
        console.log("clueImage =", clueImage);
        console.log("SECRET_PICTURE =", SECRET_PICTURE);

        // Check if the image fails to load
        clueImage.onerror = () => console.log("IMAGE FAILED TO LOAD:", clueImage.src);

        setTimeout(() => {
            clueBox.classList.remove("hidden");
            continueButton.classList.remove("hidden");
            clueImage.classList.remove("hidden");

            // Assign the image
            clueImage.src = SECRET_PICTURE;

            console.log("image src set to:", clueImage.src);

            clueBox.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
}


    function loseGame() {
        isGameOver = true;
        setTimeout(() => {
            alert(`Nice try! The word was: ${SECRET_WORD}`);
            // Reveal clue anyway?
             clueBox.classList.remove("hidden");
             continueButton.classList.remove("hidden");
        }, 1500);
        // show secret picture and description
    }
});