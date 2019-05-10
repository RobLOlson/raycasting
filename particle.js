class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.prev_pos = this.pos;
        this.heading = 0;
        this.fov = 45;
        this.mouse_mode = true;
        this.v = 0;
        this.rays = [];
        this.wall_id = [];
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
        this.wall_id = [];
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            let index = 0;
            let target_i = 0;

            for(let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    if (d<record) {
                        record = d;
                        closest = pt;
                        target_i = index;
                    }
                }
                index+=1;
            }
            if(closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }

                let a = ray.dir.heading() - radians(this.heading);
                scene.push(record*cos(a));
                this.wall_id.push(target_i);
        }
        return scene

        // const scene = [];
        // for (let ray of this.rays) {
        //     let closest = null;
        //     let record = Infinity;
        //     scene_colors = [];
        //     for(let wall of walls) {
        //         const pt = ray.cast(wall);
        //         if (pt) {
        //             let d = p5.Vector.dist(this.pos, pt);
        //             if (d<record) {
        //                 record = d;
        //                 closest = pt;
        //             }
        //         }
        //     }
        //     if(closest) {
        //         stroke(255, 100);
        //         line(this.pos.x, this.pos.y, closest.x, closest.y);
        //     }
                let a = ray.dir.heading() - radians(this.heading);
        //         scene.push(record*cos(a));
        // }
        // return scene
    }

    update(x, y) {
        let dir = p5.Vector.fromAngle(radians(this.heading));
        if(this.v != 0)
        {
            this.pos.set(this.pos.x+dir.x*this.v, this.pos.y+dir.y*this.v);
        }


        if(x != this.pos.x && y != this.pos.y  && this.v==0 && this.mouse_mode) {
        // if(this.pos != this.prev_pos) {
            let dx = x - this.pos.x;
            let dy = y - this.pos.y;

            dx = dx / 50;
            dy = dy / 50;

            let dir = createVector(dx,dy);

            this.heading = degrees(dir.heading());

            for (let i = 0; i < this.fov*2; i += 1) {
                this.rays[i].pos = this.pos;
                this.rays[i].look_at_angle(radians(this.heading+i-this.fov));
            }
            if(dir.magSq() > .0001)
            {
                this.pos.set(this.pos.x+dx, this.pos.y +dy);
            }
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
