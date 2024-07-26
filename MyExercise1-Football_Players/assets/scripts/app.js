const add = document.getElementById("addBtn");
const reset = document.getElementById("resetBtn");
const remove = document.getElementById("removeBtn");
const userInputs = document.querySelectorAll("input");
const listRoot = document.getElementById("playerList");
const defaultText = document.getElementById("defaultText");

const players = [];

// CLEAR INPUTS FUNCTION
const resetHandler = () => {
  for (const item of userInputs) {
    item.value = "";
  }
};
console.log(`Player count is ${players.length}`);
// UPDATING LIST UI
const updateUI = () => {
  if (players.length < 1) {
    defaultText.className = "text-center my-16";
  } else {
    defaultText.className = "hidden";
  }
};

// ADDING FUNCTION
const addHandler = () => {
  const nameValue = userInputs[0].value;
  const pictureUrl = userInputs[1].value;
  const clubValue = userInputs[2].value;
  const playerValue = userInputs[3].value;

  if (
    nameValue.trim() === "" ||
    pictureUrl.trim() === "" ||
    clubValue.trim() === "" ||
    playerValue < 1
  ) {
    alert("Invalid input values!");
    return;
  }
  const newPlayer = {
    id: Math.random().toString(),
    name: nameValue,
    picture: pictureUrl,
    club: clubValue,
    value: playerValue,
  };

  players.push(newPlayer);

  renderNewPlayer(
    newPlayer.name,
    newPlayer.picture,
    newPlayer.club,
    newPlayer.value
  );
  updateUI();

  resetHandler();
};

// REMOVING FUNCTION
const removeHandler = () => {
  alert("remove");
};

// RENDERING PLAYER LIST FUNCTION
const renderNewPlayer = (name, picture, club, value) => {
  const newPlayer = document.createElement("li");
  newPlayer.className = "rounded-lg overflow-hidden";
  newPlayer.innerHTML = `
    <div class="h-24 flex">
      <img class="h-full bg-white"
        src="${picture}" alt="">
      <div class="relative p-1 pl-4 w-full bg-gradient-to-tl from-[#a44d01] to-[#e99331] hover:to-white">
        <h2 class="font-bold text-2xl">${name}</h2>
        <p class="font-semibold text-lg">${club}</p>
        <p>${value} mil. €</p>
        <button
          class="absolute right-4 bottom-3 bg-gray-300 py-1 px-3 text-sm rounded-full border-2 border-gray-600 text-gray-800 hover:bg-gray-600 hover:text-white active:scale-95 shadow-lg"
          id="removeBtn">Remove</button>
      </div>
    </div>
  `;

  listRoot.append(newPlayer);
};

add.addEventListener("click", addHandler);
reset.addEventListener("click", resetHandler);
remove.addEventListener("click", removeHandler);
