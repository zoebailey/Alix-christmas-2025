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
                ['U', 'R', 'T', 'F', 'E', 'L'],
                ['F', 'E', 'R', 'U', 'G', 'G'],
                ['D', 'F', 'E', 'D', 'A', 'N'],
                ['E', 'I', 'V', 'A', 'A', 'I'],
                ['A', 'S', 'T', 'C', 'H', 'M'],
                ['R', 'L', 'I', 'T', 'L', 'A']
            ],
            wordPaths: {
                "STUFFEDANIMAL": [[0,0], [1,0], [2,0], [3,0], [4,1], [4,2], [4,3], [4,4], [4,5], [5,5], [6,5], [7,5], [7,4], [2,5]], 
                "ROGER": [[0,1], [0,2], [1,2], [1,1], [2,1]],
                "BABYOTTER": [[0,3], [0,4], [0,5], [1,5], [1,4], [1,3], [2,2], [3,1], [3,2]],
                "FUGGLE": [[2,3], [3,3], [3,4], [3,5], [2,5], [2,4]], 
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
    }
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