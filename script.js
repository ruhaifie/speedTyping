const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random' //insert api url here
const quoteDisplayElement = document.getElementById('quoteDisplay') //html id=quoteDisplay
const quoteInputElement = document.getElementById('quoteInput') //clear input id=quoteInput
const timerElement = document.getElementById('timer')   //id=timer

//event listener, check spelling
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let correct = true //initialize value variable for correct
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) { //other character that dont being compare yet
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) { //right
            characterSpan.classList.add('correct') //1st part for correct //correct section inside css
            characterSpan.classList.remove('incorrect')
        } else { //wrong
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect') //2nd part for incorrect
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getRandomQuote() { //get quote from the API
    return fetch(RANDOM_QUOTE_API_URL) //promise syntax //13:07
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span') //check at browser console
        //characterSpan.classList.add('incorrect') //incorrect css
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan) //append is add something at end
    })
    quoteInputElement.value = null //clear input
    startTimer()

    //quoteDisplayElement.innerText = quote   //everytime refresh quote inside id=QuoteDisplay
    //console.log(quote);
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)    //2nd parameter
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();