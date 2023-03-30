let cartItems = [
  {
    id: 0,
    name: "Pizza",
    quantity: 1,
    img: '../images/pizza1.jpg',
    price: 15.00
  },
  {
    id: 1,
    name: "Pasta",
    quantity: 1,
    img: '../images/pasta1.jpg',
    price: 20.00
  },
  {
    id: 2,
    name: "Fries",
    quantity: 2,
    img: '../images/fries.jpg',
    price: 10.00
  }
];

$(document).ready(function() {

  $("[type='number']").keypress(function (evt) {
    evt.preventDefault();
  });

  renderCardItems(cartItems);
})

function renderCardItems() {

  let divString = '';
  let subTotal = 0;
  for (let i=0; i<cartItems.length; i++) {
    let item = cartItems[i];
    subTotal += item.quantity * item.price;

    divString += `
      <tr>
        <td>
          <div class="cart-info">
            <img src="${item.img}" alt="pizza" class="cartImage" />
            <div>
              <p class="cart-item-name">${item.name}</p>
              <small>Price: $${item.price}</small>
              <br>
              <a id='remove${item.id}' class="removeLink">Remove</a>
            </div>
          </div>
        </td>
        <td class="quantity">
          <button class="btn btn-success" id="decreaseQuantity${item.id}">
            <i class="fa fa-minus" aria-hidden="true" ></i>
          </button>
          <input
            type="number"
            value="${item.quantity}"
            class="form-control form-control-sm quantity"
            id="quantityNumber${item.id}"
          />
          <button class="btn btn-success" id="increaseQuantity${item.id}">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </td>
        <td>$${item.quantity * item.price}</td>
      </tr>
    `;
  }

  // calculate tax and total
  const taxRate = 13;
  const taxAmount = ((subTotal*13)/100).toFixed(2);
  const total = (+subTotal + +taxAmount).toFixed(2);

  divString += `
    <tr>
      <td class="border-top-green"></td>
      <td class="border-top-green">Subtotal</td>
      <td class="border-top-green" id="subtotal">$${(subTotal).toFixed(2)}</td>
    </tr>
    <tr>
      <td></td>
      <td>Tax</td>
      <td id="tax">$${taxAmount}</td>
    </tr>
    <tr>
      <td></td>
      <td>Total</td>
      <td id="total">$${total}</td>
    </tr>
  `;
  $('#cart-items').html(divString);

  addRemoveButtonEventListener();

  addQuantityButtonEventListener();
}

function addRemoveButtonEventListener() {
  const allRemoveItems = $("[id^=remove]")
  for (let i=0; i<allRemoveItems.length; i++) {
    let btn = allRemoveItems[i];
    btn.addEventListener('click', (data) => {
      const index = data.target.id.slice(data.target.id.length-1)
      if (index > -1) {
        cartItems = cartItems.filter(c => c.id !== +index)
        renderCardItems(cartItems);
        // addRemoveButtonEventListener();
        // addQuantityButtonEventListener();
      }
    });
  }
}

function addQuantityButtonEventListener() {
  const allIcrementButtons = $("[id^=increaseQuantity]");
  for (let btn of allIcrementButtons) {
    btn.addEventListener('click', (data) => {
      console.log(data.target.id)
      const index = +data.target.id.slice(data.target.id.length-1)
      let inputSelector = `quantityNumber${index}`;
      let quantityInput = document.getElementById(inputSelector);
      setNewQuantity(index, +quantityInput.value + 1);
      renderCardItems()
      quantityInput.setAttribute('value', +quantityInput.value + 1);
    });
  }
  
  const allDecrementButtons = $("[id^=decreaseQuantity]");
  for (let btn of allDecrementButtons) {
    btn.addEventListener('click', (data) => {
      const index = +data.target.id.slice(data.target.id.length-1)
      let inputSelector = `quantityNumber${index}`;
      let quantityInput = document.getElementById(inputSelector);
      if (quantityInput.value > 1) {
        setNewQuantity(index, +quantityInput.value - 1);
        renderCardItems()
        quantityInput.setAttribute('value', +quantityInput.value - 1);
      }
    });
  }
}

function setNewQuantity(index, quantity) {
  for(let ci of cartItems) {
    if (ci.id === index) {
      ci["quantity"] = quantity;
    }
  }
  console.log(cartItems)
}