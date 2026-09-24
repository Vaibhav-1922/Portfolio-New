const ul = document.querySelector('ul');
const menubar = document.querySelector('.hamburgur i');

menubar.addEventListener('click', () => {
    ul.classList.toggle('active')
})