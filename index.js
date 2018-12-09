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
    display: true,
  },
  {
    name: "bread", 
    checked: false,
    display: true
  }
];

// set a variable to default "show all"
let displayAllByDefault = true;

function setDisplayStatus () {
  console.log('setDisplayStatus ran');
  if (displayAllByDefault === true) {
    setDisplayToAll();
    console.log('set display to all');
   } else if (displayAllByDefault === false) {
    setDisplayToUnChecked();
    console.log('set display to unchecked');
   };
}


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

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list elements");
  // list of items with display set to true
    const items = shoppingList.filter(item => item['display'] === true).map((item, index) => generateItemElement(item, index));  
    return items.join("");
  }


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  setDisplayStatus();
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function setDisplayToAll () {
  console.log('setDisplayToAll ran');
  // this function sets all items to display: true
  for (let i = 0; i < STORE.length; i++) {
    STORE[i]['display'] = true;
    console.log(STORE[i]);
  };
}


function setDisplayToUnChecked () {
  // this function sets items with checked: true to display: false
  console.log('setDisplayToUnChecked ran');
  for (let i = 0; i < STORE.length; i++) {
    if(STORE[i]['checked'] === true) { 
      STORE[i]['display'] = false;
      console.log(STORE[i]);
    }
  };
}


// this handles the view all/unchecked items option
function handleDisplayToggle () {
  // add event listener to that button
  $('.display-toggle').click('.display-toggle', function(event) {
    console.log('handleDisplayToggle ran');

    // change the status of displayAllByDefault
    displayAllByDefault = !displayAllByDefault;
    console.log('the default display is set to all? is ' + displayAllByDefault);

   renderShoppingList();
  });
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, display: true});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit('.js-shopping-list-entry', function(event) {
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
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteItem(itemIndex);
      renderShoppingList();
  });
}

function deleteItem(index) {
  STORE.splice(index, 1);
}

function handleSearchItems() {
  $('#js-search-field').submit('.search-item', event => {
    event.preventDefault();
    console.log('you entered a search inquiry');
    const searchFor = $('.search-item').val();
    console.log(`you are searching for ${searchFor}`);
    $('.search-item').val('');
  });
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
  handleSearchItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);