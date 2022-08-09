const body = document.querySelector('body');

const outerContainer = document.createElement('div');
outerContainer.classList.add('outerContainer');

const btnContainer = document.createElement('div');
btnContainer.classList.add('btnContainer');

const redrawBtn = document.createElement('button');
redrawBtn.classList.add('btn', 'btn--redraw');
redrawBtn.innerText = 'Change grid size';

const clearBtn = document.createElement('button');
clearBtn.classList.add('btn', 'btn--clear');
clearBtn.innerText = 'Clear';

function initGridItem() {
  let gridItem = document.createElement('div');
  resetOpacity(gridItem);

  gridItem.classList.add('grid-item');
  gridItem.addEventListener('mouseenter', () => {
    let opacity = parseFloat(gridItem.getAttribute('data-opacity'));
    console.log(opacity);
    gridItem.classList.add('active');
    if (!(opacity > 10)) {
      gridItem.style.backgroundColor = `rgba(0,0,0,${opacity * 0.1})`;
      gridItem.setAttribute('data-opacity', `${(opacity + 1).toString()}`);
    }
  });

  return gridItem;
}

function clearGrid() {
  const activeGridItems = document.querySelectorAll('.active');

  activeGridItems.forEach(gridItem => {
    gridItem.classList.remove('active');
    gridItem.style.backgroundColor = "";
    resetOpacity(gridItem);
  });
}

function redrawGrid() {
  // removing container if it exists
  let oldGrid = document.querySelector('.grid');
  if (oldGrid) {
    oldGrid.remove();
  }

  // creating new container and returning
  const grid = document.createElement('div');
  grid.classList.add('grid');
  return grid;
}

function createGrid(amount = 16) {
  let grid = redrawGrid();

  for (let rowItem = 0; rowItem < amount; rowItem++) {
    for (let colItem = 0; colItem < amount; colItem++) {
      let gridItem = initGridItem();
      grid.appendChild(gridItem);
    }
  }

  grid.style.gridTemplateRows = `repeat(${amount}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${amount}, 1fr)`;
  outerContainer.appendChild(grid);
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

function onClearBtnClick() {
  clearGrid();
}

// Utility functions
function resetOpacity(gridItem) {
  gridItem.setAttribute('data-opacity', '1');
}

// Event Listeners
redrawBtn.addEventListener('click', onRedrawBtnClick)
clearBtn.addEventListener('click', onClearBtnClick);

btnContainer.appendChild(redrawBtn);
btnContainer.appendChild(clearBtn);

outerContainer.appendChild(btnContainer);

createGrid();

body.appendChild(outerContainer);