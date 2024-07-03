// //Booking => écrire checkDate(data.date)
// function checkDate(date = new Date ('2024-07-02T08:32:03.428+00:00')) {
//     const myDate = moment(date).fromNow();
//     return myDate;
// }
// console.log(checkDate())

Load()

function Load(){

    document.querySelector('#Title').addEventListener('click',() => {window.location.assign("index.html");})
    document.querySelector('#Bookings').addEventListener('click',() => {window.location.assign("bookings.html");})
    document.querySelector('#Cart').addEventListener('click',() => {window.location.assign("cart.html");})
}