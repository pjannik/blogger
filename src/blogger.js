// init the forms that needs validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
// show form
function buy_art_popup(item) {
  function findProduct() {
    var anchors = document.evaluate('//a[contains(@href, "buy_art_popup")]', document.body);
    var anchor = anchors.iterateNext();
    var product = '';
    while (anchor) {
      if (anchor.href.includes('(' + item + ')')) {
        product = anchor.parentElement.nextElementSibling.innerText.trim();
        break;
      }
      anchor = anchors.iterateNext();
    }
    return product;
  }
  $.fancybox.open({
    src: '#buy-art-form',
    type: 'inline',
  });
  // wire submit button
  var submit = $('#buy-art-form-submit')[0];
  $(submit).click(buy_art_submit);
  // wire delivery radio boxes
  $('#buy-art-form-1').attr('value', findProduct());
  $($('#buy-art-form>.form-check>.form-check-input')[0]).change(show_or_hide_address);
  $($('#buy-art-form>.form-check>.form-check-input')[1]).change(show_or_hide_address);
  $($('#buy-art-form>.form-check>.form-check-input')[2]).change(show_or_hide_address);
}
// hide address field when needed
function show_or_hide_address(event) {
  var input = event.target;
  var hidden = input.value != 'chronopost';
  var groups = $('#buy-art-form>div.form-group.address');
  for (var i = 0, n = groups.size(); i < n; i++) {
    groups[i].hidden = hidden;
  }
}
// validate form and mail to blogger admin
function buy_art_submit(item) {
  function get() {
    // create message
    var form = $('#buy-art-form')[0];
    var name = jQuery('input[name = "name"]', form)[0].value;
    var message = 'Voici la commande de ' + name + '\n\n';
    var divs = $('#buy-art-form div.form-group');
    for (var i = 0, n = divs.size(); i < n; i++) {
      var div = divs[i];
      message += div.getElementsByTagName('label')[0].innerText;
      message += ': ' + div.getElementsByTagName('input')[0].value;
      message += '\n';
    }
    // post to blogger
    $.post('https://www.blogger.com/contact-form.do', {
      name: name,
      email: jQuery('input[name = "email"]', form)[0].value,
      message: message,
      blogID: '5799764146171352736'
    });
    $.fancybox.close();
  }
  return get;
}
