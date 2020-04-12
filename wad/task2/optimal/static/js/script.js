var $messages = $('.messages-content'),
    d, h, m, i = 0;

var wlcMsg = `Welcome to Snowden's Chatbot.
              I can have a pet talk.
              And also give you the meteo.
              '/spb' For Saint Petersburg's temperature.
              '/msk' For Moscow Temperature.
              Other commands are pending..`

function botMessage(start){

  setTimeout(function() {
    if ($('.message-input').val() != '') {
      $('.message-input').val("");
    }

    $('<div class="message loading new"><figure class="avatar"><img src="https://pbs.twimg.com/profile_images/648888480974508032/66_cUYfj_400x400.jpg"/></figure><span></span></div>').appendTo($('.mCSB_container'));

    updateScrollbar();

    setTimeout(function() {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="https://pbs.twimg.com/profile_images/648888480974508032/66_cUYfj_400x400.jpg" /></figure>' + start + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
    }, 1000 + (Math.random() * 20) * 100);
  }, 1000);
}

$(window).load(function() {
    $messages.mCustomScrollbar();
    botMessage(wlcMsg);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {

    userText = $('.message-input').val();
    if ($.trim(userText) == '') {
        return false;
    }

    $('<div class="message message-personal">' + userText + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    getFlaskMsg(userText);

}

function getFlaskMsg(userText){
    if (!userText){
        return false;
    }
    $.get("/get", { msg: userText, count: i}).done(function(botText) {
        botMessage(botText);
        (i < 14 ? i++ : i = 0);
    });
    return true;
}

$('.message-submit').click(function() {
    insertMessage();
});
