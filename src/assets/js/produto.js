const URL = 'http://localhost:3000/';

addEventListener('DOMContentLoaded', () => {

    const codigoProduto = localStorage.getItem('codigoProduto');

    fetch(URL + 'api/produtos/' + codigoProduto, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(produto => {

            document.getElementById('imagem-produto').innerHTML = `<img src="../assets/images/${produto.Categoria}.png" class="img-fluid rounded" alt="foto produto"</img>`;
            document.getElementById('nome-produto').innerHTML = `<span>${produto.Nome}</span>`;
            document.getElementById('preco').innerHTML = `<span>${produto.Preco}</span>`;
            document.getElementById('codigo').innerHTML = `<span>${produto.Codigo}</span>`;
            document.getElementById('descricao').innerHTML = `<span>${produto.Descricao}</span>`;
            document.getElementById('categoria').innerHTML = `<span>${produto.Categoria}</span>`;
            document.getElementById('avaliacao').innerHTML = `<span>${produto.Avaliacao}</span>`;
            document.getElementById('estoque').innerHTML = `<span>${produto.Estoque}</span>`;
        });

});


function editarProduto(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
    
    fetch(URL + "api/produtos/" + localStorage.getItem("codigoProduto"), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(produto => {
            
            let UpdateProduto = {
                codigo: formDataObject.codigo ? formDataObject.codigo : produto.Codigo,
                nome: formDataObject.nome ? formDataObject.nome : produto.Nome,
                preco: formDataObject.preco ? formDataObject.preco : produto.Preco,
                descricao: formDataObject.descricao  ? formDataObject.descricao : produto.Descricao,
                categoria: formDataObject.categoria  ? formDataObject.categoria : produto.Categoria,
                avaliacao: formDataObject.avaliacao  ? formDataObject.avaliacao : produto.Avaliacao,
                estoque: formDataObject.estoque ? formDataObject.estoque : produto.Estoque
            };

            console.log(UpdateProduto);

            fetch(URL + 'api/produtos/' + localStorage.getItem("codigoProduto"), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UpdateProduto)
            })

            localStorage.setItem('codigoProduto', UpdateProduto.codigo);

        });

     setTimeout(()=>{window.location.reload()}, 1000);

}


function deletarProduto(e) {
    e.preventDefault();

    fetch(URL + 'api/produtos/' + localStorage.getItem("codigoProduto"), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    localStorage.removeItem('codigoProduto');

    setTimeout(() => { window.location.href = '/src/views/index.html' }, 1000);
}