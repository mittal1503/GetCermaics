"use client"
import {  Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Link, OutlinedInput, TextField, Typography, dividerClasses } from '@mui/material';
import logo from './logo.png'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Image from 'next/image'
import { searchInputStyles } from './styles';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios'

const label = {inputProps: { 'aria-label': 'Checkbox demo' }};
const num = [1]
const id = 1

interface Item {
 name: string,
 price: number,
 image: string
}

export default function Home() {

  const [itemss,setItems] = useState<Item[]>([])

  useEffect(()=>{

    const fetchData = async() =>
    {
        try{
          const response = await axios.get('/api/home');
          console.log("response: " +  JSON.stringify(response.data))
          setItems(response.data)
        }
        catch(error){
          console.log(error);
          throw error
        }

    }
    fetchData()
  },[])

  return (
    <main>
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
       <div className='p-5'>
       <ShoppingCartOutlinedIcon/> 
       </div>
       <div className='p-5'>
        <AccountCircleOutlinedIcon/>
       </div>
       </div>     
      </div>

      <Divider/>
      <div className='container mx-auto px-24 flex  p-3 font-bold' >
        
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

      <div className="container mx-auto px-24 grid grid-cols-4 gap-8 p-12">
        {
          itemss?.map((item)=>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 290 }}
            title="green iguana"
          >
         <Image src={`${item.image}`} alt={''}  className='m-4'  width="280"
          height="100"/>
          </CardMedia>

          <CardContent>
            <Typography variant="button" component="div" color="text.primary" className='pl-4'>
             {`${item.name}`}
            </Typography>  
     
            <Typography variant="button" component="div" color='GrayText' className='pl-4 pt-3' fontSize={18}>
               MRP ₹{`${item.price}`}
            </Typography>

            <CardActions>
              <Button className=''>Add to <ShoppingCartCheckoutOutlinedIcon/></Button>
            </CardActions>
     
          </CardContent>  
        </Card>
          )
        }
</div>
    </main>
  )
}
