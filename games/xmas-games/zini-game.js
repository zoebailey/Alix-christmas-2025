document.addEventListener("DOMContentLoaded", () => {

// --- CONFIGURATION ---
const ATTEMPTS_TO_FIT = 4000; 
const GRID_SIZE = 15; // 15x15 Grid

// --- WORD DATA ---
const WORD_DATA = [
    { word: "OTTER", clue: "Baby ___ (animal)" },
    { word: "ITOK", clue: "Response to a fart" },
    { word: "JACKIE", clue: "____ and Wilson" },
    { word: "WILSON", clue: "Jackie and ___" },
    { word: "DIVA", clue: "Nickname for Tapioca the Unicorn" },
    { word: "NASHVILLE", clue: "The destination of our first flight together" },
    { word: "KISSES", clue: "I love giving you lots of these, also a chocolate treat" },
    { word: "BOOTS", clue: "You got me these in Nashville for my bday" },
    { word: "DIRTYSHIRLEY", clue: "Your go-to bar order" },
    { word: "HEART", clue: "<3>" },
    { word: "NACHOFRIES", clue: "My favorite thing to get at Taco Bell" },
    { word: "PURSE", clue: "Luckily I have ___" },
    { word: "OCEANCITY", clue: "Where you asked me to be your girlfriend" },
    { word: "SANDBRIDGE", clue: "Our 1 year beach vaction place" },
    { word: "CHIPMUNKS", clue: "One of our Halloween costumes this year" },
    { word: "DTI", clue: "Our favorite Roblox game" },
    { word: "AMONGUS", clue: "We have to turn our cameras off when we play this game because we are sus" },
    { word: "TIKTOK", clue: "App where you are an influencer" },
    { word: "PINK", clue: "Your favorite color" },
    { word: "GREEN", clue: "Color of the character I was for Halloween" },
    { word: "ALIEN", clue: "Filter you like to use on FaceTime" },
    { word: "LANTERNS", clue: "We saw these and put them in the water this summer" },
    { word: "FOREVER", clue: "How long I will love you" },
    { word: "MOON", clue: "Thing in the sky that makes me think of you" },
    { word: "BLAZE", clue: "Hood College's mascot" },
    { word: "CHEESECAKE", clue: "___ Factory" },
    { word: "AQUARIUM", clue: "One of our favorite dates in Baltimore" },
    { word: "DIETCOKE", clue: "Your favorite soda" },
    { word: "LAFUFUS", clue: "We got these at sunsations" },
    { word: "SHARK", clue: "Ashley Barne's ex" },
    { word: "SEAFOODBOIL", clue: "Crab 99 food" },
    { word: "SWEETFROG", clue: "Place for a sweet treat, they got rid of my cracked out guy" },
    { word: "TEXASROADHOUSE", clue: "Where we go for good rolls" },
    { word: "EAGLES", clue: "Who we beat at the Commanders game you took me to" },
    { word: "MIDDLETOWN", clue: "The town of our first date" },
    { word: "ADIDAS", clue: "The brand of the shoes you wear most often" },
    { word: "ADOPT", clue: "How we plan to get a dog or a baby" },
    { word: "HONEY", clue: "Name of Taylor Swift song and a name that I call you" },
    { word: "DRAG", clue: "Kori King does this "},
    { word: "FORTNITE", clue: "A game you like to watch me play" },
    { word: "STITCH", clue: "Who I got you from Disney" },
    { word: "HENRIETTA", clue: "The name of our highland cow" },
    { word: "MARYLAND", clue: "Old Line State" },
    { word: "COMMANDERS", clue: "Team that is NOT from WA"},

    // V2
    { word: "DANIELS", clue: "Jayden ___"},
    { word: "SNACKWRAP", clue: "McDonald's order, not chicken nuggets"},
    { word: "BANNER", clue: "School you worked at"},
    { word: "SOCIALWORK", clue: "Your major"},
    { word: "SWAG", clue: "Your minor"},
    { word: "SNORE", clue: "What I do at night, sorry"},
    { word: "MAX", clue: "Your favorite stuffed animal"}
];

// Sort words by length
let availableWords = WORD_DATA.filter(w => w.word.length <= GRID_SIZE)
                              .sort((a, b) => b.word.length - a.word.length);

// V2
let suppressSelect = false;

// --- GAME STATE ---
const gridEl = document.getElementById("zini-grid");
const cluesAcrossEl = document.getElementById("clues-across");
const cluesDownEl = document.getElementById("clues-down");
const clueBox = document.getElementById("clue-box");
const continueButton = document.getElementById("continue-button");

let gridState = []; 
let activeCell = { row: 0, col: 0 };
let activeDirection = "across";
let clueMap = { across: {}, down: {} }; 

// --- GENERATOR CLASSES ---
function WordObj(text, clue, row, col, vert) {
    this.text = text;
    this.clue = clue;
    this.row = row;
    this.column = col;
    this.vertical = vert;
}

function CrosswordGenerator() {
    const emptyCell = '_';
    let grid = Array.from(Array(GRID_SIZE), () => new Array(GRID_SIZE).fill(emptyCell));
    let placedWords = [];

    this.getGrid = () => grid;
    this.getPlacedWords = () => placedWords;

    this.update = function(word) {
        if (this.canBePlaced(word)) {
            this.addWord(word);
            return true;
        }
        return false;
    };

    this.canBePlaced = function(word) {
        if (!this.isValidPosition(word.row, word.column) || !this.fitsOnGrid(word)) return false;
        
        let intersections = 0;
        for (let i = 0; i < word.text.length; i++) {
            let r = word.vertical ? word.row + i : word.row;
            let c = !word.vertical ? word.column + i : word.column;
            
            if (grid[r][c] !== emptyCell) {
                if (grid[r][c] !== word.text.charAt(i)) return false;
                intersections++;
            }
            
            if (grid[r][c] === emptyCell) {
                if (word.vertical) {
                    if ((c > 0 && grid[r][c-1] !== emptyCell) || (c < GRID_SIZE-1 && grid[r][c+1] !== emptyCell)) return false;
                } else {
                    if ((r > 0 && grid[r-1][c] !== emptyCell) || (r < GRID_SIZE-1 && grid[r+1][c] !== emptyCell)) return false;
                }
            }
            
            if (i === 0) {
                let prevR = word.vertical ? r-1 : r;
                let prevC = word.vertical ? c : c-1;
                if (this.isValidPosition(prevR, prevC) && grid[prevR][prevC] !== emptyCell) return false;
            }
            if (i === word.text.length - 1) {
                let nextR = word.vertical ? r+1 : r;
                let nextC = word.vertical ? c : c+1;
                if (this.isValidPosition(nextR, nextC) && grid[nextR][nextC] !== emptyCell) return false;
            }
        }
        return placedWords.length === 0 || intersections > 0 || Math.random() > 0.85;
    };

    this.addWord = function(word) {
        for (let i = 0; i < word.text.length; i++) {
            let r = word.vertical ? word.row + i : word.row;
            let c = !word.vertical ? word.column + i : word.column;
            grid[r][c] = word.text.charAt(i);
        }
        placedWords.push(word);
    };

    this.fitsOnGrid = (word) => {
        return word.vertical ? (word.row + word.text.length <= GRID_SIZE) : (word.column + word.text.length <= GRID_SIZE);
    };
    this.isValidPosition = (r, c) => r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE;
}

// --- GENERATION LOGIC ---
function generatePuzzle() {
    let bestGrid = null;
    let mostWords = 0;

    for (let i = 0; i < 50; i++) { 
        let gen = new CrosswordGenerator();
        let placedCount = 0;
        let used = new Set();

        let startWordData = availableWords[0]; 
        let isVert = Math.random() > 0.5;
        let startRow = isVert ? Math.floor((GRID_SIZE - startWordData.word.length)/2) : Math.floor(GRID_SIZE/2);
        let startCol = isVert ? Math.floor(GRID_SIZE/2) : Math.floor((GRID_SIZE - startWordData.word.length)/2);

        let startWord = new WordObj(startWordData.word, startWordData.clue, startRow, startCol, isVert);
        if (gen.update(startWord)) {
            placedCount++;
            used.add(startWordData.word);

            for (let wData of availableWords) {
                if (used.has(wData.word)) continue;
                let placed = false;
                for (let attempt = 0; attempt < 200; attempt++) {
                    let isV = Math.random() > 0.5;
                    let w = new WordObj(wData.word, wData.clue, 0, 0, isV);
                    w.row = Math.floor(Math.random() * GRID_SIZE);
                    w.column = Math.floor(Math.random() * GRID_SIZE);
                    if (gen.update(w)) {
                        placed = true;
                        placedCount++;
                        used.add(wData.word);
                        break;
                    }
                }
            }
        }

        if (placedCount > mostWords) {
            mostWords = placedCount;
            bestGrid = gen;
        }
    }
    return bestGrid;
}

// --- RENDERING ---
function initGame() {
    if(!gridEl) return;
    const generator = generatePuzzle();
    if (!generator) return;

    const rawGrid = generator.getGrid();
    const placedWords = generator.getPlacedWords();

    gridState = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        gridState[r] = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            gridState[r][c] = {
                char: rawGrid[r][c] === '_' ? null : rawGrid[r][c],
                isBlack: rawGrid[r][c] === '_',
                clueNum: null,
                element: null,
                input: null
            };
        }
    }

    let clueCounter = 1;
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (gridState[r][c].isBlack) continue;
            let isAcross = (c===0 || gridState[r][c-1].isBlack) && (c+1<GRID_SIZE && !gridState[r][c+1].isBlack);
            let isDown = (r===0 || gridState[r-1][c].isBlack) && (r+1<GRID_SIZE && !gridState[r+1][c].isBlack);
            if (isAcross || isDown) {
                gridState[r][c].clueNum = clueCounter;
                if (isAcross) {
                    let wObj = placedWords.find(w => w.row === r && w.column === c && !w.vertical);
                    if (wObj) addClueToMap(clueCounter, wObj, "across");
                }
                if (isDown) {
                    let wObj = placedWords.find(w => w.row === r && w.column === c && w.vertical);
                    if (wObj) addClueToMap(clueCounter, wObj, "down");
                }
                clueCounter++;
            }
        }
    }
    buildGridDOM();
    buildClueLists();
    findFirstCell();
}

function addClueToMap(num, wObj, dir) {
    let cells = [];
    for(let i=0; i<wObj.text.length; i++) {
        let r = wObj.vertical ? wObj.row + i : wObj.row;
        let c = !wObj.vertical ? wObj.column + i : wObj.column;
        cells.push({r, c});
    }
    clueMap[dir][num] = { word: wObj.text, clue: wObj.clue, cells: cells };
}

function buildGridDOM() {
    gridEl.innerHTML = "";
    
    // FORCE CSS IN JS TO FIX LAYOUT
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    gridEl.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
    gridEl.style.gap = "1px";
    gridEl.style.backgroundColor = "#000";
    gridEl.style.border = "2px solid #000";

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            let cell = gridState[r][c];
            let div = document.createElement("div");
            div.className = "zini-cell";
            if (cell.isBlack) {
                div.classList.add("black");
            } else {
                if (cell.clueNum) {
                    let span = document.createElement("span");
                    span.className = "zini-clue-number";
                    span.textContent = cell.clueNum;
                    div.appendChild(span);
                }
                let input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.dataset.r = r;
                input.dataset.c = c;
                input.onclick = () => selectCell(r, c);
                input.onfocus = () => selectCell(r, c);
                input.oninput = handleInput;
                input.onkeydown = handleKey;
                cell.input = input;
                cell.element = div;
                div.appendChild(input);
            }
            gridEl.appendChild(div);
        }
    }
}

function buildClueLists() {
    cluesAcrossEl.innerHTML = "";
    cluesDownEl.innerHTML = "";
    let acrossKeys = Object.keys(clueMap.across).sort((a,b) => a-b);
    let downKeys = Object.keys(clueMap.down).sort((a,b) => a-b);

    acrossKeys.forEach(num => {
        let li = document.createElement("li");
        li.textContent = `${num}. ${clueMap.across[num].clue}`;
        li.dataset.num = num;
        li.dataset.dir = "across";
        li.onclick = () => selectClue(num, "across");
        cluesAcrossEl.appendChild(li);
    });
    downKeys.forEach(num => {
        let li = document.createElement("li");
        li.textContent = `${num}. ${clueMap.down[num].clue}`;
        li.dataset.num = num;
        li.dataset.dir = "down";
        li.onclick = () => selectClue(num, "down");
        cluesDownEl.appendChild(li);
    });
}

// V2
function selectCell(r, c) {
    if (suppressSelect) {
        activeCell = { row: r, col: c };
        highlight();
        return;
    }

    if (activeCell.row === r && activeCell.col === c) {
        let newDir = activeDirection === "across" ? "down" : "across";
        if (
            (newDir === "across" && hasWord(r, c, "across")) ||
            (newDir === "down" && hasWord(r, c, "down"))
        ) {
            activeDirection = newDir;
        }
    } else {
        activeCell = { row: r, col: c };
        if (hasWord(r, c, "across")) activeDirection = "across";
        else activeDirection = "down";
    }

    highlight();
}

function hasWord(r, c, dir) {
    if (dir === "across") return (c>0 && !gridState[r][c-1].isBlack) || (c<GRID_SIZE-1 && !gridState[r][c+1].isBlack);
    else return (r>0 && !gridState[r-1][c].isBlack) || (r<GRID_SIZE-1 && !gridState[r+1][c].isBlack);
}

function selectClue(num, dir) {
    let data = clueMap[dir][num];
    if (data) {
        activeCell = { row: data.cells[0].r, col: data.cells[0].c };
        activeDirection = dir;
        gridState[activeCell.row][activeCell.col].input.focus();
        highlight();
    }
}

function highlight() {
    document.querySelectorAll(".zini-cell").forEach(el => el.classList.remove("active", "highlighted"));
    document.querySelectorAll(".zini-clue-list li").forEach(el => el.classList.remove("active"));

    let cell = gridState[activeCell.row][activeCell.col];
    if (cell.element) cell.element.classList.add("active");

    let possibleClues = clueMap[activeDirection];
    let foundNum = null;
    
    Object.keys(possibleClues).forEach(num => {
        let data = possibleClues[num];
        if (data.cells.some(c => c.r === activeCell.row && c.c === activeCell.col)) {
            foundNum = num;
            data.cells.forEach(pos => {
                if (pos.r !== activeCell.row || pos.c !== activeCell.col) {
                    gridState[pos.r][pos.c].element.classList.add("highlighted");
                }
            });
        }
    });

    if (foundNum) {
        let li = document.querySelector(`li[data-num="${foundNum}"][data-dir="${activeDirection}"]`);
        if (li) {
            li.classList.add("active");
            li.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }
}

function handleInput(e) {
    let val = e.target.value.toUpperCase();
    e.target.value = val; 
    if (val.length > 0) moveFocus(1);
    checkWin();
}

function handleKey(e) {
    if (e.key === "Backspace") {
        if (e.target.value === "") moveFocus(-1);
        else e.target.value = "";
    } else if (e.key.startsWith("Arrow")) {
        let r = activeCell.row, c = activeCell.col;
        if (e.key === "ArrowUp") r--;
        if (e.key === "ArrowDown") r++;
        if (e.key === "ArrowLeft") c--;
        if (e.key === "ArrowRight") c++;
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && !gridState[r][c].isBlack) {
            activeCell = {row: r, col: c};
            gridState[r][c].input.focus();
            highlight();
        }
    }
}

// V2
function moveFocus(dir) {
    let r = activeCell.row, c = activeCell.col;
    let found = false;

    for (let i = 0; i < GRID_SIZE; i++) {
        if (activeDirection === "across") c += dir;
        else r += dir;

        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) break;
        if (!gridState[r][c].isBlack) {
            found = true;
            break;
        }
    }

    if (found) {
        suppressSelect = true;
        activeCell = { row: r, col: c };
        gridState[r][c].input.focus();
        suppressSelect = false;
        highlight();
    }
}

function findFirstCell() {
    for (let r=0; r<GRID_SIZE; r++) {
        for (let c=0; c<GRID_SIZE; c++) {
            if (!gridState[r][c].isBlack) {
                activeCell = {row: r, col: c};
                return;
            }
        }
    }
}

function checkWin() {
    let allCorrect = true;
    for (let r=0; r<GRID_SIZE; r++) {
        for (let c=0; c<GRID_SIZE; c++) {
            let cell = gridState[r][c];
            if (!cell.isBlack) {
                if (cell.input.value !== cell.char) allCorrect = false;
                else cell.element.classList.add("correct");
            }
        }
    }
    if (allCorrect) {
        clueBox.classList.remove("hidden");
        continueButton.classList.remove("hidden");
        clueBox.scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll("input").forEach(i => i.disabled = true);
    }
}

initGame();
});