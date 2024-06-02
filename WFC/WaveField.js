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
                this.field[x][y] = random(this.possibilities);
            }
        }
    }

    show(dict) {
        push();
        stroke(255);
        for (let x = 0; x < this.dim.x; x++) {
            for (let y = 0; y < this.dim.y; y++) {
                fill(dict[this.field[x][y]]);
                rect(x * this.size.x, y * this.size.y, this.size.x, this.size.y);
            }
        }
        pop();
    }
}