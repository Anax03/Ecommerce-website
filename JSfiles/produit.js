// Variables produits :
const produitName = document.getElementById('titreProduit');
const produitImage = document.querySelector('.ChoixProduit img');
const produitDescription = document.getElementById('descriptionDuProduit');
const produitVarnish = document.getElementById('varnish');
const produitPrix = document.getElementById('PrixDuProduit');
const btnPlus = document.getElementById('btnPlus');
const inputNmbr = document.querySelector('#numero');
const btnMinus = document.getElementById('btnMinus');
const valider = document.getElementById('ValiderProduit');

let totalPrice = 0;
let priceUnity;
let id;

let numberInput = Number(inputNmbr.value);

// Retourner les proprietes du produits
let nmbr = Number(localStorage.getItem('name'));
returnProduit(nmbr);

//Functions
function returnProduit(numero) {
  const fetchApi = new FetchApi();

  fetchApi.get('http://localhost:3000/api/furniture').then((data) => {
    totalPrice = data[numero].price;
    priceUnity = totalPrice;

    const lengthVarnish = data[numero].varnish.length;
    id = data[numero]._id;
    produitName.innerText = data[numero].name;
    produitImage.src = data[numero].imageUrl;
    produitDescription.innerText = data[numero].description;
    produitPrix.innerText = `${totalPrice} €`;
    for (let i = 0; i < lengthVarnish; i++) {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(data[numero].varnish[i]));
      option.value = `value ${i}`;
      produitVarnish.appendChild(option);
    }
  });
}
console.log(btnPlus);

// Buttons
btnPlus.addEventListener('click', (e) => {
  e.preventDefault();

  if (numberInput > 0) {
    numberInput++;
    inputNmbr.value = numberInput;
    totalPrice += priceUnity;

    produitPrix.innerText = `${totalPrice} €`;
  }
});

btnMinus.addEventListener('click', (e) => {
  e.preventDefault();
  if (numberInput > 1) {
    numberInput--;
    inputNmbr.value = numberInput;
    totalPrice -= priceUnity;
    produitPrix.innerText = `${totalPrice} €`;
  }
});

// send to panier
valider.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('produitId', id);
  localStorage.setItem('produitName', produitName.innerText);
  localStorage.setItem('produitImage', produitImage.src);
  localStorage.setItem('produitQuantity', inputNmbr.value);
  localStorage.setItem('produitTotalPrice', totalPrice);
  localStorage.setItem('produitDescript', produitDescription.innerText);
  localStorage.setItem(
    'produitVarnish',
    produitVarnish.options[produitVarnish.selectedIndex].text
  );
  location.href = 'panier.html';
});
