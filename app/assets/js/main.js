(function($, doc) {
  const appCar = (function() {

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
      if (isRequestOK(ajxCompany)) {
        var data = parserData(ajxCompany);
        $companyTitle.innerHTML = data.company;
        $companyPhone.innerHTML = data.phone;
      }
    }

    function createButtonRemove() {
      const $buttoRemove = doc.createElement('button');

      $buttoRemove.setAttribute('class', 'buttonRemove');
      $buttoRemove.textContent = 'remove';
      $buttoRemove.addEventListener('click', handleRemoveRow, false);

      return $buttoRemove;
    }

    function handleRemoveRow() {
      const $parent = this.parentNode;
      $parent.innerHTML = '';
    }

    function createImage(link) {
      const $image = doc.createElement('img');
      $image.setAttribute('src', link);

      return $image;
    }

    function createHTMLElement(element) {
      return doc.createElement(element);
    }

    function outputHTMLValue(elem) {
      elem.reduce((prev, curr) => {
        return prev.innerHTML = curr;
      });
    };

    function appendElement(element, item) {
      for (var i = 0; i < item.length; i++) {
        element.appendChild(item[i]);
      }

      return element;
    }

    function tableElementsPOST() {
      const $fragment = doc.createDocumentFragment();
      const $tr = createHTMLElement('tr');
      const $tdBrand = createHTMLElement('td');
      const $tdImage = createHTMLElement('td');
      const $tdYear = createHTMLElement('td');
      const $tdPlate = createHTMLElement('td');
      const $tdColor = createHTMLElement('td');

      const value = $inputs.map(item => item.value)
      outputHTMLValue(
        [$tdBrand, value[0],
          $tdYear, value[2],
          $tdPlate, value[3],
          $tdColor, value[4]
        ]);
      appendElement($tdImage, [createImage(value[1])]);
      appendElement($tr, [$tdBrand,$tdImage,$tdYear,$tdPlate,$tdColor,createButtonRemove()]);

      return $tr;
    }

    function generateURL() {
      return $inputs.reduce(function(acc, item, index) {
        if (index === 1) {
          acc = 'brandname' + '=' + acc.value + '&' + acc.name + '=' + acc.value + '&' + item.name + '=' + item.value;
        } else {
          acc = acc + '&' + item.name + '=' + item.value;
        }

        return acc;
      }, 0);

    }

    function requestPOST() {
      ajxPost.open('POST', 'http://localhost:3000/car');
      ajxPost.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
      const url = generateURL();
      ajxPost.send(url);

      ajxPost.addEventListener('readystatechange', handlePost, false);
    }

    function handlePost() {
      if (isRequestOK(ajxPost))
        parserData(ajxPost);
    }

    function requestGET() {
      const $ulrcar = $getCar.value;
      ajxGET.open('GET', `http://localhost:3000/car/${$ulrcar}`);
      ajxGET.send();

      ajxGET.addEventListener('readystatechange', handleGET, false);
    }

    function handleGET() {
      if (isRequestOK(ajxGET))
        console.log('ok', ajxGET.responseText);

    }

    function isRequestOK(name) {
      return name.readyState === 4 && name.status === 200;
    }

    function parserData(name) {
      return JSON.parse(name.responseText);
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