import anime from './anime.es.js';

const resolution = 50;

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const columns = Math.floor(width / resolution);
const rows = Math.floor(height / resolution);

const radius = 3;

const handleHover = index => {
    const hoveredRow = Math.floor(index / columns);
    const hoveredCol = index % columns;
    
    anime({
        targets: ".square",
        opacity: (el, i) => {
            const row = Math.floor(i / columns);
            const col = i % columns;

            const distance = Math.sqrt((row - hoveredRow) ** 2 + (col - hoveredCol) ** 2);
            return distance <= radius ? 1 : 0;
        },
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index,
        }),
        easing: 'easeOutQuad',
        duration: 300,
    });
}

// const handleHover = index => {
//     anime({
//         targets: ".square",
//         opacity: 1,
//         delay: anime.stagger(50, {
//             grid: [columns, rows],
//             from: index,
//             to: index + 10
//         })
//     });
// }

const init = () => {
    const doc = document.querySelector(".render");

    doc.style.setProperty('--columns', `${columns}`);
    doc.style.setProperty('--rows', `${rows}`);
    
    for(let i = 0; i < columns * rows; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;

        square.onmouseover = e => handleHover(i);

        doc.appendChild(square);
    }
}

init();