const board = document.getElementById("bingo-board");
const legend = document.getElementById("legend");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const messageC = document.getElementById("message-c");
const scoreText = document.getElementById("score");
const message = document.getElementById("big-message");

let boardState = [];
let score = 0;
let lineAchieved = false;
let bingoAchieved = false;

const events = {
    bus: {
        actions: [
            {text: "Greet someone", emoji: "👋"},
            {text: "Smile at someone", emoji: "😁"},
            {text: "Offer your seat to someone", emoji: "💺"},
            {text: "Thank the driver when exiting", emoji: "👍"},
            {text: "Say thank you", emoji: "🫰"},
            {text: "Say excuse me politely", emoji: "✋"},
            {text: "Wish someone a good day", emoji: "😊"},
            {text: "Let someone exit before entering", emoji: "💯"},
            {text: "Make space for someone", emoji: "🚌"},
            {text: "Move your bag so someone can sit", emoji: "🎒"},
            {text: "Give someone a little more space", emoji: "❤️"},
            {text: "Lower your phone volume", emoji: "📱"},
        ],
        outside: [
            {text: "Red car", emoji: "🚗"},
            {text: "Yellow car", emoji: "🚕"},
            {text: "Police car", emoji: "🚨"},
            {text: "Dog outside", emoji: "🐶"},
            {text: "Street musician", emoji: "🎵"},
            {text: "Construction site", emoji: "🚧"},
            {text: "Someone riding a bike", emoji: "🚲"},
            {text: "Someone running outside", emoji: "👟"},
            {text: "A street name sign", emoji: "🛣️"},
            {text: "A stop sign", emoji: "🛑"},
            {text: "A traffic light", emoji: "🚦"},
            {text: "A bike lane sign", emoji: "🚵‍♀️"},
            {text: "A parking sign", emoji: "🅿️"},
            {text: "A shop that starts with A", emoji: "🅰️"},
            {text: "A shop name with your first letter", emoji: "🛍️"},
            {text: "A street sign with the letter M", emoji: "🪧"},
            {text: "A license plate with the letter B", emoji: "🅱️"},
            {text: "A license plate with two identical numbers", emoji: "3️⃣"},
        ],
        inside: [
            {text: "Bus is late", emoji: "⏳"},
            {text: "Someone running to catch the bus", emoji: "🏃"},
            {text: "Driver brakes hard", emoji: "👨🏻‍💼"},
            {text: "Bus arrives already full", emoji: "👥"},
            {text: "Someone on a phone call", emoji: "📞"},
            {text: "Someone standing even though seats are empty", emoji: "🧍"},
            {text: "Someone watching TikTok", emoji: "🎶"},
            {text: "A child crying", emoji: "👶"},
            {text: "Someone drops their phone", emoji: "🤳"},
            {text: "Someone laughing", emoji: "😂"},
            {text: "Someone sleeping", emoji: "😴"},
        ]
    }
}

const winningLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
]

function makeBusList() 
{
    const allBusEvents = [
        ...events.bus.actions,
        ...events.bus.outside,
        ...events.bus.inside,
    ];

    allBusEvents.sort(() => Math.random() - 0.5);
    const bingoEvents = allBusEvents.slice(0, 25);
    makeBingo(bingoEvents);
}

function makeBingo(bingoEvents) 
{  
    startScreen.classList.add("hidden") ;
    gameScreen.classList.remove("hidden");

    board.innerHTML = "";
    legend.innerHTML = "";

    boardState = new Array(25).fill(false);
    score = 0;
    lineAchieved = false;
    bingoAchieved = false;

    updateScore();
    let legendList = [];

    bingoEvents.forEach((event, index) => {
        const cell = document.createElement("div");
        cell.textContent = event.emoji;
        cell.className = "flex items-center justify-center text-3xl rounded h-16 aspect-square cursor-pointer bg-[#B3D89C]";
        board.appendChild(cell);
        cell.addEventListener("click", () => {
            boardState[index] = !boardState[index];
            cell.classList.toggle("bg-[#4d7298]");
            legendList[index].classList.toggle("bg-[#4d7298]")
            checkBingo();
        });
    });

    bingoEvents.forEach((event, index) => {
        const line = document.createElement("div");
        line.className = "flex items-center gap-2 p-2 bg-[#B3D89C] rounded text-sm";
        line.innerHTML = `
        <span class="text-lg">${event.emoji}</span>
        <span class="leading-tight">${event.text}</span>
        `;
        legend.appendChild(line);
        legendList[index] = line;
    })
}

function checkBingo()
{
    const completedLines = winningLines.filter(line =>
        line.every(index => boardState[index])
    );

    score = completedLines.length * 10;

    if(!lineAchieved && completedLines.length > 0)
    {
        lineAchieved = true;
        showMessage("LINE!");

        const firstLine = completedLines[0];

        firstLine.forEach(index => {
            board.children[index].classList.add("ring-4","ring-yellow-400");
        });

        setTimeout(() => {
            firstLine.forEach(index => {
                board.children[index].classList.remove("ring-4","ring-yellow-400");
            });
        },2000);
    }

    if(!bingoAchieved && boardState.every(cell => cell))
    {
        bingoAchieved = true;
        score += 50;
        showMessage("BINGO!");
    }

    updateScore();
}

function showMessage(text)
{
    message.textContent = text;
    messageC.classList.remove("hidden");

    setTimeout(() => {
        messageC.classList.add("hidden");
    }, 2000);
}

function updateScore()
{
    scoreText.textContent = score;
}

function goToStartScreen() 
{
    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}