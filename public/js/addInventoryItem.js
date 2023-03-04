var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'drlulo3bd',
    uploadPreset: 'pos_images',
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      document
        .querySelector('#item_image')
        .setAttribute('data-id', result.info.secure_url);
    }
  }
);

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);

const addInventoryItemBtn = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const item_name = document.querySelector('#item_name').value.trim();
  const item_description = document
    .querySelector('#item_description')
    .value.trim();
  const item_image = document
    .querySelector('#item_image')
    .getAttribute('data-id');
  const item_price = parseInt(document.querySelector('#item_price').value);
  const quantity_instock = parseInt(
    document.querySelector('#quantity_instock').value
  );

  if (item_name && item_description && item_price && quantity_instock) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/items/', {
      method: 'POST',
      body: JSON.stringify({
        item_name,
        item_description,
        item_image,
        item_price,
        quantity_instock,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/items');
    } else {
      alert('Failed to add item');
    }
  }
};

document
  .querySelector('#addToInventoryBtn')
  .addEventListener('click', addInventoryItemBtn);
