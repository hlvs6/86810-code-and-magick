function numberOfSteps(a) {

  for (var i = 0, numberOfSteps = 0; i < a.length; i++) {

    numberOfSteps = numberOfSteps + a[i];
  }
  
  return 'Я прошёл ' + numberOfSteps + ' шагов';
}

function distancePath(a,b) {

  for (var i = 0, distancePath = 0; i < a.length; i++) {
    distancePath =  distancePath + a[i]*b[i];
  }
  return 'Я прошёл ' + distancePath + ' метров';
}

function getMessage(a,b) {

  if (typeof a == "boolean") {

    if (a) {

      return 'Я попал в ' + b;
    }

    else {

      return 'Я никуда не попал';
    }
  }

  else if ( typeof a == "number") {

    return 'Я прыгнул на ' + a*100 + ' сантиметров';
  }

  else if ( Array.isArray(a)) {

    if (Array.isArray(b)) {

      return distancePath(a,b);
    }

    else {

      return numberOfSteps(a);
    }
  }

  else {

    return 'Переданы некорректные данные';
  }
}
