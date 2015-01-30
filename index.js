'use strict';

module.exports = tide;

function tide(time) {
  var pastMinutes = [2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28];
  var toMinutes = [32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 47, 48, 49, 51, 52, 53, 54, 56, 57, 58, 60];
  var pastOn = [5, 10, 20, 25];
  var toOn = [35, 40, 50, 55];
  var h, m, timeOfDay, desc;

  if (time instanceof Date) {
    h = time.getHours();
    m = time.getMinutes();
  }
  else if (typeof time === 'string') {
    h = +time.split(':')[0];
    m = +time.split(':')[1];
  }

  if (h > 23 || isNaN(h) || m > 59 || isNaN(m)) {
    throw new Error('Invalid input');
  }

  if (h < 12) {
    timeOfDay = 'in the morning';
  } else if (h < 17) {
    timeOfDay = 'in the afternoon';
  } else if (h < 22) {
    timeOfDay = 'in the evening';
  } else if (h < 24) {
    timeOfDay = 'at night';
  }

  if (is(m).in(toOn)) {
    desc = (60 - m) + ' to ' + (h + 1);
  } else if (is(m).in(pastOn)) {
    desc = m + ' past ' + h;
  } else if (is(m).in(pastMinutes)) {
    desc = m + ' minutes past ' + h;
  } else if (is(m).in(toMinutes)) {
    desc = (60 - m) + ' minutes to ' + (h + 1);
  } else if (m === 29 || m === 30 || m === 31) {
    desc = (m === 31 ? 'just gone ' : m === 29 ? 'nearly ' : '') + 'half past ' + h;
  } else if (m === 45 || m === 46) {
    desc = (m === 46 ? 'just gone ' : '') + 'a quarter to ' + (h + 1);
  } else if (m === 14 || m === 15 || m === 16) {
    desc = (m === 16 ? 'just gone ' : m === 14 ? 'nearly ' : '') + 'a quarter past ' + h;
  } else if (m === 0 && h === 12 || m === 1 && h === 12) {
    desc = (m === 1 & h === 12 ? 'just gone ' : '') + h + ' noon';
  } else if (m === 0 || m === 1 || m === 59) {
    desc = (m === 16 ? 'just gone ' : m === 14 ? 'nearly ' : '') + (m === 59 ? h + 1 : h) + ' o\'clock';
  }

  return desc + ' ' + timeOfDay;
}

function is(num) {
  return {
    'in': function (arr) {
      return arr.indexOf(num) > -1;
    }
  };
}
