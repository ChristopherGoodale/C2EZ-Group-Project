const paid = document.querySelector('#payNowBtn');

const addToCart = async (event) => {
  event.preventDefault();
  const item_id = document.querySelector('#item-card').getAttribute('data-id');
  const quantity_purchased = parseInt(
    document.querySelector('#quantity_purchased').value
  );
  const order_id = document.querySelector('#orderId').getAttribute('data-id');
  const response = await fetch(`/api/oi/`, {
    method: 'POST',
    body: JSON.stringify({ item_id, quantity_purchased, order_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/store/${order_id}`);
  } else {
    alert('Failed to add to cart');
  }
};

const backToOrder = async (event) => {
  event.preventDefault();
  const order_id = document.querySelector('#orderId').getAttribute('data-id');
  document.location.replace(`/store/${order_id}`);
};

if (paid !== null) {
  document.querySelector('#atcBtn').addEventListener('click', addToCart);
}
document.querySelector('#backToOrder').addEventListener('click', backToOrder);
