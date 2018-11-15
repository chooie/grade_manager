exports.name = function name(value) {
  return value.trim() !== "";
};

exports.grade = function grade(value) {
  if (isNumeric(value)) {
    const number = parseFloat(value);

    if (isValidGrade(number)) {
      return true;
    }
  }
  return false;
};

function isValidGrade(number) {
  return number >= 0 && number <= 100;
}

function isNumeric(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}
