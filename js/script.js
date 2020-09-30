// create field and cells
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < 64; i++) {
    let cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
}

let cell = document.getElementsByClassName('cell');
let x = 1, y = 8;

for (let i = 0; i < cell.length; i++) {
    if (x > 8) {
        x = 1;
        y--;
    }
    cell[i].setAttribute('posX', x);
    cell[i].setAttribute('posY', y);
    x++;
    if ((i % 2 == 0 && y % 2 == 0) || (i % 2 != 0 && y % 2 != 0)) {
        cell[i].style.backgroundColor = "#fafafa";
    } else {
        cell[i].style.backgroundColor = "#753708";
    }
}


// put knight on random place
let a = Math.round(Math.random() * 63);
cell[a].classList.add('current');
cell[a].classList.add('set');
let step = 1;
cell[a].innerHTML = step;

let currentX = cell[a].getAttribute('posX');
let currentY = cell[a].getAttribute('posY');


function nextStep() {
    let variants = findVariants(currentX, currentY);

    if (variants.length > 0) {
        let nextArr = [];

        function doNext() {
            for (let i = 0; i < variants.length; i++) {
                let nextX = variants[i].getAttribute('posX');
                let nextY = variants[i].getAttribute('posY');
                let nextVariants = findVariants(nextX, nextY);


                nextArr.push(nextVariants.length);

            }
            return nextArr;
        }

        nextArr = doNext();

        let k = nextArr.length;
        let min = nextArr[0];
        var index = 0;
        while (k--) {
            if (nextArr[k] <= min) {
                min = nextArr[k];
                index = k;
            }
        }

        step++;

        document.querySelector('.current').classList.remove('current');
        variants[index].classList.add('current');
        variants[index].classList.add('set');
        variants[index].innerHTML = step;
        currentX = variants[index].getAttribute('posX');
        currentY = variants[index].getAttribute('posY');

        if (step === 64) {
            clearInterval(interval);
            setTimeout(() => {
                alert('Nice!');
                reload()
            })
        }
    } else {
        alert("The horse is tired!");
        reload();
    }
}


function reload() {
    document.location.reload(true);
}

let interval = setInterval(() => {
    nextStep();
}, 250);


function findVariants(x, y) {
    let horseMoves = [
        [+1, +2],
        [+2, +1],
        [+2, -1],
        [+1, -2],
        [-1, -2],
        [-2, -1],
        [-2, +1],
        [-1, +2]];

    let variants = [];
    for (let i = 0; i < 8; i++) {
        let variant = document.querySelector('[posX= "' + (+x + horseMoves[i][0]) + '"][posY= "' + (+y + horseMoves[i][1]) + '"]');
        variants.push(variant);
    }
    for (let i = variants.length; i >= 0; i--) {
        if (!variants[i] || variants[i].classList.contains('set')) {
            variants.splice(i, 1);
        }
    }
    return variants;
}

