// UI Controller
const UIController = (function() {
  const selector = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.btn-clear',
    uiName: '#item-name',
    uiCaloreis: '#item-calories',
    uiTotalCalories: '.total-calories'
  }

  let html = '';

  // public scope/methods
  return {
    populateItemList: function(items) {
      items.forEach( (item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
        `;
      });

      document.querySelector(selector.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(selector.uiName).value,
        calories: document.querySelector(selector.uiCaloreis).value
      }
    },
    addListItem: function(item) {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;

      document.querySelector(selector.itemList).insertAdjacentElement('beforeend', li);
    },
    addItemToForm: function(item) {
      document.querySelector(selector.uiName).value = item.name;
      document.querySelector(selector.uiCaloreis).value = item.calories;
      this.showEditState();
    },
    updateListItem: function(item) {
      const listItems = document.querySelectorAll(selector.listItems);
      
      const listItemsArr = Array.from(listItems);

      listItemsArr.forEach(listItem => {
        const itemID = listItem.id;
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>
          `;
        }
      });
    },
    deleteListItem: function(item) {
      document.querySelector(`#item-${item.id}`).remove();
    },
    removeListItems: function() {
      let listItems = document.querySelectorAll(selector.listItems);
      listItems = Array.from(listItems);

      listItems.forEach(item => {
        item.remove();
      });
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(selector.uiTotalCalories).textContent = totalCalories;
    },
    clearInputs: function() {
      document.querySelector(selector.uiName).value = '';
      document.querySelector(selector.uiCaloreis).value = '';
    },
    hideList: function(check) {
      if (check) {
        document.querySelector(selector.itemList).style.display = 'none';
      } else {
        document.querySelector(selector.itemList).style.display = 'block';
      }
    },
    clearEditState: function() {
      this.clearInputs();
      document.querySelector(selector.deleteBtn).style.display = 'none';
      document.querySelector(selector.updateBtn).style.display = 'none';
      document.querySelector(selector.backBtn).style.display = 'none';
      document.querySelector(selector.addBtn).style.display = 'inline';
    },
   showEditState: function() {
      document.querySelector(selector.deleteBtn).style.display = 'inline';
      document.querySelector(selector.updateBtn).style.display = 'inline';
      document.querySelector(selector.backBtn).style.display = 'inline';
      document.querySelector(selector.addBtn).style.display = 'none';
    },
    getSelector: function() {
      return selector;
    }
  }
})();
