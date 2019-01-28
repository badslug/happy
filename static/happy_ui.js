// Normally would put into external JS but we want everything in one spot for the demo.
import { brute, happy, search } from './happy.js'

let form = document.getElementById('form')
let formCompare = document.getElementById('form-compare')
let details = document.getElementById('details')
let seedInput = document.getElementById('seed')
let countInput = document.getElementById('count')
let startCell = document.getElementById('brute-start')
let countCell = document.getElementById('brute-count')
let elapsedCell = document.getElementById('brute-elapsed')
let testedCell = document.getElementById('brute-tested')

let seedCompareInput = document.getElementById('seed-compare')
let countCompareInput = document.getElementById('count-compare')
let bruteCell = document.getElementById('brute-speed')
let happyCell = document.getElementById('happy-speed')
let speedCell = document.getElementById('speed')

function update() {
    let seed = parseInt(seedInput.value)
    if (isNaN(seed)) {
        seed = 0
    }
    let count = parseInt(countInput.value)
    if (isNaN(count)) {
        count = 5
    }
    let tester = brute
    let result = search(seed, count, tester)
    startCell.innerText = seed+1+''
    countCell.innerText = count+''
    elapsedCell.innerText = (result.end - result.start)+''
    testedCell.innerText = result.tested.length+''

    // Now generate the details listing - normally we would use some sort of templating system...
    let html = ''
    result.tested.forEach(t => {
        let happiness = t.happy ? 'happy' : 'unhappy'
        html += `<h3 class="${happiness}">${t.seed} is ${happiness}</h3><table class="tight"><thead><tr><th>Number</th><th>Digits</th><th>Sum</th></tr></thead><tbody>`
        t.steps.forEach(step => {
            html += `<tr><td>${step.seed}</td><td><table class="tight"><tbody><tr><td>Digit</td>`
            step.parts.forEach(part => {
                html += `<td>${part.digit}</td>`
            })
            html += '</tr><tr><td>Square</td>'
            step.parts.forEach(part => {
                html += `<td>${part.square}</td>`
            })
            step.parts.forEach(part => {

            })
            html += `</tr></tbody></table></td><td>${step.sum}</td></tr>`
        })
        html += '</tbody></table>'
    })
    details.innerHTML = html
}

function updateCompare() {
    let seed = parseInt(seedCompareInput.value)
    let count = parseInt(countCompareInput.value)
    if (isNaN(seed)) {
        seed = 0
    }
    if (isNaN(count)) {
        count = 5
    }
    let bruteResult = search(seed, count, brute)
    let happyResult = search(seed, count, happy)
    let bruteElapsed = bruteResult.end - bruteResult.start
    let happyElapsed = happyResult.end - happyResult.start
    bruteCell.innerText = bruteElapsed
    happyCell.innerText = happyElapsed
    speedCell.innerText = Math.floor(((happyElapsed) / (bruteElapsed))*100)+'%'
}

// Don't allow our form to submit
function ignore(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
}
form.addEventListener('submit', ignore)
formCompare.addEventListener('submit', ignore)

// Capture changes to the form so we can update the UI
form.addEventListener('input', () => {
    update()
})
formCompare.addEventListener('input', () => {
    updateCompare()
})

update()
updateCompare()