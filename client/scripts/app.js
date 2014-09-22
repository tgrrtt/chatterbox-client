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
    $.get(this.server,{
      contentType: 'application/json'
    }, function(data) {
      console.log(data);
    });
  },
  clearMessages: function(){

  },
  addMessage: function(message) {

  },
  addRoom: function(room) {

  },
  addFriend: function(friend) {

  },
  handleSubmit: function() {

  }
};
