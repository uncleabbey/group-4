// random integer for id
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// declaring variables
const addBtn = document.querySelector("#add-btn");
const addFormContainer = document.querySelector("#add-item-form");
const cancel = document.querySelector("#cancel"); 
const addForm = document.querySelector("#add-form");


// form opens on click of add button
addBtn.addEventListener("click", () => {
  addFormContainer.style.display = "block"
})

// form closes onclick of cancel button
cancel.addEventListener("click", () => {
  addFormContainer.style.display = "none"
});

// form closes when you click anywhere outside of form
window.onclick = (e) => {
    if (e.target === addForm) {
      addFormContainer.style.display = 'none';
    }
  };

// initialize each item
class Item {
  constructor(itemName, quantity, price, description) {
    this.id = randomInteger(1, 1000);
    this.itemName = itemName;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.amount =  this.quantity * this.price + ".00" + "NGN";
    this.date = new Date().toDateString();
  }
}
class Store {
  static getItems () {
    let items;
    if(localStorage.getItem("items") === null) {
      items = []
    } else {
      items = JSON.parse(localStorage.getItem("items"))
    }
    return items;
  };
  static addItemsToStore (item) {
    const items = this.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }
  static removeItem = (id) => {
    const getItems = this.getItems();
    const items = getItems.filter(item => item.id !== Number(id));
    localStorage.setItem("items", JSON.stringify(items));
  }
}

class UI {
  constructor() {
    this.displayItems()
  }

  displayItems () {
    const items = Store.getItems();
    items.forEach((item) => UI.addItemToDOM(item))
  }
  
  static addItemToDOM ({
    id, itemName, quantity, price, description, amount, date
  }) {
    const tbody = document.querySelector("#tbody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
    
      <td>${itemName}</td>
      <td>${description}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td>${amount}</td>
      <td>${date}</td>
      <td>
        <a href=edit.html?id=${id}><button class="edit-btn">Edit</button></a>
      </td>
      <td class="delete">
        <button class="delete-btn" onclick="UI.deleteItem(event, ${id})">
          Delete
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  }
  static clearForm() {
    document.querySelector("#itemName").value = "";
    document.querySelector("#quantity").value = ""
    document.querySelector("#price").value = "";
    document.querySelector("#description").value ="";
  }
  static deleteItem = (event, id) => {
    event.preventDefault();
    let el = event.target.parentElement;
    // console.log(el.parentElement);
    if(el.classList.contains('delete')) {
      el.parentElement.remove()
    }
    Store.removeItem(id)
  }
}


// when form submits
addForm.addEventListener("submit", (e) => {

  // prevent page from refreshing itself
  e.preventDefault();

  // collect from values
  const itemName = document.querySelector("#itemName").value;
  const quantity = Number(document.querySelector("#quantity").value);
  const price = Number(document.querySelector("#price").value);
  const description = document.querySelector("#description").value; 
  
  // get form object
  const data = new Item(itemName, quantity, price, description);

  // add data to dom
  UI.addItemToDOM(data);

  // add data to store
  Store.addItemsToStore(data)

  // clear form 
  UI.clearForm();

  // close form container on submit
  addFormContainer.style.display = 'none';
})


// display item on load
let items;
window.addEventListener("load", () => {
  items = new UI();
})