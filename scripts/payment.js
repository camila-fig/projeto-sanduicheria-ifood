const InfoLocalStorageLogin = JSON.parse(localStorage.getItem("login"))
const InfoLocalStorageSacola = JSON.parse(localStorage.getItem("pedido"))
const InfoLocalStorageCont = JSON.parse(localStorage.getItem("quantidades"))
const ruaNumero = document.getElementById("ruaNumero")
const cidadeEstado = document.getElementById("cidadeEstado")
const orderName = document.getElementById('order-name')
const orderValue = document.getElementById('order-value')
const subtotal = document.getElementById('sub__valor')
const total = document.getElementById('total__valor')


if (InfoLocalStorageLogin) {
    //Para preencher o endereço cadastrado
    InfoLocalStorageLogin.map((valor) => {
        ruaNumero.innerHTML = `${valor.rua}, ${valor.nº}   ${valor.compl}`
        cidadeEstado.innerHTML = `${valor.cidade}/${valor.estado}`
    })
} else {
    alert("Antes de finalizar seu pedido, você deve fazer o login.")
    window.location.href = "../login/login.html"
}


//Para colocar os itens na sacola e multiplicar os valores parciais
const objetoFiltro = {}
const arraySemRepeticao = InfoLocalStorageSacola.filter((nome) => {
    return objetoFiltro.hasOwnProperty(nome.nome) ? false : (objetoFiltro[nome.nome] = true)
})
const merged = arraySemRepeticao.map((screen) => ({
    ...InfoLocalStorageCont.find((o) => o.id === screen.screen_id),
    ...screen
}))
localStorage.setItem("merged", JSON.stringify(merged))
const InfoLocalStorageMerged = JSON.parse(localStorage.getItem("merged"))

InfoLocalStorageMerged.map((item) => {
    const criaNome = document.createElement('p')
    criaNome.innerHTML = `${item.total}x ${item.nome}`
    orderName.append(criaNome)

    const precoDescontoMultiplicado = item.preçoDesconto * item.total
    const precoDesconto = precoDescontoMultiplicado.toFixed(2).toString().replace(".", ",")
    const criaValor = document.createElement('p')
    criaValor.innerHTML = `R$ ${precoDesconto}`
    orderValue.append(criaValor)
})


//Para escrever o valor total
const totalSacola = InfoLocalStorageSacola.reduce((soma, item) => soma + item.preçoDesconto, 0)
const totalSacolaDuasCasas = totalSacola.toFixed(2).toString().replace(".", ",")
subtotal.innerHTML = `R$ ${totalSacolaDuasCasas}`


//Para escrever o valor total somado com frete
function totalComTaxa(totalSacola, taxa) {
    return totalSacola + taxa
}
const resultadoTotalTaxa = totalComTaxa(totalSacola, 9.9)
total.innerHTML = `R$ ${resultadoTotalTaxa.toFixed(2).toString().replace(".", ",")}`