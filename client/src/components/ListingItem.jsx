import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

function ListingItem({listings}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded'>
     <Link to={`/listing/${listings._id}`}>
       <img src={listings.imageUrls[0]} alt='listing cover' className='sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
     <div className='p-3 flex flex-col gap-2 w-full'>
      <p className='w-[320px] truncate text-lg font-semibold text-slate-700'>{listings.name}</p>
      <div className='flex items-center gap-2'>
        <MdLocationOn className='h-4 w-4 text-green-700'/>
        <p className='text-sm text-gray-700 truncate'>{listings.address}</p>
      </div>
      <p className='text-sm text-gray-700 line-clamp-2'>{listings.description}</p>
      <p className='text-slate-500 mt-2 font-semibold flex items-center'>
        ${listings.offer ? listings.discountPrice.toLocaleString('en-US') : listings.regularPrice.toLocaleString('en-US')}{listings.type === 'rent' && ' / week'}
      </p>
      <div className='text-slate-700 flex flex-row gap-2'>
        <div className='font-bold tex-xs'>
          {listings.bedrooms > 1 ? `${listings.bedrooms} beds` : `${listings.bedrooms} bed`}
        </div>
        <div className='font-bold tex-xs'>
          {listings.bathrooms > 1 ? `${listings.bathrooms} baths` : `${listings.bathrooms} bath`}
        </div>
       

      </div>
      </div>
     </Link>
    </div>
  )
}

export default ListingItem
