const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words= ['feeble', 'drag', 'eight', 'nine', 'highfalutin', 'silver', 'quince', 'superficial', 'dependent', 'loving', 'collection', 'words','lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 
'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 
'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
'elementum', 'tempor', 'risus', 'cras'];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//set difficulty value
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Focus on text on start
text.focus();

//start count down
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime(){
    time--;
    timeEl.innerHTML = time +'s';

    if (time === 0) {
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

// game over, show end screen
function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick= "location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //clear
        e.target.value ='';
        if (difficulty === 'hard') {
            time += 2;
        } else if(difficulty === 'medium'){
            time += 3;
        } else{
        time += 5;
        }
        
        updateTime();
    }
});

//settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});