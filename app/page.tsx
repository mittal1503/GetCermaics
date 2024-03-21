"use client"
import {  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, FormControl, Link, OutlinedInput, TextField, Typography, dividerClasses } from '@mui/material';
import logo from './logo.png'
import Image from 'next/image'
import { searchInputStyles } from './styles';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useGlobalContext } from './context/cartItems';
const label = {inputProps: { 'aria-label': 'Checkbox demo' }};
const num = [1]
const id = 1


interface Item {
 name: string,
 price: number,
 image: string,
 _id: string
}

export default function Home() {
  const {cartItems,setCartItems} = useGlobalContext();

  const router = useRouter();
  const [itemss,setItems] = useState<Item[]>([])
  const [count,setCount] = useState(0);
  useEffect(()=>{
    var countObj = {
      'items':count
    }
    console.log("useeffect of ls callled")
    localStorage.setItem("items",JSON.stringify(count))
   
  }
  ,[setCount]
  )
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
  console.log("cartItems===>>>",cartItems)
  console.log("itemss===>>>",itemss)
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
          <Card sx={{ maxWidth: 345 }}  onClick={()=> router.push(`item/${item._id}`)} >
            <CardActionArea>
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

            {/* <CardActions>
              <Button className='' onClick={()=> setCartItems([...cartItems,item])}>Add to <ShoppingCartCheckoutOutlinedIcon/></Button>
            </CardActions>   */}

          </CardContent>  
          </CardActionArea>
        </Card>
          )
        }
</div>
    </main>
  )
}
