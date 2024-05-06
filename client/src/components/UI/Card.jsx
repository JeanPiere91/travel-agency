import { Link } from 'react-router-dom';
import img from '../../assets/img1.jpg';

function Card({ name, price }) {
    return (
        <div className="h-[250px] w-full rounded-xl flex flex-col items-center shadow-2xl relative">
            <img className='w-full h-full border-1 rounded-t-xl object-cover relative' src={img} alt={name} />
            <div className='w-full h-full flex flex-col justify-between absolute'>
                <div className='text-white px-4'>
                    <div className="font-semibold uppercase text-lg mt-1 tracking-wide">
                        {name}
                    </div>
                    <div className="text-left font-medium text-sm mt-1 mb-2">
                        USD {price}
                    </div>
                </div>
                <div className='p-1 m-2 flex items-center'>
                    <Link className='font-semibold bg-white rounded-md px-3 py-2 text-blue-950 text-center hover:text-white hover:bg-blue-700  hover:font-semibold'
                    // to={`/profiles/${profile._id}`}
                    to='/packages/1'
                    >
                        See more
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;