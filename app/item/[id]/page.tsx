"use client"
import React from 'react'
import {  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, FormControl, Link, OutlinedInput, TextField, Typography, dividerClasses } from '@mui/material';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image'
import logo from '../../logo.png'
import { searchInputStyles } from '../../styles';
import { useGlobalContext } from '@/app/context/cartItems';
import { useEffect, useState } from 'react';
import axios from 'axios'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useRouter } from 'next/navigation';
interface Item {
  name: string,
  price: number,
  image: string,
  _id: string
 }

const item = ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const router = useRouter()
  console.log("params",params.id)
  const {cartItems,setCartItems} = useGlobalContext();
  const [item,setitem] =  useState<Item| null>(null);
  const [addButtonText,setAddButtonText] = useState('Add to Cart')
  useEffect(()=>{
     const fetchData = async() =>
     {
      try{
        const response = await axios.get(`/api/item?itemId=${params.id}`)
        console.log("response",JSON.stringify(response.data))
        console.log("respnse.data.item",JSON.stringify(response.data.item))
        setitem(response.data.item)
      }
      catch(error)
      {
        console.log(error)
        throw error
      }
     }
     fetchData()
  },[])

 const onbuttonClick = () => {
  if(addButtonText === 'Go to Cart')
  {
     router.push(`/checkout/cart`)
  }
  else if(item){
    setCartItems([...cartItems,item])
    setAddButtonText('Go to Cart')
  }
 
  }
  return (
    <div>
        <div className='container mx-auto px-24 flex py-7'>
       <div className='flex flex-row'>
       <Image className='basis-1/4 md:basis-1/3' src={logo} alt='/' height={70}/>
       <div className='basis-1/4 md:basis-1/3 px-16'>
       <form  >
         <FormControl sx={{width:'60ch'}} className='flex resize-x'>
          <OutlinedInput placeholder='Search for items...' className='px-2 flex-auto' sx={searchInputStyles}/>
         </FormControl>
       </form>
       </div>  
       <div className='p-5 '>
        {(cartItems.length)? <div className='ml-3 mt-1' style={{position:'absolute',top:'33px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'yellowgreen',borderRadius:'50%',width:'20px',height:'20px',textAlign:'center',fontSize:'12px',fontWeight:'bold',color:'#062e2a'}} >
        {cartItems.length}
        </div> :<></>}
       
        <div style={{cursor:"pointer"}} onClick={()=>router.push('/checkout/cart')}>
        <ShoppingCartOutlinedIcon/> 
          </div> 
     
       </div>
       <div className='p-5'>
        <AccountCircleOutlinedIcon/>
       </div>
       </div>     
      </div>
      <Divider/>
      <div className='container mx-auto px-24 flex p-3 font-bold' >
        <Link href='/' color='#062E2A' className='px-3' style={{textDecoration:"none"}}>Home</Link>
        <Link href='/shope' color='#062E2A'className='px-3' style={{textDecoration:"none"}}>Shop</Link>
        <Link href='/' color='#062E2A' className='px-3'style={{textDecoration:"none"}}>Collections</Link>
        <Link href='/' color='#062E2A' className='px-3'style={{textDecoration:"none"}}>Pots</Link>
        <Link href='/' color='#062E2A'className='px-3'style={{textDecoration:"none"}}>Vases</Link>
        <Link href='/' color='#062E2A' className='px-3'style={{textDecoration:"none"}}>BathroomWare</Link>
        <div className='px-20'>
         <HeadphonesOutlinedIcon ></HeadphonesOutlinedIcon>
         <span className='nav-link text-yellow-500'> +91-9328837099</span>
        </div> 
      </div>
      <Divider/>
      <div className='container mx-auto px-40 py-6' >
      {(item)?
       <div style={{display:'flex'}}>
        <div style={{display:'flex',flexWrap:'wrap'}}>
            <Card sx={{ maxWidth: 420 }} variant="outlined" >

          <CardMedia
            sx={{ height: 390 }} >
          <Image src={`${item.image}`} alt={'/'}  className='m-4'  width="385"
          height="100"/>
          </CardMedia>
          <CardContent >
            <CardActions>
              <Button style={{display:'flex',  alignItems:'center',justifyContent:'center'}} color='success' variant='outlined'  onClick={onbuttonClick}><ShoppingCartCheckoutOutlinedIcon/> {`${addButtonText}`}</Button>
            </CardActions>   
          </CardContent>  
   
          </Card>
          </div>
      <div>
        <div>
        <Card variant="outlined" sx={{maxWidth:500}} className='mx-7'>
        <CardContent>
        <Typography variant="button" component="div" color="text.secondary" className='pl-4'fontWeight='demi' fontSize='18px'>
            {`${item.name}`}
            </Typography>  
            <Typography variant="button" component="div" className='pl-4 pt-2' fontSize='32px'>
              MRP ₹{`${item.price}`}
            </Typography>
          <div className='ml-2' style={{background:'rgb(248, 248, 255',color:'rgb(97, 97, 115)',borderRadius:'48px',display:'inline-flex',padding:'4px 8px'}}>
            Free Delivery
          </div>
        </CardContent>
      </Card>
        </div>
        <div>
      <Card variant="outlined" sx={{maxWidth:500}} className='mx-7 mt-3'>
        <CardContent>
        <Typography component="div" className='pl-4 pt-2' fontSize='25px'>
              Product Details
            </Typography>
            <Typography className='pl-4 pt-2'>{`Name : ${item.name}`}</Typography>
          <Typography className='pl-4 pt-2'>Description of the item : This item is made of ceramic so it is use of all the type of food you want to serve it is also fancy in design so you can be like this item</Typography>
        </CardContent>
      </Card>
      </div>
   
      </div>
      </div>
     
              :<div>
              Item not found
              </div>
        }
      </div>
    </div>
  )
}

export default item
