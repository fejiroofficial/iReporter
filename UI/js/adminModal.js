const modal = document.getElementById('myModal');

const casee = document.getElementById("casee");

const span = document.getElementsByClassName("close")[0];

casee.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
