'use strict';

const STORE = [
  {
    name: "apples", 
    checked: false,
    display: true
  },
  {
    name: "oranges", 
    checked: false,
    display: true
  },
  {
    name: "milk", 
    checked: true,
    display: false,
  },
  {
    name: "bread", 
    checked: false,
    display: true
  }
  defaultDisplay: allItems;
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function setDisplayToAll () {
  // this function sets all items to display: true
  console.log('setDisplayToAll ran');
}

function setDisplayToChecked () {
  // this function sets items with checked: true to display: false
  console.log('set display to checked ran');
}

function getDisplayTrueItems() {

}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  // need to get list of items with display set to true
  // getDisplayTrueItems();

  const items = shoppingList.map((item, index) => generateItemElement(item, index));  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}



// this handles the view all/unchecked items option
function handleDisplayToggle () {
  // add event listener to that button
  $('#js-shopping-list-form').click('display-toggle', event => {
    console.log('handleDisplayToggle ran');

    // it ran, so now it needs to get a list of unchecked items
   if (display-toggle checked = true) {
     display all
   }
   else if (display-toggle checked = false) {
     setDisplayToChecked();
   }
  });
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, display: true});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
function toggleCheckedForListItem(itemIndex) {
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteItem(itemIndex);
      renderShoppingList();
  });
}

function deleteItem(index) {
  STORE.splice(index, 1);
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayToggle();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);