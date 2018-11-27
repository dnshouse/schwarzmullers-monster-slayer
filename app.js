new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
        },
        attack: function () {
            this.playerAttack(3, 10);
            this.monsterAttack(5, 12);
        },
        specialAttack: function () {
            this.playerAttack(12, 28);
            this.monsterAttack(5, 12);
        },
        heal: function () {
            if (this.playerHealth == 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals with 10'
            });

            this.monsterAttack(5, 12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = [];
        },

        playerAttack: function (min, max) {
            let damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster with ' + damage + ' damage'
            });
        },
        monsterAttack: function (min, max) {
            let damage = this.calculateDamage(min, max);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player with ' + damage + ' damage'
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});