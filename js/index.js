document.getElementById("checkout").style.display = 'none';


let totalItems = [];
let totalPrice = 0;
let totalQuantity = 0;

const noOfItems = document.getElementById("count");
noOfItems.innerHTML = totalItems.length;

function addToCart(id, productName, productPrice) {
  let item = {
    id : id,
    productName : productName,
    productPrice : productPrice,
    quantity:1,
  };
  
  for ( let i = 0 ;  i < totalItems.length ; i++) {
    if (totalItems[i].id == item.id) {
        let productData = {
            id : item.id,
            productName : item.productName,
            productPrice: totalItems[i].productPrice += productPrice,
            quantity : +totalItems[i].quantity + 1
        };
        totalItems[i] = productData;
        listAllItems()
        return;
       
    }
    
}

totalItems.push(item);
noOfItems.innerHTML = totalItems.length;
listAllItems()

}
  



function listAllItems() {
  document.getElementById("display").innerHTML="";
  
    for (const item of totalItems){
      
       let displayItems = document.createElement('p')
       let allItems = document.createTextNode(`Product Name: ${item.productName}
       product price:${item.productPrice} Quantity: ${item.quantity}`)

       displayItems.appendChild(allItems)
       document.getElementById("display").appendChild(displayItems);
       console.log(allItems)
    }
}
function showItem() {
  
  document.getElementById("display").innerHTML="";
  document.getElementById("banner").style.display = "none"
  listAllItems()
  document.getElementById("checkout").style.display = 'block';


  for ( let i = 0 ;  i < totalItems.length ; i++) {

    totalPrice +=  +totalItems[i].productPrice
    totalQuantity += +totalItems[i].quantity;

    // to display price
    let priceContainer = document.getElementById("totalPrice");
    priceContainer.innerHTML = totalPrice;
    

    // to display quantity
    let quantContainer = document.getElementById("totalQuantity");
    quantContainer.innerHTML = totalQuantity;
}
let amt = document.getElementById('totalPrice').innerHTML;
document.getElementById('amount').value= amt;
}



// paystack payment integration
const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener("submit", payWithPaystack, false);

    function payWithPaystack(e) {

        e.preventDefault();

        let handler = PaystackPop.setup({

          key: 'pk_test_d93d381ae37d559ba8ae21eb185ca14cd315c41b', 
          
          firstname:document.getElementById("first-name").value,
          lastname:document.getElementById("last-name").value,
          email: document.getElementById("email-address").value,
        

          amount: document.getElementById("amount").value * 100,

          ref: ''+Math.floor((Math.random() * 1000000000) + 1), 

          onClose: function(){

            alert('Window closed.');

          },

          callback: function(response){
            response.reference;

            alert(message);
            window.location = ""
          }

        });

        handler.openIframe();

}