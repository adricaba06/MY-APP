import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopUp, { popUpProps } from '../src/app/components/popUp';

const mockProps: popUpProps = {
    isVisible: true,
    children: <div>Test Child</div>
};


describe('PopUp', () =>{

    it('it renders with children', ()=>{
        render(<PopUp {...mockProps }></PopUp>);
        const PopUpElement = screen.getByTestId('pop');
        expect(PopUpElement).toBeInTheDocument();
        expect(PopUpElement).toHaveClass('popup-visible');
    });

    //ahora pruebo si cuando es falso se cambie y no se ve
    it('it disapear when isVisible is false', ()=>{
        render(<PopUp isVisible={false}>
            <p>contenido</p>
        </PopUp>);
        const PopUpElement = screen.getByTestId('pop');
        expect(PopUpElement).toHaveClass('popup-invisible');
    });

});