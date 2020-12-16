//
$(window).on('load', function() {
  console.log("window loaded");
  $('#buy-art-form-submit').click(buy_art_submit, true);
});
// show form
function buy_art_popup(item) {
  function findProduct() {
    var anchors = document.evaluate('//a[contains(@href, "buy_art_popup")]', document.body);
    var anchor = anchors.iterateNext();
    var product = item;
    while (anchor) {
      if (anchor.href.includes('(' + item + ')')) {
        var sibling = anchor.parentElement.previousElementSibling;
        while (sibling.tagName.toUpperCase() != 'TABLE') {
          sibling = sibling.previousElementSibling;
        }
        var caption = $('td.tr-caption', sibling)[0];
        if (caption != null) {
          product = caption.innerText;
        }
        break;
      }
      anchor = anchors.iterateNext();
    }
    return product.replace(/\n/g, ' ').trim();
  }
  $.fancybox.open({
    src: '#buy-art-form',
    type: 'inline',
    opts: {
      afterShow: function() {
        console.log('after_show');
      }
    }
  });
  $('#buy-art-form-1').attr('value', findProduct());
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
function buy_art_submit() {
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
