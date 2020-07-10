const email = document.getElementById('email');
const idProduit = document.getElementById('idProduit');
const prixTotal = document.getElementById('prixTotal');
const image = document.getElementById('image');
const quantity = document.getElementById('quantity');
const varnish = document.getElementById('varnish');
const orderSummary = document.querySelector('.orderSummary');
const container = document.querySelector('.containerSummary');
const ObjData = JSON.parse(localStorage.getItem('itemConfirmation'));

email.innerText = localStorage.getItem('email');
idProduit.innerText = JSON.parse(localStorage.getItem('Identifiant'));
prixTotal.innerText = ObjData.prixTotal;
image.src = localStorage.getItem('produitImage');
quantity.innerText = localStorage.getItem('produitQuantity');
varnish.innerText = localStorage.getItem('produitVarnish');

orderSUMMARY();
/// orderSummary
function orderSUMMARY() {
  let varnishPara = '';
  //image
  orderSummary.children[0].src = ObjData.images[0];
  //quantity
  orderSummary.children[1].children[1].innerText = ObjData.quantity[0];
  //varnish

  varnishPara = ObjData.varnish[0];
  orderSummary.children[1].children[3].innerText = varnishPara;

  for (let i = 1; i < ObjData.quantity.length; i++) {
    let order = orderSummary.cloneNode(true);
    order.children[0].src = ObjData.images[i];
    orderSummary.children[1].children[1].innerText = ObjData.quantity[i];
    orderSummary.children[1].children[3].innerText = ObjData.varnish[i];
    container.appendChild(order);
  }
}
