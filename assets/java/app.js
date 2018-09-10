//populte set gifs
//add still function by using 
//results[i].images.original_still.url still call
//with a on.click function when the image is clicked it will be animated
//results[i].images.fixed_height.url animate call
//then click again for it to be still
//using the search to update and add new button with user text and gifs
//added to lower display while leaving the others there
$("button").on("click", function () {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=10IhGB3JlNMbTlYbOAsIeHXZuM3JE9iC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(results);

        $("#giphy").empty();

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img class=img>");
          personImage.attr("src", results[i].images.original_still.url);


          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#giphy").prepend(gifDiv);
        }
      });
  });
$("img").on("click",function changeImg() {
    //if statement to verify if still then animated and back
})