var Message = Backbone.Model.extend({
  initialize: function(data) {
    //console.log(data);
    if (!data.username) {this.set('username', 'Anon');}
    if (!data.message) {this.set('message', '#YOLO');}
    if (!data.roomname) {this.set('roomname', 'Lobby');}
    //console.log(this.get('username'));
  }
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function() {
    this.fetch({
      data: {
        order: '-createdAt'
      },
      success: function(collection, response, options) {
        //console.log(response, "response");
      }
    });
  },
  parse: function(response) {
    // if it's like {data: [model1, model2, model3...]}
    return response.results;
  }
});



var MessagesView = Backbone.View.extend({
  initialize: function(){
  },
  render: function(){}
});


// var myMessage = new Message('nick', 'test');
// var myMessage2 = new Message('nick', 'test', 'other room');

var messages = new Messages();

// messages.fetch({
//   data: {
//     order: '-createdAt'
//   },
//   success: function(collection, response, options) {
//     console.log(response, "response");
//   }
// });
