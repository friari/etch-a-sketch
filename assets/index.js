const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');

let rowsValue = 50;
let columnsValue = 50;

for (let rowItem = 0; rowItem < rowsValue; rowItem++) {
  for (let colItem = 0; colItem < columnsValue; colItem++) {
    let gridItem = initGridItem();
    container.appendChild(gridItem);
  }
}

function initGridItem() {
  let gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.addEventListener('mouseenter', () => {
    gridItem.classList.add('active');
    gridItem.style.backgroundColor = "black";
  });
  
  gridItem.addEventListener('mouseleave', () => {
    setTimeout(() => {
      gridItem.classList.remove('active');
      gridItem.style.backgroundColor = null;
    }, 3000);
  });

  return gridItem;
}

container.style.gridTemplateRows = `repeat(${rowsValue}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${columnsValue}, 1fr)`;

body.appendChild(container);