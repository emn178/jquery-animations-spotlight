;(function($, window, document, undefined) {
  function setVariables(options, element)
  {
    if(options.wrapper.css('position') == 'static')
      options.wrapper.css('position', 'relative');
    options.wrapper.css('overflow', 'hidden');
  }

  $.animations['spotlight'] = {
    duration: 5000,
    emptyAnimation: true,
    wrap: true,
    variables: {
      radius: 100,
      count: 5,
      stopX: null,
      stopY: null
    },
    prepare: function(options) {
      var element = $(this);
      var width = element.width();
      var height = element.height();
      options.radius = Math.min(options.variables.radius, height, width);
      var light = $('<div />')
      light.css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(0,0,0,0), rgba(0,0,0,0) ' + options.radius + 'px, rgba(0,0,0,0.8) ' + (options.radius + 50) + 'px, rgba(0,0,0,0.8))'
      });
      setVariables(options, element);

      var keyframes = {};
      var count = options.variables.count || 3;
      var base = parseInt(count / 0.8);
      var transform = '';
      var x = 0, y = 0;
      for(var i = 0;i < count;++i)
      {
        var percent = i / base * 100 + '%';
        x = -Math.random() * 50;
        y = -Math.random() * 50;
        if(i == count - 1 && options.variables.stopX !== null && options.variables.stopY !== null)
        {
          var stopX = Math.max(Math.min(options.variables.stopX, 100), 0);
          var stopY = Math.max(Math.min(options.variables.stopY, 100), 0);
          x = (stopX - 100) / 2;
          y = (stopY - 100) / 2;
        }
        transform = 'translate(' + x + '%, ' + y + '%)';
        keyframes[percent] = { transform: 'scale(1) ' + transform };
      }
      keyframes['100%'] = { transform: 'scale(${scale}) ' + transform };
      light.vendorCss('transform-origin',  (50 + x) + '% ' + (50 + y) + '%');

      var cloneOptions = $.cloneBasicOptions(options);
      cloneOptions.keyframes = keyframes;
      cloneOptions.derivative = true;
      cloneOptions.prepare = cloneOptions.resize = function(options) {
        options.variables.scale = Math.max(element.height(), element.width()) / options.radius * Math.sqrt(2);
      };
      cloneOptions.fail = function() {
        element.stop();
      };
      light.animate(cloneOptions);

      options.wrapper.append(light);
    },
    resize: function(options) {
      setVariables(options, $(this));
    }
  };
})(jQuery, window, document);
