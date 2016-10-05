$(document).ready(function() {
  // get all Pokemons from Red Edition
  var pokemonAPI = "http://pokeapi.co/api/v2/pokedex/2/";
  var pokemonOptions = {};
  function displayPokemons(data) {
    console.log( "success" );
    var pokis = '<ol>';
      $.each(data.pokemon_entries,function(i,pokemon) {
        pokis += '<li class="pokemon" data-name="' + pokemon.pokemon_species.name + '" data-id="' + pokemon.entry_number + '">';
        pokis += '<a href="http://pokeapi.co/api/v2/pokemon/' + pokemon.entry_number + '" class="pokemon__heading">';
        pokis += '<span class="pokemon__heading__id">#' + pokemon.entry_number + '</span> ';
        pokis += '<span class="pokemon__heading__name">' + pokemon.pokemon_species.name + '</span></a>';
        pokis += '<a href="http://pokeapi.co/api/v2/pokemon/' + pokemon.entry_number + '" class="pokemon__img pokemon__img--' + (i + 1) +'">';
        pokis +=  '</a></li>';
      }); // end each
      pokis += '</ol>';
      $('#pokemons').html(pokis);
  }
  $.getJSON(pokemonAPI, pokemonOptions, displayPokemons)
   .done(function() {
     console.log( "second success" );
   })
   .fail(function() {
     console.log( "error" );
     $('#pokemons').html('<p class="error">There was an Error! Try again later.</p>');
   })
   .always(function() {
     console.log( "complete" );
   })
   .complete(function() {
      console.log("second complete");
      $('#loader').hide();
   });

   // search pokemons
   // on form submit
   $('#search').keyup(function(e) {
    //  e.preventDefault();
     var searchValue = $('#search').val();
     searchValue = searchValue.replace('#', '');
     for (var i = 0; i<$('.pokemon').length; i++) {
       if($.isNumeric(searchValue)) {
         console.log('its numeric');
         console.log($($('.pokemon')[i]).data('id'));
         console.log(parseInt(searchValue));
         if($($('.pokemon')[i]).data('id') === parseInt(searchValue)) {
           $($('.pokemon')[i]).show();
         } else {
           $($('.pokemon')[i]).hide();
         }
       } else {
         if($($('.pokemon')[i]).data('name').toLowerCase().indexOf(searchValue) === -1) {
           $($('.pokemon')[i]).hide();
         } else {
           $($('.pokemon')[i]).show();
         }
       }
     }
   });

  // get details
  function displayPokemonDetail(data) {

    // img
    var pokis = '<div class="pokemon__img pokemon__img--' + data.id +'"></div>';
    // id
    // Name
    pokis += '<h2><span>#' + data.id + '</span> ' + data.name + '</h2>';

    pokis += '<p>';
    pokis += '<strong>Weight: </strong>';
    pokis += data.weight;
    pokis += '</p>';

    // height
    pokis += '<p>';
    pokis += '<strong>Height: </strong>';
    pokis += data.height;
    pokis += '</p>';

    // Base XP
    pokis += '<p>';
    pokis += '<strong>Base XP: </strong>';
    pokis += data.base_experience;
    pokis += '</p>';

    // Types
    pokis += '<p>';
    pokis += '<strong>Types: </strong>';
    if(data.types[0] !== undefined) {
      pokis += '<a class="types types--' + data.types[0].type.name + '" href="' + data.types[0].type.url + '">';
      pokis += data.types[0].type.name;
      pokis += '</a>';
    }
    if(data.types[1] !== undefined) {
      pokis += '<a class="types types--' + data.types[1].type.name + '" href="' + data.types[1].type.url + '">';
      pokis += data.types[1].type.name;
      pokis += '</a>';
    }
    pokis += '</p>';

    // Moves
    pokis += '<p>';
    pokis += '<strong>Moves: </strong>';
    for(var i = 0; i<data.moves.length; i++) {
      pokis += '<a class="moves" href="' + data.moves[i].move.url + '">';
      pokis += data.moves[i].move.name;
      pokis += '</a>';
    }
    pokis += '</p>';

    // Stats
    pokis += '<p><h3>Stats: </h3>';
    for(var i = 0; i<data.stats.length; i++) {
      pokis += '<div class="stats__item">';
      pokis += '<a href="' + data.stats[i].stat.url + '" class="">';
      pokis += data.stats[i].stat.name;
      pokis += '</a>';
      pokis += '<span>' + data.stats[i].base_stat + '</span>'
      pokis += '<div class="stats__status" style="width:' + (data.stats[i].base_stat / 1.8) + '%">';
      pokis += '</div>';
      pokis += '</div>';
    }
    pokis += '</p>';

    // navigation
    pokis += '<footer>';
    if(data.id !== 1) {
      pokis += '<button href="http://pokeapi.co/api/v2/pokemon/' + (data.id - 1) + '" id="prev" class="navigation__button">';
      pokis += 'Prev';
      pokis += '</button>';
    }
    if(data.id !== 151) {
      pokis += '<button href="http://pokeapi.co/api/v2/pokemon/' + (data.id + 1) + '" id="next" class="navigation__button">';
      pokis += 'Next';
      pokis += '</button>';
    }
    pokis += '</footer>';

  // get images from flickr

    $('#modalContent').html(pokis);
  }

  // on click on a pokemon show details in a modal
  $('#pokemons').on('click', '.pokemon', function(e) {
    e.preventDefault();
    console.log('click');
    // Show Details
    var pokemonAPI = $(".pokemon__heading", this).attr('href');
    function displayPokemonDetail(data) {

      // img
      var pokis = '<div class="pokemon__img pokemon__img--' + data.id +'"></div>';
      // id
      // Name
      pokis += '<h2><span>#' + data.id + '</span> ' + data.name + '</h2>';

      // weight
      pokis += '<p>';
      pokis += '<strong>Weight: </strong>';
      pokis += data.weight;
      pokis += '</p>';

      // height
      pokis += '<p>';
      pokis += '<strong>Height: </strong>';
      pokis += data.height;
      pokis += '</p>';

      // Base XP
      pokis += '<p>';
      pokis += '<strong>Base XP: </strong>';
      pokis += data.base_experience;
      pokis += '</p>';

      // Types
      pokis += '<p>';
      pokis += '<strong>Types: </strong>';
      if(data.types[0] !== undefined) {
        pokis += '<a class="types types--' + data.types[0].type.name + '" href="' + data.types[0].type.url + '">';
        pokis += data.types[0].type.name;
        pokis += '</a>';
      }
      if(data.types[1] !== undefined) {
        pokis += '<a class="types types--' + data.types[1].type.name + '" href="' + data.types[1].type.url + '">';
        pokis += data.types[1].type.name;
        pokis += '</a>';
      }
      pokis += '</p>';

      // Moves
      pokis += '<p>';
      pokis += '<strong>Moves: </strong>';
      for(var i = 0; i<data.moves.length; i++) {
        pokis += '<a class="moves" href="' + data.moves[i].move.url + '">';
        pokis += data.moves[i].move.name;
        pokis += '</a>';
      }
      pokis += '</p>';

      // pokis += '<p><strong>Abilities: </strong>';
      // pokis += '<a class="abilities ' +  + '" href="' + data.abilities[0].ability.url + '">' + data.abilities[0].ability.name + '</a>';
      // pokis += '<a class="abilities ' +  + '" href="' + data.abilities[1].ability.url + '">' + data.abilities[1].ability.name + '</a>';
      // pokis += '</p>';

      // Stats
      pokis += '<p><h3>Stats: </h3>';
      for(var i = 0; i<data.stats.length; i++) {
        pokis += '<div class="stats__item">';
        pokis += '<a href="' + data.stats[i].stat.url + '" class="">';
        pokis += data.stats[i].stat.name;
        pokis += '</a>';
        pokis += '<span>' + data.stats[i].base_stat + '</span>'
        pokis += '<div class="stats__status" style="width:' + (data.stats[i].base_stat / 1.8) + '%">';
        pokis += '</div>';
        pokis += '</div>';
      }
      pokis += '</p>';

      $('#modalContent').html(pokis);
    }
    $.getJSON(pokemonAPI, pokemonOptions, displayPokemonDetail);

    // Display modal
    $('#modal').show();
  });

  $('#modalContent').on('click', '.navigation__button', function(e) {
    e.preventDefault();
    console.log('next');
    $('#modalContent').html('<div class="loading" id="modalLoader"><span class="pokeposition"><i class="ball"></i></span><p>loading...</p></div>');
    var pokemonAPI = $(this).attr('href');
    $.getJSON(pokemonAPI, pokemonOptions, displayPokemonDetail);
  });


  $('#modalClose, #modalBg').click(function() {
    $('#modal').hide();
    $('#modalContent').html('<div class="loading" id="modalLoader"><span class="pokeposition"><i class="ball"></i></span><p>loading...</p></div>');
  });

});
