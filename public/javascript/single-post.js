let id = location.pathname.split("/")[2]
console.log(id);
async function init(event) {
    event.preventDefault();
const response = await fetch(`/api/posts/:${id}`, {
    method: 'GET',
    where: {
      id: req.params.id
    }
     });

  if (response.ok) {
    document.location.replace('/single-post');
  } else {
    alert(response.statusText);
  }
}



document
.querySelector('#singlePost')
.addEventListener('post.id', init());