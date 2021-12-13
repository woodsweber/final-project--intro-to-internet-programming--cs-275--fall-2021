window.onload = () => {
    const ARROWS = document.getElementsByClassName(`arrow`),
        SLIDES = document.getElementsByClassName(`slide`);

    let offset = 0;

    let updateArrows = () => {
        ARROWS[0].classList.remove(`hidden`);
        ARROWS[1].classList.remove(`hidden`);
        if(offset === 0) {ARROWS[0].classList.add(`hidden`);}
        else if(offset === -2000) {ARROWS[0].classList.add(`hidden`);}
    };

    let shiftRight = () => {
        if(offset < 0)
        {
            offset += 500;
            for(let slide of SLIDES) {slide.style.left = offset + `px`;}
        }
        updateArrows();
    };

    let shiftLeft = () => {
        if(offset > -2000)
        {
            offset -= 500;
            for(let slide of SLIDES) {slide.style.left = offset + `px`;}
        }
        updateArrows();
    };

    ARROWS[0].addEventListener(`click`, shiftLeft);
    ARROWS[1].addEventListener(`click`, shiftRight);
};
