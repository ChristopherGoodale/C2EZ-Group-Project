const editItem = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const item_id = event.target.getAttribute('data-id');
    document.location.replace(`/items/${item_id}`);
  }
};

const addItem = async (event) => {
  event.preventDefault();
  document.location.replace(`/additem`);
};

document.querySelector('#itemsDiv').addEventListener('click', editItem);
document
  .querySelector('.add-new-inventory-button')
  .addEventListener('click', addItem);
