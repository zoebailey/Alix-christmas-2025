document.addEventListener("DOMContentLoaded", () => {

    // 1. DEFINE THE VARIABLE HERE SO IT CAN BE RE-ASSIGNED
    let GAME_DATA = null; 

    // [y, x] format
    const LEVELS = [
        {
            id: "dc_trip",
            themeClue: "Capital City",
            spangram: "WASHINGTONDC",
            themeWords: ["METRO", "MALL", "DISTRICT", "COLUMBIA", "SMITHSONIAN"],
            gridLetters: [
                ['M', 'E', 'A', 'L', 'L', 'W'],
                ['R', 'T', 'M', 'S', 'A', 'C'],
                ['O', 'I', 'T', 'H', 'U', 'O'],
                ['T', 'R', 'C', 'I', 'M', 'L'],
                ['S', 'T', 'G', 'N', 'B', 'N'],
                ['I', 'O', 'A', 'I', 'I', 'A'],
                ['D', 'N', 'S', 'O', 'N', 'S'],
                ['C', 'D', 'H', 'T', 'I', 'M']
            ],
            wordPaths: {
                "METRO":   [[0,0], [0,1], [1,1], [1,0],[2,0]],
                "MALL":    [[1,2],[0,2],[0,3],[0,4]],
                "DISTRICT": [[6,0],[5,0],[4,0],[3,0],[3,1],[2,1],[3,2],[2,2]],
                "WASHINGTONDC": [[0,5],[1,4],[1,3],[2,3],[3,3],[4,3],[4,2],[4,1],[5,1],[6,1],[7,1],[7,0]],
                "COLUMBIA": [[1,5],[2,5],[3,5],[2,4],[3,4],[4,4],[5,3],[5,2]],
                "SMITHSONIAN": [[6,5],[7,5],[7,4],[7,3],[7,2],[6,2],[6,3],[6,4],[5,4],[5,5],[4,5]],
            }
        },
        {
            id: "stuffed_animals",
            themeClue: "Cuddly Guys",
            spangram: "STUFFEDANIMAL",
            themeWords: ["ROGER", "BABYOTTER", "FUGGLE", "DIVA", "EARL", "STITCH"],
            gridLetters: [
                ['S', 'R', 'O', 'B', 'A', 'B'],
                ['T', 'E', 'G', 'T', 'O', 'Y'],
                ['U', 'R', 'T', 'F', 'G', 'L'],
                ['F', 'E', 'R', 'U', 'G', 'E'],
                ['D', 'F', 'E', 'D', 'R', 'N'],
                ['E', 'I', 'V', 'A', 'A', 'I'],
                ['A', 'S', 'T', 'C', 'H', 'M'],
                ['R', 'L', 'I', 'T', 'L', 'A']
            ],
            wordPaths: {
                "STUFFEDANIMAL": [[0,0], [1,0], [2,0], [3,0], [4,1], [4,2], [4,3], [5,4], [4,5], [5,5], [5,6], [5,7]], 
                "ROGER": [[0,1], [0,2], [1,2], [1,1], [2,1]],
                "BABYOTTER": [[0,3], [0,4], [0,5], [1,5], [1,4], [1,3], [2,2], [3,1], [3,2]],
                "FUGGLER": [[2,3], [3,3], [3,4], [2,4], [2,5], [3,5], [4,4]], 
                "DIVA": [[4,0], [5,1], [5,2], [5,3]],
                "EARL": [[5,0], [6,0], [7,0], [7,1]],
                "STITCH": [[6,1], [6,2], [7,2], [7,3], [6,3], [6,4]]
            }
    },
    {
        id: "hair_styles",
        themeClue: "Think With Your Head",
        spangram: "HAIRSTYLES",
        themeWords: ["PIGTAILS", "DOWN", "SLICKBACK", "BRAIDS", "MOHAWK", "CURLS"],
        gridLetters: [
            ['P', 'I', 'G', 'D', 'O', 'H'],
            ['I', 'A', 'T', 'N', 'W', 'A'],
            ['L', 'T', 'S', 'R', 'I', 'S'],
            ['S', 'Y', 'C', 'K', 'C', 'L'],
            ['S', 'L', 'A', 'B', 'K', 'I'],
            ['C', 'E', 'M', 'O', 'D', 'I'],
            ['U', 'S', 'A', 'H', 'S', 'A'],
            ['R', 'L', 'W', 'K', 'R', 'B']
        ],
        wordPaths: {
            "HAIRSTYLES": [[0,5], [1,5], [2,4], [2,3], [2,2], [2,1], [3,1], [4,1], [5,1], [4,0]],
            "PIGTAILS": [[0,0], [0,1], [0,2], [1,2], [1,1], [1,0], [2,0], [3,0]],
            "DOWN": [[0,3], [0,4], [1,4], [1,3]],
            "SLICKBACK": [[2,5], [3,5], [4,5], [3,4], [4,4], [4,3], [4,2], [3,2], [3,3]],
            "BRAIDS": [[7,5], [7,4], [6,5], [5,5], [5,4], [6,4]],
            "MOHAWK": [[5,2], [5,3], [6,3], [6,2], [7,2], [7,3]],
            "CURLS": [[5,0], [6,0], [7,0], [7,1], [6,1]]
        }
    },
    {
        id: "shopping_stores",
        themeClue: "Retail Therapy",
        spangram: "SHOPTILYOUDROP",
        themeWords: ["OLDNAVY", "MARSHALLS", "TJMAXX", "TARGET", "SALLYS"],
        gridLetters: [
            ['O', 'R', 'O', 'N', 'A', 'M'],
            ['P', 'D', 'L', 'D', 'V', 'A'],
            ['T', 'U', 'T', 'Y', 'X', 'R'],
            ['A', 'O', 'J', 'X', 'S', 'A'],
            ['R', 'Y', 'M', 'A', 'H', 'L'],
            ['G', 'L', 'I', 'T', 'P', 'L'],
            ['E', 'T', 'S', 'A', 'O', 'S'],
            ['S', 'Y', 'L', 'L', 'H', 'S']
        ],
        wordPaths: {
            "SHOPTILYOUDROP": [[7,5],[7,4],[6,4],[5,4],[5,3],[5,2],[5,1],[4,1],[3,1],[2,1],[1,1],[0,1],[0,0],[1,0]],
            "OLDNAVY": [[0,2], [1,2], [1,3], [0,3], [0,4], [1,4], [2,3]],
            "MARSHALLS": [[0,5], [1,5], [2,5], [3,4], [4,4], [3,5], [4,5], [5,5], [6,5]],
            "TJMAXX": [[2,2], [3,2], [4,2], [4,3], [3,3], [2,4]],
            "TARGET": [[2,0], [3,0], [4,0], [5,0], [6,0], [6,1]],
            "SALLYS": [[6,2], [6,3], [7,3], [7,2], [7,1], [7,0]]
        }
    },

    // V2
    {
            id: "fruit_basket",
            themeClue: "Picking Healthy Snacks",
            spangram: "FRUITBASKET",
            themeWords: ["BLUEBERRY", "KIWI", "HONEYDEW", "APPLE", "PEACH", "ORANGE"],
            gridLetters: [
                ['F', 'R', 'A', 'O', 'R', 'A'],
                ['B', 'U', 'P', 'P', 'E', 'N'],
                ['L', 'I', 'P', 'A', 'C', 'G'],
                ['U', 'T', 'L', 'E', 'H', 'E'],
                ['E', 'B', 'A', 'S', 'K', 'E'],
                ['B', 'E', 'R', 'R', 'Y', 'T'],
                ['K', 'I', 'E', 'N', 'O', 'H'],
                ['I', 'W', 'Y', 'D', 'E', 'W']
            ],
            wordPaths: {
                "BLUEBERRY":   [[1,0], [2,0], [3,0], [4,0], [5,0], [5,1], [5,2], [5,3], [5,4]],
                "KIWI":    [[6,0], [7,0], [7,1], [6,1]],
                "HONEYDEW": [[6,5], [6,4], [6,3], [6,2], [7,2], [7,3], [7,4], [7,5]],
                "APPLE": [[0,2], [1,2], [2,2], [3,2], [3,3]],
                "PEACH": [[1,3], [1,4], [2,3], [2,4], [3,4]],
                "ORANGE": [[0,3], [0,4], [0,5], [1,5], [2,5], [3,5]],
                "FRUITBASKET": [[0,0], [0,1], [1,1], [2,1], [3,1], [4,1], [4,2], [4,3], [4,4], [4,5], [5,5]]
            }
        },
        {
            id: "ru_paul",
            themeClue: "Lip Sync For Your Life",
            spangram: "RUPAULQUEENS",
            themeWords: ["SASHA", "JINKX", "TRIXIE", "KATYA", "EDWARDS", "TATIANNA"],
            gridLetters: [
                ['S', 'A', 'J', 'I', 'N', 'R'],
                ['S', 'H', 'A', 'X', 'K', 'U'],
                ['U', 'Q', 'L', 'U', 'A', 'P'],
                ['E', 'E', 'T', 'I', 'E', 'K'],
                ['E', 'D', 'R', 'X', 'A', 'A'],
                ['N', 'W', 'I', 'T', 'Y', 'T'],
                ['S', 'A', 'A', 'T', 'A', 'N'],
                ['R', 'D', 'S', 'I', 'A', 'N']
            ],
            wordPaths: {
                "SASHA":   [[0,0], [0,1], [1,0], [1,1], [1,2]],
                "JINKX":    [[0,2], [0,3], [0,4], [1,4], [1,3]],
                "TRIXIE": [[3,2], [4,2], [5,2], [4,3], [3,3], [3,4]],
                "KATYA": [[3,5], [4,5], [5,5], [5,4], [4,4]],
                "EDWARDS": [[3,1], [4,1], [5,1], [6,1], [7,0], [7,1], [7,2]],
                "TATIANNA": [[5,3], [6,2], [6,3], [7,3], [7,4], [7,5], [6,5], [6,4]],
                "RUPAULQUEENS": [[0,5], [1,5], [2,5], [2,4], [2,3], [2,2], [2,1], [2,0], [3,0], [4,0], [5,0], [6,0]]
            }
        },
        {
            id: "medicine_cabinet",
            themeClue: "Pharmacy Stop",
            spangram: "TAKEYOURPILLS",
            themeWords: ["LAMOTRAIGINE", "ALLERGY", "CONCERTA", "BUPROPION"],
            gridLetters: [
                ['L', 'M', 'O', 'S', 'L', 'N'],
                ['A', 'R', 'T', 'C', 'L', 'O'],
                ['I', 'A', 'L', 'O', 'I', 'I'],
                ['G', 'Y', 'L', 'N', 'P', 'P'],
                ['I', 'G', 'E', 'C', 'R', 'O'],
                ['N', 'R', 'R', 'E', 'U', 'R'],
                ['E', 'A', 'T', 'Y', 'O', 'P'],
                ['T', 'A', 'K', 'E', 'B', 'U']
            ],
            wordPaths: {
                "LAMOTRAIGINE":   [[0,0], [1,0], [0,1], [0,2], [1,2], [1,1], [2,0], [3,0], [4,0], [5,0], [6,0]],
                "ALLERGY":    [[2,1], [2,2], [3,2], [4,2], [5,1], [4,1], [3,1]],
                "CONCERTA": [[1,3], [2,3], [3,3], [4,3], [5,3], [5,2], [6,2], [6,1]],
                "BUPROPION": [[7,4], [7,5], [6,5], [5,5], [4,5], [3,5], [2,5], [1,5], [0,5]],
                "TAKEYOURPILLS": [[7,0], [7,1], [7,2], [7,3], [6,3], [6,4], [5,4], [3,4], [2,4], [1,4], [0,4], [0,3]],
            }
        },
        {
            id: "otter_mania",
            themeClue: "Cute Rafts",
            spangram: "OTTERMANIA",
            themeWords: ["GIANT", "SMALLLCLAW", "NORTHAMERICAN", "RIVER", "MARINE"],
            gridLetters: [
                ['O', 'G', 'S', 'M', 'A', 'L'],
                ['T', 'I', 'T', 'W', 'C', 'L'],
                ['T', 'A', 'N', 'A', 'L', 'A'],
                ['E', 'R', 'M', 'A', 'N', 'I'],
                ['N', 'E', 'R', 'R', 'I', 'V'],
                ['O', 'M', 'I', 'M', 'R', 'E'],
                ['R', 'A', 'C', 'A', 'R', 'I'],
                ['T', 'H', 'A', 'N', 'E', 'N']
            ],
            wordPaths: {
                "GIANT":   [[0,1], [1,1], [2,1], [2,2], [1,2]],
                "SMALLCLAW":    [[0,2], [0,3], [0,4], [0,5], [1,5], [1,4], [2,4], [2,3], [1,3]],
                "NORTHAMERICAN": [[4,0], [5,0], [6,0], [7,0], [7,1], [6,1], [5,1], [4,1], [4,2], [5,2], [6,2], [7,2], [7,3]],
                "RIVER": [[4,3], [4,4], [4,5], [5,5], [5,4]],
                "MARINE": [[5,3], [6,3], [6,4], [6,5], [7,5], [7,4]],
                "OTTERMANIA": [[0,0], [1,0], [2,0], [3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [2,5]],
            }
        },
        {
            id: "small_pets",
            themeClue: "Friends From Home",
            spangram: "SMALLFRIENDS",
            themeWords: ["MARGOT", "AXEL", "LILO", "BEBE", "STITCH", "TRAVELER", "FERN"],
            gridLetters: [
                ['M', 'A', 'L', 'I', 'L', 'S'],
                ['G', 'R', 'B', 'E', 'O', 'M'],
                ['O', 'A', 'L', 'B', 'E', 'A'],
                ['T', 'X', 'E', 'L', 'E', 'L'],
                ['C', 'H', 'R', 'E', 'V', 'L'],
                ['T', 'I', 'T', 'S', 'A', 'F'],
                ['E', 'R', 'N', 'T', 'R', 'R'],
                ['F', 'S', 'D', 'N', 'E', 'I']
            ],
            wordPaths: {
                "MARGOT":   [[0,0], [0,1], [1,1], [1,0], [2,0], [3,0]],
                "AXEL":    [[2,1], [3,1], [3,2], [2,2]],
                "LILO": [[0,2], [0,3], [0,4], [1,4]],
                "BEBE": [[1,2], [1,3], [2,3], [2,4]],
                "STITCH": [[5,3], [5,2], [5,1], [5,0], [4,0], [4,1]],
                "TRAVELER": [[6,3], [6,4], [5,4], [4,4], [3,4], [3,3], [4,3], [4,2]],
                "FERN": [[7,0], [6,0], [6,1], [6,2]],
                "SMALLFRIENDS": [[0,5], [1,5], [2,5], [3,5], [4,5], [5,5], [6,5], [7,5], [7,4], [7,3], [7,2], [7,1]]
            }
        },
        {
            id: "county_fair",
            themeClue: "23 in MD, 55 in WV",
            spangram: "COUNTYFAIR",
            themeWords: ["MUSIC", "PIGRACES", "FOOD", "RIDES", "PRIZE", "FARMANIMALS"],
            gridLetters: [
                ['M', 'U', 'R', 'A', 'M', 'I'],
                ['I', 'S', 'I', 'L', 'S', 'N'],
                ['C', 'G', 'R', 'A', 'P', 'A'],
                ['P', 'I', 'A', 'F', 'R', 'M'],
                ['F', 'S', 'C', 'Y', 'I', 'R'],
                ['O', 'R', 'E', 'T', 'Z', 'A'],
                ['O', 'I', 'N', 'U', 'E', 'F'],
                ['D', 'D', 'E', 'S', 'O', 'C']
            ],
            wordPaths: {
                "MUSIC":   [[0,0], [0,1], [1,1], [1,0], [2,0]],
                "PIGRACES":    [[3,0], [3,1], [2,1], [2,2], [3,2], [4,2], [5,2], [4,1]],
                "FOOD": [[4,0], [5,0], [6,0], [7,0]],
                "RIDES": [[5,1], [6,1], [7,1], [7,2], [7,3]],
                "PRIZE": [[2,4], [3,4], [4,4], [5,4], [6,4]],
                "FARMANIMALS": [[6,5], [5,5], [4,5], [3,5], [2,5], [1,5], [0,5], [0,4], [0,3], [1,3], [1,4]],
                "COUNTYFAIR": [[7,5], [7,4], [6,3], [6,2], [5,3], [4,3], [3,3], [2,3], [1,2], [0,2]],
            }
        },
];

    const grid = document.getElementById("zands-grid");
    const clueBox = document.getElementById("zands-clue");
    const spangramBox = document.getElementById("spangram-box");
    const themeWordsList = document.getElementById("theme-words-list");
    const finalClueBox = document.getElementById("clue-box");
    const continueButton = document.getElementById("continue-button");

    let selectedPath = []; 
    let foundWords = new Set();
    
    function startGame() {
        // Pick a random level
        const randomIndex = Math.floor(Math.random() * LEVELS.length);
        GAME_DATA = LEVELS[randomIndex];

        console.log("Loaded Level:", GAME_DATA.themeClue);

        // --- FIX: REMOVED THE "initGame()" CALL HERE ---

        // Set the clue text
        clueBox.querySelector("strong").textContent = GAME_DATA.themeClue;
        
        // Clear existing grid if restarting
        grid.innerHTML = "";
        themeWordsList.innerHTML = "";

        // Create the grid
        GAME_DATA.gridLetters.forEach((row, r) => {
            row.forEach((letter, c) => {
                const tile = document.createElement("div");
                tile.className = "zands-tile";
                tile.textContent = letter;
                tile.dataset.row = r;
                tile.dataset.col = c;
                
                tile.addEventListener("click", () => onTileClick(tile, r, c));
                
                grid.appendChild(tile);
            });
        });

        // Populate theme words list
        GAME_DATA.themeWords.forEach(word => {
            const li = document.createElement("li");
            li.textContent = "• ".repeat(word.length);
            li.dataset.word = word;
            themeWordsList.appendChild(li);
        });
    }

    function onTileClick(tile, row, col) {
        if (tile.classList.contains("found-word") || tile.classList.contains("spangram")) {
            return; 
        }

        const pathIndex = selectedPath.findIndex(p => p.tile === tile);

        if (pathIndex === -1) {
            if (selectedPath.length === 0) {
                selectedPath.push({ tile, row, col });
                tile.classList.add("selected");
            } else {
                const lastTile = selectedPath[selectedPath.length - 1];
                const isAdjacent = Math.abs(lastTile.row - row) <= 1 && Math.abs(lastTile.col - col) <= 1;

                if (isAdjacent) {
                    selectedPath.push({ tile, row, col });
                    tile.classList.add("selected");
                } else {
                    clearSelection();
                    selectedPath.push({ tile, row, col });
                    tile.classList.add("selected");
                }
            }
        } else if (pathIndex === selectedPath.length - 1) {
            submitPath();
        } else if (pathIndex === selectedPath.length - 2) {
            const removed = selectedPath.pop();
            removed.tile.classList.remove("selected");
        } else {
            clearSelection();
        }
    }
    
    function clearSelection() {
        selectedPath.forEach(p => p.tile.classList.remove("selected"));
        selectedPath = [];
    }

    function submitPath() {
        if (selectedPath.length === 0) return;
        const word = selectedPath.map(p => p.tile.textContent).join("");
        checkWord(word);
        clearSelection(); 
    }
    
    function checkWord(word) {
        if (word.length < 3) return; 
        
        const pathCoords = selectedPath.map(p => [p.row, p.col]);

        if (word === GAME_DATA.spangram && isPathMatch(pathCoords, GAME_DATA.wordPaths[word])) {
            highlightWord(selectedPath, "spangram");
            foundWords.add(word);
            spangramBox.textContent = word;
            spangramBox.classList.remove("hidden");
            checkWin();
            return;
        }

        if (GAME_DATA.themeWords.includes(word) && isPathMatch(pathCoords, GAME_DATA.wordPaths[word])) {
            highlightWord(selectedPath, "found-word");
            foundWords.add(word);
            const li = themeWordsList.querySelector(`li[data-word="${word}"]`);
            if (li) {
                li.textContent = word;
                li.classList.add("found");
            }
            checkWin();
            return;
        }
    }

    function isPathMatch(path1, path2) {
        if (path1.length !== path2.length) return false;
        
        let matchForward = true;
        for (let i = 0; i < path1.length; i++) {
            if (path1[i][0] !== path2[i][0] || path1[i][1] !== path2[i][1]) {
                matchForward = false;
                break;
            }
        }
        if (matchForward) return true;

        let matchReverse = true;
        for (let i = 0; i < path1.length; i++) {
            if (path1[i][0] !== path2[path1.length - 1 - i][0] || path1[i][1] !== path2[path1.length - 1 - i][1]) {
                matchReverse = false;
                break;
            }
        }
        return matchReverse;
    }

    function highlightWord(path, className) {
        path.forEach(p => {
            p.tile.classList.add(className);
        });
    }

    // V2
    const hintButton = document.getElementById("hint-button");
    hintButton.addEventListener("click", () => {
        const remainingWords = GAME_DATA.themeWords.filter(word => !foundWords.has(word));
        if (remainingWords.length === 0) return;
        const wordToReveal = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        const path = GAME_DATA.wordPaths[wordToReveal];
        const tilesToHighlight = path.map(([r, c]) => {
            return grid.querySelector(`div[data-row="${r}"][data-col="${c}"]`);
        });
        highlightWord(tilesToHighlight.map(tile => ({ tile })), "found-word");
        foundWords.add(wordToReveal);
        const li = themeWordsList.querySelector(`li[data-word="${wordToReveal}"]`);
        if (li) {
            li.textContent = wordToReveal;
            li.classList.add("found");
        }
        checkWin();
    });

    function checkWin() {
        if (foundWords.has(GAME_DATA.spangram) && GAME_DATA.themeWords.every(word => foundWords.has(word))) {
            setTimeout(() => {
                finalClueBox.classList.remove("hidden");
                continueButton.classList.remove("hidden");
                finalClueBox.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    }

    startGame();
});