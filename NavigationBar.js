export default class Navigation {
    constructor() {
        this.btnREl = document.querySelector('.art-nav-right');
        this.btnLEl = document.querySelector('.art-nav-left');
        this.aboutButton = document.querySelector('.aboutButton');
        this.experienceButton = document.querySelector('.experienceButton');
        this.projectsButton = document.querySelector('.projectsButton');
        this.contactButton = document.querySelector('.contactButton');

        this.activeIndex = 0;

        this.groups = document.getElementsByClassName('info');

        this.rightClick = this.rightClick.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.aboutClick = this.aboutClick.bind(this);
        this.experienceClick = this.experienceClick.bind(this);
        this.projectsClick = this.projectsClick.bind(this);
        this.contactClick = this.contactClick.bind(this);

        this.btnREl.addEventListener('click', this.rightClick);
        this.btnLEl.addEventListener('click', this.leftClick);
        this.aboutButton.addEventListener('click', this.aboutClick);
        this.experienceButton.addEventListener('click', this.experienceClick);
        this.projectsButton.addEventListener('click', this.projectsClick);
        this.contactButton.addEventListener('click', this.contactClick);

        this.activeStyle = document.getElementById("about");
        this.ogColor = '#F7FAFC';
        this.activeColor = '#A3CEF1';

        this.getInfo();
        this.glowEffect();
    }

    rightClick() {
        this.nextIndex = (this.activeIndex + 1) % this.groups.length;
        this.updateStatus();
    }

    leftClick() {
        this.nextIndex = (this.activeIndex - 1 + this.groups.length) % this.groups.length;
        this.updateStatus();
    }

    updateStatus() {
        this.getInfo();

        if (this.current) {
            this.current.dataset.status = 'inactive';
        }
        if (this.next) {
            this.next.dataset.status = 'active';
        }

        this.activeIndex = this.nextIndex;
        this.glowEffect();
    }

    getInfo() {
        this.current = document.querySelector(`[data-index="${this.activeIndex}"]`);
        this.next = document.querySelector(`[data-index="${this.nextIndex}"]`);
    }

    aboutClick() {
        this.changeIndex(0);
    }

    experienceClick() {
        this.changeIndex(1);
    }

    projectsClick() {
        this.changeIndex(2);
    }

    contactClick() {
        this.changeIndex(3);
    }

    changeIndex(newIndex) {
        if (this.activeIndex !== newIndex) {
            this.nextIndex = newIndex;
            this.updateStatus();
        }
    }

    glowEffect() {
        const sections = ["about", "experience", "projects", "contact"];
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element) {
                element.style.color = this.activeIndex === index ? this.activeColor : this.ogColor;
            }
        });
    }
}
