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
    $('<div class="message loading new"><figure class="avatar"><img src="https://lh3.googleusercontent.com/-MxdFtBDqah4/XhWUWGwL4PI/AAAAAAAAGcA/Sa8XlZ3VePIrAXQc47YaQTcWwT85Mw9-wCEwYBhgLKs4DAMBZVoC8VNPO6oEDAW2KaJWTqeMd-jfNvlec7O2TlC5xPVdGvdEmttafkJXpI9VNcbOHFk8Cp4MXIAs-l-6u72g_AFYm3GXhxj6x7NlBmjDwjkrhmIK46rFcJrVnvob5Xd9IqXGvHGLfBFONfTX4mWcI-Nv4d2b1Wou3Bo80uyJq0PcyvzJx19wLgc8zcXmVDXJyjHvZOP6xbOQtu5KrOPzNJtKt5PiwjTK3iOAgbzcGGiXp1W27huib_sN6rvkQdoMChNJ80_PbR9o605bpv8CgnIf4I95VibBoYLiF1R4UqU0K92k8S_rVsb0GwYYDx9Kdomb3zHr6amsn2m4douvQKnKsXQP3FxilR9Beqjprui2xdlnQ_jFaTP8pibc8E8h0LBtP0XDJijM3yoAtzAiivwoQ_d5sBeg8QmI3stM2ZkFhj6k1UfSiLBvxgBLNjCoSnqMMQjpqw76OHLh5957Sb5xj7-xuJ9HPksrGws7QWiSuOHmarTxpW7sqZjbWoZGAUxLP4Ws-ZQQoC845li5O_XeBL8u0s6Bd5QoHcdsFr5rcn2cd_ysaroOoiugj-cyo5nJr_ZNZ3SBi-xY_X1AH9KVFKg5yn6mxhNrFMLT6xvQF/h120/IMG_20200104_130652.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://lh3.googleusercontent.com/-MxdFtBDqah4/XhWUWGwL4PI/AAAAAAAAGcA/Sa8XlZ3VePIrAXQc47YaQTcWwT85Mw9-wCEwYBhgLKs4DAMBZVoC8VNPO6oEDAW2KaJWTqeMd-jfNvlec7O2TlC5xPVdGvdEmttafkJXpI9VNcbOHFk8Cp4MXIAs-l-6u72g_AFYm3GXhxj6x7NlBmjDwjkrhmIK46rFcJrVnvob5Xd9IqXGvHGLfBFONfTX4mWcI-Nv4d2b1Wou3Bo80uyJq0PcyvzJx19wLgc8zcXmVDXJyjHvZOP6xbOQtu5KrOPzNJtKt5PiwjTK3iOAgbzcGGiXp1W27huib_sN6rvkQdoMChNJ80_PbR9o605bpv8CgnIf4I95VibBoYLiF1R4UqU0K92k8S_rVsb0GwYYDx9Kdomb3zHr6amsn2m4douvQKnKsXQP3FxilR9Beqjprui2xdlnQ_jFaTP8pibc8E8h0LBtP0XDJijM3yoAtzAiivwoQ_d5sBeg8QmI3stM2ZkFhj6k1UfSiLBvxgBLNjCoSnqMMQjpqw76OHLh5957Sb5xj7-xuJ9HPksrGws7QWiSuOHmarTxpW7sqZjbWoZGAUxLP4Ws-ZQQoC845li5O_XeBL8u0s6Bd5QoHcdsFr5rcn2cd_ysaroOoiugj-cyo5nJr_ZNZ3SBi-xY_X1AH9KVFKg5yn6mxhNrFMLT6xvQF/h120/IMG_20200104_130652.jpg" /></figure>' + start + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    }, 1000 + (Math.random() * 20) * 100);
  }, 100);
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
