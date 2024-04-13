// OBJETOS - lista dos itens em forma de objetos

let italiano = {
    nome: "Italiano",
    preçoDesconto: 12.90,
    preçoOriginal: 16.90,
}

let grelhado = {
    nome: "Grelhado",
    preçoDesconto: 15.90,
    preçoOriginal: 19.90,
}

let bacon = {
    nome: "Bacon",
    preçoDesconto: 19.90,
    preçoOriginal: 24.90,
}

let queijoQuente = {
    nome: "Queijo Quente",
    preçoDesconto: 10.90,
    preçoOriginal: 13.90,
}

let rosbife = {
    nome: "Rosbife",
    preçoDesconto: 19.90,
    preçoOriginal: 24.90,
}

let croissant = {
    nome: "Croissant",
    preçoDesconto: 19.90,
    preçoOriginal: 24.90,
}

const opções = ['italiano', 'grelhado', 'bacon', 'queijoQuente', 'rosbife', 'croissant'] // Array de todas as opções de itens para comparação com o selecionado nos prompts
const sacola = [] // Array da sacola, itens adicionados entram aqui


// Botão de adicionar, prompt pede pro cliente digitar o nome do item e a quantidade que deseja adicionar e inclui isso no array da Sacola
// Estamos pensando em excluir este botão
const addGeral = (addGeral) => { 
    const addItemGeral = prompt ('Qual item você deseja adicionar à sacola?')
    const quantItemGeral = parseInt (prompt ('Quantas unidades você deseja adicionar à sacola?'))
    if (opções.includes(addItemGeral) && quantItemGeral == 1) { // Retorna o item adicionado no singular
        for (let i = 0; i < quantItemGeral; i++)
        sacola.push(addItemGeral)
        alert (`O item ${addItemGeral} foi adicionado à sua sacola`)
    } else if (opções.includes(addItemGeral) && quantItemGeral > 1) { // Retorna o item adicionado no plural
        for (let i = 0; i < quantItemGeral; i++)
        sacola.push(addItemGeral)
        alert (`O item ${addItemGeral} foi adicionado ${quantItemGeral} vezes à sua sacola`)
    } // ---
    else if (quantItemGeral == 0) { // Retorna erro caso a quantidade seja 0
        return alert (`Insira uma quantidade válida.`)
    } else { // Retorna erro caso o item não exista no array opções
        return alert (`O item digitado não existe.`)
    } // ---
}


// Botão sacola que abre e fecha o modal
const modal = document.querySelector(".modal__container")

function verSacola() {
    modal.classList.add("active")
}
function closeModal() {
    modal.classList.remove("active")
}


// Botão de adicionar dentro de cada item, prompt pede a quantidade e adiciona no array da Sacola
const addIndividual = (item) => { 
    const quantItemIndividual = parseInt (prompt ('Quantas unidades você deseja adicionar à sacola?'))
    if (quantItemIndividual == 1) { // Retorna o item adicionado no singular
        for (let i = 0; i < quantItemIndividual; i++)
        sacola.push(item)
        alert (`O item ${item.nome} foi adicionado à sua sacola`)
    } else if (quantItemIndividual > 1) { // Retorna o item adicionado no plural
        for (let i = 0; i < quantItemIndividual; i++)
        sacola.push(item)
        alert (`O item ${item.nome} foi adicionado ${quantItemIndividual} vezes à sua sacola`)
    }
    else if (quantItemIndividual == 0) { // Retorna erro caso a quantidade seja 0
        return alert (`Insira uma quantidade válida.`)
    }


 //Para escrever a quantidade total de itens e o valor total ao lado do desenho da sacola no header
const saveItem = document.getElementById("header-bag__itens")
const saveValue = document.getElementById("header-bag__cost")

const totalSacola = sacola.reduce ((soma, item) => soma + item.preçoDesconto, 0)
const totalSacolaDuasCasas = totalSacola.toFixed(2).toString().replace(".", ",") 

saveValue.innerHTML = `R$ ${totalSacolaDuasCasas}`

const quantidadeItens = sacola.length
sacola.map ((bag) => {
    if (quantidadeItens > 1) {
        saveItem.innerHTML = `${quantidadeItens} itens`
    }
    else {saveItem.innerHTML = `${quantidadeItens} item`}
})


//Comandos de dentro do modal
const orderName = document.getElementById('order-name')
const orderValue = document.getElementById('order-value')
const subtotal = document.getElementById('sub__valor')
const total = document.getElementById('total__valor')


localStorage.setItem("pedido", JSON.stringify(sacola))
const InfoLocalStorage = JSON.parse(localStorage.getItem("pedido"))

InfoLocalStorage.map((item) => {
    const precoDesconto = item.preçoDesconto.toFixed(2).toString().replace(".", ",")
    const criaNome = document.createElement('p')       
    const criaValor = document.createElement('p')

    criaNome.innerHTML = `${item.nome}`
    criaValor.innerHTML = `R$ ${precoDesconto}`

    orderName.append(criaNome)
    orderValue.append(criaValor)
    })           

subtotal.innerHTML = totalSacolaDuasCasas

function totalComTaxa (totalSacola, taxa) {
    return totalSacola + taxa;
}
var resultadoTotalTaxa = totalComTaxa(totalSacola, 9.9)
total.innerHTML = resultadoTotalTaxa.toFixed(2).toString().replace(".", ",")


console.log(InfoLocalStorage)

}


//Tecla remover dentro do modal
const apagarTudo = document.getElementById('sacolaCheia')
const sacolaVazia = document.getElementById('containerGeral')

function btnRemover() {
    localStorage.removeItem("pedido")
    apagarTudo.remove()

    const criarSacolaVazia = document.createElement("div")
    criarSacolaVazia.innerHTML =`
    <img src="./images/sacola-vazia.png" alt="Imagem de sacola vazia" style="padding: 60px 40px 40px 60px;" width="90%">
    <p style="font-size:14px;font-weight:600;text-align:center;">Sua sacola está vazia</p>
    <p style="font-size:13px;text-align:center;padding: 15px">Adicione itens</p>
    `
    sacolaVazia.append(criarSacolaVazia)
}