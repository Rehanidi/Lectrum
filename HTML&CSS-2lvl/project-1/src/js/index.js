const shortMenuIcon = document.querySelector('.short__menu-icon');
const closeShortMenu = document.querySelector('.menu__close-icon');
const shortMenu = document.querySelector('.header__menu-short');

shortMenuIcon.onclick = (event) => {
    shortMenu.style.display='block'
};

closeShortMenu.onclick = (event) => {
    shortMenu.style.display='none'
};

