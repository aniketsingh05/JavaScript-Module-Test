/**
User State
  id:
  name:
  type: (PERSON,COMPUTER)
  score:
**/

/**
  Game 
    users[]
    GameState: state
**/

/**
  GameState
    IDLE
    PLAYING
    ABORT
    END
**/

class User {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.score = 0;
    this.curr_weapon = null;
  }

  addToScore(value) {
    this.score += value;
  }

  getScore() {
    return this.score;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  resetUser() {
    this.score = 0;
    this.curr_weapon = null;
  }

  setCurrWeapon(weapon) {
    this.curr_weapon = weapon;
  }
}

class Game {
  constructor(users, total_clashes) {
    // Game states
    this.STATE_IDLE = "IDLE";
    this.STATE_PLAYING = "PLAYING";
    this.STATE_ABORT = "ABORT";
    this.STATE_END = "END";

    // Weapon Types
    this.WEAPON_STONE = "STONE";
    this.WEAPON_PAPER = "PAPER";
    this.WEAPON_SCISSORS = "SCISSORS";

    // Total clashes b/w players
    this.TOTAL_CLASHES = total_clashes;

    // Users and State Maintenance
    this.init(users);
  }

  init(users) {
    this.users = users;
    this.gameComesToAnEnd = false;
    this.currState = this.STATE_IDLE;
    this.roundWinner = "";
    this.finalWinner = "";
  }

  reset() {
    this.currState = this.STATE_IDLE;
    for (let user of this.users) user.resetUser();
    this.gameComesToAnEnd = false;
    this.roundWinner = "";
    this.finalWinner = "";
  }

  getRoundWinner() {
    return this.roundWinner;
  }

  getFinalWinner() {
    return this.finalWinner;
  }

  getState() {
    return this.currState;
  }

  setState(state) {
    this.currState = state;
  }

  startPlaying() {
    if (this.getState() !== this.STATE_IDLE)
      throw new Error("Game already in progess!");
    this.setState(this.STATE_PLAYING);
  }

  clash() {
    if (this.currState !== this.STATE_PLAYING)
      throw new Error("Start the game before clash...for god's sake :|");
    for (let i = 0; i < this.users.length; i++) {
      let gotcha = 0;
      for (let j = 0; j < this.users.length; j++) {
        if (i == j) continue;
        // RULES TO IDENTIFY THE WINNER...
        if (
          (this.users.at(i).curr_weapon === this.WEAPON_PAPER &&
            this.users.at(j).curr_weapon === this.WEAPON_STONE) ||
          (this.users.at(i).curr_weapon === this.WEAPON_SCISSORS &&
            this.users.at(j).curr_weapon === this.WEAPON_PAPER) ||
          (this.users.at(i).curr_weapon === this.WEAPON_STONE &&
            this.users.at(j).curr_weapon === this.WEAPON_SCISSORS)
        )
          gotcha = 1;
      }
      if (gotcha === 1) {
        this.users.at(i).addToScore(1);
        this.roundWinner =
          this.users.at(i).getType() === "USER_PERSON" ? "YOU WIN" : "YOU LOST";
      }

      //A check to see if any user hits the bar...
      if (this.users.at(i).getScore() === this.TOTAL_CLASHES)
        this.gameComesToAnEnd = true;
    }

    if (this.users.at(0).curr_weapon === this.users.at(1).curr_weapon)
      this.roundWinner = "DRAW";

    if (this.gameComesToAnEnd) {
      this.setState(this.STATE_END);
      this.declareWinner();
    }
  }

  declareWinner() {
    if (this.currState !== this.STATE_END)
      throw new Error("End the game then declare yourself a looser!");
    let cnt = 0,
      winner = "";
    for (let user of this.users) {
      if (user.getScore() === this.TOTAL_CLASHES) {
        cnt += 1;
        winner = user.getName();
      }
    }
    const msg = cnt > 1 ? "DRAW" : "🎊Winner " + winner;
    console.log(msg);
    this.finalWinner = msg;
  }

  getUsers() {
    return this.users;
  }
}
