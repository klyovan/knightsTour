// create fielad and cells

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < 64; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1, y = 8;

for (let i = 0; i < excel.length; i++) {
    if (x > 8) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
    if ((i % 2 == 0 && y % 2 == 0) || (i % 2 != 0 && y % 2 != 0)) {
        excel[i].style.backgroundColor = "#fafafa";
    } else {
        excel[i].style.backgroundColor = "#753708";
    }
}


// put knight on random place

let a = Math.round(Math.random() * 63); // тут ставится на рандомное место
excel[a].classList.add('current');
excel[a].classList.add('set'); //если ячейка имеет клаасс сет то мы туда схоить не может так kak уже там были
let step = 1;
excel[a].innerHTML = step;

let currentX = excel[a].getAttribute('posX');
let currentY = excel[a].getAttribute('posY');


function nextStep() {
    let variants = [document.querySelector('[posX= "' + (+currentX + 1) + '"][posY= "' + (+currentY + 2) + '"]'),
        document.querySelector('[posX= "' + (+currentX + 2) + '"][posY= "' + (+currentY + 1) + '"]'),
        document.querySelector('[posX= "' + (+currentX + 2) + '"][posY= "' + (+currentY - 1) + '"]'),
        document.querySelector('[posX= "' + (+currentX + 1) + '"][posY= "' + (+currentY - 2) + '"]'),
        document.querySelector('[posX= "' + (+currentX - 1) + '"][posY= "' + (+currentY - 2) + '"]'),
        document.querySelector('[posX= "' + (+currentX - 2) + '"][posY= "' + (+currentY - 1) + '"]'),
        document.querySelector('[posX= "' + (+currentX - 2) + '"][posY= "' + (+currentY + 1) + '"]'),
        document.querySelector('[posX= "' + (+currentX - 1) + '"][posY= "' + (+currentY + 2) + '"]')];

    for (let i = variants.length; i >= 0; i--) {
        if (!variants[i] || variants[i].classList.contains('set')) {
            variants.splice(i, 1);
        }
    }

    if (variants.length > 0) {
        let nextArr = [];

        function doNext() {
            for (let i = 0; i < variants.length; i++) {  //toDO change copypasta maybe function
                let nextX = variants[i].getAttribute('posX');
                let nextY = variants[i].getAttribute('posY');
                let nextVariants = [document.querySelector('[posX= "' + (+nextX + 1) + '"][posY= "' + (+nextY + 2) + '"]'),
                    document.querySelector('[posX= "' + (+nextX + 2) + '"][posY= "' + (+nextY + 1) + '"]'),
                    document.querySelector('[posX= "' + (+nextX + 2) + '"][posY= "' + (+nextY - 1) + '"]'),
                    document.querySelector('[posX= "' + (+nextX + 1) + '"][posY= "' + (+nextY - 2) + '"]'),
                    document.querySelector('[posX= "' + (+nextX - 1) + '"][posY= "' + (+nextY - 2) + '"]'),
                    document.querySelector('[posX= "' + (+nextX - 2) + '"][posY= "' + (+nextY - 1) + '"]'),
                    document.querySelector('[posX= "' + (+nextX - 2) + '"][posY= "' + (+nextY + 1) + '"]'),
                    document.querySelector('[posX= "' + (+nextX - 1) + '"][posY= "' + (+nextY + 2) + '"]')];

                for (let i = nextVariants.length; i >= 0; i--) {
                    if (!nextVariants[i] || nextVariants[i].classList.contains('set')) {
                        nextVariants.splice(i, 1);
                    }
                }
                nextArr.push(nextVariants.length);//массив с количеством ходов
                // дальнейших варинтов ходов из них выбирается меньший

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

let speed = 300;

function reload() {
    document.location.reload(true);
}


let interval = setInterval(() => {
    nextStep();
}, speed);

