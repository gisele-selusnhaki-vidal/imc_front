if (window.location.pathname.endsWith('index.html') &&
    !localStorage.getItem('token')) {
    window.location.href = 'login.html'
}


function abrirTab(index) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.tab-content')[index].classList.add('active');
    document.querySelectorAll('.tab-btn')[index].classList.add('active');
}

function formatarResposta(resultado) {
    if (resultado.erro) {
        return `<div style="color: #721c24; padding: 15px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; font-weight: bold;">
                    ⚠️ Erro: ${resultado.erro}
                </div>`;
    }

    let html = `<div style="padding: 15px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 5px;">`;
    html += `<h3 style="margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #c3e6cb; padding-bottom: 5px;">✅ Sucesso</h3>`;
    html += `<ul style="list-style-type: none; padding-left: 0; margin: 0;">`;

    for (const [key, value] of Object.entries(resultado)) {
        // Capitaliza a primeira letra e ajusta o nome (ex: imc -> IMC)
        let label = key.charAt(0).toUpperCase() + key.slice(1);
        if (key.toLowerCase() === 'imc') label = 'IMC';

        html += `<li style="margin-bottom: 8px; font-size: 16px;">
                    <strong style="color: #0b2e13;">${label}:</strong> ${value}
                 </li>`;
    }

    html += `</ul></div>`;
    return html;
}

async function calcularIMC() {
    const dados = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        altura: document.getElementById("altura").value,
        peso: document.getElementById("peso").value
    };

    try {
        const res = await fetch("http://localhost:3000/imc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await res.json();
        document.getElementById("resultadoIMC").innerHTML = formatarResposta(resultado);
    } catch (erro) {
        document.getElementById("resultadoIMC").innerHTML = formatarResposta({ erro: "Falha na comunicação com o servidor." });
    }
}

async function calcularMedia() {
    const dados = {
        nota1: document.getElementById("nota1").value,
        nota2: document.getElementById("nota2").value
    };

    try {
        const res = await fetch("http://localhost:3000/media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await res.json();
        document.getElementById("resultadoMedia").innerHTML = formatarResposta(resultado);
    } catch (erro) {
        document.getElementById("resultadoMedia").innerHTML = formatarResposta({ erro: "Falha na comunicação com o servidor." });
    }
}
async function login() {
    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await res.json();
        if (resultado.erro) {
            alert(resultado.erro)

        } else {
            localStorage.setItem("token", resultado.token);
            window.location.href = "index.html";
        }


    } catch (erro) {
        alert(resultado.erro)
    }
}
function logout() {
    localStorage.removeItem('token')
    window.location.href = "login.html "
}

async function buscarEndereco() {

    const cep = document.getElementById("cep").value


    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            //  alert(data) 
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.estado;
            document.getElementById('numero').focus()

        })
        .catch(error => {
            console.error('Erro:', error);
        });

}




async function cadastrarClientes() {
    const dados = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value

    }; 

    try {
        const res = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await res.json();
        document.getElementById("resultadoCliente").innerHTML = formatarResposta(resultado);
    } catch (erro) {
        console.log(erro)
        document.getElementById("resultadoCliente").innerHTML = formatarResposta({ erro: "Falha na comunicação com o servidor." });
    }
}