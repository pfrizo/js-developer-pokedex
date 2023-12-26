const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0;

let actualPokemon = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="showPokemonDetails(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function convertPokemonToModal(pokemon){
    return `
        <div class="modal-content">
            <span onclick="closeDetails()" style="float: right; cursor: pointer;">&times;</span>
            <div class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <img src="${pokemon.gif}"
                         alt="${pokemon.name}">
                </div>
            </div>
            <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
        </div>
    `
}

function showPokemonDetails(pokeId){
    pokeApi.getPokemon(pokeId)
        .then((pokemon) => {
            const modal = document.getElementById('modal')
            const newHtml = convertPokemonToModal(pokemon)

            modal.innerHTML = newHtml;

        })
        .then(document.getElementById('modal').style.display = 'flex')
}

function closeDetails(){
    document.getElementById('modal').style.display = 'none';
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const recordsWithNexPage = offset + limit

    if (recordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})