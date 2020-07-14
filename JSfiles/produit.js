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

// request get pour recuperer produit
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

// Buttons
//button Plus
btnPlus.addEventListener('click', (e) => {
  e.preventDefault();

  if (numberInput > 0) {
    numberInput++;
    inputNmbr.value = numberInput;
    totalPrice += priceUnity;

    produitPrix.innerText = `${totalPrice} €`;
  }
});

//button minus
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
  achat();
});

//Function tableau de plusieurs choix de l'achat

function achat() {
  let obj = {
    id: id,
    produitName: produitName.innerText,
    produitImage: produitImage.src,
    produitQuantity: inputNmbr.value,
    produitTotalPrice: totalPrice,
    produitDescript: produitDescription.innerText,
    produitVarnish: [
      {
        varnish: produitVarnish.options[produitVarnish.selectedIndex].text,
        quantity: inputNmbr.value,
      },
    ],
  };
  if (localStorage.getItem('ProduitData') != null) {
    let content = localStorage.getItem('ProduitData');
    let array = JSON.parse(content);
    Format(array, obj);

    localStorage.setItem('ProduitData', JSON.stringify(array));
  } else {
    let Data = JSON.stringify(obj);
    localStorage.setItem('ProduitData', `[${Data}]`);
  }

  location.href = 'panier.html';
}

// Function pas répéter les mêmes produits dans le panier
function Format(array, obj) {
  let flag = true;
  let flag2 = true;

  for (let i = 0; i < array.length; i++) {
    if (array[i].produitName === obj.produitName) {
      let quantityObjArray = Number(array[i].produitQuantity);

      let quantitynewObj = Number(obj.produitQuantity);

      let quantityTotal = quantityObjArray + quantitynewObj;
      array[i].produitQuantity = quantityTotal;

      let objVarnish = obj.produitVarnish[0];
      array[i].produitTotalPrice += obj.produitTotalPrice;

      array[i].produitVarnish.map((e) => {
        if (e.varnish === objVarnish.varnish) {
          let quantityProduit = Number(e.quantity);
          let QuantityVernis = Number(objVarnish.quantity);
          e.quantity = quantityProduit + QuantityVernis;

          flag2 = false;
        }
      });

      if (flag2 === true && i === array.length - 1) {
        array[i].produitVarnish.push({
          varnish: objVarnish.varnish,
          quantity: objVarnish.quantity,
        });
      }

      flag = false;
      break;
    }
  }
  if (flag === true) {
    array.push(obj);
  }
}
