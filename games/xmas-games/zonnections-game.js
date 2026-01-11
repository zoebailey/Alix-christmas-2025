document.addEventListener("DOMContentLoaded", () => {

    // make a structure for a category
    // make several categories
    // generate game grid from categories
    
    const GAME_DATA = [];

    // Define pools of possible categories for each color. The game will pick one category per color at random.
    const CATEGORY_POOLS = {
        yellow: [
            { category: "Our Favorite Resturaunts", words: ["Cheesecake Factory", "Olive Garden", "Waffle House", "Crab 99"] },
            { category: "Our Guys", words: ["Roger", "Earl", "Diva", "Baby Otter"] },
            { category: "Your Tattoos", words: ["Disco Ball", "Scorpion", "Peace Sign", "Stars"] },
            { category: "Pet Names", words: ["Binga", "Sweet", "Love", "Baby"] },

            // V2
            { category: "Pink Things", words: ["Your Hair", "Giant Fuggler", "Flamingo", "Bubblegum"] },
            { category: "Movies We've Seen Together", words: ["Wicked", "Spongebob", "Lilo and Stitch", "Wicked for Good"] },
            { category: "Holidays at Hood", words: ["Winter Solstice", "Christmas", "Hanukkah", "Kwanzaa"] },
            { category: "Ice Cream Flavors", words: ["Vanilla", "Chocolate", "Moose Tracks", "Chocolate Chip Cookie Dough"] },
            { category: "People You've Seen in Concert", words: ["SZA", "Sabrina Carpenter", "Clairo", "Billie Eilish"] },
            { category: "Car Decorations", words: ["Fuzzy Dice", "Decal", "Baby Fugglers", "Hanging Cowboy Disco Ball"] },
            { category: "Desserts", words: ["Cheesecake", "Ice Cream", "Cookies", "Fudge"] }
        ],
        green: [
            { category: "Places We Have Been", words: ["Baltimore", "Washington", "Virginia", "Nashville"] },
            { category: "Love Symbols", words: ["Heart", "Kiss", "Cupid", "Roses"] },
            { category: "Decorations in your Apartment", words: ["Michael Jackson", "Katy Perry", "Cosmo", "Tapestry"] },
            { category: "Ways to Take a Picture", words: ["iPhone", "Digi", "Mental", "Polaroid"] },

            // V2
            { category: "Pixar Characters", words: ["Woody", "Eve", "Dory", "Doug"] },
            { category: "Things That Go in Hair", words: ["Beret", "Hairtie", "Bow", "Tinsel"] },
            { category: "Apple Utilities", words: ["Camera", "Photos", "App Store", "Notes"] },
            { category: "Websites", words: ["Blackboard", "Google", "YouTube", "ChatGPT"] },
            { category: "Apple Products", words: ["Computer", "Phone", "Watch", "Tablet"] },
            { category: "Types of Images", words: ["Digital", "Still", "Mental", "JPG"] },
            { category: "Types of Focus on iPhone", words: ["Sleep", "Work", "Personal", "Do Not Disturb"] }
        ],
        blue: [
            { category: "Gifts You've Gotten Me", words: ["Tickets", "Flowers", "Mouse", "Calendar"] },
            { category: "Morgantown Places", words: ["Annex", "Ivy", "Happy's", "Joe's"] },
            { category: "Modes of Communication", words: ["Mail", "E-Mail", "Text", "FaceTime"] },
            { category: "Frederick Streets", words: ["7th", "Patrick", "Market", "Panoma"] },

            // V2
            { category: "Words Spelled the Same Forwards and Backwards", words: ["Racecar", "Level", "Kayak", "Tacocat"] },
            { category: "Types of Lights", words: ["Candle", "LED", "Flourescent", "Spot"] },
            { category: "Furniture Stores", words: ["Ikea", "Ashley's", "Bob's", "Wayfair"] },
            { category: "Mountains", words: ["Everest", "Kilimanjaro", "K2", "Makalu"] },
            { category: "Nonvascular Plants", words: ["Moss", "Algae", "Liverworts", "Lichen"] },
            { category: "Cities That Can Be Names", words: ["Savanna", "Paris", "Alexandria", "Austin"] },
            { category: "Bridges", words: ["Brooklyn", "Golden Gate", "Lake Pontchartrain", "Bay"] }
        ],
        purple: [
            { category: "School Mascots", words: ["Blazer", "Hub", "Dragon", "Knight"] },
            { category: "Things We Did at the Beach", words: ["Seafood Boil", "Putt Putt", "Sunrise", "Aquarium"] },
            { category: "___ Sandwich", words: ["Knuckle", "Grilled Cheese", "Ham", "Club"] },
            { category: "___ Max", words: ["Mad", "HBO", "Ava", "Air"] },

            // V2
            { category: "Ivy League Mascots", words: ["Tigers", "Crimson", "Bulldogs", "Quaker"] },
            { category: "Members of One Direction", words: ["Harry", "Louis", "Liam", "Niall"] },
            { category: "Football Positions", words: ["Quarter Back", "Safety", "Lineman", "Linebacker"] },
            { category: "Comes in a Seafood Boil", words: ["Crab", "Eggs", "Sausage", "Shrimp"] },
            { category: "Wedding Dress Styles", words: ["Mermaid", "Ballgown", "A-Line", "Trumpet"] },
            { category: "Drumline Members", words: ["Snare", "Bass", "Quad", "Cymbals"] },
            { category: "Places With a Disney Park", words: ["Orlando", "Aneheim", "Tokyo", "Paris"] }
        ]
    };

    // Replace the original GAME_DATA contents with one randomly chosen category from each color.
    // (GAME_DATA is a const array declared above; mutate its contents rather than reassigning.)
    GAME_DATA.length = 0;
    ["yellow", "green", "blue", "purple"].forEach((color) => {
        const pool = CATEGORY_POOLS[color];
        const pick = pool[Math.floor(Math.random() * pool.length)];
        // push a shallow copy so later code can safely mutate arrays if needed
        GAME_DATA.push({
            category: pick.category,
            words: pick.words.slice(),
            color
        });
    });

    // --- GAME VARIABLES ---
    const grid = document.getElementById("zonnections-grid");
    const solvedContainer = document.getElementById("solved-groups-container");
    const shuffleButton = document.getElementById("shuffle-button");
    const deselectButton = document.getElementById("deselect-button");
    const submitButton = document.getElementById("submit-button");
    const mistakesTracker = document.getElementById("mistakes-tracker").children;
    const clueBox = document.getElementById("clue-box");
    const continueButton = document.getElementById("continue-button");

    let selectedTiles = [];
    let mistakesRemaining = 4;
    let solvedGroups = 0;
    
    let wordCategoryMap = new Map();
    let allWords = [];

    // --- FUNCTIONS ---

    function startGame() {
        grid.innerHTML = "";
        solvedContainer.innerHTML = "";
        
        allWords = [];
        wordCategoryMap.clear();
        GAME_DATA.forEach((group, index) => {
            group.words.forEach(word => {
                allWords.push(word);
                wordCategoryMap.set(word, index); 
            });
        });

        shuffleArray(allWords).forEach(word => {
            const tile = document.createElement("div");
            tile.className = "zonnections-tile";
            tile.textContent = word;
            tile.addEventListener("click", () => onTileClick(tile));
            grid.appendChild(tile);
        });

        shuffleButton.addEventListener("click", shuffleGrid);
        deselectButton.addEventListener("click", deselectAll);
        submitButton.addEventListener("click", submitGuess);
    }

    function onTileClick(tile) {
        if (tile.classList.contains("selected")) {
            tile.classList.remove("selected");
            selectedTiles = selectedTiles.filter(t => t !== tile);
        } else {
            if (selectedTiles.length < 4) {
                tile.classList.add("selected");
                selectedTiles.push(tile);
            }
        }
        submitButton.disabled = selectedTiles.length !== 4;
    }

    function deselectAll() {
        selectedTiles.forEach(tile => tile.classList.remove("selected"));
        selectedTiles = [];
        submitButton.disabled = true;
    }

    function submitGuess() {
        if (selectedTiles.length !== 4) return;

        const selectedWords = selectedTiles.map(tile => tile.textContent);
        const firstCategoryIndex = wordCategoryMap.get(selectedWords[0]);
        const isCorrect = selectedWords.every(word => wordCategoryMap.get(word) === firstCategoryIndex);

        if (isCorrect) {
            const group = GAME_DATA[firstCategoryIndex];
            
            const solvedBox = document.createElement("div");
            solvedBox.className = `solved-group ${group.color}`;
            solvedBox.innerHTML = `<strong>${group.category}</strong><span>${group.words.join(", ")}</span>`;
            
            solvedContainer.appendChild(solvedBox);

            // --- CHANGE 1: UPDATED TILE HIDING LOGIC ---
            // Animate tiles fading out, then remove from layout
            selectedTiles.forEach(tile => {
                tile.style.transition = "opacity 0.5s ease"; // Only transition opacity
                tile.style.opacity = "0";
                tile.style.pointerEvents = "none";
                
                // After fade-out, set display: none to collapse the space
                setTimeout(() => {
                    tile.style.display = "none";
                }, 500); // Must match transition duration
            });
            // --- END OF CHANGE ---

            // We no longer need reorganizeGrid()
            // (Line removed)

            solvedGroups++;
            deselectAll();

            if (solvedGroups === 4) {
                winGame();
            }
        } else {
            // "One away" logic
            const categories = selectedWords.map(word => wordCategoryMap.get(word));
            const categoryCounts = categories.reduce((acc, category) => {
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});
            
            const counts = Object.values(categoryCounts);
            const isOneAway = counts.length === 2 && (counts[0] === 3 || counts[1] === 3);

            if (isOneAway) {
                alert("You're one away!"); 
            }

            mistakesRemaining--;
            if (mistakesRemaining >= 0) {
                mistakesTracker[3 - mistakesRemaining].classList.add("lost");
            }

            // Shake animation
            selectedTiles.forEach(tile => {
                tile.classList.add("shake");
                setTimeout(() => tile.classList.remove("shake"), 400);
            });
            
            if (mistakesRemaining === 0) {
                loseGame();
            }
        }
    }

    function shuffleGrid() {
        // --- CHANGE 2: UPDATED SHUFFLE LOGIC ---
        // Filter by display, not opacity, so we only shuffle visible tiles
        const tiles = Array.from(grid.children).filter(tile => tile.style.display !== "none");
        // --- END OF CHANGE ---
        
        shuffleArray(tiles);
        tiles.forEach(tile => grid.appendChild(tile)); // Re-append visible tiles
    }

    // --- CHANGE 3: `reorganizeGrid()` function has been DELETED ---

    function winGame() {
        clueBox.classList.remove("hidden");
        continueButton.classList.remove("hidden");
        clueBox.scrollIntoView({ behavior: 'smooth' });
    }

    function loseGame() {
        setTimeout(() => {
            alert("Oh no! You're out of guesses. Revealing the answers...");
            GAME_DATA.forEach((group) => {
                const isSolved = Array.from(solvedContainer.children).some(el => el.classList.contains(group.color));
                if (!isSolved) {
                     const solvedBox = document.createElement("div");
                     solvedBox.className = `solved-group ${group.color}`;
                     solvedBox.innerHTML = `<strong>${group.category}</strong><span>${group.words.join(", ")}</span>`;
                     solvedContainer.appendChild(solvedBox);
                }
            });
            winGame(); 
        }, 500); 
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.map(item => item);
    }

    startGame();
});