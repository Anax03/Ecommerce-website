// Object pour fetch
const fetching = new FetchApi();
//Sélectionner toutes les produits
const produits = document.querySelectorAll('.produit');

//// For lop pour ajouter les resources d'api

fetching.get('http://localhost:3000/api/furniture').then((data) => {
  let i = 0;
  data.map((element) => {
    produits[i].children[0].src = element.imageUrl;
    produits[i].children[1].innerText = element.name;
    produits[i].children[2].innerText = `prix : ${element.price}€`;

    i++;
  });
});

//// Page 2 Produit

const selectButton = document.querySelectorAll('.select');

/// Selectionner
for (let i = 0; i < selectButton.length; i++) {
  selectButton[i].addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('name', i);
    location.href = `produit.html`;
  });
}
