// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-watched").on("click", function(event) {
    var id = $(this).data("id");
    var newWatched = $(this).data("watched");

    var newWatchState = {
      watched: newWatched
    };

    // Send the PUT request.
    $.ajax("/api/movies/" + id, {
      type: "PUT",
      data: newWatchState
    }).then(
      function() {
        console.log("changed sleep to", newWatch);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMovie = {
      name: $("#movie").val().trim(),
      watched: $("[name=watched]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/movies", {
      type: "POST",
      data: newMovie
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-movie").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/movies/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted movie", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
