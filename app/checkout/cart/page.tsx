'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../logo.png'
import { Box, Button, Card, CardContent, CardMedia, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useGlobalContext } from '@/app/context/cartItems'
import { Padding } from '@mui/icons-material'
const steps = [
  'Cart',
  'Address',
  'Payment',
  'Summary'
]
const page = () => {
  const {cartItems,setCartItems} = useGlobalContext();
  return (
    <>  
    <div className='container mx-auto flex px-24 py-7'>
       <Image src={logo} alt='/'/>
       <Box sx={{px:30}}>
         <Stepper style={{width:'500px',color:'#062E2A'}} activeStep={0} alternativeLabel>
            {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
        ))}
         </Stepper>
       </Box> 
       </div>
       <Divider/>  
       <div className='container mx-auto flex px-24 py-7'>
        <div className='pl-4'>
            <Typography  component="div" color="text.primary" fontWeight='demi' fontSize='18px'>
                Cart | {`${cartItems.length}`} Item
            </Typography>  
            {
              cartItems.map((item,index)=>
                <Card variant="outlined" sx={{minWidth:530,maxWidth:560,marginTop:'15px', position: 'relative'}} >
                <CardMedia
                  sx={{ height: 30 }} >
                <Image src={`${item.image}`} alt={'/'}  className='m-4'  width="100" height="100"/>
                </CardMedia>
                  <CardContent>
                    <Typography component="div" className='pl-4 pt-2' fontSize='19px'>
                    Product Name <Button color='success'style={{position: 'absolute', top: '8px', right: '8px' }}>Edit</Button>
                  </Typography>
                  <Typography className='pl-4 pt-2'>Price</Typography>
                <Typography className='pl-4 pt-2'>Qty</Typography>
              </CardContent>
            </Card>
              
              )
            }

        </div>
            
            <div>
          
            </div>
            <Divider  orientation='vertical' sx={{width:'5px',height:'600px',paddingLeft:'80px'}}/>
            <div style={{paddingLeft:'3rem'}}>
            <Typography>
            Price Details
            </Typography>
            <div>ewd</div>
            <div>ewd</div>
            </div>
       </div>


    </>
  )
}

export default page
