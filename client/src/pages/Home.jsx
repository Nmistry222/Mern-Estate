import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';


SwiperCore.use([Navigation]);


export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  SwiperCore.use([Navigation]);


  useEffect(() => {
    const fetchOfferListings = async () => {
        try {
          const res = await fetch('/api/listing/get?offer=true&limit=4');
          const data = await res.json();
          setOfferListings(data);

          fetchRentListings();
        

 
        } catch {
          console.log(error)
        }
    }

    const fetchRentListings = async () => {

      try {
  
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchsaleListings();
  
      }
  
      catch {
        console.log(error);
  
      }
  
    }


  
    const fetchsaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      }
  
      catch {
        console.log(error);
  
      }
    };
  
    fetchOfferListings();

    
    
  }, []);

  
  
  
 

  

  
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 max-w6-xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
            Find your next <span className='text-slate-500'>perfect</span> 
            <br/>
            place with ease
          </h1>
          <div className='text-gray-700 text-md sm:text-sm'>
            This website is the best palce to find your perfect place to live.
            <br />
            We have a wide range of properties to choose form.
          </div>
          <Link to={'/search'} className='text-sm sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started...
          
          </Link>

      </div>



      {/* swiper */}
      <Swiper navigation>
  {offerListings &&
    offerListings.length > 0 &&
    offerListings.map((listing) => (
      <SwiperSlide key={listing._id}>
        <div
          style={{
            background: `url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          className='h-[500px]'
        ></div>
      </SwiperSlide>
    ))}
</Swiper>


<div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
  <div className='my-3'>
    <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
    <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
  </div>
  <div className='flex flex-wrap gap-5'>
    {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
      <ListingItem key={listing._id} listings={listing} />
    ))}
  </div>

  <div className='my-3'>
    <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Sale</h2>
    <Link className='text-sm text-blue-800 hover:underline' to={'/search?sale=true'}>Show more places for sale</Link>
  </div>
  <div className='flex flex-wrap gap-5'>
    {saleListings && saleListings.length > 0 && saleListings.map((listing) => (
      <ListingItem key={listing._id} listings={listing} />
    ))}
  </div>

  <div className='my-3'>
    <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
    <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for rent</Link>
  </div>
  <div className='flex flex-wrap gap-5'>
    {rentListings && rentListings.length > 0 && rentListings.map((listing) => (
      <ListingItem key={listing._id} listings={listing} />
    ))}
  </div>
</div>



</div>

      

  
  )
}

