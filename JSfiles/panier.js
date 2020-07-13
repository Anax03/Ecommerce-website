// Variables panier :

const imageProduit = document.getElementById('ProduitPanier');
const TitreProduit = document.getElementById('panierTitre');
const priceProduit = document.getElementById('priceProduit');
const totalPRice = document.getElementById('totalPRice');
const quantityProduit = document.getElementById('quantity');
const description = document.getElementsByClassName('des');
const panierAll = document.querySelector('.nosPaniers');
const contentPanier = document.querySelector('.contentPanier');
const panierVide = document.querySelector('#panierVide');
const panierPlein = document.querySelector('#panier');
const btnRemove = document.querySelectorAll('.fa-trash-alt');

//variables contact
const formContact = document.querySelector('.contactForm');
const inputNom = document.getElementById('nom');
const inputPrenom = document.getElementById('prenom');
const inputEmail = document.getElementById('email');
const inputTele = document.getElementById('tele');
const inputAdresse = document.getElementById('adresse');
const inputPostal = document.getElementById('codepostal');
const inputVille = document.getElementById('ville');
const inputPays = document.getElementById('pays');
const btnConfirmer = document.getElementById('confirmButton');

//Other variables
let totalPricevar = 0;

// ajouter les infos du produits dans le panier
infoProduit();

//
lengthNmbrInput(inputPostal);
lengthNmbrInput(inputTele);

//Button confirmer
btnConfirmer.addEventListener('click', (e) => {
  e.preventDefault();
  includeNumber(inputNom);
  includeNumber(inputPrenom);
  includeNumber(inputPays);
  includeNumber(inputVille);
  includeLettres(inputPostal);
  includeLettres(inputTele);
  lengthNmbrInput(inputPostal);
  validEmail(inputEmail);

  let array = [
    inputNom.value.length == 0,
    inputPrenom.value.length == 0,
    inputPays.value.length == 0,
    inputVille.value.length == 0,
    inputPostal.value.length == 0,
    inputAdresse.value.length == 0,
    inputEmail.value.length == 0,
    priceProduit.innerHTML == 0,
  ];

  let flag = true;
  array.forEach((element) => {
    if (element === true) {
      flag = false;
    }
  });
  if (flag === true) {
    if (window.confirm('Sure?')) {
      postPanier();

      localStorage.setItem('email', inputEmail.value);

      const datax = returnData();
      localStorage.setItem('itemConfirmation', datax);
      localStorage.removeItem('ProduitData');
      location.href = 'confirmation.html';
    }
  }
});
//Functions
// function pour ajouter les details de l'achat
function infoProduit() {
  let arrayProduit = JSON.parse(localStorage.getItem('ProduitData'));

  if (arrayProduit != null) {
    for (let i = 0; i < arrayProduit.length; i++) {
      if (i === 0) {
        panierVide.style.display = 'none';
        panierPlein.style.visibility = 'visible';
        TitreProduit.innerText = arrayProduit[0].produitName;
        imageProduit.src = arrayProduit[0].produitImage;
        quantityProduit.value = arrayProduit[0].produitQuantity;
        description.innerText = arrayProduit[0].produitDescript;
        priceProduit.innerText = arrayProduit[0].produitTotalPrice;
        totalPricevar = Number(arrayProduit[0].produitTotalPrice);
        totalPRice.innerText = `Total price : € ${totalPricevar}`;
      } else {
        let op = contentPanier.cloneNode(true);
        op.children[0].src = arrayProduit[i].produitImage;

        op.children[1].children[0].children[0].innerText =
          arrayProduit[i].produitName;
        op.children[1].children[0].children[1].value =
          arrayProduit[i].produitQuantity;
        op.children[1].children[0].children[2].innerText =
          arrayProduit[i].produitTotalPrice;
        op.children[1].children[1].children[0].innerText =
          arrayProduit[i].produitDescript;
        totalPricevar += Number(arrayProduit[i].produitTotalPrice);
        totalPRice.innerText = `Total price : € ${totalPricevar}`;
        op.children[1].children[1].children[1].addEventListener(
          'click',
          (e) => {
            removeAchat(i, e);
          }
        );

        panierAll.appendChild(op);
      }
    }
  }
}

// Function qui n'autorise pas d'avoir des numeros
function includeNumber(Input) {
  let nom = Input.value;
  for (let i = 0; i < 10; i++) {
    if (nom.includes(i)) {
      Input.value = '';

      Input.style.border = '1px solid red';
      Input.placeholder = 'Entre a valid value';

      break;
    }
  }
  if (Input.value.length > 0) {
    Input.style.border = '1px solid #c0c0c0';
  }
}

function includeLettres(Input) {
  let nom = Input.value;
  for (let i = 0; i < 10; i++) {
    if (!nom.includes(i)) {
      Input.value = '';

      Input.style.border = '1px solid red';
      Input.placeholder = 'Entre a valid value';

      break;
    }
  }
  if (Input.value.length > 0) {
    Input.style.border = '1px solid #c0c0c0';
  }
}

//Function qui n'autorise pas des lettres
//Function length input
function lengthNmbrInput(a) {
  a.addEventListener('keypress', (e) => {
    if (a.value.length > 20) {
      a.value = a.value.slice(0, -1);
    }
  });
}

//function valid email
function validEmail(vld) {
  if (vld.value.includes('@') && vld.value.includes('.')) {
    vld.style.border = '1px solid #c0c0c0';
  } else {
    vld.value = '';
    vld.placeholder = 'Enter a valid value';
    vld.style.border = '1px solid red';
  }
}

// Remove btn index 0
btnRemove[0].addEventListener('click', (e) => {
  removeAchat(0, e);
});

//function remove achat
function removeAchat(nmbr, e) {
  e.preventDefault();

  let arrayProduit = JSON.parse(localStorage.getItem('ProduitData'));

  if (window.confirm('Sure?')) {
    arrayProduit.splice(nmbr, 1);
    let returnedArray = JSON.stringify(arrayProduit);
    localStorage.setItem('ProduitData', returnedArray);
    window.location.reload();
  }
}

/// get ID

function getID(id) {
  const apiFetch = new FetchApi();
  apiFetch
    .get(`http://localhost:3000/api/furniture/${id}`)
    .then((res) => {
      return res.orderId;
    })
    .catch((err) => {});
}

/// Post formulaire

function postPanier() {
  const apiFetch = new FetchApi();

  let arrayProduit = JSON.parse(localStorage.getItem('ProduitData'));
  let ids = new Array();
  arrayProduit.map((e) => {
    ids.push(e.id);
  });

  apiFetch
    .post('http://localhost:3000/api/furniture/order', {
      contact: {
        firstName: inputPrenom.value,
        lastName: inputNom.value,
        address: inputAdresse.value,
        city: inputVille.value,
        email: inputEmail.value,
      },
      products: ids,
    })
    .then((data) => {
      localStorage.setItem('Identifiant', JSON.stringify(data.orderId));
    })
    .catch((err) => {});
}

function returnData() {
  let arrayData = JSON.parse(localStorage.getItem('ProduitData'));
  let varnishlist = new Array();
  let quantitypr = [];
  let image = [];

  for (let i = 0; i < arrayData.length; i++) {
    let characters = '';
    let quant = 0;
    image.push(arrayData[i].produitImage);
    arrayData[i].produitVarnish.map((e) => {
      quant += Number(e.quantity);
      characters += `(${e.quantity})${e.varnish} `;
    });
    varnishlist.push(characters);
    quantitypr.push(quant);
  }

  const a = {
    prixTotal: totalPRice.innerText.replace('Total price : ', ''),
    quantity: quantitypr,
    varnish: varnishlist,
    images: image,
  };

  return JSON.stringify(a);
}
