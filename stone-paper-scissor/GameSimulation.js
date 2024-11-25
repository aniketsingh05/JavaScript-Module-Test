//Selecting the DOM elemets...
const weapons = document.querySelectorAll(".weapon");
const weaponsDiv = document.querySelector(".weapons");
const weaponsAfterSelect = document.querySelector(".weapons-after-select");
const userPickedWeapon = document.querySelector(".user-picked");
const computerPickedWeapon = document.querySelector(".computer-picked");
const userPickedWeaponIcon = document.querySelector(".user-picked i");
const computerPickedWeaponIcon = document.querySelector(".computer-picked i");
const compCurrScore = document.querySelector(".comp-curr-score");
const userCurrScore = document.querySelector(".user-curr-score");
const whoWins = document.querySelector(".who-wins");
const playBtn = document.querySelector(".play-next-chance-btn");
const restartBtn = document.querySelector(".play-restart-btn");
const rulesBtn = document.querySelector(".rules-button");
const rulesDiv = document.querySelector(".rules");
const cancelBtn = document.querySelector(".cancel");

// Defining the users of our game
const person = new User(1, "Aniket", "USER_PERSON");
const machine = new User(2, "Pc", "USER_COMPUTER");

//Initializing the game
const game = new Game([person, machine], 10);
//Starting the game
game.startPlaying();

//Listing for user action to select a weapon and play...
var userWeaponClassName;
var compterWeaponClassName;
var userWeaponIconClassName;
var computerWeaponIconClassName;
weapons.forEach((weapon) => {
  weapon.addEventListener("click", (e) => {
    // user's weapon
    const usersWeapon = weapon.classList[2].split("-")[1];
    const machinesWeapon = ["stone", "paper", "scissors"].at(
      Math.floor(Math.random() * 3)
    );
    console.log(usersWeapon);
    console.log(machinesWeapon);

    //setting the weapons
    for (user of game.getUsers()) {
      if (user.getType() === "USER_PERSON")
        user.setCurrWeapon(usersWeapon.toUpperCase());
      if (user.getType() === "USER_COMPUTER")
        user.setCurrWeapon(machinesWeapon.toUpperCase());
    }
    //Let the battle begins...
    game.clash();

    //UPDATE THE UI
    for (user of game.getUsers()) {
      console.log("I am in !..." + user.getScore());
      if (user.getType() === "USER_PERSON")
        userCurrScore.innerHTML = user.getScore();
      if (user.getType() === "USER_COMPUTER")
        compCurrScore.innerHTML = user.getScore();
    }
    //Do the necessary hides and shows
    weaponsDiv.classList.add("hidden");
    weaponsAfterSelect.classList.remove("hidden");
    //
    userWeaponClassName = `weapon-${usersWeapon}`;
    compterWeaponClassName = `weapon-${machinesWeapon}`;
    userWeaponIconClassName = `fa-hand${
      usersWeapon === "scissors"
        ? "-scissors"
        : usersWeapon === "stone"
        ? "-back-fist"
        : ""
    }`;
    computerWeaponIconClassName = `fa-hand${
      machinesWeapon === "scissors"
        ? "-scissors"
        : machinesWeapon === "stone"
        ? "-back-fist"
        : ""
    }`;
    //
    userPickedWeapon.classList.add(userWeaponClassName);
    computerPickedWeapon.classList.add(compterWeaponClassName);

    userPickedWeaponIcon.classList.add(userWeaponIconClassName);
    computerPickedWeaponIcon.classList.add(computerWeaponIconClassName);
    whoWins.innerHTML = `${game.getRoundWinner()}`;

    console.log(game.getFinalWinner());
    console.log(game.finalWinner);
    //Check if we found our winner...
    if (game.finalWinner) {
      console.log("I am in bitch!");
      playBtn.classList.add("hidden");
      restartBtn.classList.remove("hidden");
      whoWins.innerHTML = `${game.getFinalWinner()}`;
    }
  });
});

playBtn.addEventListener("click", (e) => {
  resetClasses();
});

restartBtn.addEventListener("click", (e) => {
  resetClasses();
  //reset the game
  game.reset();
  //starting the game
  game.startPlaying();
  //reset the buttons
  playBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");

  userCurrScore.innerHTML = 0;
  compCurrScore.innerHTML = 0;
});

function resetClasses() {
  userPickedWeapon.classList.remove(userWeaponClassName);
  computerPickedWeapon.classList.remove(compterWeaponClassName);
  userPickedWeaponIcon.classList.remove(userWeaponIconClassName);
  computerPickedWeaponIcon.classList.remove(computerWeaponIconClassName);
  weaponsAfterSelect.classList.add("hidden");
  weaponsDiv.classList.remove("hidden");
}

rulesBtn.addEventListener("click", () => {
  rulesDiv.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  rulesDiv.classList.add("hidden");
});
