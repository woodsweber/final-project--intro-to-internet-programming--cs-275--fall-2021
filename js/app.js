window.onload = () => {
    const ARROWS = document.getElementsByClassName(`arrow`),
        SLIDES = document.getElementsByClassName(`slide`);

    let offset = 0;

    let shiftRight = () => {
        if(offset < 0)
        {
            offset += 500;
            for(let slide of SLIDES) {slide.style.left = offset + `px`;}
        }
    };

    let shiftLeft = () => {
        if(offset > -2000)
        {
            offset -= 500;
            for(let slide of SLIDES) {slide.style.left = offset + `px`;}
        }
    };

    ARROWS[0].addEventListener(`click`, shiftLeft);
    ARROWS[1].addEventListener(`click`, shiftRight);
};
