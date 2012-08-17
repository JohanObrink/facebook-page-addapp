$().ready(function() {

  // compile templates
  var tmpl_profile = Hogan.compile($('#profile').html());
  var tmpl_app = Hogan.compile($('#app').html());

  var stepsCleared = 0;

  var toggleVisibility = function(status) {
    switch(status) {
      case 'unknown':
      case 'not_authorized':
        $('.fb-login-button').show();
        $('.fb-profile').hide();
        setStep(0);
        break;
      default:
        $('.fb-login-button').hide();
        $('.fb-profile').show();
        loadProfile();
        loadApps();
        setStep(1);
        break;
    }
  };

  var loadProfile = function() {
    FB.api('/me', function(response) {
      $('.fb-profile').html(tmpl_profile.render(response));
    });
  };

  var loadApps = function(search) {

    var path = (search) ? '/search' : '/me/accounts';

    FB.api(path, { q: search, type: 'Application', limit: 10 }, function(response) {
      $('.apps').html(tmpl_app.render(response));

      setTimeout(function() {
        $('.apps ul li').click(function(event) {
          $('.apps ul li').each(function() {
            console.log(this);
            if(this == event.target)
              $(this).addClass('selected');
            else
              $(this).removeClass('selected');
          });

          selectApp(event.target.id.substring(4));

        });
      }, 10);

    });

  };

  var selectApp = function(id) {
    setStep(2);
    $.getJSON('/app/' + id, function(data) {
      var url = '//www.facebook.com/dialog/pagetab?app_id=' + id + '&next=' + data.url;
      $('.action-url').val(url);
      $('#open-selection-win').attr('disabled', false);
    });
  };

  var setStep = function(step) {
    $('.steps > li:lt(' + step + ') i').removeClass('icon-check-empty');
    $('.steps > li:lt(' + step + ') i').addClass('icon-check');

    $('.steps > li:lt(' + (step +1) + ') .well').show();
    $('.steps > li:gt(' + (step +1) + ') .well').hide();

    if(step === 1)
      $('.app-search').focus();

    if(step === 2)
      $('#open-selection-win').focus();
  };

  FB.getLoginStatus(function(response) {
    if(response.status === 'unknown' || response.status === 'not_authorized')
      toggleVisibility(response.status);
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    toggleVisibility(response.status);
  });

  //listen for search input
  $('.app-search').typeWatch({
    callback: function(event) {
      if ( event.which == 13 ) event.preventDefault();

      var q = $('.app-search').val();
      if(q.length == 0 || q.length > 2)
        loadApps(q || null);
    },
    wait: 300,
    highlight: true,
    captureLength: 0
  });

  //listen for click on open-selection
  $('#open-selection-win').click(function() {
    var win = window.open($('.action-url').val(), 'facebook', 'width=800, height=300');
    win.focus();
    setStep(3);
  });


});