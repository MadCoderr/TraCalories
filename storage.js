// Storage Controller
const StorageController = (function() {
  return {
    addItemToLS: function(item) {
      let items = [];

      if (localStorage.getItem('items') === null) {
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemFromLS: function() {
      const items = JSON.parse(localStorage.getItem('items'));
      return items === null ? [] : items;
    },
    updateItemLS: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === updatedItem.id) {
          items.splice(i, 1, updatedItem);
          break;
        }
      }

      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromLS: function(item) {
      let items = JSON.parse(localStorage.getItem('items'));

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
          items.splice(i, 1);
          break;
        }
      }

      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromLS: function() {
      localStorage.removeItem('items');
    }
  }
})();