import cartrade_tech from '../assets/footer/cartrade_tech.svg';
import olx from '../assets/footer/olx.svg';
import carwale from '../assets/footer/carwale.svg';
import bikewale from '../assets/footer/bikewale.svg';
import cartrade from '../assets/footer/cartrade.svg';
import mobility from '../assets/footer/mobility.svg';

const Footer = () => {
  return (
    <div className="bg-cyan-950 h-50 py-8 px-12">
        <div className="flex justify-between items-center px-4 py-2">
            <div className='border-r-2 border-white pr-4'>
                <img src={cartrade_tech} alt="" className="h-28 w-auto" />
            </div>
            <div className='px-4'>
                <img src={olx} alt="" className="h-20 w-auto" />
            </div>
            <div className='px-4'>
                <img src={carwale} alt="" className="h-20 w-auto" />
            </div>
            <div className='px-4'>
                <img src={bikewale} alt="" className="h-20 w-auto" />
            </div>
            <div className='px-4'>
                <img src={cartrade} alt="" className="h-20 w-auto" />
            </div>
            <div className='px-4'>
                <img src={mobility} alt="" className="h-20 w-auto" />
            </div>
        </div>
        <div className="flex items-center justify-between px-4">
        <h1 className="text-white text-xs">Help - Sitemap</h1>
        <h1 className="text-white text-xs p-4">All rights reserved © 2006-2025 OLX</h1>
        </div>
    </div>
  )
}

export default Footer