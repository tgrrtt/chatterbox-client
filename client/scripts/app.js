// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){

  },
  send: function(message){
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
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
      contentType: 'application/json',
      success: function (data) {
        console.log('success');
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
    $message.html(message.username + ': ' + message.text);
    $('#chats').append($message);
  },
  addAllMessages: function(allMessages) {
    for (var i = 0; i < allMessages.length; i++) {
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
app.fetch();
