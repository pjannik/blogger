      function buy_art_popup(item) {
        function findProduct() {
          var anchors = document.evaluate('//a[contains(@href, "buy_art_popup")]',document.body);
          var anchor = anchors.iterateNext();
          var product = '';
          while (anchor) {
            if (anchor.href.includes('(' + item +')')) {
              product = anchor.parentElement.parentElement.nextElementSibling.innerText.trim();
              break;
            }
          }
          return product;
        }
        $.fancybox.open({
          src: '#buy-art-form',
          type: 'inline',
          opts: {
            beforeClose: buy_art_submit(item)
          }
        });
        $('#buy-art-form-1').value = findProduct();
      }

      function buy_art_submit(item) {
        function get() {
          var form = $('#buy-art-form input');
          var message = '';
          var divs = $('#buy-art-form div.form-group');
          for (var i = 0, n = divs.size(); i < n; i++) {
            var div = divs[i];
            message += div.getElementsByTagName('label')[0].value;
            message += ': ' + div.getElementsByTagName('input')[0].innerText;
            message += '\n';
          }
          //
          $.post('https://www.blogger.com/contact-form.do', {
              name: jQuery('[name = "name"]', form).value,
              email: jQuery('[name = "email"]', form).value,
              message: message,
              blogID: '5799764146171352736'
            },
            function(data, status) {
              alert("Data: " + data + "\nStatus: " + status);
            }
          );
        }
        return get;
      }
