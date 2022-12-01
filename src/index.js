// grab DOM elements
const nav = document.querySelector('.game-list')
const gameDetails = document.querySelector('.game-details')
const imageDetail = document.querySelector('#detail-image')
const detailTitle = document.querySelector('#detail-title')
const scoreDetail = document.querySelector('#detail-high-score')
const form = document.querySelector('#high-score-form')
let currentGame = {};

// grabs the first game from the server 
fetch('http://localhost:3000/games/1')
    .then(resp => resp.json())
    .then(game => renderDetails(game))

// grabs all games from the server 
fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then(games => renderGameNames(games))

// render game names to the DOM
function renderGameNames(games) {
    games.forEach(game => {
        let header = document.createElement('h5')
        header.textContent = `${game.name} (${game.manufacturer_name})`
        nav.appendChild(header)
        header.addEventListener('click', () => renderDetails(game))
        
    })
}

// updates the featured game depending on which game was clicked
function renderDetails(game) {
    // console.log(game.name)
    console.log(game)
    currentGame = game
    imageDetail.src = game.image
    detailTitle.textContent = game.name
    scoreDetail.textContent = game.high_score
}

form.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(e.target['score-input'].value)
    // console.log(currentGame)
    // currentGame.high_score += e.target['score-input'].value
    currentGame.high_score += parseInt(e.target['score-input'].value)
    renderDetails(currentGame)

    form.reset()

})



