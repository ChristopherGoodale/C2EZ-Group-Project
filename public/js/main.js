const newCart = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/orders/`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const cart = await response.json();
    document.location.replace(`/store/${cart.id}`);
  } else {
    alert('Failed to create new Cart!');
  }
};

document.querySelector('#newCart').addEventListener('click', newCart);
