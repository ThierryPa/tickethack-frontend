const urlCart = `https://tickethack-backend-mu.vercel.app/carts`;
const urlBookings = `https://tickethack-backend-mu.vercel.app/bookings`;

Load()

function Load(){
    let TotalPrice=0
    document.querySelector('#Title').addEventListener('click',() => {window.location.assign("index.html");})
    document.querySelector('#Bookings').addEventListener('click',() => {window.location.assign("bookings.html");})
    document.querySelector('#Cart').addEventListener('click',() => {window.location.assign("cart.html");})

    fetch(urlCart)
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
                    TotalPrice += data[i].price
                    resultsDiv.innerHTML += `<div id="containerCart">
                            <div class="cartCont">${data[i].departure} > ${data[i].arrival}</div>
                            <div class="cartCont">${moment(data[i].date).format('HH:mm')}</div>
                            <div class="cartCont">${data[i].price}€</div>
                            <button class="cartDelete" id="${data[i]._id}">X</button>
                        </div>`
                    }
                    resultsDiv.innerHTML += `<div id="bottomCart">
                     <div id="total">Total: ${TotalPrice}€</div>
                     <button id="checkout">Purchase</button>
                     <div>`

                     for(let i = 0 ; i<data.length ; i++){
                        console.log(data[i]._id)
                        document.getElementById(data[i]._id).addEventListener("click", () => onDelete(data[i]._id));
                    }

                    document.querySelector("#checkout").addEventListener('click', ()=> {
                        
                        for(let i=0 ; i<data.length ;i++){
                            console.log(data[i]._id)
                            onBookAdd(data[i]._id)
                            onDelete(data[i]._id)
                        }
                         window.location.assign("bookings.html")
                    })
                }
            })
            .catch(error=>{
                console.error('Error fetching trips', error)
            })
    
}

function onDelete(id){
    const urlId = id;
    console.log('fonction appelée')
    fetch(`${urlCart}/${urlId}`,{
        method: 'DELETE'
      }).then(() => {
        Load();
      })
}

function onBookAdd(id){
    const urlId = id;

    fetch(`${urlBookings}/${urlId}`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    }).then(() => {
      console.log('added');
    });
}

