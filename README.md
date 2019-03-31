# Giftastic
Giphy API tool

*Giphy API tool using AJAX and localStorage for persistence*

## Purpose:
Through the use of the GIPHY api and AJAX calls I wanted to grab GIFs from giphy, provide a means to store them persistently, and also add other search options through the use of a basic form.

## How it works:
An initial array of buttons is dynamically generated at the top of the screen. These buttons cause an AJAX call of the Giphy API which grabs the first 10 images matching the query that have a rating of PG or below. The JSON object received from the AJAX is then used to display a static GIF image which is put into a jquery generated div that holds the gif, the rating, and a add to favorites button. An event listener is then attached to each gif that causes the GIF to be animated on click by changing its source url. A simple form exists on the right that will generate a new button at the top with the text entered acting as a query field for another AJAX call when clicked. The add to favorites button under each gif causes the gif's div to be cloned, the add to favorite button removed from the clone, and then appended to the favorites section of the webpage. The html content of the new div is then converted into a JSON object and stored in local storage. An empty favorites button is attached to the favorites div which both emptys the favorites div as well as clearing the localStorage cache. Persistence is achieved client-side by localStorage whereby the array of JSON objects is parsed back into an array of JS objects otherwise the array is iterated through, added back to a div, and appended to the favorites section upon page loading.

## How to use:
To use the buttons at the top you simply click them to generate the 10 intial GIFs associated with that query. The form can be used to add more buttons by either typing an animal and hitting the submit button or simply pressing enter. If nothing is present in the form and the user attempts to add a button then an alert is presented requesting some sort of input. While animals were used for demonstration purposes, any sort of string can be used as a query for the giphy API. The add to favorites button stores the GIF in the favorites section which persists when another button at the top is clicked as well as upon page reload. The clear favorites button is used to empty that section.

## Functionality to add:
If given more time on the project I would add randomization to the GIFs returned by the GIPHY api so that the same 10 gifs are not always received. I believe that there is likely a better way of doing the persistence and copying the gifs to the favorites but that was what I was able to do in the time alotted and with the coding knowledge I had plus some basic web searching.

## Contributors:
This project is maintained and contributed to solely by myself, Tyler Ward. All images are provided using the giphy API.

