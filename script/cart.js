$(document).ready(function() {
  let cartItems = [
    {
      id: 1,
      name: "Pizza",
      quantity: 1,
      img: '../images/pizza1.jpg',
      price: 15.00
    },
    {
      id: 2,
      name: "Pasta",
      quantity: 1,
      img: '../images/pasta1.jpg',
      price: 20.00
    },
    {
      id: 3,
      name: "Fries",
      quantity: 2,
      img: '../images/fries.jpg',
      price: 10.00
    },
    // {
    //   id: 4,
    //   name: "Pasta",
    //   quantity: 1,
    //   img: '../images/pasta1.jpg'
    // }
  ];

  renderCardItems(cartItems);
  
  const allIcrementButtons = $("[id^=increateQuantity]");
  console.log("INcre ")

  for (let i=0; i< allIcrementButtons.length; i++) {
    let btn = allIcrementButtons[i];
    let inputSelector = `quantityNumber${i}`;
    
    let quantityInput = document.getElementById(inputSelector);
    console.log("INcre ", quantityInput)
    btn.addEventListener('click', () => {
      quantityInput.setAttribute('value', +quantityInput.value + 1);
    });
  }
  
  const allDecrementButtons = $("[id^=decreaseQuantity]");
  for (let i=0; i< allDecrementButtons.length; i++) {
    let btn = allDecrementButtons[i];
    let inputSelector = `quantityNumber${i}`;

    let quantityInput = document.getElementById(inputSelector);
    btn.addEventListener('click', () => {
      console.log("CLLL", quantityInput.value)
      if (quantityInput.value > 1) {
        quantityInput.setAttribute('value', +quantityInput.value - 1);
      }
      
      if (+quantityInput.value === 1) {
        console.log("adsfasdf", btn.id)
      }
    });
  }

  const allRemoveItems = $("[id^=remove]")
  for (let i=0; i<allRemoveItems.length; i++) {
    let btn = allRemoveItems[i];
    btn.addEventListener('click', (data) => {
      const index = data.target.id.slice(data.target.id.length-1)
      console.log("CLIekc", data.target.id)
      if (index > -1) {
        cartItems = cartItems.filter(c => c.id !== +index)
        console.log(cartItems)
        renderCardItems(cartItems)
      }
    });
  }

})

function renderCardItems(cartItems) {

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
              <small>Price: $${item.quantity * item.price}</small>
              <br>
              <a id='remove${item.id}' class="removeLink">Remove</a>
            </div>
          </div>
        </td>
        <td>
          <input
            type="number"
            value="${item.quantity}"
            class="form-control form-control-sm quantity"
            id="quantityNumber${item.quantity}"
          />
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
}