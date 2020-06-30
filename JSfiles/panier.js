// Variables panier :

const imageProduit = document.getElementById('ProduitPanier');
const TitreProduit = document.getElementById('panierTitre');
const priceProduit = document.getElementById('priceProduit');
const totalPRice = document.getElementById('totalPRice');
const quantityProduit = document.getElementById('quantity');
const description = document.getElementsByClassName('des');

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

// ajouter les infos du produits dans le panier
infoProduit();

//
lengthNmbrInput(inputPostal);
lengthNmbrInput(inputTele);

//Button confirmer
btnConfirmer.addEventListener('click', (e) => {
  includeNumber(inputNom);
  includeNumber(inputPrenom);
  includeNumber(inputPays);
  includeNumber(inputVille);
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
  ];

  let flag = true;
  array.forEach((element) => {
    if (element === true) {
      flag = false;
    }
  });
  if (flag === true) {
    postPanier();
    localStorage.setItem('email', inputEmail.value);
    location.href = 'confirmation.html';
  }
});
//Functions
// function pour ajouter les details de l'achat
function infoProduit() {
  TitreProduit.innerText = localStorage.getItem('produitName');
  imageProduit.src = localStorage.getItem('produitImage');
  quantityProduit.value = localStorage.getItem('produitQuantity');
  description.innerText = localStorage.getItem('produitDescript');
  priceProduit.innerText = localStorage.getItem('produitTotalPrice');
  totalPRice.innerText = `Total price : € ${localStorage.getItem(
    'produitTotalPrice'
  )}`;
}

// Function qui n'autorise pas d'avoir des numeros
function includeNumber(Input) {
  let nom = Input.value;
  for (let i = 0; i < 10; i++) {
    if (nom.includes(i)) {
      Input.value = '';
      console.log(Input.style.border);

      Input.style.border = '1px solid red';
      Input.placeholder = 'Entre a valid value';

      break;
    }
  }
  if (Input.value.length > 0) {
    Input.style.border = '1px solid #c0c0c0';
  }
}
//Function length
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

/// Post formulaire

function postPanier() {
  const apiFetch = new FetchApi();
  apiFetch
    .post('http://localhost:3000/api/furniture/order', {
      contact: {
        firstName: inputPrenom.value,
        lastName: inputNom.value,
        address: inputAdresse.value,
        city: inputVille.value,
        email: inputEmail.value,
      },
      products: [localStorage.getItem('produitId')],
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
