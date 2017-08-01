(function($) {

    var app = (function() {
        return {
            init: function() {
                this.initEvents(),
                this.companyInfo();
            },

            initEvents: function() {
                $('[data-js="data-register"]').on('submit', this.handleSubmit);
            },

            handleSubmit: function(e) {
                event.preventDefault();
                app.validationForm();
                var $contentTable = $('[data-js="table-car"]').get();
                $contentTable.appendChild(app.createElements());
            },

            createElements:function(){
             var $fragment = document.createDocumentFragment();
             var $tr = document.createElement('tr');
             var $tdImage = document.createElement('td');
             var $image = document.createElement('img');
             var $tdModel = document.createElement('td');
             var $tdYear = document.createElement('td');
             var $tdPane = document.createElement('td');
             var $tdColor = document.createElement('td');

             $image.setAttribute('src', $('[data-js="data-image"]').get().value);
             $tdImage.appendChild($image);
             $tdModel.textContent = $('[data-js="data-model"]').get().value;
             $tdYear.textContent = $('[data-js="data-year"]').get().value;
             $tdPane.textContent = $('[data-js="data-pane"]').get().value;
             $tdColor.textContent = $('[data-js="data-cor"]').get().value;

             $tr.appendChild($tdImage);
             $tr.appendChild($tdModel);
             $tr.appendChild($tdYear);
             $tr.appendChild($tdPane);
             $tr.appendChild($tdColor);


             return $fragment.appendChild($tr);
            },

            validationForm: function() {
                app.checkEmptyField();
            },

            checkEmptyField: function() {
                var $inputUrl = $('[data-js="data-image"]').get().value;
                var $inputModel = $('[data-js="data-model"]').get().value;
                var $inputYear = $('[data-js="data-year"]').get().value;
                var $inputPane = $('[data-js="data-pane"]').get().value;
                var $inputColor = $('[data-js="data-cor"]').get().value;

                var $errorUrl = $('[data-js="data-error-url"]').get();
                var $errorModel = $('[data-js="data-error-model"]').get();
                var $errorYear = $('[data-js="data-error-year"]').get();
                var $errorPane = $('[data-js="data-error-pane"]').get();
                var $errorColor = $('[data-js="data-error-color"]').get();

                if (!$inputUrl) {
                    app.addClass($errorUrl, 'hide', 'visible');
                } 

                if (!$inputModel) {
                    app.addClass($errorModel,'hide', 'visible');
                }

                if (!$inputYear) {
                    app.addClass($errorYear, 'hide', 'visible');
                }

                if (!$inputPane) {
                    app.addClass($errorPane, 'hide', 'visible');
                }

                if (!$inputColor) {
                    app.addClass($errorColor,'hide', 'visible');
                }

            },


            companyInfo: function(){
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.handleStateChange);
            },

            handleStateChange: function(){
              if(!app.isReady.call(this))
                return;

               app.fillField.call(this);
            },

            isReady: function(){
                return this.readyState === 4 && this.status === 200;
            },

            fillField: function(){
              var data = JSON.parse(this.responseText);
              var $companyName = $('[data-js="company-name"]').get();
              var $companyPhone = $('[data-js="company-phone"]').get();

              $companyName.textContent = data.name;
              $companyPhone.textContent = data.phone;
            },

            addClass: function(element, class1, class2) {
                return element.classList.remove(class1, class2);
            }

        }

    })();

    app.init();
})(window.DOM);