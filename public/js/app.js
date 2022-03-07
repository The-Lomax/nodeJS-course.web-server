// console.log('Client side javascript is loaded')
// puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// use local endpoint to retrieve the data
// fetch('http://localhost:3000/forecast?city=warsaw').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input');
const m1 = document.querySelector('#message-1');
const m2 = document.querySelector('#message-2');
const m3 = document.querySelector('#message-3');
const m4 = document.querySelector('#message-4');
const m5 = document.querySelector('#message-5');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearContents();

    m1.textContent = "Loading...";

    const loc = searchElem.value;
    if (loc.length < 1) return m1.textContent = "search cannot be empty";
    fetch('/forecast?city=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = data.error;
            }
            else {
                m1.textContent = "Weather data for: " + data.location;
                m2.textContent = "Weather forecast: " + data.forecast;
                m3.textContent = "Current temperature: " + data.temperature + " degree Celsius";
                m4.textContent = "Real Feel temperature: " + data.realFeel + " degree Celsius";
                m5.textContent = "Rain probability: " + data.rainProb + "%";
            }
        })
    })
})

function clearContents() {
    m1.textContent = "";
    m2.textContent = "";
    m3.textContent = "";
    m4.textContent = "";
    m5.textContent = "";
}