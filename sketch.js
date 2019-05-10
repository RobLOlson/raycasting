let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

function setup() {
	createCanvas(800, 400);
    walls.push(new Boundary(0,0, sceneW, 0, false));
    walls.push(new Boundary(0,0, 0, sceneH, false));
    walls.push(new Boundary(0,sceneH, sceneW, sceneH, false));
    walls.push(new Boundary(sceneW,0, sceneW, sceneH, false));
    for (i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls.push(new Boundary(x1, y1, x2, y2, true));
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
    if(keyIsPressed&&particle.mouse_mode)
    {
        particle.mouse_mode = false;
    }
    else if (mouseIsPressed)
    {
        particle.mouse_mode = true;
    }
    if(!particle.mouse_mode){
        if(keyIsDown(LEFT_ARROW)){
            particle.rotate(-1);
        }
        else if(keyIsDown(RIGHT_ARROW)){
            particle.rotate(1);
        }
        if(keyIsDown(UP_ARROW)){
            particle.v = 1;
        }
        else if(keyIsDown(DOWN_ARROW)) {
            particle.v = -1;
        }
        else {
            particle.v = 0;
        }
    }

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
        let red = walls[particle.wall_id[i]].red;
        let green = walls[particle.wall_id[i]].green;
        let blue = walls[particle.wall_id[i]].blue;

        const h = map(scene[i], 0, sceneW, 25*sceneH/scene[i], 0);
        fill(red-scene[i], green-scene[i], blue-scene[i]);
        rectMode(CENTER);
        rect(i*w + w / 2, sceneH / 2, w+1, h);

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
