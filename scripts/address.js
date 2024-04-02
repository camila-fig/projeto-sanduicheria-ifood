//Para escrever no campo "Insira seu endereço" a rua e o número de onde será a entrega

const address = document.getElementById("address")
const addressData = []

function save_address(){
    const infoRua = prompt("Onde você quer receber seu pedido?")
    const infoNum = prompt("Informe o número do endereço")

    addressData.push({
        street: infoRua,
        number: infoNum
    })

const endereco = `${infoRua}, ${infoNum}`
console.log(endereco)

address.innerHTML = endereco
}