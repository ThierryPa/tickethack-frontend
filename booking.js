// //Booking => écrire checkDate(data.date)
// function checkDate(date = new Date ('2024-07-02T08:32:03.428+00:00')) {
//     const myDate = moment(date).fromNow();
//     return myDate;
// }
// console.log(checkDate())

const url = `http://localhost:3000/bookings`;

Load()

function Load(){
    let TotalPrice=0
    document.querySelector('#Title').addEventListener('click',() => {window.location.assign("index.html");})
    document.querySelector('#Bookings').addEventListener('click',() => {window.location.assign("bookings.html");})
    document.querySelector('#Cart').addEventListener('click',() => {window.location.assign("cart.html");})

    fetch(url)
            .then(response => response.json())
            .then(data =>{
                const resultsDiv = document.getElementById('bookingContent')
                if(data.error){
                    
                    resultsDiv.innerHTML = `
                    <div id="bookTxt">No booking yet.</div>
                    <div id="planATrip">Why not plan a trip?</div>`
                } else {
                    resultsDiv.innerHTML = ''
                    for(let i = 0 ; i<data.length ; i++){
                    TotalPrice += data[i].price
                    resultsDiv.innerHTML += 
                    `<div id="containerBook">
                        <div class="bookCont">${data[i].departure} > ${data[i].arrival}</div>
                        <div class="bookCont">${moment(data[i].date).format("HH:mm")}</div>
                        <div class="bookCont">${data[i].price}€</div>
                        <div class="bookCont">Departure in 5 hours</div>
                    </div>`

                    
                    
                    }
                    resultsDiv.innerHTML += `<div class="dividerBooks"></div>
                    <div id="enjoyBook">Enjoy your travels with Tickethack!</div>`
                }
            })
            .catch(error=>{
                console.error('Error fetching trips', error)
            })
    
}

