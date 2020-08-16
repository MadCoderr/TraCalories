// App/Main Controller
const Main = (function(itemCtrl, uiCtrl, strCtrl) {
  // Load Event Listener
  const loadEventListener = function() {
    // ui selector
    const selectors = uiCtrl.getSelector();

    // add item event
    document.querySelector(selectors.addBtn).addEventListener('click', addItem);
    
    // disable submit on enter
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })

    document.querySelector(selectors.itemList).addEventListener('click', editItem);
  
    document.querySelector(selectors.updateBtn).addEventListener('click', updateItem);
   
    document.querySelector(selectors.deleteBtn).addEventListener('click', deleteItem);
    
    document.querySelector(selectors.backBtn).addEventListener('click', (e) => {
      uiCtrl.clearEditState();
      e.preventDefault();
    });

    document.querySelector(selectors.clearBtn).addEventListener('click', clearAllItems);
  }

  const addItem = function(e) {
    // get input from UI controller;
    const input = uiCtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = itemCtrl.addItem(input.name, input.calories);

      uiCtrl.hideList(false);
      uiCtrl.addListItem(newItem);
      uiCtrl.showTotalCalories(itemCtrl.getTotalCalories());

      strCtrl.addItemToLS(newItem);

      uiCtrl.clearInputs();
    } else {
      alert('name & calories must be filled!!!');
      uiCtrl.clearInputs();
    }

    e.preventDefault();
  }

  const editItem = function(e) {
    if (e.target.classList.contains('edit-item')) {
      const item = e.target.parentNode.parentNode.id;
      const id = parseInt(item.split('-')[1]);
      
      const itemToEdit = itemCtrl.getItemById(id);

      itemCtrl.setCurrentItem(itemToEdit);

      uiCtrl.addItemToForm(itemToEdit);
    }
  
    e.preventDefault();
  }

  const updateItem = function(e) {
    const input = uiCtrl.getItemInput();
    const updatedItem = itemCtrl.updateItem(input.name, input.calories);

    uiCtrl.updateListItem(updatedItem);
    uiCtrl.showTotalCalories(itemCtrl.getTotalCalories());

    strCtrl.updateItemLS(updatedItem);

    uiCtrl.clearEditState();
    
    e.preventDefault();
  }


  const deleteItem = function(e) {
    const currentItem  = itemCtrl.getCurrentItem();
    itemCtrl.deleteItem(currentItem);
    uiCtrl.deleteListItem(currentItem);
    uiCtrl.showTotalCalories(itemCtrl.getTotalCalories());

    strCtrl.deleteItemFromLS(currentItem);

    uiCtrl.clearEditState();

    if (itemCtrl.getItems().length === 0) 
      uiCtrl.hideList(true);

    e.preventDefault();
  }

  const clearAllItems = function(e) {
    itemCtrl.deleteAllItems();
    uiCtrl.showTotalCalories(itemCtrl.getTotalCalories());
    uiCtrl.removeListItems();
    strCtrl.clearItemsFromLS();
    uiCtrl.hideList(true);
    e.preventDefault();
  }

  return {
    init: function() {
      // load event listener
      uiCtrl.clearEditState();
      loadEventListener();
      itemCtrl.setItems(strCtrl.getItemFromLS());

      // Fetch items from Data structure
      const items = itemCtrl.getItems();
      if (items.length === 0) {
        uiCtrl.hideList(true);
      } else {  
        // Populate list with items
        uiCtrl.hideList(false);
        uiCtrl.populateItemList(items);
        uiCtrl.showTotalCalories(itemCtrl.getTotalCalories());
      }
    }
  }
})(ItemController, UIController, StorageController);


Main.init();

