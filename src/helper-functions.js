import validator from 'validator';

export function search(searchTerm, searchFrom, callback) {
  if(searchTerm === '') {
      callback([...searchFrom]);
    } else {
      let filtered = [];
      filtered = searchFrom.filter(poll => {
        return poll['title'].toLowerCase().includes(searchTerm.toLowerCase());
      });
      callback(filtered);
    }
}

export function sort(sortFilter, polls, callback) {
  let sorted = [... polls];
  switch(sortFilter) {
    case 'most recent':
      sorted.sort((a, b) => {
        let c = new Date(a['createdAt']).getTime();
        let d = new Date(b['createdAt']).getTime();
        return d - c;
      });
      break;
    case 'oldest':
      sorted.sort((a, b) => {
        let c = new Date(a['createdAt']).getTime();
        let d = new Date(b['createdAt']).getTime();
        return c - d;
      });
      break;
    case 'most voted':
      sorted.sort((a, b) => {
        return b['participants'].length - a['participants'].length;
      });
      break;
    case 'least voted':
      sorted.sort((a, b) => {
        return a['participants'].length - b['participants'].length;
      });
      break;
    default:
  }
  callback(sorted);
}

export function isEmail(value) {
  return validator.isEmail(value);
}

export function isAlphaNumeric(value) {
  return validator.isAlphanumeric(value);
}

export function hasMinLength(value, length) {
  return value.length >= length;
}

export function compare(value, guess) {
  return value === guess;
}