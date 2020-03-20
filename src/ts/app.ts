import { Point3D, Face, Cuboid } from "./struct";
import { CameraProjector } from "./projection";
import { Drawer } from "./drawing";
import { compare } from "./sorting";

window.onload = () => {
    var canvas: any = document.getElementById("myCanvas"),
        cuboids,
        projector,
        drawer,
        zoom = 120,
        zoomThreshold = 5,
        translationStep = 2,
        rotationStep = 0.01;

    projector = new CameraProjector(canvas.height, canvas.width, zoom);
    drawer = new Drawer(canvas, projector);

    cuboids = initScene();
    drawScene(canvas, cuboids, projector, drawer);

    /* Zoom */
    var zoomIn = document.getElementById("zoom-in");
    zoomIn.onclick = () => {
        zoom += zoomThreshold;

        projector.setZoom(zoom);
        drawScene(canvas, cuboids, projector, drawer);
    };

    var zoomOut = document.getElementById("zoom-out");
    zoomOut.onclick = () => {
        zoom -= zoomThreshold;

        projector.setZoom(zoom);
        drawScene(canvas, cuboids, projector, drawer);
    };

    /* Translation */
    var up = document.getElementById("up");
    up.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(0, -translationStep, 0);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var down = document.getElementById("down");
    down.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(0, translationStep, 0);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var left = document.getElementById("left");
    left.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(translationStep, 0, 0);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var right = document.getElementById("right");
    right.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(-translationStep, 0, 0);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var deep = document.getElementById("deep");
    deep.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(0, 0, -translationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var shallow = document.getElementById("shallow");
    shallow.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].translate(0, 0, translationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    /* Rotation */
    var rotateOyPlus = document.getElementById("rot-oy-plus");
    rotateOyPlus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOy(rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var rotateOyMinus = document.getElementById("rot-oy-minus");
    rotateOyMinus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOy(-rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var rotateOxPlus = document.getElementById("rot-ox-plus");
    rotateOxPlus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOx(rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var rotateOxMinus = document.getElementById("rot-ox-minus");
    rotateOxMinus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOx(-rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var rotateOzPlus = document.getElementById("rot-oz-plus");
    rotateOzPlus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOz(rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };

    var rotateOzMinus = document.getElementById("rot-oz-minus");
    rotateOzMinus.onclick = () => {
        for (var i = 0; i < cuboids.length; i++)
            cuboids[i].rotateOz(-rotationStep);

        drawScene(canvas, cuboids, projector, drawer);
    };
};

function setCuboidIdForFace(face: Face[], cuboidId: number) {
    for (var i = 0; i < face.length; i++)
        face[i].cuboidId = cuboidId;
}

function drawScene(canvas : HTMLCanvasElement, cuboids: Cuboid[], projector: CameraProjector, drawer: Drawer) {
    // bierzemy wszystkie ściany
    // liczymy dla nich średniego Z
    // sortujemy po Z
    // malujemy od końca
    var i, j, k;
    var faces = [];

    for (i = 0; i < 3; i++) {
        console.log(i);
        var faceX = [];
        faceX = cuboids[i].getFaces();

        for (j = 0; j < 3; j++) {
            faceX = splitFaces(faceX);
        }

        setCuboidIdForFace(faceX, i);
        for (k = 0; k < faceX.length; k++)
            faces.push(faceX[k]);
    }
   
    for (j = 0; j < faces.length; j++) {
        faces[j].averageZ = (faces[j].points[0].z + faces[j].points[1].z
                            + faces[j].points[2].z + faces[j].points[3].z) / 4;
    }

    faces.sort(compare);

    drawer.clearScreen();
    var showGrid = <HTMLInputElement>document.getElementById("grid");
    
    var colors = ["red", "blue", "green"];
    for (i = 0; i < faces.length; i++) {
        var color;
        if (faces[i].cuboidId == 1)
            color = colors[0];
        else if (faces[i].cuboidId == 2)
            color = colors[1];
        else
            color = colors[2];

        drawer.drawFace(faces[i], color, showGrid.checked);
    }
}

function initScene() : Cuboid[] {
    var p1 = [
        new Point3D(10, -10, 25),
        new Point3D(10, -10, 10),
        new Point3D(25, -10, 10),
        new Point3D(25, -10, 25),
        new Point3D(10, 10, 25),
        new Point3D(10, 10, 10),
        new Point3D(25, 10, 10),
        new Point3D(25, 10, 25)
    ];

    var p2 = [
        new Point3D(-20, -10, 35),
        new Point3D(-20, -10, 20),
        new Point3D(-50, -10, 20),
        new Point3D(-50, -10, 35),
        new Point3D(-20, 10, 35),
        new Point3D(-20, 10, 20),
        new Point3D(-50, 10, 20),
        new Point3D(-50, 10, 35)
    ];

    var p3 = [
        new Point3D(10, -10, 55),
        new Point3D(10, -10, 40),
        new Point3D(25, -10, 40),
        new Point3D(25, -10, 55),
        new Point3D(10, 40, 55),
        new Point3D(10, 40, 40),
        new Point3D(25, 40, 40),
        new Point3D(25, 40, 55)
    ];

    var cuboids = [];
    cuboids.push(new Cuboid(p2));
    cuboids.push(new Cuboid(p3));
    cuboids.push(new Cuboid(p1));

    return cuboids;
}

function splitFaces(faces: Face[]) {
    var splittedFaces = [];
    
    for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        //console.log(face1);

        var p4 = makePointInBetween(face.points[0], face.points[1]);
        var p5 = makePointInBetween(face.points[1], face.points[2]);
        var p6 = makePointInBetween(face.points[2], face.points[3]);
        var p7 = makePointInBetween(face.points[0], face.points[3]);
        var p8 = makePointInBetween(p4, p6);

        var edges = [[0, 1], [1, 2], [2, 3], [3, 0]];

        var f1 = new Face([face.points[0], p4, p8, p7], edges);
        var f2 = new Face([p4, face.points[1], p5, p8], edges);
        var f3 = new Face([p8, p5, face.points[2], p6], edges);
        var f4 = new Face([p7, p8, p6, face.points[3]], edges);

        splittedFaces.push(f1);
        splittedFaces.push(f2);
        splittedFaces.push(f3);
        splittedFaces.push(f4);

        //drawer.drawFace(f1, "red");
        //drawer.drawFace(f2, "green");
        //drawer.drawFace(f3, "yellow");
        //drawer.drawFace(f4, "blue");
    }
    return splittedFaces;
}

function makePointInBetween(p1: Point3D, p2: Point3D): Point3D {
    var x = (p1.x + p2.x) / 2;
    var y = (p1.y + p2.y) / 2;
    var z = (p1.z + p2.z) / 2;

    return new Point3D(x, y, z);
}