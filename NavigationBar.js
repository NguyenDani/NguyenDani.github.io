export default class Navigation {
    constructor() {
        this.btnREl = document.querySelector('.art-nav-right');
        this.btnLEl = document.querySelector('.art-nav-left');
        this.aboutButton = document.querySelector('.aboutButton');
        this.experienceButton = document.querySelector('.experienceButton');
        this.contactButton = document.querySelector('.contactButton');
    
        this.activeIndex = 0;
    
        this.groups = document.getElementsByClassName('info');
    
        this.rightClick = this.rightClick.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.aboutClick = this.aboutClick.bind(this);
        this.experienceClick = this.experienceClick.bind(this);
        this.contactClick = this.contactClick.bind(this);

        this.btnREl.addEventListener('click', this.rightClick);
        this.btnLEl.addEventListener('click', this.leftClick);
        this.aboutButton.addEventListener('click', this.aboutClick);
        this.experienceButton.addEventListener('click', this.experienceClick);
        this.contactButton.addEventListener('click', this.contactClick);

        this.activeStyle = document.getElementById("about");
        this.ogColor = '#A7CCED';

        this.getInfo();
        this.glowEffect();
    }

    rightClick() {
        this.nextIndex =
            this.activeIndex + 1 <= this.groups.length - 1 ? this.activeIndex + 1 : 0;
            
            this.getInfo();
    
        //console.log(this.current);

        this.current.dataset.status = 'inactive';
        this.next.dataset.status = 'active';
    
        this.activeIndex = this.nextIndex;
        this.glowEffect();
    }
  
    leftClick() {
        this.nextIndex =
            this.activeIndex - 1 >= 0 ? this.activeIndex - 1 : this.groups.length - 1;
            
        this.getInfo();
    
        this.current.dataset.status = 'inactive';
        this.next.dataset.status = 'active';
    
        this.activeIndex = this.nextIndex;
        this.glowEffect();
    }

    getInfo(){
        this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
        this.next = document.querySelector(`[data-index="${this.nextIndex}"]`);
    }

    aboutClick(){
        if(this.activeIndex != 0){
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'inactive';
            this.activeIndex = 0;
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'active';
            this.glowEffect();
        }
    }

    experienceClick(){
        if(this.activeIndex != 1){
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'inactive';
            this.activeIndex = 1;
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'active';
            this.glowEffect();
        }
    }

    contactClick(){
        if(this.activeIndex != 2){
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'inactive';
            this.activeIndex = 2;
            this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
            this.current.dataset.status = 'active';
            this.glowEffect();
        }
    }

    glowEffect(){
        if(this.activeIndex == 0){
            this.activeStyle.style.color = this.ogColor;
            this.activeStyle = document.getElementById("about");
            this.activeStyle.style.color = 'white';
        }
        else if(this.activeIndex == 1){
            this.activeStyle.style.color = this.ogColor;
            this.activeStyle = document.getElementById("experience");
            this.activeStyle.style.color = 'white';
        }
        else if(this.activeIndex == 2){
            this.activeStyle.style.color = this.ogColor;
            this.activeStyle = document.getElementById("contact");
            this.activeStyle.style.color = 'white';
        }

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