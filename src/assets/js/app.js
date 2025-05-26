const URL = 'http://localhost:3000/';

addEventListener('DOMContentLoaded', () => {

    fetch(URL + 'api/produtos/1/primeiros', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(produto => {
                html += `
                <div class="p-2">
                    <div class="card rounded-0 border-black p-0">
                        <img src="../assets/images/${produto.Categoria}.png" class="img-album-custom card-img-top rounded-0"
                            alt="${produto.Nome}">
                        <div class="text-album-custom card-body text-center">
                            <p class="card-text">
                                <a href="/src/views/produto.html" class="text-decoration-none"><span class="fw-semibold fs-4" onclick="handleNavigation(event)"} id=${produto.Codigo}>${produto.Nome}</span></a>
                                <br>
                                R$ ${produto.Preco}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            });
            document.getElementById('produtos').innerHTML = html;
        })

});


function adicionarProduto(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    fetch(URL + 'api/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })

    window.location.reload();

}

function handleNavigation(e) {
    localStorage.setItem('codigoProduto', e.target.id);

}