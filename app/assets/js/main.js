(function($, doc) {
  const appCar = (function() {

    const $companyTitle = $('[data-js="companytitle"]');
    const $companyPhone = $('[data-js="companyphone"]');
    const $sendPOST = $('[data-js="post"]');
    const $contentTable = $('[data-js="content"]');
    const $inputs = $('[data-js="input"]');

    const ajxCompany = new XMLHttpRequest();


    function requestGetCompany() {
      ajxCompany.open('GET', 'company.json');
      ajxCompany.send();

      ajxCompany.addEventListener('readystatechange', handleInfo, false);
    }

    function initEvents() {
      $sendPOST.addEventListener('submit', handlePost, false);
    }

    function handleInfo() {
      if (isRequestOK(ajxCompany)) {
        var data = parserData(ajxCompany);
        $companyTitle.innerHTML = data.company;
        $companyPhone.innerHTML = data.phone;
      }
    }

    function isRequestOK(name) {
      return name.readyState === 4 && name.status === 200;
    }

    function parserData(name) {
      return JSON.parse(name.responseText);
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
      const $tdImage = doc.createElement('td');
      const $tdBrand = doc.createElement('td');
      const $tdYear = doc.createElement('td');
      const $tdPlate = doc.createElement('td');
      const $tdColor = doc.createElement('td');


      const value = $inputs.map(item => item.value)
  
      $tdImage.appendChild(createImage(value[0]));
      $tdBrand.innerHTML = value[1];
      $tdYear.innerHTML  = value[2];
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

    function handlePost(e) {
      $contentTable.appendChild(createTableElements());
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