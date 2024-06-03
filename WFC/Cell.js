class Cell {
    constructor(possible_cols, possible_rules) {
        this.possible_cols = possible_cols;
        this.possible_rules = possible_rules;
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

        //if not collapsed draw the square average color of all the possible_cols
        let col = [0, 0, 0];

        let l = this.possible_rules.length;

        for (let i = 0; i < l; i++) {
            col[0] += dict[this.possible_rules[i][1][1]][0];
            col[1] += dict[this.possible_rules[i][1][1]][1];
            col[2] += dict[this.possible_rules[i][1][1]][2];
        }

        col[0] = col[0] / l, 1;
        col[1] = col[1] / l, 1;
        col[2] = col[2] / l, 1;

        fill(col);
        rect(x, y, x + w, y + h);
    }
}