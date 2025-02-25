import React, { useState } from 'react'

export interface popUpProps{
    isVisible: boolean;
    children: React.ReactNode; //Los componentes se pasan de esta forma, tener en cuenta
    
}

export default function PopUp({children, isVisible}: popUpProps){

  return (
    <div className={ isVisible? 'popup-visible popup'  : 'popup-invisible'} data-testid="pop">
        {children} {} 
       
    </div>
  )
}
