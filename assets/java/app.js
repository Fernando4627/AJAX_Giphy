$(document).ready(function () {
  //populte set gifs
  //add still function by using 
  //results[i].images.original_still.url still call
  //with a on.click function when the image is clicked it will be animated
  //results[i].images.fixed_height.url animate call
  //then click again for it to be still
  //using the search to update and add new button with user text and gifs
  //added to lower display while leaving the others there
  var gamingGif = [
    'Mario',
    'Call of Duty',
    'Sonic',
    'VR Chatroom',
    'Pokemon',
    'Borderlands',
    'Monster Hunter World',
    'Halo',
    'Destiny'
  ]
  //gernerate buttons and gifs
  function popbuttons(gamingarr) {
    $('#buttons').empty();

    for (let q = 0; q < gamingarr.length; q++) {
      let btn = $('<button>');
      btn.text(gamingarr[q]);
      btn.addClass('btn btn-success gaming-button');
      $('#buttons').append(btn);
    }
  }

  $(document).on('click', '.gaming-button', function () {
    //$('#giphy').empty();
    console.log(this)
    getGif($(this).text());
  });

  //search function
  $('#AddSearch').on('click', function (event) {
    event.preventDefault();
    let text = $('#search').val();
    console.log(text);
    $('#search').val('');
    gamingGif.push(text);
    popbuttons(gamingGif);
  });
  //pause and play function
  $(document).on('click', 'img', function () {
    if ($(this).attr('data-status') === 'still') {
      $(this).attr('src', $(this).attr('data-gif'));
      $(this).attr('data-status', 'gif');
    }
    else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-status', 'still');
    }
  });
  function getGif(person) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=10IhGB3JlNMbTlYbOAsIeHXZuM3JE9iC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(results);

        //$("#giphy").empty();

        for (var i = 0; i < results.length; i++) {
          addGif(results[i].images.original_still.url, results[i].images.fixed_height_url, results[i].rating);
        }
      });
  }
  function addGif(gif, still, rating) {
    let card = $('<div class="card"></div>');
    let cardBody = $('<div class="card-body"></div>');
    let header = $('<div class="card-header"></div>');
    header.text(rating.toUpperCase());
    let img = $('<img>');
    img.attr('src', still);
    img.attr('data-still', still);
    img.attr('data-gif', gif);
    img.attr('data-status', 'still');
    cardBody.append(img);
    card.append(header);
    card.append(cardBody);
    $('#giphy').prepend(card);
  }
  popbuttons(gamingGif);
});