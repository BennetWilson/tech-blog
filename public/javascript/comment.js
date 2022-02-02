const post_id = location.pathname.split("/")[3];

console.log(post_id);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
