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

const updateInventory = async (event) => {
  event.preventDefault();
  const item_id = document.querySelector('#item_id').getAttribute('data-id');
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

  const response = await fetch(`/api/items/${item_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      item_id,
      item_name,
      item_description,
      item_image,
      item_price,
      quantity_instock,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/items`);
  } else {
    alert('Failed to update inventory');
  }
};

document.querySelector('#updateBtn').addEventListener('click', updateInventory);
