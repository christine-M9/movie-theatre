// fetching data from db.json
fetch("db.json")
.then((response) => response.json())
 .then((data) => {
const movieList = data.films;
const filmListElement = document.getElementById("film-list");

// showing movie details
function showMovieDetails(movie) {
      const posterElement = document.getElementById("poster");
      const titleElement = document.getElementById("title");
      const runtimeElement = document.getElementById("runtime");
      const showtimeElement = document.getElementById("showtime");
      const availableTicketsElement =
document.getElementById("available-tickets");
     const buyTicketButton = document.getElementById("buy-ticket");
     const sMessage = document.getElementById("message");

posterElement.src = movie.poster;
  titleElement.textContent = movie.title;
     runtimeElement.textContent = `Runtime: ${movie.runtime} mins`;
       showtimeElement.textContent = `Showtime: ${movie.showtime}`;
    availableTicketsElement.textContent = `Available Tickets: ${
movie.capacity - movie.tickets_sold
}`;
 

// Event listener (Ticket button)
buyTicketButton.addEventListener("click", () => {
  if (movie.tickets_sold < movie.capacity) {
       movie.tickets_sold++;
    availableTicketsElement.textContent = `Available Tickets: ${
 movie.capacity - movie.tickets_sold
    }`;
   
    // Updating tickets 
    updateTicketsSold(movie.id, movie.tickets_sold);
  } 
  
  // Checking if a movie is sold
  if (movie.tickets_sold === movie.capacity) {
    buyTicketButton.textContent = "Sold Out";
    buyTicketButton.disabled = true;

    const filmItem = document.querySelector(
      `li[data-film-id="${movie.id}"]`
    );
    if (filmItem) {
      filmItem.classList.add("sold-out");
    }
  }
});
}

// Updating details in the db file
function updateTicketsSold(movieId, ticketsSold) {
const updatedMovie = movieList.find((movie) => movie.id === movieId);
if (updatedMovie) {
  updatedMovie.tickets_sold = ticketsSold;
}
}

// showcasing movie list
function showFilmList() {
for (const movie of movieList) {
  const filmItem = document.createElement("li");
  filmItem.classList.add("film", "item");
  filmItem.textContent = movie.title;
  filmItem.setAttribute("data-film-id", movie.id);
  filmListElement.appendChild(filmItem);

  filmItem.addEventListener("click", () => {
    showMovieDetails(movie);
  });
}
// Show the details of the first movie
const firstMovie = movieList[0];
if (firstMovie) {
 showMovieDetails(firstMovie);
}
}





// Deleting a film from the db.json file
function deleteFilm(movieId) {
const filmIndex = movieList.findIndex((movie) => movie.id === movieId);
if (filmIndex !== -1) {
  movieList.splice(filmIndex, 1);
}
}

// Initialize the page
showFilmList();

})

