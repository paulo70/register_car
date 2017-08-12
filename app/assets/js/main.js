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
      $sendPOST.addEventListener('submit', handleForm, false);
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

    function createTableElements() {
      const $fragment = doc.createDocumentFragment();
      const $tr = doc.createElement('tr');
      const $tdBrand = doc.createElement('td');
      const $tdImage = doc.createElement('td');
      const $tdYear = doc.createElement('td');
      const $tdPlate = doc.createElement('td');
      const $tdColor = doc.createElement('td');

      const value = $inputs.map(item => item.value)

      $tdBrand.innerHTML = value[0];
      $tdImage.appendChild(createImage(value[1]));
      $tdYear.innerHTML = value[2];
      $tdPlate.innerHTML = value[3];
      $tdColor.innerHTML = value[4];

      $tr.appendChild($tdImage);
      $tr.appendChild($tdBrand);
      $tr.appendChild($tdYear);
      $tr.appendChild($tdPlate);
      $tr.appendChild($tdColor);
      $tr.appendChild(createButtonRemove());

      return $fragment.appendChild($tr);
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
        var data = parserData(ajxGET);
       return data;
    }

    function isRequestOK(name) {
      return name.readyState === 4 && name.status === 200;
    }

    function parserData(name) {
      return JSON.parse(name.responseText);
    }

    function handleForm(e) {
      $contentTable.appendChild(createTableElements());
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