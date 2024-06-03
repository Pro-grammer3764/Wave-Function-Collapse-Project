class RuleGen {
    constructor(sample, dim, rule_size) {
        this.sample = sample;
        this.dim = dim;
        this.rule_size = rule_size;
    }

    calculate_rules(sorted) {
        rules = [];

        let n = 0;
        for (let x = 0; x < this.dim.x - this.rule_size + 1; x++) {
            for (let y = 0; y < this.dim.y - this.rule_size + 1; y++) {
                rules[n] = [];
                for (let i = 0; i < this.rule_size; i++) {
                    rules[n][i] = [];
                    for (let j = 0; j < this.rule_size; j++) {
                        rules[n][i][j] = this.sample[x + i][y + j];
                    }
                }

                n++;
            }
        }

        if (sorted) {
            let mid = ceil((this.rule_size - 1) / 2);
            rules.sort((a, b) => a[mid][mid] - b[mid][mid]);
        }

        return rules;
    }

    calculate_possibilities() {
        let possibilities = [];

        for (let x = 0; x < this.dim.x; x++) {
            for (let y = 0; y < this.dim.x; y++) {
                let item = sample[x][y];

                if (!possibilities.includes(item)) {
                    possibilities.push(item);
                }
            }
        }

        return possibilities.sort();
    }
}