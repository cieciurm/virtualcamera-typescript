import { Face, Cuboid } from  "./struct";
import { CameraProjector } from "./projection";

export class Drawer {
    canvas: HTMLCanvasElement;
    projector: CameraProjector;
    color: string;

    constructor(canvas: HTMLCanvasElement, projector: CameraProjector) {
        this.canvas = canvas;
        this.projector = projector;
    }

    drawFace(face: Face, color: string, grid: boolean): void {
        this.color = color;
        var ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        for (var i = 0; i < face.edges.length; i++) {

            var edge = face.getEdge(i);

            var firstPointProjected = this.projector.projectTo2D(edge[0]);

            var secondPointProjected = this.projector.projectTo2D(edge[1]);

            if (i == 0)
                ctx.moveTo(firstPointProjected.x, firstPointProjected.y);
            else
                ctx.lineTo(firstPointProjected.x, firstPointProjected.y);

            ctx.lineTo(secondPointProjected.x, secondPointProjected.y);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        if (grid == true)
            ctx.strokeStyle = "black";//this.color;
        else
            ctx.strokeStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    drawCuboid(cuboid: Cuboid, color: string): void {

        var faces = cuboid.getFaces();
        this.color = color;

        for (var i = 0; i < faces.length; i++) {
            this.drawFace(faces[i], color, true);
        }
    }

    clearScreen(): void {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}