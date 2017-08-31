import counter from '../counter';

test('returns the default count', () => {
    expect(counter()).toEqual('Count: 0');
});

test('returns the count', () => {
    expect(counter(2)).toEqual('Count: 2');
});
