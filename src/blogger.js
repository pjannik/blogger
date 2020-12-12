      function buy_art_popup(item) {
        $.fancybox.open({
          src: '#buy-art-form',
          type: 'inline',
          opts: {
            beforeClose: buy_art_submit(item)
          }
        });
      }

      function buy_art_submit(item) {
        function get() {
          var form = $('#buy-art-form input');
          var message = '';
          var divs = $('#buy-art-form div.form-group');
          for (var i = 0, n = divs.size(); i < n; i++) {
            var div = lines[i];
            message += div.getElementsByTagName('label')[0].value;
            message += ': ' + div.getElementsByTagName('input')[0].value;
            message += '\n';
          }

          $.post('https://www.blogger.com/contact-form.do', {
              name: form[1].value,
              email: form[2].value,
              item: item,
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
