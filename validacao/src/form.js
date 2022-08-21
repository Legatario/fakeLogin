const form = document.querySelector('#form');
const nome = document.querySelector('#nome');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');

const mensagem = document.getElementById('mensagem');
const notFauld = document.getElementById('span');
const notNull = document.getElementsByClassName('not-null');

var call = false;

function isEmpty(elem){
    return elem.value.length < 1 ? `O campo <strong> ${elem.name} </strong> não pode ser vazio` : '';
}

function validaEmail(elem){
    if(elem.value != ''){
        return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '': `Digite um <strong> e-mail </strong> válido` ;
    }
}

function validaCep(elem){
    if(elem.value != ''){
        if (!elem.value.match(/^[0-9]{8}/)){
            call = false;
            return `Digite um <strong> cep </strong> valido`;
        }else{
            call = true;
        }
    }
}

function updateAdress(data){
    if( ! ('erro' in data)){
        rua.value = (data.logradouro);
        bairro.value = (data.bairro);
        cidade.value = (data.localidade);
        uf.value = (data.uf);
        notFauld.innerHTML = ''
    } else{
        notFauld.innerHTML = `CEP não encontrado`;
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    let msg = [];
    let markup = '';
    
    Array.from(notNull).forEach(element => {
        let fieldState = isEmpty(element);
        if(fieldState != '' )
        msg.push(fieldState)
            
    });

    const isCEP = validaCep(cep)
    if(isCEP) msg.push(isCEP)

    const isEmail = validaEmail(email);
    if(isEmail) {
        msg.push(isEmail);
    } 

    if(call == true){
        const script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/'+ cep.value + '/json?callback=updateAdress';
        document.body.appendChild(script);
    }

    msg.forEach(item => {
        if(item != ''){
            markup += `<p>${item}</p>`
        }
    });


    mensagem.innerHTML = markup;
   
   
    if(msg.length == 0 && call == true){
        setTimeout(function () {
            alert('Cadastro Realizado com sucesso');
            form.reset()              
        }, 250);
    }

})


