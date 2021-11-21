const startBtn = document.querySelector('#start')
const counter = document.querySelector('#counter')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timer = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame(time)
    }
})

board.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomItem()
    }
})

function startGame() {
    interval = setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomItem()
}

function decreaseTime() {
    if (time === 0) {
        finish()
        clearInterval(interval)
    } else {
        let currentTime = --time
        if (currentTime < 10) currentTime = `0${currentTime}`
        setTime(currentTime)
    }
}

function setTime(value) {
    timer.innerHTML = `00:${value}`
}

function finish() {
    counter.classList.add('hide')
    board.innerHTML = `
        <h1 class="score">Cчет: <span class="primary">${score}</span></h1>
    `
}

function createRandomItem() {
    const { width, height } = board.getBoundingClientRect()
    const circle = document.createElement('div')
    const size = getRandomNumber(8, 64)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round((Math.random() * (max - min) + min))
}