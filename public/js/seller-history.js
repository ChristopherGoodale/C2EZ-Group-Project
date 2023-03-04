const myOrders = async (event) => {
  event.preventDefault();
  document.location.replace(`/sellerorders/`);
};

const viewInventory = async (event) => {
  event.preventDefault();
  document.location.replace(`/items`);
};

const seeBuyers = async (event) => {
  event.preventDefault();
  document.location.replace(`/purchasers`);
};

document.querySelector('#buyersBtn').addEventListener('click', seeBuyers);

document.querySelector('#myOrdersButton').addEventListener('click', myOrders);
document
  .querySelector('#inventoryButton')
  .addEventListener('click', viewInventory);
