class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.prev_pos = this.pos;
        this.heading = 0;
        this.fov = 45;
        this.rays = [];
        for (let i = -this.fov; i < this.fov; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    rotate(angle) {
        this.heading += angle;
        for(let i = 0; i < 2*this.fov; i += 1) {
            this.rays[i].look_at_angle(radians(i+this.heading-this.fov));
        }
    }

    look(wall) {
        const scene = [];
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for(let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d<record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if(closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
                scene.push(record);
        }
        return scene
    }

    update(x, y) {



        if(x != this.pos.x && y != this.pos.y) {
        // if(this.pos != this.prev_pos) {
            let dx = x - this.pos.x;
            let dy = y - this.pos.y;

            dx = dx / 3;
            dy = dy / 3;

            let dir = createVector(dx,dy);

            console.log(degrees(dir.heading()));

            if(dir.magSq() > 0.01)
            this.heading = (degrees(dir.heading())+9*this.heading)/10;

            for (let i = 0; i < this.fov*2; i += 1) {
                this.rays[i].pos = this.pos;
                this.rays[i].look_at_angle(radians(this.heading+i-this.fov));
            }

            this.pos.set(this.pos.x+dx, this.pos.y +dy);
        }
    }

    show() {

        fill(255);
        ellipse(this.pos.x, this.pos.y, 8);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
