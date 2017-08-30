import salute from '../salute';

test('the return salutes you', () => {
    expect(salute()).toEqual("Say hello to RG's Blueprint!");
});
