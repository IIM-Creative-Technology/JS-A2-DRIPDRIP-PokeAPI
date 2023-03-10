const numberOfPokemonsToDisplay = 10;
let currentUrl;

function filterPokemon() {
    // Récupérer la valeur sélectionnée
    const selectedType = document.getElementById("type").value;
    let pokemonList = [];
    if (selectedType === 'all') {
        // Utiliser l'API PokeAPI pour récupérer les informations des 10 premiers pokemons
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemonsToDisplay}`)
            .then(response => response.json())
            .then(data => {
                const pokemons = data.results;
                pokemonList = pokemons.map(pokemon => {
                    return fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            console.log(pokemonData)
                            pokemonData['types'].forEach(type => {
                                console.log(type.type.url)
                                fetch(type.type.url)
                                    .then(res => res.json())
                                    .then(typeData => {
                                        console.log(typeData.name)
                                        pokemonContainer.addEventListener('mouseover', (event) => {
                                            if (typeData.name === "fire") {
                                                pokemonContainer.style.background = "orangered";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"
                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "water") {
                                                pokemonContainer.style.background = "blue";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "grass") {
                                                pokemonContainer.style.background = "green";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "bug") {
                                                pokemonContainer.style.background = "#bc6c25";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                        });
                                    })
                            })
                            // Créer la div conteneur pour chaque élément <li>
                            const pokemonContainer = document.createElement('div');
                            pokemonContainer.classList.add('pokemon-card');
                            // Créer l'élément <li> pour chaque pokemon
                            const pokemonElement = document.createElement('li');
                            pokemonElement.style.listStyle = "none"
                            const nameElement = document.createElement('p');
                            nameElement.style.fontSize = "20px"
                            const imageElement = document.createElement('img');
                            const seeMoreButton = document.createElement('button');
                            seeMoreButton.classList = "pokemon-button";
                            const shinyBtn = document.createElement("button");
                            shinyBtn.classList = "pokemon-button";
                            shinyBtn.innerHTML = "shiny";
                            shinyBtn.addEventListener("click", () => {
                                currentUrl = currentUrl === pokemonData.sprites.front_default ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default;
                                imageElement.src = currentUrl;
                            });
                            seeMoreButton.textContent = "Voir plus";
                            seeMoreButton.addEventListener('click', () => {
                                document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`;
                            });
                            nameElement.textContent = pokemonData.name;
                            imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                            imageElement.alt = pokemonData.name;
                            pokemonElement.appendChild(nameElement);
                            pokemonElement.appendChild(imageElement);
                            pokemonElement.appendChild(seeMoreButton);
                            pokemonElement.appendChild(shinyBtn);
                            // Ajouter l'élément <li> à la div conteneur
                            pokemonContainer.appendChild(pokemonElement);
                            return pokemonContainer;
                        });
                });
                // Attendre que toutes les requêtes soient terminées
                Promise.all(pokemonList).then(pokemonContainers => {
                    // Ajouter la liste des pokemons à l'élement "pokemon-list"
                    const pokemonListElement = document.getElementById('pokemon-list');
                    // Supprimer les enfants actuels
                    while (pokemonListElement.firstChild) {
                        pokemonListElement.removeChild(pokemonListElement.firstChild);
                    }
                    pokemonContainers.forEach(pokemonContainer => {
                        pokemonListElement.appendChild(pokemonContainer);
                    });
                });
            });
    } else {
        // Utiliser l'API PokeAPI pour récupérer les pokemons du type sélectionné
        fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
            .then(response => response.json())
            .then(data => {
                const pokemons = data.pokemon;
                pokemonList = pokemons.map(pokemon => {
                    return fetch(pokemon.pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            pokemonData['types'].forEach(type => {
                                console.log(type.type.url)
                                fetch(type.type.url)
                                    .then(res => res.json())
                                    .then(typeData => {
                                        console.log(typeData.name)
                                        pokemonContainer.addEventListener('mouseover', (event) => {
                                            if (typeData.name === "fire") {
                                                pokemonContainer.style.background = "orangered";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"
                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "water") {
                                                pokemonContainer.style.background = "blue";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "grass") {
                                                pokemonContainer.style.background = "green";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                            if (typeData.name === "bug") {
                                                pokemonContainer.style.background = "#bc6c25";
                                                pokemonContainer.style.transition = "all .25s ease-in-out"

                                                setTimeout(() => {
                                                    pokemonContainer.style.background = "";
                                                    nameElement.style.color = "";
                                                }, 1000);
                                            }
                                        });
                                    })
                            })
                            // Créer la div conteneur pour chaque élément <li>
                            const pokemonContainer = document.createElement('div');
                            pokemonContainer.classList.add('pokemon-card');
                            // Créer l'élément <li> pour chaque pokemon
                            const pokemonElement = document.createElement('li');
                            const nameElement = document.createElement('p');
                            const imageElement = document.createElement('img');
                            const seeMoreButton = document.createElement('button');
                            const shinyBtn = document.createElement("button");
                            shinyBtn.innerHTML = "shiny";
                            shinyBtn.addEventListener("click", () => {
                                currentUrl = currentUrl === pokemonData.sprites.front_default ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default;
                                imageElement.src = currentUrl;
                            });
                            seeMoreButton.textContent = "Voir plus";
                            seeMoreButton.addEventListener('click', () => {
                                document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`;
                            });

                            nameElement.textContent = pokemonData.name;
                            imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                            imageElement.alt = pokemonData.name;
                            pokemonElement.appendChild(nameElement);
                            pokemonElement.appendChild(imageElement);
                            pokemonElement.appendChild(seeMoreButton);
                            pokemonElement.appendChild(shinyBtn);
                            // Ajouter l'élément <li> à la div conteneur
                            pokemonContainer.appendChild(pokemonElement);
                            return pokemonContainer;
                        });
                });
                // Attendre que toutes les requêtes soient terminées
                Promise.all(pokemonList).then(pokemonContainers => {
                    // Ajouter la liste des pokemons à l'élement "pokemon-list"
                    const pokemonListElement = document.getElementById('pokemon-list');
                    // Supprimer les enfants actuels
                    while (pokemonListElement.firstChild) {
                        pokemonListElement.removeChild(pokemonListElement.firstChild);
                    }
                    pokemonContainers.forEach(pokemonContainer => {
                        pokemonListElement.appendChild(pokemonContainer);
                    });
                });
            });
    }
}


function filterGene() {
    // Récupérer la valeur sélectionnée
    const selectedGeneration = document.getElementById("generation").value;
    let pokemonList = [];
    if (selectedGeneration === 'all') {
        // Utiliser l'API PokeAPI pour récupérer les informations des 10 premiers pokemons
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`).then(response => response.json()).then(data => {
            const pokemons = data.results;
            pokemonList = pokemons.map(pokemon => {
                return fetch(pokemon.url).then(response => response.json()).then(pokemonData => {
                    // Créer la div conteneur pour chaque élément <li>
                    const pokemonContainer = document.createElement('div');
                    pokemonContainer.classList.add('pokemon-card');
                    // Créer l'élément <li> pour chaque pokemon
                    const pokemonElement = document.createElement('li');
                    const nameElement = document.createElement('p');
                    const imageElement = document.createElement('img');
                    const seeMoreButton = document.createElement('button');
                    const shinyBtn = document.createElement("button");
                    shinyBtn.innerHTML = "shiny";
                    shinyBtn.addEventListener("click", () => {
                        currentUrl = currentUrl === pokemonData.sprites.front_default ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default;
                        imageElement.src = currentUrl;
                    });
                    seeMoreButton.textContent = "Voir plus";
                    seeMoreButton.addEventListener('click', () => {
                        document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`;
                    });
                    nameElement.textContent = pokemonData.name;
                    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                    imageElement.alt = pokemonData.name;
                    pokemonElement.appendChild(nameElement);
                    pokemonElement.appendChild(imageElement);
                    pokemonElement.appendChild(seeMoreButton);
                    pokemonElement.appendChild(shinyBtn);
                    // Ajouter l'élément <li> à la div conteneur
                    pokemonContainer.appendChild(pokemonElement);
                    return pokemonContainer;
                });
            });
            // Attendre que toutes les requêtes soient terminées
            Promise.all(pokemonList).then(pokemonContainers => {
                // Ajouter la liste des pokemons à l'élement "pokemon-list"
                const pokemonListElement = document.getElementById('pokemon-list');
                // Supprimer les enfants actuels
                while (pokemonListElement.firstChild) {
                    pokemonListElement.removeChild(pokemonListElement.firstChild);
                }
                pokemonContainers.forEach(pokemonContainer => {
                    pokemonListElement.appendChild(pokemonContainer);
                });
            });
        });
    } else {
        // Utiliser l'API PokeAPI pour récupérer les pokemons de la génération sélectionnée
        fetch(`https://pokeapi.co/api/v2/generation/${selectedGeneration}`).then(response => response.json()).then(data => {
            const pokemons = data.pokemon_species;
            pokemonList = pokemons.map(pokemon => {
                return fetch(pokemon.url).then(response => response.json()).then(pokemonData => {
                    console.log(pokemonData)
                    fetch(pokemonData.color.url)
                        .then(res => res.json())
                        .then(colorData => {
                            console.log(colorData)
                            pokemonContainer.addEventListener('mouseover', (event) => {
                                if (colorData.name === colorData.name) {
                                    pokemonContainer.style.background = colorData.name
                                    nameElement.style.color = colorData.name
                                    pokemonContainer.style.transition = "all .25s ease-in-out"
                                    setTimeout(() => {
                                        pokemonContainer.style.background = "";
                                        nameElement.style.color = "";
                                    }, 1000);
                                }
                                if(colorData.name === "white") {
                                    nameElement.style.color = "black"
                                    setTimeout(() => {
                                        pokemonContainer.style.background = "";
                                        nameElement.style.color = "";
                                    }, 1000);
                                }
                            } )
                        })

                    // Créer la div conteneur pour chaque élément <li>
                    const pokemonContainer = document.createElement('div');
                    pokemonContainer.classList.add('pokemon-card');
                    // Créer l'élément <li> pour chaque pokemon
                    const pokemonElement = document.createElement('li');
                    const nameElement = document.createElement('p');
                    const imageElement = document.createElement('img');
                    const seeMoreButton = document.createElement('button');
                    seeMoreButton.textContent = "Voir plus";
                    seeMoreButton.addEventListener('click', () => {
                        document.location.href=`single.html?pokeId=${pokemonData.id}&pokeName=${pokemonData.name}&pokeImg=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png&pokeWeight=${pokemonData.weight}&pokeHeight=${pokemonData.height}`;
                    });
                    nameElement.textContent = pokemonData.name;
                    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                    imageElement.alt = pokemonData.name;
                    pokemonElement.appendChild(nameElement);
                    pokemonElement.appendChild(imageElement);
                    pokemonElement.appendChild(seeMoreButton);
                    // Ajouter l'élément <li> à la div conteneur
                    pokemonContainer.appendChild(pokemonElement);
                    return pokemonContainer;
                });
            });
            // Attendre que toutes les requêtes soient terminées
            Promise.all(pokemonList).then(pokemonContainers => {
                // Ajouter la liste des pokemons à l'élement "pokemon-list"
                const pokemonListElement = document.getElementById('pokemon-list');
                // Supprimer les enfants actuels
                while (pokemonListElement.firstChild) {
                    pokemonListElement.removeChild(pokemonListElement.firstChild);
                }
                pokemonContainers.forEach(pokemonContainer => {
                    pokemonListElement.appendChild(pokemonContainer);
                });
            });
        });
    }
}

window.onload = function() {
    filterPokemon();
}

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function() {
    const searchValue = searchBar.value;
    console.log(searchValue)

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`).then(response => response.json()).then(data => {
        if(data){
            const pokemonName = data.name;
            const pokemonId = data.id;
            const pokemonWeight = data.weight;
            const pokemonHeight = data.height;
            const pokemonImage = data.sprites.front_default;
            const pokemonListElement = document.getElementById('pokemon-list');
            pokemonListElement.innerHTML = `<p>Name: ${pokemonName}</p>
                                                <p>Id: ${pokemonId}</p>
                                                <p>Weight: ${pokemonWeight}</p>
                                                <p>Height: ${pokemonHeight}</p>
                                                <img src=${pokemonImage}>`
        }else{
            const pokemonListElement = document.getElementById('pokemon-list');
            pokemonListElement.innerHTML = `<p>Pokemon not found</p>`
        }
    });
});