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
        <div class="modal-content ${pokemon.type}">
            <span onclick="closeDetails()" style="float: right; cursor: pointer;">&times;</span>
            <div class="pokemon">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <img src="${pokemon.gif}"
                         alt="${pokemon.name}">
                </div>
            </div>
            <div class="stats-section">
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            
                <h4 id="base-stats" class="${pokemon.type}-text">Base Stats</h4>

                <div id="stats">
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">HP</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[0]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[0]}%"></div>
                  </div>
              </div>
          </div>
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">ATK</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[1]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[1]}%"></div>
                  </div>
              </div>
          </div>
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">DEF</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[2]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[2]}%"></div>
                  </div>
              </div>
          </div>
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">SATK</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[3]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[3]}%"></div>
                  </div>
              </div>
          </div>
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">SDEF</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[4]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[4]}%"></div>
                  </div>
              </div>
          </div>
          <div class="stat-row">
              <div class="stat-desc ${pokemon.type}-text">SPD</div>
              <div class="stat-number ${pokemon.type}-text">${pokemon.statsValue[5]}</div>
              <div class="stat-bar">
                  <div class="bar-outer">
                      <div class="bar-inner ${pokemon.type}" style="width: ${pokemon.statsValue[5]}%"></div>
                  </div>
              </div>
                </div>
                </div>
            </div>
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