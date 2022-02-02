// const postId = document.querySelector('input[name="post-id"]').value;

const postId = location.pathname.split("/")[3];

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-body"]').value;

  // console.log(postTitle);
  // console.log(postContent);

  const response = await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to update your post');
  }
  document.location.replace('/profile');
};


document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);








const showEditPost = () => {

  document.querySelector('#edit-post-form').classList.remove('hide')
}

document
  .querySelector('#edit-btn')
  .addEventListener('click', showEditPost);