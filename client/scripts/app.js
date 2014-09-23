// YOUR CODE HERE:
$(document).ready(function(){
  window.app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    currentRoom: "Lobby",
    allRooms: [],
    init: function(){
      this.fetch();
      setInterval(this.fetch.bind(this), 1000);
    },
    send: function(message){
      if (message === undefined) {
        var message = {};
        message.text = $('.messageBox').val();
        message.username = $('.usernameBox').val();
        message.roomname = $(".roomnameBox").val() || "somewhere";
      }

      $.ajax({
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          $('.messageBox').val('');
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
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
          //console.log('success');
          that.addAllMessages(data.results);
          that.addRooms(data.results);
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
      if (message.text.length < 400) {
        var $messageHolder = $('<div></div>');
        //console.log(message.username);
        $username = $('<span class="username"></span>').text(message.username);
        $msgText = $('<span></span>').text(': ' +  message.text);
        //$message.text(message.username + ': ' + message.text);
        $messageHolder.append($username);
        $messageHolder.append($msgText);
        $('#chats').append($messageHolder);
      }
    },
    addAllMessages: function(allMessages) {
      this.clearMessages();
      for (var i = 0; i < 20; i++) {
        this.addMessage(allMessages[i]);
      }
    },
    addRooms: function(data) {
      for (var i = 0; i < data.length; i++) {
        var name = data[i].roomname;
        if (this.allRooms.indexOf(name) === -1 && name !== undefined) {
          this.allRooms.push(name);
          $('#roomSelect').append('<option value='+name+'>'+name+'</option>');
        }
      }
    },
    addFriend: function(friend) {

    }
  };

  app.init();


  $('.send').on('click', function(){
    app.send();
  });




});
