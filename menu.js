// Elementos do menu mobile
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const overlayMenu = document.getElementById('overlay-menu');
const btnFechar = menuMobile.querySelector('.btn-fechar');

// Função para abrir/fechar menu mobile
function toggleMenu() {
    menuMobile.classList.toggle('abrir-menu');
    overlayMenu.style.display = menuMobile.classList.contains('abrir-menu') ? 'block' : 'none';
}

// Event listeners para o menu
btnMenu.addEventListener('click', toggleMenu);
btnFechar.addEventListener('click', toggleMenu);
overlayMenu.addEventListener('click', toggleMenu);

// Função para rolagem suave
function scrollToSection(targetId, duration = 1000) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    const targetPosition = targetSection.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Adiciona rolagem suave aos links do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId, 1500);
        
        // Fecha o menu mobile se estiver aberto
        if (menuMobile.classList.contains('abrir-menu')) {
            toggleMenu();
        }
    });
});

// Validação do formulário de contato
document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpa erros anteriores
    document.querySelectorAll('.erro').forEach(erro => erro.remove());
    
    // Obtém os campos do formulário
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const celular = document.getElementById('celular');
    const mensagem = document.getElementById('mensagem');
    
    let valido = true;
    
    // Validação do nome
    if (nome.value.length < 3 || nome.value.length > 50) {
        mostrarErro(nome, 'O nome deve ter entre 3 e 50 caracteres.');
        valido = false;
    }
    
    // Validação do email
    if (!email.value.includes('@') || !email.value.includes('.')) {
        mostrarErro(email, 'Por favor, insira um email válido.');
        valido = false;
    }
    
    // Validação do celular (opcional)
    if (celular.value && !/^\d{11}$/.test(celular.value)) {
        mostrarErro(celular, 'Por favor, insira um número de celular válido (11 dígitos).');
        valido = false;
    }
    
    // Validação da mensagem
    if (mensagem.value.length < 10 || mensagem.value.length > 500) {
        mostrarErro(mensagem, 'A mensagem deve ter entre 10 e 500 caracteres.');
        valido = false;
    }
    
    // Se todas as validações passarem
    if (valido) {
        enviarFormulario({
            nome: nome.value,
            email: email.value,
            celular: celular.value,
            mensagem: mensagem.value
        });
    }
});

// Função para mostrar mensagens de erro
function mostrarErro(campo, mensagem) {
    const erro = document.createElement('div');
    erro.className = 'erro';
    erro.textContent = mensagem;
    campo.parentNode.insertBefore(erro, campo.nextSibling);
}

// Função para enviar o formulário
function enviarFormulario(dados) {
    // Exemplo usando mailto como fallback
    const subject = `Contato de ${dados.nome}`;
    const body = `Email: ${dados.email}%0D%0ACelular: ${dados.celular}%0D%0A%0D%0AMensagem:%0D%0A${dados.mensagem}`;
    window.location.href = `mailto:cleilton14s@gmail.com?subject=${subject}&body=${body}`;
    
    // Feedback para o usuário
    alert('Formulário enviado com sucesso!');
    document.getElementById('form-contato').reset();
}