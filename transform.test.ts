import {expect} from 'chai';
import {createTransform, Transform} from './transform';

describe ('Transform', () => {
    
    let transform: Transform;

    beforeEach(() => transform = createTransform(800, 800));

    it ('mirror vertical', () => {
        [
            [20, 30, 780, 30],
            [30, 30, 770, 30],
            [30, 40, 770, 40],
            [410, 40, 390, 40]
        ].forEach((value, index) => {
            const [x, y] = transform.mirrorHorizontal(value[0], value[1]);
            expect(x).to.equal(value[2], `Value: ${index}`);
            expect(y).to.equal(value[3], `Value: ${index}`);
        });
    });

    it ('mirror vertical 1000 px width', () => {
        transform = createTransform(1000, 1000);
        [
            [20, 30, 980, 30],
            [30, 30, 970, 30],
            [30, 40, 970, 40],
            [510, 40, 490, 40]
        ].forEach((value, index) => {
            const [x, y] = transform.mirrorHorizontal(value[0], value[1]);
            expect(x).to.equal(value[2], `Value: ${index}`);
            expect(y).to.equal(value[3], `Value: ${index}`);
        });
    });

    it ('mirror horizontal', () => {
        [
            [30, 20, 30, 780],
            [40, 20, 40, 780]
        ].forEach((value, index) => {
            const [x, y] = transform.mirrorVertical(value[0], value[1]);
            expect(x).to.equal(value[2], `Value: ${index}`);
            expect(y).to.equal(value[3], `Value: ${index}`);
        });
    });

    it ('mirror horizontal height 1000 px', () => {
        transform = createTransform(1000, 1000);
        [
            [30, 20, 30, 980],
            [40, 20, 40, 980]
        ].forEach((value, index) => {
            const [x, y] = transform.mirrorVertical(value[0], value[1]);
            expect(x).to.equal(value[2], `Value: ${index}`);
            expect(y).to.equal(value[3], `Value: ${index}`);
        });
    });

    it ('mirror diagonal', () => {
        [
            [2, 1, 1, 2],
            [1, 2, 2, 1]
        ].forEach((value, index) => {
            const [x, y] = transform.diagonal(value[0], value[1]);
            expect(x).to.equal(value[2], `Value: ${index}`);
            expect(y).to.equal(value[3], `Value: ${index}`);
        });
    });
});
