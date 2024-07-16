const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 14;
const healValue = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum life for you and the monster?", "100");
  let parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number!" };
  }
  return parsedValue;
}

let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValues();
} catch (hata) {
  console.log(hata);
  chosenMaxLife = 100;
  alert("You entered something wrong, default value of 100 was used");
}

let monsterCurrentHealth = chosenMaxLife;
let playerCurrentHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK || LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  }
  if (event === LOG_EVENT_MONSTER_ATTACK || LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "PLAYER";
  }
  battleLog.push(logEntry);
}

function reset() {
  monsterCurrentHealth = chosenMaxLife;
  playerCurrentHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  // const initialPlayerHealth = playerCurrentHealth;
  const playerDamage = dealPlayerDamage(monsterAttackValue);
  playerCurrentHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    monsterCurrentHealth,
    playerCurrentHealth
  );

  if (playerCurrentHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    playerCurrentHealth = 50;
    alert("You have a second chance. Don't die'!!");
    setPlayerHealth(playerCurrentHealth);
  }

  if (monsterCurrentHealth <= 0 && playerCurrentHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      monsterCurrentHealth,
      playerCurrentHealth
    );
  } else if (playerCurrentHealth <= 0 && monsterCurrentHealth > 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      monsterCurrentHealth,
      playerCurrentHealth
    );
  } else if (playerCurrentHealth <= 0 && monsterCurrentHealth <= 0) {
    alert("Draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      monsterCurrentHealth,
      playerCurrentHealth
    );
  }

  if (monsterCurrentHealth <= 0 || playerCurrentHealth <= 0) {
    alert("GAME OVER");
    reset();
  }
}

function monsterAttack(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    logEvent = LOG_EVENT_PLAYER_ATTACK;
    maxDamage = attackValue;
  } else if (mode === MODE_STRONG_ATTACK) {
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    maxDamage = strongAttackValue;
  }
  const damage = dealMonsterDamage(maxDamage);
  monsterCurrentHealth -= damage;
  writeToLog(logEvent, damage, monsterCurrentHealth, playerCurrentHealth);
  endRound();
}

function attackHandler() {
  monsterAttack(MODE_ATTACK);
}

function strongAttackHandler() {
  monsterAttack(MODE_STRONG_ATTACK);
}

function healHandler() {
  let healing;
  if (playerCurrentHealth > chosenMaxLife - healValue) {
    alert("You can't heal yourself anymore!");
    healing = chosenMaxLife - playerCurrentHealth;
  } else {
    healing = healValue;
  }
  increasePlayerHealth(healing);
  playerCurrentHealth += healing;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healing,
    monsterCurrentHealth,
    playerCurrentHealth
  );
  endRound();
}

function logHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    i++;
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key} => ${logEntry[key]}`);
    }
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logHandler);
