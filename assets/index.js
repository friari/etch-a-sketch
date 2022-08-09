const body = document.querySelector('body');

const outerContainer = document.createElement('div');
outerContainer.classList.add('outerContainer');

const container = document.createElement('div');
container.classList.add('container');

const redrawBtn = document.createElement('button');
redrawBtn.classList.add('btn', 'btn--redraw');
redrawBtn.innerText = 'Change grid size';

function initGridItem() {
  let gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.addEventListener('mouseenter', () => {
    gridItem.classList.add('active');
    gridItem.style.backgroundColor = "black";
  });

  return gridItem;
}

function resetGridItems() {
  const activeGridItems = document.getElementsByClassName('active');

  activeGridItems.forEach(gridItem => {
    gridItem.classList.remove('active');
  });
}

function redrawContainer() {
  // removing container if it exists
  let oldContainer = document.querySelector('.container');
  if (oldContainer) {
    oldContainer.remove();
  }

  // creating new container and returning
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
}

function createGrid(amount = 16) {
  let container = redrawContainer();

  for (let rowItem = 0; rowItem < amount; rowItem++) {
    for (let colItem = 0; colItem < amount; colItem++) {
      let gridItem = initGridItem();
      container.appendChild(gridItem);
    }
  }

  container.style.gridTemplateRows = `repeat(${amount}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${amount}, 1fr)`;
  outerContainer.appendChild(container);
}

function sendUserPrompt() {
  let userPrompt = prompt("What size grid would you like? Number represents rows and columns.", "16");
  let userPromptAmount = Math.floor(parseInt(userPrompt));

  if (!userPromptAmount || userPromptAmount > 100 || userPromptAmount < 0) {
    alert("Sorry, you need to enter a positive numerical value no greater than 100. Please try again!");
    userPromptAmount = sendUserPrompt();
  }

  return userPromptAmount;
}

function onRedrawBtnClick() {
  let gridAmount = sendUserPrompt();

  createGrid(gridAmount);
}

// Event Listeners
redrawBtn.addEventListener('click', onRedrawBtnClick)

outerContainer.appendChild(redrawBtn);

createGrid();

body.appendChild(outerContainer);