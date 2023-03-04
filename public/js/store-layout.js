const openItemDetails = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const oid = document.querySelector('#orderId').getAttribute('data-id');
    document.location.replace(`/order/${oid}/item/${id}`);
  }
};

document
  .querySelector('#storeItems')
  .addEventListener('click', openItemDetails);
