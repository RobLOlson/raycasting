
class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    update() {
        // this.a.set(this.a.x+1, this.a.y);
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);

    }
}

