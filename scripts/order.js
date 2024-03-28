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

const opções = [italiano, grelhado, bacon, queijoQuente, rosbife] // Array de todas as opções de itens para comparação com o selecionado nos prompts
const sacola = [] // Array da sacola, itens adicionados entram aqui

const addGeral = (addGeral) => { // Botão de adicionar, prompt pede pro cliente digitar o nome do item e a quantidade que deseja adicionar e inclui isso no array da Sacola
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


const addIndividual = (item) => { // Botão de adicionar dentro de cada item, prompt pede a quantidade e adiciona no array da Sacola
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
}

const verSacola = () => {} // Alert indica todos os itens que estão na sacola, seus vsalores e o preço total do pedido até o momento
//map 

const avaliação = () => {} // Prompt pede uma nota de 1 a 5, calcula a média das notas e quantidade de avaliações e atualiza a nota em tempo real



//salvar infos local storage
