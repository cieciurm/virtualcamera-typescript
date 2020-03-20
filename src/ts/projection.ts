import { Point2D, Point3D }from "./struct";

export class CameraProjector {
    zoom: number;
    width: number;
    height: number;

    constructor(height: number, width: number, zoom: number) {
        this.width = width;
        this.height = height;
        this.zoom = zoom;
    }

    setZoom(zoom: number) {
        this.zoom = zoom;
    }

    projectTo2D(v: Point3D): Point2D {
        if (v.z < 0) {
            var x = this.width / 2 + v.x * this.zoom / (1 / -v.z);
            var y = this.height / 2 - v.y * this.zoom / (1 / -v.z);
        }
        else {
            var x = this.width / 2 + v.x * this.zoom / v.z;
            var y = this.height / 2 - v.y * this.zoom / v.z;
        }

        return new Point2D(x, y);
    }
}