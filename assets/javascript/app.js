$(document).ready(function () {

    //variable declaration
    var topics = ["Beetle", "Lobster", "Elephant", "Boar", "Fruit Bat", "Gorilla", "Hyena", "Alligator", "Rooster", "Snake", "Vulture", "Llama"]
    var FAV_KEY = 'favorites';

    //renders buttons at top of screen
    function renderButtons() {

        $("#button-div").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("animalBtn btn btn-success")
                .attr("type", "button")
                .attr("data-name", topics[i])
                .text(topics[i]);
            $("#button-div").append(a);
        }
    }

    //renders the GIFs by pulling them thru AJAX and attaches the correct attributes to the various pieces
    function renderGif() {
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=MJ68Z6txRmEzdp8Ow2QiKvYGwxbb9ip4&limit=10&rating=pg";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gif-div").empty();
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
                animalDiv.append(p, animalImage, addFavorite);
                $("#gif-div").prepend(animalDiv);
            }
        });
    }

    //allows the GIFs to be either still images or animated
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

    function addFavorite() {
        //jquery to select the animalDiv and make a copy of it
        var fav = $(this).parent().clone();
        //remove the add to favorites button from the cloned div
        fav.children("button").remove();
        fav.appendTo($("#favorites"));
        //clears the favArray to prevent duplicates since each child is pushed every time a new favorite is added
        var favArray = [];
        //selects each animalDiv children class from the favorites div and pulls the html which contains the <p> and <img> tags and adds them to the favArray
        $("#favorites").children('.animalDiv').each(function (){
            child = $(this).html();
            favArray.push(child);
        });
        //adds the favArray to localStorage for persistence across refreshes
        localStorage.setItem(FAV_KEY, JSON.stringify(favArray));
    }

    //clears the currently displayed Favorites as well as those stored in local storage
    function emptyFavorite() {
        $("#favorites").empty();
        localStorage.clear();
    }

    //gets the JSON array from localStorage, parses the array back to a JS array, then iterates thru the array making new animalDivs, attaches the favArray content,
    // and then returns the new array of Divs. 
    function loadFavorite() {
        var JSONarray = localStorage.getItem(FAV_KEY);
        var favArray = (JSON.parse(JSONarray));
        var divArray = [];
        if(favArray === null){
            return false;
        }
        else{
        for(var i = 0; i<favArray.length; i++){
          divArray.push($("<div>").addClass("animalDiv").append(favArray[i]));  
        }
        return divArray;
        }
      }

    //prevents right clicking on images
    $(document).on("contextmenu", "img", function () {
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
    favArray = loadFavorite();
    $("#favorites").append(favArray);

}); 
