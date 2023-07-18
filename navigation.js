export default class Navigation {
    constructor() {
        this.btnREl = document.querySelector('.art-nav-right');
        this.btnLEl = document.querySelector('.art-nav-left');
    
        this.activeIndex = 0;
    
        this.groups = document.getElementsByClassName('info');
    
        this.rightClick = this.rightClick.bind(this);
        this.leftClick = this.leftClick.bind(this);

        this.btnREl.addEventListener('click', this.rightClick);
        this.btnLEl.addEventListener('click', this.leftClick);

    }

    rightClick() {
        this.nextIndex =
            this.activeIndex + 1 <= this.groups.length - 1 ? this.activeIndex + 1 : 0;
            

        this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
        this.next = document.querySelector(`[data-index="${this.nextIndex}"]`);
    
        //console.log(this.current);

        this.current.dataset.status = 'inactive';
        this.next.dataset.status = 'active';
    
        this.activeIndex = this.nextIndex;
    }
  
    leftClick() {
        this.nextIndex =
            this.activeIndex - 1 >= 0 ? this.activeIndex - 1 : this.groups.length - 1;
            
        this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
        this.next = document.querySelector(`[data-index="${this.nextIndex}"]`);
    
        this.current.dataset.status = 'inactive';
        this.next.dataset.status = 'active';
    
        this.activeIndex = this.nextIndex;
    }
  }

/*
export default class Navigation {
    constructor() {
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
    }
}
*/

/*
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
*/