function getDate(timeStamp) {
  const date = new Date(timeStamp);

  return date.toLocaleString('en-GB', { timeZone: 'UTC' });
}

export default getDate;
