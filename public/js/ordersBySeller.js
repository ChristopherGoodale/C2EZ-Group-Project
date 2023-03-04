const order = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const order_id = event.target.getAttribute('data-id');
    document.location.replace(`/store/${order_id}`);
  }
};

const openOrder = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const openOrder_id = event.target.getAttribute('data-id');
    document.location.replace(`/store/${openOrder_id}`);
  }
};

document.querySelector('#order_id').addEventListener('click', order);
document.querySelector('#openOrder_id').addEventListener('click', openOrder);
