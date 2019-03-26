//variable declaration
var topics = ["Beetle", "Lobster", "Elephant", "Warthog", "Fruit Bat", "Gorilla", "Hyena", "Alligator", "Rooster", "Snake", "Vulture"]
var hidden = $(".hidden");

//function declaration
function renderButtons() {

    $("#button-div").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animal btn btn-success");
        a.attr("type", "button");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#button-div").append(a);
    }
}

function renderGif() {
    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gif-div").empty();
        console.log(response);
        if (hidden.css("display") === "none") {
            hidden.css("display", "block");
        }
        $("#gifHeader").html(`<h5>Here are your ${animal} gifs.</h5>`);
        var results = response.data;
        for (var j = 0; j < results.length; j++) {
            var animalDiv = $("<div>").addClass("animalDiv");
            var p = $("<p>")
                .addClass("card-text")
                .html(`Rating: ${results[j].rating.toUpperCase()}`);
            var animalImage = $("<img>")
                .addClass("gif")
                .attr("data-state", "still")
                .attr("data-still", results[j].images.fixed_width_still.url)
                .attr("data-animate", results[j].images.fixed_width.url)
                .attr("src", results[j].images.fixed_width_still.url);

                animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gif-div").prepend(animalDiv);
        }
    });
}

function animateGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

function addButton(event) {
    event.preventDefault();
    if ($("#gif-input").val() === "") {
        alert("Please type something in the form")
    }
    else {
        var newButton = $("#gif-input").val().trim();
        topics.push(newButton);
        renderButtons();
        $("#gif-input").val("");
    }
}

//event listeners
$(document).on("click", ".animal", renderGif);
$(document).on("click", ".gif", animateGif);
$(document).on("click", "#add-gif", addButton);

//Displays starter array buttons
renderButtons();
