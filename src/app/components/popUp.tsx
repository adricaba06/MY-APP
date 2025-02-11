import React, { useState } from 'react'
import Form from './Form'
import Button from './button';

interface popUpProps{
    isVisible: boolean;
    children: React.ReactNode; //Los componentes se pasan de esta forma, tener en cuenta
    
}

export default function PopUp({children, isVisible}: popUpProps){

  return (
    <div className={ isVisible? 'popup-visible popup'  : 'popup-invisible'}>
        {children} {} 
       
    </div>
  )
}
