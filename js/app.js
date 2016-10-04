$(document).ready(function() {
  // get all Pokemons from Red Edition
  var pokemonAPI = "http://pokeapi.co/api/v2/pokedex/2/";
  var pokemonOptions = {};
  function displayPokemons(data) {
    var pokis = '<ol>';
      $.each(data.pokemon_entries,function(i,pokemon) {
        pokis += '<li class="pokemon">';
        pokis += '<a href="' + pokemon.pokemon_species.url + '" class="pokemon__heading">';
        pokis += '<span class="pokemon__heading__id">#' + pokemon.entry_number + '</span> ';
        pokis += '<span class="pokemon__heading__name">' + pokemon.pokemon_species.name + '</span></a>';
        pokis += '<a href="' + pokemon.pokemon_species.url + '" class="pokemon__img pokemon__img--' + (i + 1) +'">';
        pokis +=  '</a></li>';
      }); // end each
      pokis += '</ol>';
      $('#pokemons').html(pokis);
  }
  $.getJSON(pokemonAPI, pokemonOptions, displayPokemons);

  // get images from flickr


  // on click on a pokemon show details in a modal
  $('#pokemons').on('click', '.pokemon', function(e) {
    e.preventDefault();

    // Show Details
    var pokemonAPI = $(".pokemon__heading", this).attr('href');
    function displayPokemonDetail(data) {
      // img
      var pokis = '<div class="pokemon__img pokemon__img--' + data.id +'"></div>';
      // id
      // Name
      pokis += '<h2><span>#' + data.id + '</span> ' + data.name + '</h2>';
      // flavor text entries
      pokis += '<p>';
      pokis += data.flavor_text_entries[(data.flavor_text_entries.length - 1)].flavor_text;
      console.log(data.flavor_text_entries[(data.flavor_text_entries.length - 1)].flavor_text);
      pokis += '</p>';

      // Habitat
      pokis += '<p><strong>';
      pokis += 'Habitat: ';
      pokis += '</strong>';
      pokis += '<a href="' + data.habitat.url + '" class="">';
      pokis += data.habitat.name + '</a></p>';
      // Color
      pokis += '<p><strong>Color: </strong>';
      pokis += '<a href="' + data.color.url + '" class="">';
      pokis += data.color.name + '</a></p>';
      // Shape
      pokis += '<p><strong>Shape: </strong>';
      pokis += '<a href="' + data.shape.url + '" class="">';
      pokis += data.shape.name + '</a></p>';
      // Base Happiness
      pokis += '<p><strong>Base Happiness: </strong>';
      pokis += data.base_happiness + '</p>';
      // Growth Rate
      pokis += '<p><strong>Growth Rate: </strong>';
      pokis += '<a href="' + data.growth_rate.url + '" class="">';
      pokis += data.growth_rate.name + '</a></p>';
      // Evolves From Species !! IF NULL !!
      pokis += '<p><strong>Evolves From Species: </strong>';
      if(data.evolves_from_species !== null) {
        pokis += '<a href="' + data.evolves_from_species.url + '" class="">';
        pokis += data.evolves_from_species.name + '</a></p>';
      } else {
        pokis += 'None</p>';
      }

      $('#modalContent').html(pokis);
    }
    $.getJSON(pokemonAPI, pokemonOptions, displayPokemonDetail);

    // Display modal
    $('#modal').show();
  });


  $('#modalClose, #modalBg').click(function() {
    $('#modal').hide();
  });

});
