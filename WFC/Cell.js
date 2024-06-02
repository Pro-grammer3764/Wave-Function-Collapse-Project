class Cell {
    constructor(possibilities) {
        this.possibilities = possibilities;
        this.collapsed = false;
        this.state = null;
    }

    show(dict, x, y, w, h) {
        //if collapsed draw the current state
        if (this.collapsed) {
            fill(dict[this.state]);
            rect(x, y, x + w, y + h);
            return;
        }

        //if not collapsed draw the square average color of all the possibilities
        let col = [0, 0, 0];

        for (let i = 0; i < this.possibilities.length; i++) {
            col[0] += pow(dict[this.possibilities[i]][0], 2);
            col[1] += pow(dict[this.possibilities[i]][1], 2);
            col[2] += pow(dict[this.possibilities[i]][2], 2);
        }

        col[0] = pow(col[0] / this.possibilities.length, 0.5);
        col[1] = pow(col[1] / this.possibilities.length, 0.5);
        col[2] = pow(col[2] / this.possibilities.length, 0.5);

        fill(col);
        rect(x, y, x + w, y + h);
    }

    collapse() {
        //collapse cell to random state from its possibilities
        if (!this.collapsed) {
            this.state = random(this.possibilities);
            this.collapsed = true;
        }
    }
}