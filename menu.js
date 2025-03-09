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