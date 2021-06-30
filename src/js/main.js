jQuery(document).ready(function () {

    //burger menu
    var burgerButton = document.querySelector('.header__burger');
    var menuLinks = document.querySelectorAll('.header .nav__link');
    var rangeInput = document.querySelector('#range-input');


    function toggleMenu () {
        document.querySelector('.header__burger').classList.toggle('active');
        document.querySelector('.header__menu').classList.toggle('active');
    }
    function closeMenu () {
        document.querySelector('.header__burger').classList.remove('active');
        document.querySelector('.header__menu').classList.remove('active');
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', closeMenu);
        }
    }

    burgerButton.addEventListener('click', toggleMenu);
    closeMenu();


///function for select


    
    function showRangeValue () {
        document.querySelector('.range__value').innerHTML = rangeInput.value + '%';
    }
    rangeInput.addEventListener('change', showRangeValue);

});