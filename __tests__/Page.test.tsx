import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

describe('Home', ()=> {
    it('renders correctly', ()=>{
        render(<Home></Home>);
        const newTask = screen.getByText('New Task');
        const deleteTask = screen.getByText('Delete Task');
        expect(deleteTask).toBeInTheDocument();
        expect(newTask).toBeInTheDocument();
    });
});