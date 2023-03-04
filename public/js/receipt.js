const payNow = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#buyer_email').value.trim();

  //   //   NEED TO PULL USER ID FROM EMAIL ENTRY
  const requestURL = `/api/users/email/${email}`;
  await fetch(requestURL)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log('no user');
      }
    })
    .then(async function (data) {
      if (data !== undefined) {
        const order_id = document
          .querySelector('.receipt')
          .getAttribute('data-id');
        const order_price = document
          .querySelector('#totalPrice')
          .getAttribute('data-id');
        const payment_method = document.querySelector('#payment_method').value;
        const buyer_id = data.user.id;
        const paid = true;
        const orderComplete = await fetch(`/api/orders/${order_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            order_price,
            payment_method,
            buyer_id,
            paid,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (orderComplete.ok) {
          document.location.replace(`/sellerorders`);
        } else {
          alert('Failed to Process Payment');
        }
      } else {
        document
          .querySelector('#buyerDiv')
          .setAttribute('class', 'form-group block');
        document
          .querySelector('#passwordDiv')
          .setAttribute('class', 'form-group block');
        document
          .querySelector('#buttonDiv')
          .setAttribute('class', 'form-group block');
      }
    });
};
// ------------------------------------------------------------
const addUser = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#buyer_name').value.trim();
  const email = document.querySelector('#buyer_email').value.trim();
  const password = document.querySelector('#buyer_password').value.trim();
  if (name && email && password) {
    const response = await fetch('/api/users/buyer', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document
        .querySelector('#buyerDiv')
        .setAttribute('class', 'form-group hidden');
      document
        .querySelector('#passwordDiv')
        .setAttribute('class', 'form-group hidden');
      document
        .querySelector('#buttonDiv')
        .setAttribute('class', 'form-group hidden');
    } else {
      alert(response.statusText);
    }
  }
};

const saveBtn = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#buyer_email').value.trim();

  //   //   NEED TO PULL USER ID FROM EMAIL ENTRY
  const requestURL = `/api/users/email/${email}`;
  await fetch(requestURL)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log('no user');
      }
    })
    .then(async function (data) {
      if (data !== undefined) {
        const order_id = document
          .querySelector('.receipt')
          .getAttribute('data-id');
        const buyer_id = data.user.id;
        const orderComplete = await fetch(`/api/orders/${order_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            buyer_id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (orderComplete.ok) {
          document.location.replace(`/store/${order_id}`);
        } else {
          alert('Failed to Process Payment');
        }
      } else {
        document
          .querySelector('#buyerDiv')
          .setAttribute('class', 'form-group block');
        document
          .querySelector('#passwordDiv')
          .setAttribute('class', 'form-group block');
        document
          .querySelector('#buttonDiv')
          .setAttribute('class', 'form-group block');
      }
    });
};

document.querySelector('#addUserBtn').addEventListener('click', addUser);

const paidBtn = document.querySelector('#payNowBtn');
if (paidBtn !== null) {
  paidBtn.addEventListener('click', payNow);
  document.querySelector('#saveBtn').addEventListener('click', saveBtn);
}
