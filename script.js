//ui display
import {createBoard,markTile,revealTile,TILE_STATUSES,checkWin,checkLose} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE,NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const message = document.querySelector('.subtext')

console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click',() => {
            revealTile(board,tile)
            checkGameEnd()
        })
        tile.element.addEventListener('contextmenu',(e) => {
            e.preventDefault()
            markTile(tile)
            reduceMinesLeft()
        })
    })
})

boardElement.style.setProperty("--size",BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES


function reduceMinesLeft(){
    const markedTilesCount = board.reduce((count,row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    },0)
   minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd(){
    const win = checkWin(board)
    const lose = checkLose(board)

    if(win || lose){
        boardElement.addEventListener('click',stopProp,{capture: true})
        boardElement.addEventListener('contextmenu',stopProp,{capture: true})
    }

    if (win){
        message.textContent = 'You win'
    }
    if (lose) {
        message.textContent = "You Lose"
        board.forEach(row => {
          row.forEach(tile => {
            if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
            if (tile.mine) revealTile(board, tile)
          })
        })
    }
}


    




function stopProp (e){
    e.stopImediatePropagation()
}