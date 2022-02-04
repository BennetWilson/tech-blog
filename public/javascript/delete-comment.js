const deleteCommentClickHandler = async (event) => {
    const comment_id = event.target.getAttribute('data-id')
      await fetch(`/api/comments/${comment_id}`, {
        method: 'DELETE'
      });
      location.reload()
    };
    document
      .querySelector('#del-comment')
      .addEventListener('click', deleteCommentClickHandler);