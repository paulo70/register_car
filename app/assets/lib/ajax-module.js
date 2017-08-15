exports.isRequestOK = function(name) {
  return name.readyState === 4 && name.status === 200;
}

exports.parserData = function(name) {
  return JSON.parse(name.responseText);
}
