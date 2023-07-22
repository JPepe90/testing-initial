// matchers

test('test obj', () => {
  const data = { name: 'javier' };
  data.lastname = 'pepe';
  expect(data).toEqual({ name: 'javier', lastname: 'pepe' });
});

test('test null', () => {
  const data = null;
  expect(data).toBeNull();
  expect(data).toBeDefined();
  expect(data).not.toBeUndefined();
});

test('booleans', () => {
  expect(true).toEqual(true);
  expect(false).toEqual(false);

  // expect(1).toEqual(true);
  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(false).toBeFalsy();
});

test('strings', () => {
  expect('Christian').toMatch(/isti/);
});

test('arrays', () => {
  const numbers = [1, 2, 3, 4];
  expect(numbers).toContain(3);
});
