
const deletePostClickHandler = async (event) => {
  const post_id = event.target.getAttribute('data-id')
    await fetch(`/api/post/${post_id}`, {
      method: 'DELETE'
    });
    location.reload()
  };
  document
    .querySelector('#delete-btn-red')
    .addEventListener('click', deletePostClickHandler);