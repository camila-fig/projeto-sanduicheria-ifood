const nome = document.getElementById('nome')
const campoCep = document.getElementById('cep')
const rua = document.getElementById('rua')
const numero = document.getElementById('numero')
const complemento = document.getElementById('complemento')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const btnSalvar = document.getElementById('btnSalvar')
const btnLimpar = document.getElementById('btnLimpar')

let login = []

//Limpa valores do formulário de cep.
function limpa_formulario() {
    nome.value = ("")
    campoCep.value = ("")
    rua.value = ("")
    numero.value = ("")
    complemento.value = ("")
    bairro.value = ("")
    cidade.value = ("")
    uf.value = ("")
}

//Atualiza os campos com os valores.
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        rua.value = (conteudo.logradouro)
        bairro.value = (conteudo.bairro)
        cidade.value = (conteudo.localidade)
        uf.value = (conteudo.uf)
    } else {
        limpa_formulario()
        alert("CEP não encontrado.")
    }
}

function pesquisaCep(valor) {
    let cep = valor.replace(/\D/g, '') //Nova variável "cep" somente com dígitos.

    if (cep != "") {        
        let validacep = /^[0-9]{8}$/  //Expressão regular para validar o CEP conforme API.

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value = "..."
            bairro.value = "..."
            cidade.value = "..."
            uf.value = "..."
            
            let script = document.createElement('script')  //Cria um elemento javascript.           
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback'   //Sincroniza com o callback.
            document.body.appendChild(script)   //Insere script no documento e carrega o conteúdo.

        } else {
            limpa_formulario()
            alert("Formato de CEP inválido.")
        }

    } else {        
        limpa_formulario()  //cep sem valor, limpa formulário.
    }
}

btnSalvar.addEventListener("click", () => {
    login.push({
        nome: nome.value,
        rua: rua.value,
        nº: numero.value,
        compl: complemento.value,
        cidade: cidade.value,
        estado: uf.value
    })
    localStorage.setItem("login", JSON.stringify(login))
    limpa_formulario()
})

btnLimpar.addEventListener("click", limpa_formulario)