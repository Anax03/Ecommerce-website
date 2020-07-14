const email = document.getElementById('email');
const orderID = document.getElementById('idProduit');
const prixTotal = document.getElementById('prixTotal');
const image = document.getElementById('image');
const quantity = document.getElementById('quantity');
const varnish = document.getElementById('varnish');
const orderSummary = document.querySelector('.orderSummary');
const container = document.querySelector('.containerSummary');
const ObjetAchat = JSON.parse(localStorage.getItem('itemConfirmation'));

email.innerText = localStorage.getItem('email');
orderID.innerText = localStorage.getItem('Identifiant');
prixTotal.innerText = ObjetAchat.prixTotal;
image.src = localStorage.getItem('produitImage');
quantity.innerText = localStorage.getItem('produitQuantity');
varnish.innerText = localStorage.getItem('produitVarnish');

orderSUMMARY();
/// orderSummary
function orderSUMMARY() {
  let varnishPara = '';
  //image
  orderSummary.children[0].src = ObjetAchat.images[0];
  //quantity
  orderSummary.children[1].children[1].innerText = ObjetAchat.quantity[0];
  //varnish

  varnishPara = ObjetAchat.varnish[0];
  orderSummary.children[1].children[3].innerText = varnishPara;

  for (let i = 1; i < ObjetAchat.quantity.length; i++) {
    let order = orderSummary.cloneNode(true);
    order.children[0].src = ObjetAchat.images[i];
    order.children[1].children[1].innerText = ObjetAchat.quantity[i];
    order.children[1].children[3].innerText = ObjetAchat.varnish[i];
    container.appendChild(order);
  }
}
