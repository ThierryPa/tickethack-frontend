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

    const url = `http://localhost:3000/trips/${departure}/${arrival}/${date}`;

    fetch(url)
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
            resultsDiv.innerHTML += `<div class="containerTrips"> <div class="tripsCont"> ${
              data[i].departure
            } > ${data[i].arrival} </div> <div class="tripsCont">${moment(
              data[i].date
            ).format("HH:mm")}</div> <div class="tripsCont">${
              data[i].price
            }€</div><button class="inpList" id="${
              data[i].id
            }">Book</button></div>`;
            console.log(`#${data[i].id}`)
            document.getElementById(`#${data[i].id}`).addEventListener('click', () => onBook(`#${data[i].id}`))
            
          }

          
        }
      })
      .catch((error) => {
        console.error("Error fetching trips", error);
      });
  });
}

function onBook(id) {
  console.log(`booking with ID : ${id}`);
  const urlId = document.querySelector(`#${data[i].id}`);

  const url = `http://localhost:3000/trips/${urlId}`;

  fetch(url).then((data) => {
    window.location.assign("cart.html");
  });
}
