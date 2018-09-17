var sports = ["Football", "Baseball", "Softball", "Basketball", "Volleyball", "Tennis", "Golf", "Soccer"];   

function renderButtons() {
$("#buttons-view").empty();
for (var i = 0; i < sports.length; i++) {
var a = $("<button>");
a.addClass("sport");
a.attr("data-name", sports[i]);
a.text(sports[i]);
$("#buttons-view").append(a);
}
}
 
$('#add-gif').on('click', function(event){
event.preventDefault();
userInput = $('#gif-input').val().trim();
console.log(userInput);
sports.push(userInput);
console.log(sports);
renderButtons();
})

$(document).on('click', ".sport", function(){
 var x = $(this).data("name");
 console.log(x);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +x+ "&api_key=dws0eA798NCmbRhSBCplD3OBFt3HM3UB&limit=10";
    
    $.ajax({
     url: queryURL,method: "GET"})
    .done(function(response) {
     console.log(queryURL);
     console.log(response);

 
for(var i=0; i<response.data.length;i++){
     var sportDiv = $("<div>");
     var p = $("<p>").text("Rating: " + response.data[i].rating);  

     var sportImage = $("<img>");
      sportImage.attr('src',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
      sportImage.attr('data-still',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
      sportImage.attr('data-animate',response.data[i].images.fixed_height.url.replace(/^http:\/\//i, 'https://'));
      sportImage.attr('data-state',"still");
      sportImage.addClass("gif");
      sportDiv.append(p);
      sportDiv.append(sportImage);
      
     $("#gifs-appear-here").prepend(sportDiv);
     } 

     $(document).on("click", "img", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })
    })
}) 	
renderButtons();