////// class Fetch Api
class FetchApi {
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  async post(url, obj) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  }
}

//// Panier linkpage
document.getElementById('panierPage').addEventListener('click', (e) => {
  location.href = 'panier.html';
});
