import getDate from './date';

it('should convert a timeStamp value into a human readable date string', () => {
  // Arrange
  const timeStamp = 1735946049418;

  // Act
  const result = getDate(timeStamp);

  // Assert
  const date = new Date(timeStamp);
  const expectedResult = date.toLocaleString('en-GB', { timeZone: 'UTC' });
  expect(result).toBe(expectedResult);
});
