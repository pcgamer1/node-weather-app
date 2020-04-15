console.log('Client side js has been loaded in!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const first = document.querySelector('#first')
const second = document.querySelector('#second')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    first.textContent = 'Searching for weather details...'
    second.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           return first.textContent = data.error
        }
        first.textContent = data.location
        second.textContent = data.forecast
    })
})
    console.log('Submitted')
})