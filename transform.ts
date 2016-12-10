export interface Transform {
    mirrorHorizontal(x: number, y: number): [number, number];
    mirrorVertical(x: number, y: number): [number, number];
    diagonal(x: number, y: number): [number, number];
}

export function createTransform(width: number, height: number): Transform {
    return new TransformImpl(width, height);
}

class TransformImpl implements Transform {

    constructor (public width: number, public height: number) {}

    mirrorHorizontal(x: number, y: number): [number, number] {
        return [this.width - x, y];
    }

    mirrorVertical(x: number, y: number): [number, number] {
        return [x, this.height - y];
    }

    diagonal(x: number, y: number): [number, number] {
        return [y, x];
    }
}
