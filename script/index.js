$(document).ready(function() {
  let buttonClicked = false;

  const showBtn = document.getElementById('showBtn');
  const navbarList = document.getElementById('navbar-list');
  showBtn.addEventListener('click', () => {
    buttonClicked = !buttonClicked;

    if (buttonClicked) {
      $('#navbar-list').css("display", 'block')
    } else {
      $('#navbar-list').css("display", 'none')
    }
    
    console.log("CLICKED", navbarList)
  });
})

// (function(window, document, undefined){

//   // code that should be taken care of right away
  
//   window.onload = init;
  
//     function init(){
//       console.log("ere")
//         const showBtn = document.getElementById('#showBtn');
//         const title = document.getElementById('#navbar-header');
//         console.log(showBtn, title)
//       // the code to be called when the dom has loaded
//       // #document has its nodes
//     }
  
//   })(window, document, undefined);

// window.onload = function() {
//     alert(document.getElementById("#showBtn"));
// };