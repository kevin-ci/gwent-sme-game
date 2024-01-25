let fightStatusElement = document.getElementById("fight-status");
let playerTurn = true;

let hero = {
    name: "Lyra",
    health: 100,
    attacks: {
        bite: ["mega chomp", "bite.mp3"],
        scratch: ["scritchy scratch", "scratch.mp3"],
        pounce: ["piledriver pounce", "pounce.mp3"],
    },
    displayHealth() {
        let heroHealthElement = document.getElementById("hero-health");
        heroHealthElement.innerText = hero.health;
    },
    attack(attackName) {
        let chosenAttack = this.attacks[attackName];
        playSound(chosenAttack[1]);
        let attackDisplayName = chosenAttack[0];
        let damage = Math.ceil(Math.random() * 20);
        fightStatusElement.innerText = `${hero.name} used her ${attackDisplayName} attack and inflicted ${damage} damage.`;
        return damage;
    },
};

let villain = {
    name: "Feathers McGraw",
    health: 100,
    attacks: [
        ["peck", "peck.mp3"],
        ["swoop", "swoop.mp3"],
        ["flap wings", "flap.mp3"],
    ],
    displayHealth() {
        let villainHealthElement = document.getElementById("villain-health");
        villainHealthElement.innerText = villain.health;
    },
    attack() {
        let randAttack = Math.floor(Math.random() * this.attacks.length);
        playSound(this.attacks[randAttack][1]);
        let attackDisplayName = this.attacks[randAttack][0];
        let damage = Math.ceil(Math.random() * 20);
        fightStatusElement.innerText = `${villain.name} used his ${attackDisplayName} attack and inflicted ${damage} damage.`;
        return damage;
    },
};

hero.displayHealth();
villain.displayHealth();

function handleButtonClick(event) {
    checkEndGame();
    if (playerTurn) {
        let attackData = event.target.dataset.attack;
        let damageToVillain = hero.attack(attackData);
        villain.health -= damageToVillain;
        villain.displayHealth();
        playerTurn = false;
        setTimeout(villainTurn, 5000);
    }
}

let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick);
}

function villainTurn() {
    if (villain.health <= 0) {
        checkEndGame();
        return;
    }
    let damageToHero = villain.attack();
    hero.health -= damageToHero;
    hero.displayHealth();
    playerTurn = true;
    checkEndGame();
}

function checkEndGame() {
    if (hero.health <= 0) {
        fightStatusElement.innerText = `${hero.name} has been slain!`;
        playerTurn = false;
    }
    else if (villain.health <= 0) {
        fightStatusElement.innerText = `${villain.name} has been slain!`;
        playerTurn = false;
    }
}

function playSound(fileName) {
    let path = 'assets/sounds/';
    let sound = new Audio(path + fileName);
    sound.play();
}