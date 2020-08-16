const ItemController = (function() {
  // item constructor
    const Item = function(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }

  // data structure / state
  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  }

  const generateID = function() {
    return data.items.length > 0 ? 
           data.items[data.items.length -1].id + 1 : 
           0;
  }

  // Public Scope
  return {
    getItems: function() {
      return data.items;
    },
    setItems: function(items) {
      data.items = items;
    },
    addItem: function(name, calories) {
      const newItem = 
      new Item(generateID(), name, parseInt(calories));

      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let currentItem;
      data.items.forEach((item) => {
        if (item.id === id)
          currentItem = item;
      });
      return currentItem;
    },
    updateItem: function(name, calories) {
      data.currentItem.name = name;
      data.currentItem.calories = parseInt(calories);
      return data.currentItem;
    },
    deleteItem: function(item) {
      const index = data.items.indexOf(item);
      data.items.splice(index, 1);
    },
    deleteAllItems: function() {
      data.items = []; 
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories() {
      let calories = 0;
      data.items.forEach(item => {
        calories += item.calories;
      });

      data.totalCalories = calories;

      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }

})();