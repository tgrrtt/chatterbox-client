var Message = Backbone.Model.extend({
  initialize: function(data) {
    //console.log(data);
    //console.log("yo");
    if (!data.username) {this.set('username', 'Anon');}
    if (!data.message) {this.set('message', '#YOLO');}
    if (!data.roomname) {this.set('roomname', 'Lobby');}
  }
});
var MessageView = Backbone.View.extend({
  render: function() {
    var html = "<p>yo</p>";

  }
});
var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function() {
    this.fetch({
      data: {
        order: '-createdAt'
      }
    });
  },
  parse: function(response) {
    return response.results;
  }
});

var MessageCollectionView = Backbone.View.extend({
  el: '.messageContainer',
  initialize: function(){
    this.collection.on('add', function(){

      this.render();
    }, this);
    this.collection.on('change', function(){

      this.render();
    }, this);
  },
  render: function(){
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(message) {
    var messageView = new MessageView({model: message});
  }
});

var messages = new MessageCollection();

var messageCollectionView = new MessageCollectionView({collection: messages});


