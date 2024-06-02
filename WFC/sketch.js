let dim;
let size;
let field;
let rules;

let sample;
let color_dictionairy = {
    0: [30, 30, 30],
    1: [128, 128, 128],
    2: [34, 177, 76],
    3: [255, 242, 0],
    4: [255, 0, 0]
}

// the first cell which gets collapsed by default
let icebreak = [0, 0];

function setup() {
    createCanvas(400, 400);

    // innitialize sample
    sample = [];
    sample[0] = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0];
    sample[1] = [0, 1, 1, 1, 1, 1, 1, 1, 0, 0];
    sample[2] = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0];
    sample[3] = [0, 1, 0, 2, 2, 2, 0, 1, 1, 1];
    sample[4] = [1, 1, 1, 2, 2, 2, 1, 1, 0, 0];
    sample[5] = [0, 1, 0, 2, 2, 2, 0, 1, 1, 1];
    sample[6] = [0, 3, 0, 0, 0, 1, 0, 0, 0, 0];
    sample[7] = [0, 1, 0, 1, 1, 1, 0, 2, 2, 0];
    sample[8] = [0, 1, 1, 1, 0, 1, 0, 2, 2, 0];
    sample[9] = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0];

    let rulegen = new RuleGen(sample, createVector(10, 10), 3);

    rules = rulegen.calculate_rules(true);
    possibilities = rulegen.calculate_possibilities();

    dim = createVector(40, 40);
    size = createVector(width / dim.x, height / dim.y);

    field = new WaveField(dim, size, possibilities, rules);

    field.collapse(icebreak[0], icebreak[1]);
}

function draw() {
    background(0);
    field.show(color_dictionairy);
}

function mouseClicked() {
    let x = floor(mouseX / size.x);
    let y = floor(mouseY / size.y);

    field.collapse(x, y);
}