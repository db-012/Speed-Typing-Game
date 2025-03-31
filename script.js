/*  TODO:
    - show high score, store it in local storage
    - load random words from an API
 */

// VARIABLES
let words = ['magic', 'journey', 'travel', 'explore', 'life', 
'experience', 'happiness', 'gratitude', 'discipline', 'exercise', 
'workout', 'friendship', 'practice', 'routine', 'morning', 'reading', 
'books', 'education', 'amour', 'delibrate', 'protein', 'partner',
'empathy', 'concert', 'patience', 'humor', 'resilience', 'confidence',
'consistency', 'appreciation', 'literature', 'meaning', 'humble',
'province', 'flight', 'alchemy', 'intense', 'adorable', 'swoon', 'stunning',
'sensational', 'provocative', 'apocalypse', 'compliance', 'meticulous',
'replicate', 'relentless', 'pursuit', 'proactive', 'astounding',
'delightful', 'legitimate', 'mesmerizing', 'polarizing', 'validate'];

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};
let currentLevel = levels.easy;
let timeCount = currentLevel + 1, scoreCount = 0, isPlaying, wordDisplayed;
let bonusTime = 2; // Extra seconds when a word is correctly typed

let currentWord  = document.querySelector('#current-word'),
    inputWord = document.querySelector('#input-word'),
    time = document.querySelector('#seconds'),
    timeLeft = document.querySelector('#time-left'),
    score = document.querySelector('#score'),
    message = document.querySelector('#message'),
    difficultyLevel = document.querySelector('#difficulty');

// EVENT LISTENERS
window.addEventListener('load', init);
inputWord.addEventListener('input', startMatch);
difficultyLevel.addEventListener('change', changeLevel);

// FUNCTIONS
function init() { 
    time.textContent = currentLevel;
    showWord();
    setInterval(countdown, 1000);
    setInterval(checkStatus, 100);
}
function showWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    wordDisplayed = words[randomIndex];
    currentWord.textContent = wordDisplayed;
}
function countdown() {
    if (timeCount > 0) {
        timeCount--;   
        timeLeft.textContent = timeCount;
    } else if(timeCount === 0) {
        isPlaying = false;
    }
}
function checkStatus() {
    if(!isPlaying && timeCount === 0) {
        message.textContent = 'Time Up!!';
        message.className = 'mt-3 text-danger';
        scoreCount = 0;
    }
}
function startMatch() {
    if (this.value === wordDisplayed) {
        isPlaying = true;
        message.textContent  = 'Correct!!';
        message.className = 'mt-3 text-success';
        this.value = '';
        scoreCount++;
        score.textContent = scoreCount;
        timeCount += bonusTime; // Increase time left
        timeLeft.textContent = timeCount;
        showWord();
    }
}
function changeLevel() {
    let level = this.options[this.selectedIndex].value.toLowerCase();
    currentLevel = levels[level];
    time.textContent = currentLevel;
    timeCount = currentLevel + 1;
    scoreCount = 0;
    message.textContent = '';
    isPlaying = true;
    inputWord.focus();
}