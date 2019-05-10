
class Boundary {
    constructor(x1, y1, x2, y2, color) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        if(color) {
            this.red = random(150, 255);
            this.green = random(150, 255);
            this.blue = random(150, 255);
        }
        else{
            this.red = 255;
            this.green = 255;
            this.blue=255;
        }
    }

    update() {
        // this.a.set(this.a.x+1, this.a.y);
    }

    show() {
        stroke(color(this.red, this.green, this.blue));
        line(this.a.x, this.a.y, this.b.x, this.b.y);

    }
}

