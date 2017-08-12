import $q from '../Utils/AsyncQueue.js';
import HashMap from 'hashmap';

describe('should test sanity', () => {
    function mockAsync1() {
        // Returns a promise that resolves with arg after 3 seconds
        function makePromise(arg) {
            return new Promise(function(resolve, reject) {
                setTimeout(resolve(arg), 3000);
            });
        }
        $q.init(3);
        $q.enqueueAll(
            makePromise,
            [[0], [50], [100]],
            e => e,
            e => [[e + 1]]
        );
        return $q.begin();
    }

    test('structure of return data', () => {
        mockAsync1().then(function(data) {
            console.log(data);
            expect(data.all.length).toEqual(12);
            [0, 1, 2, 50, 51, 52, 100, 101, 102].forEach(e => expect(data.all.includes(e)).toBe(true));
            [0, 1, 2, 3].forEach(e => expect((data.byLayer)[e].length).toEqual(3));
            expect(Object.keys(data).length).toEqual(3);
        });
    });

    test('validity of links hashmap', () => {
        mockAsync1().then(function(data) {
            data.byLayer[0].forEach(e => expect(data.links.get(e)).toBe(null));
            data.byLayer[1].forEach((e, i) => expect(data.links.get(e)).toEqual((data.byLayer[0])[i]));
            data.byLayer[2].forEach((e, i) => expect(data.links.get(e)).toEqual((data.byLayer[1])[i]));
            data.byLayer[2].forEach((e, i) => console.log(data.links.get(e)));
        });
    });
});
