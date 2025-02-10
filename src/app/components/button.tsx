import React from 'react';
import Task from './task';
// Definir la interfaz para las props

//Primero vamos a crear una interface que defina las properties del boton

interface ButtonProps {

    children: React.ReactNode; //antes era un String, ahora practicamnete podría colocar cualquier elemento como un svg
    onClick: () => void; //es una funcion por lo cual debo de poner asi la sintaxis
}

//una vez creada la interfaz vamos a declarar el componente y exportarlo por su puesto



export default function Button({children, onClick}:ButtonProps){ //recuerda decir el tipo, TypeScript es titismiquis

    console.log(children)
    return(
        <button onClick={onClick} className='boton'>
            {children} 
        </button>
    );
}

