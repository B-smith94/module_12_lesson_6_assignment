import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeletePost from '../components/DeletePost';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ id: 101, title: 'foo', body: 'bar', userId: 1})
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('DeletePost Component', () => {
    test('Selected Post is deleted after the delete operaton', async () => {
        render(<DeletePost />);
        await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/101', {
            method: 'DELETE',
        }));
    });
});
