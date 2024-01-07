import React from 'react'
import { LibraryAddCheck, LocalShipping, AccountBalance } from '@material-ui/icons'
import { Stepper, StepLabel, Step,Typography } from '@material-ui/core'
const CheckOutSteps = ({activeState}) => {
    //steps
    const steps = [
        {
            label: <Typography>shipping Details</Typography>,
            icon: <LocalShipping></LocalShipping>
        },
        {
            label: <Typography>confirm Order</Typography>,
            icon: <LibraryAddCheck></LibraryAddCheck>
        },
        {
            label: <Typography>payment</Typography>,
            icon: <AccountBalance></AccountBalance>
        }
    ];
    
   return <>
        <Stepper alternativeLabel activeStep={activeState}>{
    steps.map((item,index)=>{
      return  <Step key={index} active={activeState===index?true:false} completed={activeState>=index?true:false}><StepLabel className={activeState>=index?'text-pink-300':'text-gray-300'} icon={item.icon}>{item.label}</StepLabel> </Step>
        })}
        </Stepper>
    </>
    
}

export default CheckOutSteps