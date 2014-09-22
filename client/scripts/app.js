// YOUR CODE HERE:
$(document).ready(function(){
  window.app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    init: function(){
      this.fetch();
      setInterval(this.fetch.bind(this), 1000);
    },
    send: function(message){
      if (message === undefined) {
        var message = {};
        message.text = $('.messageBox').val();
        message.username = $('.username').val();
        message.roomname = 'somewhere';
      }
      console.log(message);

      $.ajax({
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          $('#message').val('');
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          console.log(data);
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(){
      var that = this;
      $.ajax({
        url: this.server,
        type: 'GET',
        data: {
          order: '-createdAt'
        },
        contentType: 'application/json',
        success: function (data) {
          //console.log('success');
          that.addAllMessages(data.results);
        },
        error: function (data) {
          console.error('chatterbox: failed to fetch');
        }
      });
    },
    clearMessages: function(){
      $('#chats').html('');
    },
    addMessage: function(message) {
      var $message = $('<li></li>');
      $message.text(message.username + ': ' + message.text);
      $('#chats').append($message);
    },
    addAllMessages: function(allMessages) {
      this.clearMessages();
      for (var i = 0; i < 20; i++) {
        this.addMessage(allMessages[i]);
      }
    },
    addRoom: function(room) {

    },
    addFriend: function(friend) {

    },
    handleSubmit: function() {

    }
  };

  app.init();


  $('.send').on('click', function(){
    app.send();
  });




});
