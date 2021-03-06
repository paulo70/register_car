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
    const ajxDelete = new XMLHttpRequest();

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
      $buttoRemove.addEventListener('click', handleRemoveCar, false);

      return $buttoRemove;
    }

    function handleRemoveCar() {
      ajxDelete.open('DELETE', 'http://localhost:3000/car');
      ajxDelete.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded'
      )

      ajxDelete.send('plate=' + this.parentNode.children[3].textContent);

      ajxDelete.addEventListener('readystatechange', handleDelete, false);

      const $parent = this.parentNode;
      $parent.innerHTML = '';

    }

    function handleDelete() {
      if (moduleAJAX.isRequestOK(ajxDelete))
        console.log(ajxDelete.responseText);
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