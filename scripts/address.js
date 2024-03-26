const address = document.getElementById("address")
const addressData = []

function save_address(){
    const infoRua = prompt("Onde você quer receber seu pedido?")
    const infoNum = prompt("Informe o número do enedereço")

    addressData.push({
        street: infoRua,
        number: infoNum
    })

const endereco = `${infoRua}, ${infoNum}`
console.log(endereco)

address.innerHTML = endereco
}