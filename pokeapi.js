const pkdxQuery = {
  offset: 0,
  limit: 7,
};

const getListOfPokemon = async (isTopSelected) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pkdxQuery.offset}&limit=${pkdxQuery.limit}`
  );
  const data = await response.json();
  const pokemonList = data.results;
  const mainPkdxRightUl = document.createElement("ul");

  pokemonList.forEach((pokemon, index) => {
    const li = document.createElement("li");
    li.textContent = pokemon.name;
    if (isTopSelected) {
      if (index === 0) {
        li.classList.add("selected");
      }
    } else {
      if (index === 6) {
        li.classList.add("selected");
      }
    }
    mainPkdxRightUl.appendChild(li);
  });

  document.querySelector(".main-pkdx-right").innerHTML = "";
  document.querySelector(".main-pkdx-right").appendChild(mainPkdxRightUl);
};

const getPokemonData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

document.querySelector("#leftcross").addEventListener("click", () => {
  console.log("leftcross");
});

document.querySelector("#rightcross").addEventListener("click", () => {
  console.log("rightcross");
});

document.querySelector("#topcross").addEventListener("click", () => {});

document.querySelector("#botcross").addEventListener("click", () => {});

document.querySelector("#bigbluebutton").addEventListener("click", () => {
  console.log("bigbluebutton");
});

document.querySelector("#buttonbottomPicture").addEventListener("click", () => {
  console.log("buttonbottomPicture");
});

// agregar al primer li de #mainScreen-principal la clase selected
document.querySelector("#mainScreen-principal li").classList.add("selected");

// cambiar la clase selected al li que se seleccione con el boton de abajo
document.querySelector("#botcross").addEventListener("click", () => {
  const screenSelected = document.querySelector("div#picture .visible").id;

  switch (screenSelected) {
    case "mainScreen-principal":
      menuBotCrossNavigation();
      break;
    case "mainScreen-pkdx":
      pkdxBotCrossNavigation();
      break;
  }
});

const menuBotCrossNavigation = () => {
  const mainScreenPrincipal = document.querySelector("#mainScreen-principal");
  const selectedLi = mainScreenPrincipal.querySelector(".selected");
  selectedLi.classList.remove("selected");
  if (selectedLi.nextElementSibling) {
    selectedLi.nextElementSibling.classList.add("selected");
  } else {
    mainScreenPrincipal.firstElementChild.classList.add("selected");
  }
};

const pkdxBotCrossNavigation = () => {
  const pokedexList = document.querySelector(".main-pkdx-right ul").children;
  for (let i = 0; i < pokedexList.length; i++) {
    const pokemon = pokedexList[i];
    if (pokemon.classList.contains("selected")) {
      pokemon.classList.remove("selected");
      if (i === pokedexList.length - 1) {
        pkdxQuery.offset += 7;
        getListOfPokemon(true);
      } else {
        pokedexList[i + 1].classList.add("selected");
      }
      break;
    }
  }
};

// cambiar la clase selected al li que se seleccione con el boton de arriba
document.querySelector("#topcross").addEventListener("click", () => {
  const screenSelected = document.querySelector("div#picture .visible").id;

  switch (screenSelected) {
    case "mainScreen-principal":
      menuTopCrossNavigation();
      break;
    case "mainScreen-pkdx":
      pkdxTopCrossNavigation();
      break;
  }
});

const menuTopCrossNavigation = () => {
  const mainScreenPrincipal = document.querySelector("#mainScreen-principal");
  const selectedLi = mainScreenPrincipal.querySelector(".selected");
  selectedLi.classList.remove("selected");
  if (selectedLi.previousElementSibling) {
    selectedLi.previousElementSibling.classList.add("selected");
  } else {
    mainScreenPrincipal.lastElementChild.classList.add("selected");
  }
};

const pkdxTopCrossNavigation = () => {
  const pokedexList = document.querySelector(".main-pkdx-right ul").children;
  for (let i = 0; i < pokedexList.length; i++) {
    const pokemon = pokedexList[i];
    if (pokemon.classList.contains("selected")) {
      if (i === 0) {
        if (pkdxQuery.offset === 0) {
          return;
        }
        pkdxQuery.offset -= 7;
        getListOfPokemon(false);
      } else {
        pokemon.classList.remove("selected");
        pokedexList[i - 1].classList.add("selected");
      }
      break;
    }
  }
};

document.querySelector("#barbutton1").addEventListener("click", () => {
  const screenSelected = document.querySelector(".li-menu.selected").id;
  console.log(screenSelected)
  
  document.querySelector(`#mainScreen-${screenSelected}`).classList.remove("visible");
  document.querySelector("#mainScreen-principal").classList.add("visible");
  
  pkdxQuery.offset = 0;
})

document.querySelector("#barbutton2").addEventListener("click", () => {
  const screenSelected = document.querySelector(".li-menu.selected").id;

  document.querySelector("#mainScreen-principal").classList.remove("visible");
  document.querySelector(`#mainScreen-${screenSelected}`).classList.add("visible");

  switch (screenSelected) {
    case "pkdx":
      getListOfPokemon(true)
      break;
  }
});
