let walls = [];
let ray;
let particle;

function setup() {
	createCanvas(600, 550);
    walls.push(new Boundary(0,0, width, 0));
    walls.push(new Boundary(0,0, 0, height));
    walls.push(new Boundary(0,height, width, height));
    walls.push(new Boundary(width,0, width, height));
    for (i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls.push(new Boundary(x1, y1, x2, y2));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
        // walls.push(new Boundary(random(width), random(height), random(width), random(height)));
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
    particle.look(walls);
    particle.update(mouseX, mouseY);
    particle.show();

    // ray.look_at(mouseX, mouseY)

    // let pt = ray.cast(wall);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
}
