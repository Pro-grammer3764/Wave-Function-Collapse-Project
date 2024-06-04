class WaveField {
    constructor(dim, size, possibilities, rules, rule_size) {
        this.dim = dim;
        this.size = size;
        this.possibilities = possibilities;
        this.rules = rules;
        this.rule_size = rule_size;

        this.field = [];
        this.innit_field();
    }

    innit_field() {
        this.field = [];
        for (let x = 0; x < this.dim.x; x++) {
            this.field[x] = [];
            for (let y = 0; y < this.dim.y; y++) {
                this.field[x][y] = new Cell(this.possibilities, this.rules);
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
        // first collapse the cell
        if (!this.field[x][y].collapsed) {
            this.field[x][y].state = random(this.field[x][y].possible_cols);
            this.field[x][y].collapsed = true;
        }



        // determine which cells need to be checked
        let checks = this.possible_checks(x, y, this.rule_size, 0, this.dim.x, 0, this.dim.y);

        // foreach check location check every rule on that cell
        // if a rule cannot be possibly placed
    }

    calculate_cell_entropy(centerX, centerY) {
        // if the cell is already collapsed end calculation
        if (this.field[x][y].collapsed) {
            return;
        }

        let entropy = this.field[x][y].possible_rules.length;

        // go through all the rules
        this.rules.forEach((rule) => {
            let possible_passes = (this.rule_size * this.rule_size) - 1;
            let passes = 0;

            for (let x = 0; x < this.rule_size; x++) {
                for (let y = 0; y < this.rule_size; y++) {

                    let cx = centerX - ceil((this.rule_size - 1) / 2) + x;
                    let cy = centerY - ceil((this.rule_size - 1) / 2) + y;

                    if (cx < this.dim.x && cx >= 0 && cy < this.dim.y && cy >= 0) {
                        if (!(cx == centerX && cy == centerY)) {
                            // this is a cell that needs to contain the possibilitiy of the color

                            let col = rule[x][y];

                            if (this.field[cx][cy].possible_cols.includes(col)) {
                                // this cell is compatable with this part of the rule
                                passes++;
                            }
                        }
                    }
                }
            }

            if (passes < possible_passes) {
                // this cell is not compatable with this rule
            }
        });
    }

    possible_checks(centerX, centerY) {
        let checks = [];

        for (let x = 0; x < this.rule_size; x++) {
            for (let y = 0; y < this.rule_size; y++) {

                let cx = centerX - ceil((this.rule_size - 1) / 2) + x;
                let cy = centerY - ceil((this.rule_size - 1) / 2) + y;

                if (cx < this.dim.x && cx >= 0 && cy < this.dim.y && cy >= 0) {
                    if (!(cx == centerX && cy == centerY)) {
                        checks.push(createVector(cx, cy));
                    }
                }
            }
        }

        return checks;
    }
}

// when re-calculating possibilities:
// while looping over each of the points in the rule window
// it is valid if every point is contained in the possibilities list
// for a default cell would always be true, only the cells which have less entropy will need to be checked