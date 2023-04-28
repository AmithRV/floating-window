const appWrap = document.getElementById('app-wrap');

// get the div element that you want to move
const boxElement = document.getElementById('box');

const widthOfTheViewport = appWrap.clientWidth;
const heightOfTheViewport = appWrap.clientHeight;

const widthOfBoxElement = boxElement.clientWidth
const heightOfBoxElement = boxElement.clientHeight


// set the initial position of the boxElement

let xInital = widthOfTheViewport / 2 - widthOfBoxElement / 2;
let yInital = heightOfTheViewport / 2 - heightOfBoxElement / 2;

boxElement.style.transform = `translate(${xInital}px,${yInital}px)`;

let isBoxMovementActive = false;
let isMinimized = false;

const offset = 20;

// listen for mouse movement on the document
document.addEventListener('mousemove', (event) => {

    if (boxElement != null && isBoxMovementActive) {

        // calculate the x and y position of the mouse relative to the boxElement element
        const x = event.clientX - widthOfBoxElement / 2;
        const y = event.clientY - heightOfBoxElement / 2;

        if (x > 0 && y > 0 && x + widthOfBoxElement + offset < widthOfTheViewport && y + heightOfBoxElement + offset < heightOfTheViewport) {
            boxElement.style.transform = `translate(${x}px,${y}px)`;
        }
    }
});


function getClick() {
    let clickCount = 0;
    let timeoutId = null;

    boxElement.addEventListener('click', function () {
        clickCount++;
        if (clickCount === 2 && isMinimized === false) {
            clearTimeout(timeoutId);
            clickCount = 0;

            // perform action on double click
            if (isBoxMovementActive === false) {
                boxElement.style.opacity = 1;
            } else {
                boxElement.style.opacity = 0.75;
            }
            isBoxMovementActive = !isBoxMovementActive;
        }

        setTimeout(() => { clickCount = 0 }, 300); // double-click is triggered when user clicks two times before 300ms
    });
}

function minimizeAction() {
    isMinimized = true;
    document.getElementById('minus-icon').style.display = 'none';
    document.getElementById('maximize').style.display='unset';

    boxElement.style.transform = `translate(${0}px,${heightOfTheViewport - (document.getElementById('header').clientHeight + offset)}px)`;
    document.getElementById('body').style.display = "none";
}


function closeAction() {
    boxElement.style.display = 'none';
}

function maximizeAction() {
    isMinimized = false;
    document.getElementById('minus-icon').style.display = 'unset';
    document.getElementById('maximize').style.display='none';

    boxElement.style.transform = `translate(${xInital}px,${yInital}px)`;
    document.getElementById('body').style.display = "block";
    document.getElementById('body').style.height = "200px";
}

getClick();