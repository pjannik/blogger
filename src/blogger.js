// show form
function buy_art_popup(item) {
  // try find product from blogspot post page, MAGIC
  // hvem hvor haren hopper ?
  var anchors = document.evaluate('//a[contains(@href, "buy_art_popup")]', document.body);
  var anchor = anchors.iterateNext();
  var product = item;
  while (anchor) {
    if (anchor.href.includes('(' + item + ')')) {
      var table = $('table.tr-caption-container')[item - 1];
      var caption;
      if (table) {
        caption = $('td.tr-caption', table)[0];
      }
      if (caption) {
        product = caption.innerText;
      } else {
        product = 'Peinture numero ' + item;
      }
      break;
    }
    anchor = anchors.iterateNext();
  }
  product = product.replace(/\n/g, ' ').trim();
  $.fancybox.open({
    src: '#buy-art-form',
    type: 'inline',
    opts: {
      afterClose: function() {
        $('#buy-art-form')[0].classList.remove('was-validated');
      }
    }
  });
  $('#buy-art-form-1').attr('value', product);
}
// hide address field when needed and toggle required
function show_or_hide_address(event) {
  var input = event.target;
  var hidden = input.value != 'chronopost';
  var groups = $('#buy-art-form>div.form-group.address');
  for (var i = 0, n = groups.length; i < n; i++) {
    var group = groups[i]
    group.hidden = hidden;
    if (i != 1) {
      if (hidden) {
        group.children[1].removeAttribute('required');
      } else {
        group.children[1].setAttribute('required', '');
      }
    }
  }
  $('#buy-art-form-12').attr('value', input.nextElementSibling.innerText)
}
// validate form and mail to blogger admin
function buy_art_submit() {
  var form = $('#buy-art-form')[0];
  // validate and send message if valid
  if (form.checkValidity() !== false) {
    // create message
    var name = jQuery('input[name = "name"]', form)[0].value;
    var message = 'Voici la commande de ' + name + '\n\n';
    var divs = $('#buy-art-form div.form-group');
    for (var i = 0, n = divs.length; i < n; i++) {
      var div = divs[i];
      if (div.childElementCount == 2 && div.hidden == false) {
        message += div.children[0].innerText;
        message += ': ' + div.children[1].value;
        message += '\n';
      }
    }
    // post to blogger
    $.post('https://www.blogger.com/contact-form.do', {
      name: name,
      email: jQuery('input[name = "email"]', form)[0].value,
      message: message,
      blogID: '5799764146171352736'
    });
    form.classList.remove('was-validated');
    $.fancybox.close();
  } else {
    form.classList.add('was-validated');
  }
}
