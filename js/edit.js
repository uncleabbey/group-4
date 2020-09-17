// Extract id from query
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// get items from storage
const items =  JSON.parse(localStorage.getItem("items"));

// get item from storage
const { itemName, quantity, price, description } = items.filter(item => item.id === Number(id))[0]

// assign values to form
document.querySelector("#itemName").value = itemName;
document.querySelector("#quantity").value = quantity;
document.querySelector("#price").value = price;
document.querySelector("#description").value = description;


// get form from DOM
const editForm = document.querySelector("#edit-form");

// Add Event Submit to Form
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // collect new values
  let itemName = document.querySelector("#itemName").value;
  let quantity =  document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let description = document.querySelector("#description").value;

  const data = {
    itemName,
    quantity,
    price,
    description
  };

  // change value in array
  const edittedItems = items.map(item => {
    if(item.id === Number(id)) {
      item.itemName = data.itemName;
      item.quantity = data.quantity;
      item.price = data.price;
      item.description = data.description;
      item.amount = Number(data.quantity) * Number(data.price) + ".00" + "NGN";
    }
    return item
  });

  // store to localstorage
  localStorage.setItem("items", JSON.stringify(edittedItems));

  // go back to home page
  location.href = "index.html"
});