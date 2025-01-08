const DeletePost = () => {
    const deletePost = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/101', {
            method: 'DELETE',
          });          
    };

    deletePost();
}

export default DeletePost;