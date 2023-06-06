const btnREl = document.querySelector('.art-nav-right');
const btnLEl = document.querySelector('.art-nav-left');

let activeIndex = 0;

const groups = document.getElementsByClassName("info");

const rightClick = () => {
    const nextIndex = (activeIndex + 1) <= (groups.length - 1) ? (activeIndex + 1) : 0;

    const current = document.querySelector(`[data-index="${activeIndex}"]`);
    const next = document.querySelector(`[data-index="${nextIndex}"]`);

    current.dataset.status = "inactive";
    next.dataset.status = "active";

    activeIndex = nextIndex;
}

function leftClick(){
    const nextIndex = (activeIndex - 1) >= 0 ? (activeIndex - 1) : (groups.length - 1);

    const current = document.querySelector(`[data-index="${activeIndex}"]`);
    const next = document.querySelector(`[data-index="${nextIndex}"]`);

    current.dataset.status = "inactive";
    next.dataset.status = "active";

    activeIndex = nextIndex;
}

btnREl.addEventListener('click', rightClick);
btnLEl.addEventListener('click', leftClick);