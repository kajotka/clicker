const arrayOfRandomNames = ['Alex', 'Bob', 'Cathy', 'Dan', 'Emma', 'Fred', 'Gina', 'Hank', 'Iris', 'Jack', 'Kate', 'Lily', 'Mike', 'Nancy', 'Oscar', 'Pam', 'Quinn', 'Ron', 'Sam', 'Tom', 'Uma', 'Victor', 'Walter', 'Xander', 'Yolanda', 'Zoe'];

const gamePadItems = document.querySelectorAll('.game-pad-item');
const gamePad = document.querySelector('.game-pad');

// odtworzenie dzwieku na klikniecie w menu
const menuItems = document.querySelectorAll('.main-menu h1');
function playSound() {
    const audio = new Audio('click-sound.mp3');
    audio.volume = 0.1;
    audio.play();
}


menuItems.forEach(item => {
    item.addEventListener('click', playSound);
})
// odtworzenie dzwieku koniec

function hideGamePadItems() {
    gamePadItems.forEach(item => {
        item.style.display = 'none';
    })
    gamePad.style.opacity = 0;
}

// pokaż pomoc
const clickHelp = document.querySelector('#click-help');
const help = document.querySelector('#help');

clickHelp.addEventListener('click', () => {
    hideGamePadItems();
    gamePad.style.opacity = 1;
    help.style.display = 'block';
})
// pokaż pomoc koniec

// pokaż ranking
const clickRank = document.querySelector('#click-rank');
const rank = document.querySelector('#rank');
const table = document.getElementById('ranking-table');

clickRank.addEventListener('click', function () {
    hideGamePadItems();
    // wyczyszczenie tabeli z wyników
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // stworzenie tablicy z wynikami
    let ranks = [];
    for (let i = 0; i < 5; i++) {
        let randomName = arrayOfRandomNames[Math.floor(Math.random() * arrayOfRandomNames.length)];
        let randomResult = Math.floor(Math.random() * 100);
        ranks.push({
            name: randomName,
            result: randomResult
        });
    }
    // posortowanie tablicy po wyniku
    ranks.sort((a, b) => b.result - a.result);

    // dodanie wyników do tabeli
    ranks.forEach(function (rank, index) {
        let tr = document.createElement('tr');
        let tdRank = document.createElement('td');
        let tdName = document.createElement('td');
        let tdResult = document.createElement('td');

        tdRank.innerHTML = index + 1;
        tdName.innerHTML = rank.name;
        tdResult.innerHTML = rank.result;

        tr.appendChild(tdRank);
        tr.appendChild(tdName);
        tr.appendChild(tdResult);

        table.appendChild(tr);
    });

    gamePad.style.opacity = 1;
    rank.style.display = 'block';
})
// pokaż ranking koniec


// wyjdź
const clickExit = document.querySelector('#click-exit');

clickExit.addEventListener('click', function () {
    hideGamePadItems();
})
// wyjdź koniec


// gra
const clickPlay = document.querySelector('#click-play');
const game = document.querySelector('#game');
const resultContainer = document.querySelector('#result');
const pad = document.getElementById('pad')

let click = 0;
let time = 10;

// usuwamy wszystkie event listenery żeby się nie dublowały na wejściu
// chowamy wszystkie elementy wewnątrz gamePad
// pokazujemy gre
// dodajemy event listenery
clickPlay.addEventListener('click', function () {
    document.removeEventListener('keydown', increaseClicks);
    gamePad.removeEventListener('click', increaseClicks);
    hideGamePadItems();
    gamePad.style.opacity = 1;
    game.style.display = 'block';

    addGameEventListeners();
})

function increaseClicks(e) {
    // jeżeli jest pierwszy klik to rozpoczynamy odliczanie
    if (click === 0) {
        startTimer();
    }
    // podnosimy licznik kliknięć jeżeli kliknięcie jest na padzie albo została kliknięta spacja
    if (e.type === 'click' || e.code === 'Space') {
        click++;
        document.getElementById('clicks').innerHTML = click;
    }
}

// funkcja do dodania event listenerów na padzie
function addGameEventListeners() {
    document.addEventListener('keydown', increaseClicks);
    pad.addEventListener('click', increaseClicks);
}

// funkcja do usunięcia event listenerów na padzie
function removeGameEventListeners() {
    document.removeEventListener('keydown', increaseClicks);
    pad.removeEventListener('click', increaseClicks);
}

// funkcja odpalana w momencie zakońćzenia gry
function stopGame() {
    stopTimer();
    removeGameEventListeners();
    document.querySelector('#clicks-result').innerHTML = click;
    resultContainer.style.display = 'block';
}

// zmienna przechowująca setInterval po to żeby wiedzieć co zatrzymać
let intervalId;
startTimer = function () {
    intervalId = setInterval(() => {
        time--;
        document.querySelector('#countdown').innerHTML = time;
        if (time === 0) {
            stopGame();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

const resetButton = document.querySelector('#reset');
// na resecie resetujemy licznik kliknięć oraz czas i chowamy wynik
resetButton.addEventListener('click', function () {
    click = 0;
    time = 10;
    document.querySelector('#clicks').innerHTML = click;
    document.querySelector('#countdown').innerHTML = time;
    resultContainer.style.display = 'none';

    addGameEventListeners();
})
// gra koniec
