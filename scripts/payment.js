const InfoLocalStorageLogin = JSON.parse(localStorage.getItem("login"))
const InfoLocalStorageSacola = JSON.parse(localStorage.getItem("pedido"))
const InfoLocalStorageCont = JSON.parse(localStorage.getItem("quantidades"))
const ruaNumero = document.getElementById("ruaNumero")
const cidadeEstado = document.getElementById("cidadeEstado")
const orderName = document.getElementById('order-name')
const orderValue = document.getElementById('order-value')
const subtotal = document.getElementById('sub__valor')
const total = document.getElementById('total__valor')


const arrayPedido = []

if (InfoLocalStorageLogin && InfoLocalStorageSacola && InfoLocalStorageCont) {
    //Para preencher o endereço cadastrado
    InfoLocalStorageLogin.map((valor) => {
        ruaNumero.innerHTML = `${valor.rua}, ${valor.nº}`
        cidadeEstado.innerHTML = `${valor.cidade}/${valor.estado}`
    })

    //Para armazenar o pedido com quantidades (agrupados) e multiplicar os valores parciais
    console.log(InfoLocalStorageCont)


    InfoLocalStorageCont.map((cont) => {
        const criaNome = document.createElement('p')
        criaNome.innerHTML = `${cont.total}x ${cont.nome}`
        orderName.append(criaNome)

        InfoLocalStorageSacola.map((item) => {
            const precoDescontoMultiplicado = item.preçoDesconto * cont.total
            const precoDesconto = precoDescontoMultiplicado.toFixed(2).toString().replace(".", ",")
            const criaValor = document.createElement('p')
            criaValor.innerHTML = `R$ ${precoDesconto}`
            orderValue.append(criaValor)
        })
    })


    //Para escrever o valor total
    const totalSacola = InfoLocalStorageSacola.reduce((soma, item) => soma + item.preçoDesconto, 0)
    const totalSacolaDuasCasas = totalSacola.toFixed(2).toString().replace(".", ",")
    subtotal.innerHTML = `R$ ${totalSacolaDuasCasas}`


    //Para escrever o valor total somado com frete
    function totalComTaxa(totalSacola, taxa) {
        return totalSacola + taxa
    }
    let resultadoTotalTaxa = totalComTaxa(totalSacola, 9.9)
    total.innerHTML = `R$ ${resultadoTotalTaxa.toFixed(2).toString().replace(".", ",")}`

} else {
    alert("Antes de finalizar seu pedido, você deve fazer o login.")
    window.location.href = "../login/login.html"
}
