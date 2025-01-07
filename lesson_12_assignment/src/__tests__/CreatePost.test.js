import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePost from '../components/CreatePost';
import { TextDecoder, TextEncoder } from 'util';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ id: 101, title: 'foo', body: 'bar', userId: 1})
    })
);

beforeEach(() => {
    fetch.mockClear();
});
// Task 6
describe('CreatePost Component', () => {
    test('New post is added to the list after the create operation', async () => {
        render(<CreatePost />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'foo' }})
        fireEvent.change(screen.getByLabelText(/Body/i), { target: { value: 'bar' }});
        fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '1' }});

        fireEvent.click(screen.getByText(/Create Post/i));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
            headers: {
                'Content Type': 'application/json; charset-UTF-8',
            }
        })
    })
})