class WaveField {
    constructor(dim, size, possibilities, rules) {
        this.dim = dim;
        this.size = size;
        this.possibilities = possibilities;
        this.rules = rules;
        this.field = [];
        this.innit_field();
    }

    innit_field() {
        this.field = [];
        for (let x = 0; x < this.dim.x; x++) {
            this.field[x] = [];
            for (let y = 0; y < this.dim.y; y++) {
                this.field[x][y] = new Cell(possibilities);
            }
        }
    }

    show(dict) {
        push();
        stroke(255);
        for (let x = 0; x < this.dim.x; x++) {
            for (let y = 0; y < this.dim.y; y++) {
                this.field[x][y].show(dict, x * this.size.x, y * this.size.y, this.size.x, this.size.y);
            }
        }
        pop();
    }

    collapse(x, y) {
        if (!this.field[x][y].collapsed) {
            this.field[x][y].state = random(this.field[x][y].possibilities);
            this.field[x][y].collapsed = true;
        }
    }
}

// when re-calculating possibilities:
// while looping over each of the points in the rule window
// it is valid if every point is contained in the possibilities list
// for a default cell would always be true, only the cells which have less entropy will need to be checked