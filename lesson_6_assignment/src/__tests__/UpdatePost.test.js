import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdatePost from '../components/UpdatePost';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => 
            Promise.resolve({ 
                id: 101, 
                title: 'foo', 
                body: 'barr', 
                userId: 1
            }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});
// Task 7
describe('Update Post Component', () => {
    test('post is updated after the update button is clicked', async () => {
        render(<UpdatePost />);
        
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'foo' }})
        fireEvent.change(screen.getByLabelText(/Body/i), { target: { value: 'barr' }});

        fireEvent.click(screen.getByText(/Update Post/i));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/101`, {
            method: 'PUT',
            body: JSON.stringify({ title: 'foo', body: 'barr', userId: 1 }),
            headers: {
                'Content Type': 'application/json; charset=UTF-8',
            }
        })
    })
})