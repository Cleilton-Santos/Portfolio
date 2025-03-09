document.getElementById('form-contato').addEventListener('submit', function(event) {
  event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação do nome
    if (nome.length < 3 || nome.length > 50) {
        alert('O nome deve ter entre 3 e 50 caracteres.');
        return;
    }
    // Validação do email
    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    // Validação do celular (opcional)
    if (celular && !/^\d{11}$/.test(celular)) {
        alert('Por favor, insira um número de celular válido (11 dígitos).');
        return;
    }
    // Validação da mensagem
    if (mensagem.length < 10 || mensagem.length > 500) {
        alert('A mensagem deve ter entre 10 e 500 caracteres.');
        return;
    }
    // Se todas as validações passarem, você pode enviar o formulário
    alert('Formulário enviado com sucesso!');
    // Aqui você pode adicionar o código para enviar os dados para o servidor
});

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');
const enviarForm = document.querySelector('input[type="submit"]');

if (btnMenu && menu && overlay) {
  btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
  });

  const closeMenu = () => {
    menu.classList.remove('abrir-menu');
  };

  menu.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

if (enviarForm) {
  enviarForm.addEventListener('click', function(event) {
    event.preventDefault();
    alert('Formulario Enviado!');
  });
}

// Função para rolagem suave com duração personalizada
function scrollToSection(targetId, duration = 1000) {
  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  const targetPosition = targetSection.offsetTop; // Posição do topo da seção
  const startPosition = window.pageYOffset; // Posição atual da rolagem
  const distance = targetPosition - startPosition; // Distância a percorrer
  let startTime = null;

  // Função de animação
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Função de easing para suavizar a rolagem
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Adicionar evento de clique aos links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do link
    const targetId = link.getAttribute('href').substring(1); // Remove o '#' do href
    scrollToSection(targetId, 1500); // Duração de 1500ms (1.5 segundos)
  });
});