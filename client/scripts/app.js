var Message = Backbone.Model.extend({
  defaults: {
    'roomname': 'Lobby'
  },
  initialize: function(username, message, roomname) {
    this.set('username', username);
    this.set('message', message);
    if (roomname) {this.set('roomname', roomname);}
  }
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox'
});



var MessagesView = Backbone.View.extend({
  initialize: function(){

  },
  render: function(){}
});


var myMessage = new Message('nick', 'test');
var myMessage2 = new Message('nick', 'test', 'other room');

