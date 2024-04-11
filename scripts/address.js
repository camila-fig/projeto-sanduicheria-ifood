//Para escrever no campo "Insira seu endereço" a rua e o número de onde será a entrega

const address = document.getElementById("address")
const addressData = []

const infoLocalStorage = JSON.parse(localStorage.getItem('addressData'))

//Caso tenha um endereço salvo no LocalStorage, vai carregar automático
infoLocalStorage.map((item) => {
    address.innerHTML = `${item.street}, ${item.number}`
        })           

//Caso não tenha nenhum endereço, vai solicitar
function save_address(){
    const infoRua = prompt("Em qual rua/avenida você quer receber seu pedido?")
    const infoNum = prompt("Informe o número do endereço")

    addressData.push({
        street: infoRua,
        number: infoNum
    })

    localStorage.setItem("addressData", JSON.stringify(addressData))
    const endereco = JSON.parse(localStorage.getItem("addressData"))
    
    endereco.map((item) => {
    address.innerHTML = `${item.street}, ${item.number}`
        })           
    }