import salute from '../salute';

test('retuns the default count', () => {
    expect(salute()).toEqual('Count: 0');
});

test('retuns the count', () => {
    expect(salute(2)).toEqual('Count: 2');
});
