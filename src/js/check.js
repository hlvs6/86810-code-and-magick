'use strict';

function numberOfSteps(a) {
  for (var i = 0, amount = 0; i < a.length; i++) {
    amount = amount + a[i];
  }
  return 'Я прошёл ' + amount + ' шагов';
}

function distancePath(a, b) {
  for (var i = 0, amount = 0; i < a.length; i++) {
    amount = amount + a[i] * b[i];
  }
  return 'Я прошёл ' + amount + ' метров';
}

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  } else if ( typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if ( Array.isArray(a)) {
    if (Array.isArray(b)) {
      return distancePath(a, b);
    } else {
      return numberOfSteps(a);
    }
  } else {
    return 'Переданы некорректные данные';
  }
}
