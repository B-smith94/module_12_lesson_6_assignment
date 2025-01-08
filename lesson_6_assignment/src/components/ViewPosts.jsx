// Task 1
import React from "react";
const ViewPosts = () => {
    const fetchPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
         .then((response) => response.json())
         .then((json) => console.log(json));
        
    };

    fetchPosts();
}

export default ViewPosts;