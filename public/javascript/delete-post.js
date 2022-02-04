
const deletePostClickHandler = async (event) => {
  const post_id = event.target.getAttribute('data-id')
    await fetch(`/api/post/${post_id}`, {
      method: 'DELETE'
    });
    location.reload()
  };
var redButton = document
.querySelectorAll('.delete-btn-red')

  for (let i = 0; i < redButton.length; i++) {
    redButton[i].addEventListener('click', deletePostClickHandler);
  }
  
    