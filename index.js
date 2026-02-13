const openRuleBtn = document.querySelector(".open-rules-btn");
const closeRuleBtn = document.querySelector(".close-rules-btn");
const rulesPannel = document.querySelector(".rulesPannel");

const gameBtns = document.querySelectorAll(".choice-btn");
const mainGamePannel = document.querySelector(".main-game-pannel");
const gameBox = mainGamePannel.querySelector(".game-buttons");
const resultBox = mainGamePannel.querySelector(".result-box");
const scoreText = document.querySelector(".score-text");

const bonusPageLinkBtn = document.querySelector(".bonus-link");
const mainPageLinkBtn = document.querySelector(".main-link");

function navFreezAndMelt(flag) {
    if(flag){
        openRuleBtn.disabled = true;
        openRuleBtn.classList.remove("cursor-pointer");
        openRuleBtn.classList.add("cursor-not-allowed");
        if(bonusPageLinkBtn) {
            bonusPageLinkBtn.disabled = true;
            bonusPageLinkBtn.classList.remove("cursor-pointer");
            bonusPageLinkBtn.classList.add("cursor-not-allowed");
        }
        if(mainPageLinkBtn) {
            mainGamePannel.disabled = true;
            mainPageLinkBtn.classList.remove("cursor-pointer");
            mainPageLinkBtn.classList.add("cursor-not-allowed");
        }
    }
    else{
        openRuleBtn.disabled = false;
        openRuleBtn.classList.remove("cursor-not-allowed");
        openRuleBtn.classList.add("cursor-pointer");
        if(bonusPageLinkBtn) {
            bonusPageLinkBtn.disabled = false;
            bonusPageLinkBtn.classList.remove("cursor-not-allowed");
            bonusPageLinkBtn.classList.add("cursor-pointer");
        }
        if(mainPageLinkBtn) {
            mainPageLinkBtn.disabled = false;
            mainPageLinkBtn.classList.remove("cursor-not-allowed");
            mainPageLinkBtn.classList.add("cursor-pointer");
        }
    }
}

function getHomeMove() {
    let moves = ['rock', 'paper', 'scissors'];
    let generateRandomNum = 3;

    if(mainPageLinkBtn){
        moves.push('lizard', 'spock');
        generateRandomNum = 5;
    }
    return moves[Math.floor(Math.random() * generateRandomNum)];
}

function gameResult(uMove, hMove) {
    let gameWinner;

    if(bonusPageLinkBtn){
        if(uMove === hMove)  gameWinner = 0;
        else if(
            (uMove === "paper" && hMove === "rock") || 
            (uMove === "rock" && hMove === "scissors") || 
            (uMove === "scissors" && hMove === "paper")
        ) gameWinner = 1;
        else gameWinner = 2;
    }

    if(mainGamePannel){
        if(uMove === hMove) gameWinner = 0;
        else if(
            (uMove === "scissors" && hMove === "paper") || 
            (uMove === "scissors" && hMove === "lizard") || 
            (uMove === "paper" && hMove === "rock") || 
            (uMove === "paper" && hMove === "spock") || 
            (uMove === "rock" && hMove === "lizard") || 
            (uMove === "rock" && hMove === "scissors") || 
            (uMove === "lizard" && hMove === "spock") || 
            (uMove === "lizard" && hMove === "paper") || 
            (uMove === "spock" && hMove === "scissors") || 
            (uMove === "spock" && hMove === "rock")
        ) gameWinner = 1;
        else gameWinner = 2;
    }

    return gameWinner;
}

function resetGame(rText, uMB, hMB) {
    rText.classList.add("hidden");
    rText.classList.remove("flex");

    if(uMB.classList.contains("winner-rings")){
        uMB.classList.remove("winner-rings");
    }
    else{
        hMB.classList.remove("winner-rings");
    }

    if(!gameBox.classList.contains("block")){
        gameBox.classList.add("block");
        gameBox.classList.remove("hidden");
    }

    if(resultBox.classList.contains("flex")){
        resultBox.classList.remove("flex");
        resultBox.classList.add("hidden");
    }

    hMB.classList.add("animate-pulse");
    hMB.innerHTML = "";
}

function displayResult(uMove, hMove, uMoveBox, hMoveBox) {
    const resultText = document.querySelector(".result-text");
    const gameWinner = gameResult(uMove, hMove);

    // console.log("game result : " + gameWinner);

    setTimeout(() => {
        resultText.classList.add("flex");
        resultText.classList.remove("hidden");

        resultText.querySelector("h1").innerText = (gameWinner == 1) ? "you win" : (gameWinner == 2) ? "you lost" : "game drow";

        resultText.querySelector(".play-again-btn").addEventListener("click", () => {
            resetGame(resultText, uMoveBox, hMoveBox);
        });

        if(gameWinner == 1){
            uMoveBox.classList.add("winner-rings");
        }
        else if(gameWinner == 2){
            hMoveBox.classList.add("winner-rings");
        }

        // console.log(scoreText.innerHTML);
        if(gameWinner == 1){
            scoreText.innerHTML++;
        }
    }, 250);
}

openRuleBtn.addEventListener("click", () => {
    // console.log("open rules button is clicks");
    if(rulesPannel.classList.contains("hidden")){
        rulesPannel.classList.add("flex");
        rulesPannel.classList.remove("hidden");
    }
});

closeRuleBtn.addEventListener("click", () => {
    if(!rulesPannel.classList.contains("hidden")){
        rulesPannel.classList.remove("flex");
        rulesPannel.classList.add("hidden");
    }
});

gameBtns.forEach(btn => {
    btn.addEventListener("click", (e) => { 
        const userMove = resultBox.querySelector(".user-move");
        const homeMove = document.querySelector(".home-move");  
        const home = getHomeMove();
        
        gameBox.classList.remove("block");
        gameBox.classList.add("hidden");

        resultBox.classList.add("flex");
        resultBox.classList.remove("hidden");

        userMove.innerHTML = "";
        userMove.innerHTML += `
            <div class="md:h-60 md:w-60 h-28 w-28 md:p-6 p-4 rounded-full bg-(--${e.target.value}) shadow-[0_7px_var(--${e.target.value}-hover)] absolute top-1/2 left-1/2 -translate-1/2">
                <div class="h-full w-full bg-gray-100 rounded-full flex justify-center items-center shadow-[inset_0_7px_rgba(0,0,0,0.1)]">
                    <img src="./images/icon-${e.target.value}.svg" alt="" class="h-1/2">
                </div>
            </div> 
        `;

        navFreezAndMelt(true);
        
        setTimeout(() => {
            if(homeMove.classList.contains("animate-pulse")) homeMove.classList.remove("animate-pulse");
            homeMove.innerHTML += `
                <div class="md:h-60 md:w-60 h-28 w-28 md:p-6 p-4 rounded-full bg-(--${home}) shadow-[0_7px_var(--${home}-hover)] absolute top-1/2 left-1/2 -translate-1/2">
                    <div class="h-full w-full bg-gray-100 rounded-full flex justify-center items-center shadow-[inset_0_7px_rgba(0,0,0,0.1)]">
                        <img src="./images/icon-${home}.svg" alt="" class="h-1/2">
                    </div>
                </div> 
            `;

            navFreezAndMelt(false);
            displayResult(e.target.value, home, userMove, homeMove);
        }, 2000);
    });
});

if(bonusPageLinkBtn) bonusPageLinkBtn.addEventListener("click", () => window.location.href = 'bonus.html');
if(mainPageLinkBtn) mainPageLinkBtn.addEventListener("click", () => window.location.href = 'index.html');