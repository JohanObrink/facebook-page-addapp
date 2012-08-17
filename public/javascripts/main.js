$().ready(function() {

  var stepsCleared = 0;

  var toggleVisibility = function(status) {
    switch(status) {
      case 'unknown':
      case 'not_authorized':
        $('.fb-login-button').show();
        setStepsCleared(0);
        break;
      default:
        $('.fb-login-button').hide();
        setStepsCleared(1);
        break;
    }
  };

  var setStepsCleared = function(num) {
    $('.steps li:lt(' + num + ') i').removeClass('icon-check-empty');
    $('.steps li:lt(' + num + ') i').addClass('icon-check');
  }

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    toggleVisibility(response.status);
  });

  FB.getLoginStatus(function(response) {
    toggleVisibility(response.status);
  });


});