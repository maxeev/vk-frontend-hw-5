import { enemyAttack, playerAttack, showResult } from '../utils/utils.js';
import { generateLogs } from './logs.js';
import Player from './Player.js';

export default class Game {
    constructor() {
        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control'); 
        this.$randomButton = document.querySelector('.button'); 
        this.$chat = document.querySelector('.chat'); 
        const player1Data = JSON.parse(localStorage.getItem('player1'));
        const player2Data = JSON.parse(localStorage.getItem('player2'));

        this.player1 = new Player({
            player: 1,
            name: player1Data.name,
            hp: 100,
            img: player1Data.gif,
            rootSelector: 'arenas',
        });

        this.player2 = new Player({
            player: 2,
            name: player2Data.name,
            hp: 100,
            img: player2Data.gif,
            rootSelector: 'arenas',
        });

        this.$formFight.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
        const { hit, defence, value } = playerAttack(this.$formFight); 

        if (defence !== hitEnemy) {
            this.player1.changeHP(valueEnemy);
            this.player1.renderHP();
            generateLogs('hit', this.player2, this.player1, valueEnemy, this.$chat); 
        } else {
            generateLogs('defence', this.player2, this.player1, null, this.$chat); 
        }

        if (defenceEnemy !== hit) {
            this.player2.changeHP(value);
            this.player2.renderHP();
            generateLogs('hit', this.player1, this.player2, value, this.$chat); 
        } else {
            generateLogs('defence', this.player1, this.player2, null, this.$chat); 
        }

        showResult(this.player1, this.player2, this.$randomButton, this.$arenas, this.$chat); 
    }

    start() {
        this.player1.createPlayer();
        this.player2.createPlayer();
        generateLogs('start', this.player1, this.player2, null, this.$chat); 
    }
}