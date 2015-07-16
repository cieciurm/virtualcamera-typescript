module Sorting {
    import Face = Struct.Face;

    export function compare(a: Face, b: Face) {
        if (a.averageZ < b.averageZ)
            return 1;
        if (a.averageZ > b.averageZ)
            return -1;
        return 0;
    }
}