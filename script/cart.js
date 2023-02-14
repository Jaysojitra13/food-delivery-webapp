$(document).ready(function() {
  const cartItems = [
    {
      id: 1,
      name: "PIZZA",
      quantity: 1,
      img: '../images/pizza1.jpg'
    },
    {
      id: 2,
      name: "Pasta",
      quantity: 1,
      img: '../images/pasta1.jpg'
    },
    // {
    //   id: 3,
    //   name: "Pasta",
    //   quantity: 1,
    //   img: '../images/pasta1.jpg'
    // },
    // {
    //   id: 4,
    //   name: "Pasta",
    //   quantity: 1,
    //   img: '../images/pasta1.jpg'
    // }
  ];

  renderCardItems(cartItems);

  // let divString = `
  //   `
  // for (let i=0; i<cartItems.length; i++) {
  //   let item = cartItems[i];
    
  //   divString += `
  //     <div class="d-flex flex-row">
  //       <img src="../images/pizza1.jpg" alt="pizza" class="cartImage" />
  //         <div class="d-flex flex-column cartItemDetails">
  //           <p class="h5 cartItemName">${item.name}</p>
  //             <div class="d-flex flex-row ">
  //               <i class="fa fa-minus minusIcon" aria-hidden="true" id="decreaseQuantity${i}"></i>
  //               <input
  //                 type="number"
  //                 value="1"
  //                 class="form-control form-control-sm quantity"
  //                 id="quantityNumber${i}"
  //               />
  //               <i class="fa fa-plus plusIcon" aria-hidden="true" id="increateQuantity${i}"></i>
  //             </div>
  //         </div>
  //     </div>
  //   `;
  // }

  // $('#cardBody').append(divString);
  
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

  const allRemoveItems = $("[id^=removeItem]")
  for (let i=0; i<allRemoveItems.length; i++) {
    let btn = allRemoveItems[i];
    btn.addEventListener('click', () => {
      cartItems.splice(i, 1);
      renderCardItems(cartItems);
      // $(`#item${i}`).remove();
    });
  }

})

function renderCardItems(cartItems) {

  let divString = '';
  for (let i=0; i<cartItems.length; i++) {
    let item = cartItems[i];
    
    divString += `
      <div class="d-flex flex-row" id="item${i}">
        <img src="${item.img}" alt="pizza" class="cartImage" />
        <div class="d-flex flex-column cartItemDetails">
          <p class="h5 cartItemName">${item.name}</p>
            <div class="d-flex flex-row ">
              <button class="btn btn-secondary" id="decreaseQuantity${i}">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <input
                type="number"
                value="1"
                class="form-control form-control-sm quantity"
                id="quantityNumber${i}"
              />
              <button class="btn btn-secondary ml-10" id="increateQuantity${i}">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
        </div>
        <button class="btn btn-danger removeIcon" id="removeItem${i}">
          <i class="fa fa-remove" aria-hidden="true" ></i>
        </button>
      </div>
    `;
  }

  $('#cardBody').html(divString);
}