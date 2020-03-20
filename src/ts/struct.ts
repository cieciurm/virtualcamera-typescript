export class Point3D {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getCoordinates() {
        var c = [];
        c.push(this.x);
        c.push(this.y);
        c.push(this.z);

        return c;
    }

    translate(x: number, y: number, z: number) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    rotateOy(angle: number) {
        this.x = this.x * Math.cos(angle) + Math.sin(angle) * this.z;
        this.z = this.z * Math.cos(angle) - Math.sin(angle) * this.x;
    }

    rotateOx(angle: number) {
        this.y = this.y * Math.cos(angle) - Math.sin(angle) * this.z;
        this.z = this.y * Math.sin(angle) + Math.cos(angle) * this.z;
    }

    rotateOz(angle: number) {
        this.x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        this.y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
    }

    toString() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    }
}

export class Point2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Face {
    points: Point3D[];
    edges: any[];
    averageZ: number;
    cuboidId: number

    constructor(vertices: Point3D[], edges: any[]) {
        this.points = vertices;
        this.edges = edges;
    }

    getEdges() {
        return this.edges;
    }

    // return two elements array [Point3D; Point3D]
    getEdge(n: number) {
        if (n > 3 || n < 0)
            return [];

        var e = this.edges[n];
        var coord = [];
        coord.push(this.points[e[0]]);
        coord.push(this.points[e[1]]);

        return coord;
    }

    toString() {
        return this.edges.toString();
    }

    translate(x: number, y: number, z: number): void {
        for (var i = 0; i < this.points.length; i++)
            this.points[i].translate(x, y, z);
    }

    rotateOy(angle: number): void {
        for (var i = 0; i < this.points.length; i++)
            this.points[i].rotateOy(angle);
    }

    rotateOx(angle: number): void {
        for (var i = 0; i < this.points.length; i++)
            this.points[i].rotateOx(angle);
    }

    rotateOz(angle: number): void {
        for (var i = 0; i < this.points.length; i++)
            this.points[i].rotateOz(angle);
    }
}

export class Cuboid {
    faces: Face[];

    constructor(points: Point3D[]) {
        // 8 punktow w tablicy
        // konwencja 
        // dolna podstawa -> lewy dolny rog i clockwise,
        // gorna podstawa -> lewy dolny rog i clockwise
        this.faces = [];
        var e = [[0, 1], [1, 2], [2, 3], [3, 0]];

        // dolna podstawa
        var p = [points[0], points[1], points[2], points[3]];
        this.faces.push(new Face(p, e));

        // gorna podstawa
        p = [points[4], points[5], points[6], points[7]];
        this.faces.push(new Face(p, e));

        // boki
        p = [points[0], points[4], points[5], points[1]];
        this.faces.push(new Face(p, e));

        p = [points[3], points[7], points[6], points[2]];
        this.faces.push(new Face(p, e));

        // przod-tyl
        p = [points[0], points[4], points[7], points[3]];
        this.faces.push(new Face(p, e));

        p = [points[1], points[5], points[6], points[2]];
        this.faces.push(new Face(p, e));
    }

    addFace(face: Face) {
        this.faces.push(face);
    }

    getFaces() {
        return this.faces;
    }

    translate(x: number, y: number, z: number): void {
        for (var i = 0; i < this.faces.length; i++) {
            this.faces[i].translate(x, y, z);
        }
    }

    rotateOy(angle: number) {
        for (var i = 0; i < this.faces.length; i++)
            this.faces[i].rotateOy(angle);
    }

    rotateOx(angle: number) {
        for (var i = 0; i < this.faces.length; i++)
            this.faces[i].rotateOx(angle);
    }

    rotateOz(angle: number) {
        for (var i = 0; i < this.faces.length; i++)
            this.faces[i].rotateOz(angle);
    }
}