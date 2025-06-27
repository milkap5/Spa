const btnUsuario = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

btnUsuario.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  const esClickDentro = btnUsuario.contains(e.target) || dropdownMenu.contains(e.target);
  if (!esClickDentro) {
    dropdownMenu.classList.remove('show');
  }
});