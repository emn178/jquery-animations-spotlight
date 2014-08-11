;(function($, window, document, undefined) {
  var animation = 'spotlight';
  var options = {};
  var lastChecked;

  function animate()
  {
    $('#image').animate(animation, options);
  }
  
  function update()
  {
    options = {};
    $('.global select, .global input').each(function() {
      var element = $(this);
      var name = element.attr('name');
      var value = element.val();
      if(element.attr('data-type') == 'bool' && value)
        value = value == 'true';
      else if(element.attr('type') == 'number')
        value = parseFloat(value);
      if(value !== '' && value !== null && !isNaN(value))
        options[name] = value;
    });

    $('.custom:not(.disable)').each(function() {
      var custom = $(this);
      var id = custom.attr('animation-id');
      options.custom = options.custom || {};
      var customOptions = options.custom[id] = {};
      custom.find('input, select').each(function() {
        var element = $(this);
        var name = element.attr('name');
        var value = element.val();
        if(element.attr('type') == 'number')
          value = parseInt(value);
        if(value)
          customOptions[name] = value;
      });
      if($.isEmptyObject(customOptions))
        delete options.custom[id];
    });
    if($.isEmptyObject(options.custom))
      delete options.custom;

    if($.isEmptyObject(options))
      $('#code').text("$('#image').animate('" + animation + "');");
    else
      $('#code').text("$('#image').animate('" + animation + "', " + JSON.stringify(options, null, 2) +  ");");
  }

  function click()
  {
    var element = $('#' + $(this).attr('for'));
    var animationId = element.attr('id');
    $('#option-' + animationId).toggleClass('disable');
    if(!element.is(':checked'))
      lastChecked = animationId;
  }

  $(document).ready(function() {
    $('#submit').click(animate);
    $('body').on('change', 'input,select', update);

    $('.animation').animate('flyIn', {
      duration: 1500,
      always: function() {
        $(this).removeClass('highlight');
      }
    });
  });
})(jQuery, window, document);
