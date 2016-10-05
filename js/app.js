$(document).ready(function() {
  // get all Pokemons from Red Edition
  var pokemonAPI = "http://pokeapi.co/api/v2/pokedex/2/";
  var pokemonOptions = {};
  function displayPokemons(data) {
    console.log( "success" );
    var pokis = '<ol>';
      $.each(data.pokemon_entries,function(i,pokemon) {
        pokis += '<li class="pokemon">';
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


  // get images from flickr


  // on click on a pokemon show details in a modal
  var abilitieStatus1 = '';
  var abilitieStatus2 = '';
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
      // // flavor text entries
      // pokis += '<p>';
      // pokis += flavorTextEntry;
      // console.log(flavorTextEntry);
      // pokis += '</p>';
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

      // // Habitat
      // pokis += '<p><strong>';
      // pokis += 'Habitat: ';
      // pokis += '</strong>';
      // pokis += '<a href="' + habitatUrl + '" class="">';
      // pokis += habitatName + '</a></p>';

      // // Color
      // pokis += '<p><strong>Color: </strong>';
      // pokis += '<a href="' + colorUrl + '" class="">';
      // pokis += colorName + '</a></p>';

      // // Shape
      // pokis += '<p><strong>Shape: </strong>';
      // pokis += '<a href="' + shapeUrl + '" class="">';
      // pokis += shapeName + '</a></p>';

      // Abilities
      // if(data.abilities[0].is_hidden === true){abilitieStatus1 = 'hidden';}
      // if(data.abilities[1].is_hidden === true){abilitieStatus2 = 'hidden';}
      pokis += '<p><strong>Abilities: </strong>';
      pokis += '<a class="abilities ' +  + '" href="' + data.abilities[0].ability.url + '">' + data.abilities[0].ability.name + '</a>';
      pokis += '<a class="abilities ' +  + '" href="' + data.abilities[1].ability.url + '">' + data.abilities[1].ability.name + '</a>';
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

      // Base Happiness
      // pokis += '<p><strong>Base Happiness: </strong>';
      // pokis += data.base_happiness + '</p>';
      // Growth Rate
      // pokis += '<p><strong>Growth Rate: </strong>';
      // pokis += '<a href="' + data.growth_rate.url + '" class="">';
      // pokis += data.growth_rate.name + '</a></p>';
      // Evolves From Species !! IF NULL !!
      // pokis += '<p><strong>Evolves From Species: </strong>';
      // if(data.evolves_from_species !== null) {
      //   pokis += '<a href="' + data.evolves_from_species.url + '" class="">';
      //   pokis += data.evolves_from_species.name + '</a></p>';
      // } else {
      //   pokis += 'None</p>';
      // }

      $('#modalContent').html(pokis);
    }
    $.getJSON(pokemonAPI, pokemonOptions, displayPokemonDetail);

    // Display modal
    $('#modal').show();
  });


  $('#modalClose, #modalBg').click(function() {
    $('#modal').hide();
    $('#modalContent').html('<div class="loading" id="modalLoader"><span class="pokeposition"><i class="ball"></i></span><p>loading...</p></div>');
  });

});
