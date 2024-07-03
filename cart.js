const url = `http://localhost:3000/trips/carts`;

Load()

function Load(){

    document.querySelector('#Title').addEventListener('click',() => {window.location.assign("index.html");})
    document.querySelector('#Bookings').addEventListener('click',() => {window.location.assign("bookings.html");})
    document.querySelector('#Cart').addEventListener('click',() => {window.location.assign("cart.html");})

    fetch(url)
            .then(response => response.json())
            .then(data =>{
                const resultsDiv = document.getElementById('cartContent')
                console.log(data)
                if(data.error){
                    
                    resultsDiv.innerHTML = `
                    <div id="cartTxt">No tickets in your cart.</div>
                    <div id="planATrip">Why not plan a trip?</div>`
                } else {
                    resultsDiv.innerHTML = ''
                    for(let i = 0 ; i<data.length ; i++){
                    resultsDiv.innerHTML += `<div id="containerCart">
                            <div class="cartCont">${data[i].departure} > ${data[i].arrival}</div>
                            <div class="cartCont">${moment(data[i].date).format('HH:mm')}</div>
                            <div class="cartCont">${data[i].price}€</div>
                            <button class="cartDelete">X</button>
                        </div>`
                    }
                    resultsDiv.innerHTML += `<div id="bottomCart">
                     <div id="total">Total: 130€</div>
                     <button id="checkout">Purchase</button>
                     <div>`
                }
            })
            .catch(error=>{
                console.error('Error fetching trips', error)
            })
    
}