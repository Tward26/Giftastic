$(document).ready(function() {

//initial array declaration
var topics = ["Beetle", "Lobster", "Elephant", "Boar", "Fruit Bat", "Gorilla", "Hyena", "Alligator", "Rooster", "Snake", "Vulture", "Llama"]

//function declaration
function renderButtons() {

    $("#button-div").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animalBtn btn btn-success");
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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=MJ68Z6txRmEzdp8Ow2QiKvYGwxbb9ip4&limit=10&rating=pg";
    //MJ68Z6txRmEzdp8Ow2QiKvYGwxbb9ip4
    //dc6zaTOxFJmzC

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gif-div").empty();
        console.log(response);
        $("#gifHeader").html(`<h5>${animal} GIFs, click on the GIF to animate it!</h5>`);
        var results = response.data;
        for (var j = 0; j < results.length; j++) {
            var animalDiv = $("<div>").addClass("animalDiv");
            var p = $("<p>")
                .addClass("card-text")
                .html(`Rating: ${results[j].rating.toUpperCase()}`);
            var animalImage = $("<img>")
                .addClass("gif img-thumbnail")
                .attr("data-state", "still")
                .attr("data-still", results[j].images.fixed_width_still.url)
                .attr("data-animate", results[j].images.fixed_width.url)
                .attr("src", results[j].images.fixed_width_still.url);
                var addFavorite = $("<button>")
                .addClass("btn btn-success favButton")
                .attr("type", "button")
                .text("Add to Favorites");
                animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(addFavorite);
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

function addFavorite(){
    if($(".hidden").css("display") === "none"){
        $(".hidden").css("display", "block");
    } 
    var fav = $(this).parent().clone();
    console.log(fav);
    fav.children("button").remove();
    localStorage.setItem("lastname", "Smith");
    fav.appendTo($("#favorites"));
}

function emptyFavorite(){
    $("#favorites").empty();
}

//prevents right clicking on images
$(document).on("contextmenu", "img", function(){
    return false;
 }); 

//event listeners
$(document).on("click", ".animalBtn", renderGif);
$(document).on("click", ".gif", animateGif);
$(document).on("click", "#add-gif", addButton);
$(document).on("click", ".favButton", addFavorite);
$(document).on("click", "#clrFav", emptyFavorite);

//Displays starter array buttons
renderButtons();

}); 
