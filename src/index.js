const login = document.getElementById('login')
const mensagem = document.getElementById('mensagem');
const error = document.getElementById('error');
const cadastro = document.querySelector('.cadastro');

let call = []
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
    }
})

.then(res => res.json())
.then(data => {console.log(data) 
                call = data})
.catch((error) => console.error(error))



login.addEventListener('click',(event)=>{
    event.preventDefault();
    var userName = document.getElementById('userName').value
    var email = document.getElementById('email').value
    console.log(userName);
    console.log(email);
    validacion(userName, email);
})

function validacion(userName, email){

    const validacionUserName = call.filter((data)=>{
        return data.username === userName
    })
    const validacionEmail = call.filter((data)=>{
        return data.email === email
    })
    console.log(validacionEmail)
    console.log(validacionUserName)

    let checkUserName = validacionUserName.map((a)=>{
        return a.username
    })
    let checkEmail = validacionEmail.map((a)=>{
        return a.email
    })

    console.log(checkEmail)
    console.log(checkUserName)

    if(checkUserName == userName && userName != ''){
        console.log("parabens")
        document.getElementById('userName').value='';
        document.getElementById('email').value = '';
        window.location.href = "https://i.pinimg.com/736x/7f/30/f3/7f30f36c98d6c0cfd13bdf53dc1c6e35.jpg";
    }else{
        console.log("userName invalido");
        mensagem.innerHTML = `User Name não encontrado`;
        cadastro.style.display = 'block'
    }

    if(checkEmail == email && email != ''){
        console.log("parabens")
        document.getElementById('userName').value='';
        document.getElementById('email').value = '';
        window.location.href = "https://i.pinimg.com/564x/a6/fc/47/a6fc47cc2f552cac672118a6ebb6907f.jpg";
    }else{
        console.log("email invalido");
        error.innerHTML = `E-mail não encontrado`;
        cadastro.style.display = 'block'
    }
}
