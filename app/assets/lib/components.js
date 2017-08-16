exports.createHTMLElement = function(element) {
  return document.createElement(element);
}

exports.outputHTMLValue = function(elem) {
  elem.reduce((prev, curr) => {
    return prev.innerHTML = curr;
  });
};

exports.appendElement = function(element, item) {
  for (var i = 0; i < item.length; i++) {
    element.appendChild(item[i]);
  }

  return element;
}

exports.createImage = function(link) {
  const $image = document.createElement('img');
  $image.setAttribute('src', link);

  return $image;
}

exports.generateURL = function(element) {
  return element.reduce(function(acc, item, index) {
    if (index === 1) {
      acc = 'brandname' + '=' + acc.value + '&' + acc.name + '=' + acc.value + '&' + item.name + '=' + item.value;
    } else {
      acc = acc + '&' + item.name + '=' + item.value;
    }

    return acc;
  }, 0);

}