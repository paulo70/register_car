(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($, doc) {
  const appCar = (function() {
    const module = require('../lib/components'),
      moduleAJAX = require('../lib/ajax-module');

    const $companyTitle = $('[data-js="companytitle"]');
    const $companyPhone = $('[data-js="companyphone"]');
    const $sendPOST = $('[data-js="post"]');
    const $sendGET = $('[data-js="get"]');
    const $contentTable = $('[data-js="content"]');
    const $inputs = $('[data-js="input"]');
    const $getCar = $('[data-js="getcar"]');

    const ajxCompany = new XMLHttpRequest();
    const ajxPost = new XMLHttpRequest();
    const ajxGET = new XMLHttpRequest();

    function initEvents() {
      $sendPOST.addEventListener('submit', handleFormPOST, false);
      $sendGET.addEventListener('submit', handleFormGET, false);
    }

    function requestGetCompany() {
      ajxCompany.open('GET', 'company.json');
      ajxCompany.send();

      ajxCompany.addEventListener('readystatechange', handleInfo, false);
    }

    function handleInfo() {
      if (moduleAJAX.isRequestOK(ajxCompany)) {
        var data = moduleAJAX.parserData(ajxCompany);
        $companyTitle.innerHTML = data.company;
        $companyPhone.innerHTML = data.phone;
      }
    }

    function createButtonRemove() {
      const $buttoRemove = module.createHTMLElement('button');

      $buttoRemove.setAttribute('class', 'buttonRemove');
      $buttoRemove.textContent = 'remove';
      $buttoRemove.addEventListener('click', handleRemoveRow, false);

      return $buttoRemove;
    }

    function handleRemoveRow() {
      const $parent = this.parentNode;
      $parent.innerHTML = '';
    }

    function tableElementsPOST() {
      const $fragment = doc.createDocumentFragment();
      const $tr = module.createHTMLElement('tr');
      const $tdBrand = module.createHTMLElement('td');
      const $tdYear = module.createHTMLElement('td');
      const $tdPlate = module.createHTMLElement('td');
      const $tdColor = module.createHTMLElement('td');
      const $tdImage = module.createHTMLElement('td');
      const value = $inputs.map(item => item.value)

      module.outputHTMLValue([$tdBrand, value[0], $tdYear, value[2], $tdPlate, value[3], $tdColor, value[4]]);
      module.appendElement($tdImage, [module.createImage(value[1])]);
      module.appendElement($tr, [$tdBrand, $tdImage, $tdYear, $tdPlate, $tdColor, createButtonRemove()]);
      module.appendElement($fragment, [$tr])

      return $fragment;
    }


    function requestPOST() {
      ajxPost.open('POST', 'http://localhost:3000/car');
      ajxPost.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
      const url = module.generateURL($inputs);
      ajxPost.send(url);

      ajxPost.addEventListener('readystatechange', handlePost, false);
    }

    function handlePost() {
      if (moduleAJAX.isRequestOK(ajxPost))
        moduleAJAX.parserData(ajxPost);
    }

    function requestGET() {
      const $ulrcar = $getCar.value;
      ajxGET.open('GET', `http://localhost:3000/car/${$ulrcar}`);
      ajxGET.send();

      ajxGET.addEventListener('readystatechange', handleGET, false);
    }

    function handleGET() {
      if (moduleAJAX.isRequestOK(ajxGET)) {
        var info = moduleAJAX.parserData(ajxGET);
        fillTable(info);
      }
    }

    function fillTable(dados) {
      const $fragment = doc.createDocumentFragment();
      const $tr = module.createHTMLElement('tr');
      const $tdBrand = module.createHTMLElement('td');
      const $tdYear = module.createHTMLElement('td');
      const $tdPlate = module.createHTMLElement('td');
      const $tdColor = module.createHTMLElement('td');
      const $tdImage = module.createHTMLElement('td');
      
      dados.map(function(item, index) {
        if (index === 0) {
          module.outputHTMLValue([
            $tdBrand, item.brand,
            $tdYear, item.year,
            $tdPlate, item.plate,
            $tdColor, item.color
          ]);
        }
        module.appendElement($tdImage, [module.createImage(item.image)]);

        return dados;
      });
      module.appendElement($tr, [
        $tdBrand, $tdImage, $tdYear,
        $tdPlate, $tdColor, createButtonRemove()
      ]);

      module.appendElement($fragment, [$tr]);
      module.appendElement($contentTable, [$fragment])

      return $fragment;
    }

    function handleFormPOST(e) {
      $contentTable.appendChild(tableElementsPOST());
      requestPOST();
      e.preventDefault();
    }

    function handleFormGET(e) {
      requestGET();
      e.preventDefault();
    }

    return {
      requestGetCompany: requestGetCompany,
      initEvents: initEvents
    }

  })();

  appCar.requestGetCompany();
  appCar.initEvents();


})(window.DOM, document);
},{"../lib/ajax-module":2,"../lib/components":3}],2:[function(require,module,exports){
exports.isRequestOK = function(name) {
  return name.readyState === 4 && name.status === 200;
}

exports.parserData = function(name) {
  return JSON.parse(name.responseText);
}

},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
