const email = document.getElementById('email');
const idProduit = document.getElementById('idProduit');
const prixTotal = document.getElementById('prixTotal');
const image = document.getElementById('image');
const quantity = document.getElementById('quantity');
const varnish = document.getElementById('varnish');

email.innerText = localStorage.getItem('email');
idProduit.innerText = localStorage.getItem('produitId');
prixTotal.innerText = `${localStorage.getItem('produitTotalPrice')} €`;
image.src = localStorage.getItem('produitImage');
quantity.innerText = localStorage.getItem('produitQuantity');
varnish.innerText = localStorage.getItem('produitVarnish');

console.log(localStorage);
