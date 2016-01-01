
app.factory("Item", function() {
  var items = [];
  var totalItem = 50;

  for (var i=0; i<totalItem; i++) {
    items.push({ id: i, name: "name "+ i, description: "description " + i });
  }

  return {
    get: function(offset, limit) {
      return items.slice(offset, offset+limit);
    },
    total: function() {
      return items.length;
    }
  };
});