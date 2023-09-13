const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button onClick="showPokemonDetails(this.value)" value="${ encodeURIComponent(JSON.stringify(pokemon))}">Detalhes</button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function showPokemonDetails(pokemon){
    let modal = document.getElementById("detailModal");
    let span = document.getElementsByClassName("close")[0];
    pokemon = JSON.parse(decodeURIComponent(pokemon));
    const propList = document.getElementById('detailPokemon');

    //mostra o modal
    modal.style.display = "block";
    propList.innerHTML = convertPropToLi(pokemon);
    
    

    //fecha o modal se clicar no x
    span.onclick = function() {
        modal.style.display = "none";
    }

    //fecha o modal se clicar em qualquer lugar da tela com o modal aberto
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    
}

function convertPropToLi(pokemon) {
    return `
        <div>
            <li>Name: ${pokemon.name}</li>
            <li>Height: ${pokemon.height}</li>
            <li>Weight: ${pokemon.weight}</li>
            <span>Types: </span>
            ${pokemon.types.map((type) => `<li>${type}</li>`).join('')}
            <span>Abilities: </span>
            ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
        </div>
        <div>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        
    `
}