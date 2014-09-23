// Model for messages
var Message = Backbone.Model.extend({
  initialize: function(data) {
    // Create defaults for any undefined values from server
    if (!data.username) {this.set('username', 'Anon');}
    if (!data.text) {this.set('text', '#YOLO');}
    if (!data.roomname) {this.set('roomname', 'Lobby');}
  }
});

// Model View
var MessageView = Backbone.View.extend({
  tagName: 'li',
  render: function() {
    // var html = '<p>' + this.model.get('text') + '</p>';
    this.$el.html(this.model.get('text'));
    return this;
  }
});

// Collection of messages
var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function() {
    this.fetch({
      reset: true,
      data: {
        order: '-createdAt'
      }
    });
  },
  parse: function(response) {
    return response.results;
  }
});

// Collection View
var MessageCollectionView = Backbone.View.extend({
  el: '.messageContainer',
  initialize: function(){
    this.collection.on('reset', function() {
      this.render();
    }, this);
  },
  render: function(){
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(message) {
    var messageView = new MessageView({model: message});
    this.$el.append(messageView.render().el);

  }
});

$(document).ready(function(){
  // Create Collection
  var messages = new MessageCollection();
  // Create Collection View
  var messageCollectionView = new MessageCollectionView({collection: messages});
});
