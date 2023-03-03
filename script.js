// on menu * play click-sound.mp3
const arrayOfRandomNames = [
    'Alex',
    'Bob',
    'Cathy',
    'Dan',
    'Emma',
    'Fred',
    'Gina',
    'Hank',
    'Iris',
    'Jack',
    'Kate',
    'Lily',
    'Mike',
    'Nancy',
    'Oscar',
    'Pam',
    'Quinn',
    'Ron',
    'Sam',
    'Tom',
    'Uma',
    'Victor',
    'Walter',
    'Xander',
    'Yolanda',
    'Zoe'
];

const playSound = () => {
    const audio = new Audio('click-sound.mp3');
    audio.play();
}

const menuItems = document.querySelectorAll('.main-menu h1');

menuItems.forEach(item => {
    item.addEventListener('click', playSound);
})

// on click-help show game-pad-container and #help

const clickHelp = document.querySelector('#click-help');
const gamePadContainer = document.querySelector('#pad-container');
const gamePad = document.querySelector('.game-pad');
const clickPad = document.querySelector('#click-pad');
const help = document.querySelector('#help');

const gamePadItems = document.querySelectorAll('.game-pad .game-pad-item');

function hideGamePadItems() {
    gamePadItems.forEach(item => {
        item.style.display = 'none';
    })
}

clickHelp.addEventListener('click', () => {
    hideGamePadItems();
    gamePadContainer.style.display = 'flex';
    gamePad.style.display = 'block';
    help.style.display = 'block';
})

// on click-rank show game-pad-container and #rank

const clickRank = document.querySelector('#click-rank');
const rank = document.querySelector('#rank');
const table = document.getElementById('ranking-table');

clickRank.addEventListener('click', () => {
    hideGamePadItems();
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    let ranks = [];
    for (let i = 0; i < 5; i++) {
        let randomName = arrayOfRandomNames[Math.floor(Math.random() * arrayOfRandomNames.length)];
        let randomResult = Math.floor(Math.random() * 100);
        ranks.push({
            name: randomName,
            result: randomResult
        });
    }

    ranks.sort((a, b) => b.result - a.result);


    ranks.forEach((rank, index) => {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.innerHTML = index + 1;
        let tdName = document.createElement('td');
        tdName.innerHTML = rank.name;
        let tdResult = document.createElement('td');
        tdResult.innerHTML = rank.result;
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdResult);
        table.appendChild(tr);
    });


    gamePadContainer.style.display = 'flex';
    gamePad.style.display = 'block';
    rank.style.display = 'block';
})


const clickExit = document.querySelector('#click-exit');

clickExit.addEventListener('click', () => {
    gamePadContainer.style.display = 'none';
    gamePad.style.display = 'none';
    help.style.display = 'none';
})

// on click-play show game-pad-container and #game

const clickPlay = document.querySelector('#click-play');
const game = document.querySelector('#game');
const reset = document.querySelector('#reset');


let click = 0;
let time = 10;
let result = 0;

function increaseClicks() {
    if (click === 0) {
        startTimer();
    }
    click++;
    document.querySelector('#clicks').innerHTML = click;
}

clickPlay.addEventListener('click', () => {
    hideGamePadItems();
    gamePadContainer.style.display = 'flex';
    gamePad.style.display = 'block';
    game.style.display = 'block';

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            increaseClicks();
        }
    })

    gamePad.addEventListener('click', () => {
        increaseClicks();
    })
})

let intervalId;

startTimer = () => {
    intervalId = setInterval(() => {
        time--;
        document.querySelector('#countdown').innerHTML = time;
        if (time === 0) {
            time = 10;
            result = click;
            click = 0;
            document.querySelector('#clicks').innerHTML = click;
            document.querySelector('#countdown').innerHTML = time;
            stopTimer();

            document.querySelector('#clicks-result').innerHTML = result;
            document.querySelector('#result').style.display = 'block';
        }
    }, 1000);
}

stopTimer = () => {
    clearInterval(intervalId);
}

