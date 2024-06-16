import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem'

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBardata, setSideBardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    offer: false,
    furnished: false,
    sort: 'created_at',
    order: 'desc'
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const typeFromUrl = urlParams.get('type') || 'all';
    const parkingFromUrl = urlParams.get('parking') === 'true';
    const furnishedFromUrl = urlParams.get('furnished') === 'true';
    const offerFromUrl = urlParams.get('offer') === 'true';
    const sortFromUrl = urlParams.get('sort') || 'created_at';
    const orderFromUrl = urlParams.get('order') || 'desc';

    setSideBardata({
      searchTerm: searchTermFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl,
      furnished: furnishedFromUrl,
      offer: offerFromUrl,
      sort: sortFromUrl,
      order: orderFromUrl
    });

    const fetchListing = async () => {
      setLoading(true);
      const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSideBardata({ ...sideBardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSideBardata({ ...sideBardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSideBardata({
        ...sideBardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSideBardata({ ...sideBardata, sort, order });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sideBardata.searchTerm);
    urlParams.set('type', sideBardata.type);
    urlParams.set('parking', sideBardata.parking.toString());
    urlParams.set('furnished', sideBardata.furnished.toString());
    urlParams.set('offer', sideBardata.offer.toString());
    urlParams.set('sort', sideBardata.sort);
    urlParams.set('order', sideBardata.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className='flex flex-col md:flex-row lg:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex item-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              id='searchTerm'
              type='text'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sideBardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap item-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.type === 'all'}
              />
              <span>Rent & Sale</span>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.type === 'rent'}
              />
              <span>Rent</span>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.type === 'sale'}
              />
              <span>Sale</span>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap item-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.parking}
              />
              <span>Parking</span>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sideBardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className=''>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3 bg-white'
              onChange={handleChange}
              defaultValue={'created_at_desc'}
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
      </div>
      <div className='p-7 md:min-h-screen flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-2'>Listing Results:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
         {!loading && listings.length === 0 && (
          <p className='text-xl text-slate-700'>No Listing Found!</p>
         ) }
         {loading && (
          <p className='text-xl text-slate-7000 text-center w-full'>Loading...</p>
         )}
         {!loading && listings && listings.map((listing) => ( <ListingItem key={listing._id} listings = {listing}/>)
         
        )}
        </div>
      </div>
    </div>
  );
}

export default Search;