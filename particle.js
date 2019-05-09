class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let i = 0; i < 360; i += 2) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    look(wall) {
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
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }

    update(x, y) {
        this.pos.set(x,y);
    }

    show() {

        fill(255);
        ellipse(this.pos.x, this.pos.y, 8);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
