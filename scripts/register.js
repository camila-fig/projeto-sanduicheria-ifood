const nome = document.getElementById('nome')
const cep = document.getElementById('cep')
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
    cep.value = ("")
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
        rua.value = (conteudo.logradouro);
        bairro.value = (conteudo.bairro);
        cidade.value = (conteudo.localidade);
        uf.value = (conteudo.uf);
    } else {
        limpa_formulario();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    let cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.

        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value = "...";
            bairro.value = "...";
            cidade.value = "...";
            uf.value = "...";

            //Cria um elemento javascript.
            let script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } else {
            //cep é inválido.
            limpa_formulario();
            alert("Formato de CEP inválido.");
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulario();
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