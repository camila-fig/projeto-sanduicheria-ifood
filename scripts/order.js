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


// Botão sacola que abre e fecha o modal
const modal = document.querySelector(".modal__container")
const modalVazio = document.querySelector(".modal__container-vazio")
function verSacola() {
    if (sacola.length === 0) {
        modalVazio.classList.add("active")
    } else {
        modal.classList.add("active")
    }
}
function closeModal() {
    modal.classList.remove("active")
    modalVazio.classList.remove("active")
}


// Botão de adicionar dentro de cada item, prompt pede a quantidade e adiciona no array da Sacola
const addIndividual = (item) => {
    const quantItemIndividual = parseInt(prompt('Quantas unidades você deseja adicionar à sacola?'))
    if (quantItemIndividual == 1) { // Retorna o item adicionado no singular
        for (let i = 0; i < quantItemIndividual; i++)
            sacola.push(item)
        alert(`O item ${item.nome} foi adicionado à sua sacola`)
    } else if (quantItemIndividual > 1) { // Retorna o item adicionado no plural
        for (let i = 0; i < quantItemIndividual; i++)
            sacola.push(item)
        alert(`O item ${item.nome} foi adicionado ${quantItemIndividual} vezes à sua sacola`)
    }
    else if (quantItemIndividual == 0) { // Retorna erro caso a quantidade seja 0
        return alert(`Insira uma quantidade válida.`)
    }


    //Salvando a sacola dentro do LocalStorage
    localStorage.setItem("pedido", JSON.stringify(sacola))
    const InfoLocalStorageSacola = JSON.parse(localStorage.getItem("pedido"))


    //Constantes de dentro do modal
    const orderName = document.getElementById('order-name')
    const orderValue = document.getElementById('order-value')
    const subtotal = document.getElementById('sub__valor')
    const total = document.getElementById('total__valor')
    const saveItem = document.getElementById("header-bag__itens")
    const saveValue = document.getElementById("header-bag__cost")
    const criaNome = document.createElement('p')
    const criaValor = document.createElement('p')


    //Para escrever a quantidade total de itens e o valor total ao lado do desenho da sacola no cabeçalho dentro do modal
    const totalSacola = InfoLocalStorageSacola.reduce((soma, item) => soma + item.preçoDesconto, 0)
    const totalSacolaDuasCasas = totalSacola.toFixed(2).toString().replace(".", ",")

    saveValue.innerHTML = `R$ ${totalSacolaDuasCasas}`

    const quantidadeItens = InfoLocalStorageSacola.length
    InfoLocalStorageSacola.map((bag) => {
        if (quantidadeItens > 1) {
            saveItem.innerHTML = `${quantidadeItens} itens`
        }
        else { saveItem.innerHTML = `${quantidadeItens} item` }
    })


    //Para armazenar o pedido com quantidades (agrupados) e multiplicar os valores parciais
    const cont = []
    let totalCont = 1

    for (let i = 0; i < InfoLocalStorageSacola.length; i++) {
        const nomeItem = InfoLocalStorageSacola[i].nome
        if (i < InfoLocalStorageSacola.length - 1 && nomeItem == InfoLocalStorageSacola[i + 1].nome) {
            totalCont++
        } else {
            cont.push({ nome: nomeItem, total: totalCont })
            totalCont = 1
        }

        localStorage.setItem("quantidades", JSON.stringify(cont))
        const InfoLocalStorageCont = JSON.parse(localStorage.getItem("quantidades"))

        InfoLocalStorageCont.map((cont) => {
            criaNome.innerHTML = `${cont.total}x ${InfoLocalStorageSacola[i].nome}`
            orderName.append(criaNome)

            InfoLocalStorageSacola.map((item) => {
                const precoDescontoMultiplicado = item.preçoDesconto * cont.total
                const precoDesconto = precoDescontoMultiplicado.toFixed(2).toString().replace(".", ",")
                criaValor.innerHTML = `R$ ${precoDesconto}`
                orderValue.append(criaValor)
            })
        })
    }


    //Para escrever o valor total dentro do modal
    subtotal.innerHTML = `R$ ${totalSacolaDuasCasas}`


    //Para escrever o valor total somado com frete dentro do modal
    function totalComTaxa(totalSacola, taxa) {
        return totalSacola + taxa
    }
    let resultadoTotalTaxa = totalComTaxa(totalSacola, 9.9)
    total.innerHTML = `R$ ${resultadoTotalTaxa.toFixed(2).toString().replace(".", ",")}`
}
