const tic_tac_toe = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function () {
            this.turn_index = this.turn_index === 0 ? 1 : 0;
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init: function (container) {
        this.container_element = container;
    },

    make_play: function (pos) {
        if (this.gameover) {
            return false;
        }

        if (this.board[pos] === '') {
            this.board[pos] = this.simbols.options[this.simbols.turn_index];

            this.draw();

            let winning_sequences_index = this.check_winning_sequences(this.simbols.options[this.simbols.turn_index]);

            if (winning_sequences_index >= 0) {
                this.game_is_over();
            }
            else {
                this.simbols.change();
            }

            return true;
        }

        return false;
    },

    game_is_over: function () {
        this.gameover = true;
    },

    start: function () {
        // Fill all board elements with this value
        this.board.fill('');

        this.draw();

        this.gameover = false;
    },

    check_winning_sequences: function (simbol) {
        let win = -1;

        this.winning_sequences.forEach((o, i) => {
            if (this.board[o[0]] == simbol
                && this.board[o[1]] == simbol
                && this.board[o[2]] == simbol) {
                win = i;
            }
        });

        return win;
    },

    draw: function () {
        let content = '';

        this.board.forEach((val, i) => {
            content += `<div onclick="tic_tac_toe.make_play(${i})">${val}</div>`;
        });

        this.container_element.innerHTML = content;
    }
};