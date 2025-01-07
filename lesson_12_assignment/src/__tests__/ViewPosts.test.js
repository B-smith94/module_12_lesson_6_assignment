import React from 'react';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewPosts from '../components/ViewPosts';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ id: 101, title: 'foo', body: 'bar', userId: 1})
    })
);

beforeEach(() => {
    fetch.mockClear();
});
// Task 5
describe('ViewPosts Component', async () => {
    test('all posts are rendered after running the fetch function', async () => {
        render(<ViewPosts />);
        
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://https://jsonplaceholder.typicode.com/posts')
        });
    });
// Task 8
    test('selected post is deleted after running the delete function', async () => {
        render(<ViewPosts />)

        fireEvent.click(getByText(/Delete/i));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/101', {
            method: 'DELETE'
        });
    });
});