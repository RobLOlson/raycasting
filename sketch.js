let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

function setup() {
	createCanvas(800, 400);
    walls.push(new Boundary(0,0, sceneW, 0));
    walls.push(new Boundary(0,0, 0, sceneH));
    walls.push(new Boundary(0,sceneH, sceneW, sceneH));
    walls.push(new Boundary(sceneW,0, sceneW, sceneH));
    for (i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls.push(new Boundary(x1, y1, x2, y2));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
        // walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
    }
    particle = new Particle();
}

function draw() {
    background(0);
    for(let wall of walls)
    {
        wall.update();
        wall.show();
    }
    const scene = particle.look(walls);

    const w = sceneW / scene.length;
    push();
    translate(sceneW,0);
    for (let i = 0; i < scene.length; i ++) {
        noStroke();
        const h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(255-scene[i]);
        rectMode(CENTER);
        rect(i*w + w / 2, sceneH / 2, w, h);

    }
    pop();
    particle.update(mouseX, mouseY);
    particle.show();

    // ray.look_at(mouseX, mouseY)

    // let pt = ray.cast(wall);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
}
