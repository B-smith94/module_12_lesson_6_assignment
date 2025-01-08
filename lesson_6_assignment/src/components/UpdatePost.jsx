// Task 2
import React, { useState } from 'react';

const UpdatePost = () => {
    const [title, setTItle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            body,
        };
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/101', {
                method: 'PUT',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application-json; charset=UTF-8',
                },
            });
            const data = await response.json();
            console.log(data);
            // Handle success (e.g., display a message, clear form, etc.
        } catch (error) {
            console.error('Error posting data:', error);
            // Handle error (e.g., display error message)
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id='title' value={title} onChange={(e) => setTItle(e.target.value)} />

            <label htmlFor="body">Body:</label>
            <input type="text" id="body" value={body} onChange={(e) => setBody(e.target.value)} />

            <button type='submit'>Submit Post</button>
        </form>
    )
}

export default UpdatePost;