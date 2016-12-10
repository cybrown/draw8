import {createTransform} from './transform';

const meta = document.createElement('meta');
meta.setAttribute('name', 'viewport');
meta.setAttribute('content', 'width=device-width, user-scalable=no');
document.head.appendChild(meta);

const div = document.createElement('div');
div.innerHTML = `
    <canvas></canvas>
    <div class="fixed">
        <input type="color" class="x-color" />
    </div>
`

const style = document.createElement('style');

style.innerHTML = `


    * {
        box-sizing: border-box;
    }

    body > div {
        height: 100%;
    }
    
    canvas {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .fixed {
        position: fixed;
        top: 0;
        left: 0;
    }
`;

document.head.appendChild(style);

document.body.appendChild(div);

const canvas = document.getElementsByTagName('canvas')[0];
const inColor = <HTMLInputElement> document.getElementsByClassName('x-color')[0];


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const transform = createTransform(canvas.width, canvas.height);

let color = 'black';

const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error('Can not create context');
}

inColor.addEventListener('change', (e) => {
    color = (<any> e.target).value;
    ctx.strokeStyle = color;
});

let oldX = 0;
let oldY = 0;

const drawHandler = (x: number, y: number) => {

    const [oldXMV, oldYMV] = transform.mirrorHorizontal(oldX, oldY);
    const [elXMV, elYMV] = transform.mirrorHorizontal(x, y);
    const [oldXMH, oldYMH] = transform.mirrorVertical(oldX, oldY);
    const [elXMH, elYMH] = transform.mirrorVertical(x, y);
    const [oldXMVMH, oldYMVMH] = transform.mirrorVertical(oldXMV, oldYMV);
    const [elXMVMH, elYMVMH] = transform.mirrorVertical(elXMV, elYMV);
    const [oldXD, oldYD] = transform.diagonal(oldX, oldY);
    const [eXD, eYD] = transform.diagonal(x, y);
    const [oldXDMV, oldYDMV] = transform.mirrorVertical(oldXD, oldYD);
    const [eXDMV, eYDMV] = transform.mirrorVertical(eXD, eYD);
    const [oldXDMH, oldYDMH] = transform.mirrorHorizontal(oldXD, oldYD);
    const [eXDMH, eYDMH] = transform.mirrorHorizontal(eXD, eYD);
    const [oldXDMVMH, oldYDMVMH] = transform.mirrorHorizontal(oldXDMV, oldYDMV);
    const [eXDMVMH, eYDMVMH] = transform.mirrorHorizontal(eXDMV, eYDMV);

    [
        [oldX, oldY, x, y],
        [oldXMV, oldYMV, elXMV, elYMV],
        [oldXMH, oldYMH, elXMH, elYMH],
        [oldXMVMH, oldYMVMH, elXMVMH, elYMVMH],
        [oldXD, oldYD, eXD, eYD],
        [oldXDMV, oldYDMV, eXDMV, eYDMV],
        [oldXDMH, oldYDMH, eXDMH, eYDMH],
        [oldXDMVMH, oldYDMVMH, eXDMVMH, eYDMVMH]
    ].forEach(v => {
        ctx.beginPath();
        ctx.moveTo(v[0], v[1]);
        ctx.lineTo(v[2], v[3]);
        ctx.stroke();
        ctx.closePath();
    });

    oldX = x;
    oldY = y;
};

let handler: any = null;

canvas.addEventListener('mousedown', (e) => {
    oldX = e.layerX;
    oldY = e.layerY;
    handler = (e: HTMLElementEventMap["mousemove"]) => drawHandler(e.layerX, e.layerY);
    canvas.addEventListener('mousemove', handler);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    oldX = e.changedTouches[0].clientX;
    oldY = e.changedTouches[0].clientY;
    handler = (e: HTMLElementEventMap["touchmove"]) => drawHandler(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    canvas.addEventListener('touchmove', handler);
});

canvas.addEventListener('mouseup', () => {
    if (handler) {
        canvas.removeEventListener('mousemove', handler);
        handler = null;
    }
});

canvas.addEventListener('touchend', () => {
    if (handler) {
        canvas.removeEventListener('touchmove', handler);
        handler = null;
    }
});
