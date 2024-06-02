let sample;
let rule_size = 3; //size of rule window (n by n)
let rules;
let sample_dim; //dimensions of sample
let size = 10; //pixle size of squares in each sample
let color_dictionairy = {
	0: [30, 30, 30],
	1: [128, 128, 128],
	2: [34, 177, 76],
	3: [255, 242, 0],
	4: [255, 0, 0]
}

function setup() {
	createCanvas(400, 400);
	sample_dim = createVector(10, 10);
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

	calculate_rules();
	console.log(rules);
}

function draw() {
	background(0);
	scale(1);

	draw_sample();
	translate(0, 105);
	draw_rules();
}

function draw_rules() {
	for (let n = 0; n < rules.length; n++) {
		for (let x = 0; x < rule_size; x++) {
			for (let y = 0; y < rule_size; y++) {
				fill(color_dictionairy[rules[n][x][y]])
				rect(floor(n / (sample_dim.x - rule_size + 1)) * (size * 2) + y * (size / 2), (n % (sample_dim.x - rule_size + 1)) * (size * 2) + x * (size / 2), (size / 2), (size / 2));
			}
		}
	}
}

function calculate_rules() {
	rules = [];

	let n = 0;
	for (let x = 0; x < sample_dim.x - rule_size + 1; x++) {
		for (let y = 0; y < sample_dim.x - rule_size + 1; y++) {
			rules[n] = [];
			for (let i = 0; i < rule_size; i++) {
				rules[n][i] = [];
				for (let j = 0; j < rule_size; j++) {
					rules[n][i][j] = sample[x + i][y + j];
				}
			}

			n++;
		}
	}

	rules.sort((a, b) => a[0][0] - b[0][0]);
}

function draw_sample() {
	for (let x = 0; x < sample_dim.x; x++) {
		for (let y = 0; y < sample_dim.y; y++) {
			// console.log("(" + x + ", " + y + ")");
			fill(color_dictionairy[sample[x][y]]);
			rect(y * 10, x * 10, 10, 10)
		}
	}
}
