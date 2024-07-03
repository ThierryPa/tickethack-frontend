const url = 'https://tickethack-backend-mu.vercel.app/trips'
const urlCart = 'https://tickethack-backend-mu.vercel.app/carts'

Load();

function Load() {
  document.querySelector("#Title").addEventListener("click", () => {
    window.location.assign("index.html");
  });
  document.querySelector("#Bookings").addEventListener("click", () => {
    window.location.assign("bookings.html");
  });
  document.querySelector("#Cart").addEventListener("click", () => {
    window.location.assign("cart.html");
  });

  document.querySelector("#search").addEventListener("click", () => {
    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;

    console.log(departure, arrival, date);

    

    fetch(`${url}/${departure}/${arrival}/${date}`)
      .then((response) => response.json())
      .then((data) => {
        const resultsDiv = document.getElementById("tripsList");
        console.log(data);
        if (data.error) {
          resultsDiv.innerHTML = `<div> <img id="img" src="./images/notfound.png"> </div>
                    <div id="divider">_____________________________</div>
                    <div id="littlePhrase">
                      No trip found.
                    </div>`;
        } else {
          resultsDiv.innerHTML = "";
          for (let i = 0; i < data.length; i++) {
            resultsDiv.innerHTML += 
            `<div class="containerTrips"> 
                <div class="tripsCont">${data[i].departure} > ${data[i].arrival} 
                </div> <div class="tripsCont">${moment(data[i].date).format("HH:mm")}
                </div> <div class="tripsCont">${data[i].price}€
                </div><button class="inpList" id="${data[i]._id}">Book</button></div>`;
            
          }

          for (let i = 0; i < data.length; i++){
            document.getElementById(data[i]._id)
              .addEventListener("click", () => onBook(data[i]._id));
          }
         
        }
      })
      .catch((error) => {
        console.error("Error fetching trips", error);
      });
  });
}

function onBook(id) {
  const urlId = id;

  fetch(`${urlCart}/${urlId}`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify()
  }).then(() => {
    window.location.assign("cart.html");
  });
}
