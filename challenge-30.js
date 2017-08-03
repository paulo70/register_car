(function($) {

    var app = (function() {
        return {
            init: function() {
                this.initEvents(),
                    this.companyInfo();
            },

            initEvents: function() {
                $('[data-js="data-register"]').on('submit', this.handleSubmit, false);
            },

            handleSubmit: function(e) {
                event.preventDefault();
                var $contentTable = $('[data-js="table-car"]').get();
                $contentTable.appendChild(app.createElements());
            },

            createElements: function() {
                var $fragment = document.createDocumentFragment();
                var $tr = document.createElement('tr');
                var $tdImage = document.createElement('td');
                var $image = document.createElement('img');
                var $tdModel = document.createElement('td');
                var $tdYear = document.createElement('td');
                var $tdPane = document.createElement('td');
                var $tdColor = document.createElement('td');
                var $tdRemove = document.createElement('td');
                var $buttonRemove = document.createElement('button');

                $buttonRemove.innerHTML = 'remove';
                $tdRemove.appendChild($buttonRemove);
                $tdRemove.setAttribute('class', 'padding');
                $buttonRemove.setAttribute('class', 'buttonRemove');
                $buttonRemove.setAttribute('data-js', 'data-remove');
                
                $image.setAttribute('src', $('[data-js="data-image"]').get().value);
                $tdImage.appendChild($image);
                $tdModel.innerHTML = $('[data-js="data-model"]').get().value;
                $tdYear.innerHTML = $('[data-js="data-year"]').get().value;
                $tdPane.innerHTML = $('[data-js="data-pane"]').get().value;
                $tdColor.innerHTML = $('[data-js="data-cor"]').get().value;

                $tr.appendChild($tdImage);
                $tr.appendChild($tdModel);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPane);
                $tr.appendChild($tdColor);
                $tr.appendChild($tdRemove);

                $buttonRemove.addEventListener('click', this.handleRemove, false);

                return $fragment.appendChild($tr);
            },

            handleRemove: function() {
                var parent = this.parentNode.parentNode.parentNode;
                return parent.removeChild(this.parentNode.parentNode);
            },

            companyInfo: function() {
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.handleStateChange);
            },

            handleStateChange: function() {
                if (!app.isReady.call(this))
                    return;

                app.fillField.call(this);
            },

            isReady: function() {
                return this.readyState === 4 && this.status === 200;
            },

            fillField: function() {
                var data = JSON.parse(this.responseText);
                var $companyName = $('[data-js="company-name"]').get();
                var $companyPhone = $('[data-js="company-phone"]').get();

                $companyName.textContent = data.name;
                $companyPhone.textContent = data.phone;
            }
        }

    })();

    app.init();
})(window.DOM);