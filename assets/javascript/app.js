//variable declaration
var topics = ["cat", "dog", "warthog", "beetle", "tarantula"]

//function declaration


// Function for displaying movie data
function renderButtons() {

    $("#button-div").empty();
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("animal btn btn-primary");
        a.attr("type", "button");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#button-div").append(a);
    }
}

function displayGif() {

    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=MJ68Z6txRmEzdp8Ow2QiKvYGwxbb9ip4&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gif-div").empty();
        var results = response.data;
        for (var j = 0; j < results.length; j++) {
            var animalDiv = $("<div>");
            animalDiv.addClass("animalDiv");
            var p = $("<p>").text("Rating: " + results[j].rating);
            var animalImage = $("<img>");
            animalImage.attr("class", "gif");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[j].images.fixed_width_still.url);
            animalImage.attr("data-animate", results[j].images.fixed_width.url);
            animalImage.attr("src", results[j].images.fixed_width_still.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);


            $("#gif-div").prepend(animalDiv);
        }
    });
}

function animateGif() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
  
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newButton = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(newButton);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#gif-input").val("");
  });

//function calls
$(document).on("click", ".animal", displayGif);
$(document).on("click", ".gif", animateGif);

renderButtons();
