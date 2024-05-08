import { Link } from 'react-router-dom';

const PackageList = ({packages}) => {
    if (!packages.length) {
        return <h3>No Packages Yet</h3>;
    }

    return (
        <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
            {packages &&
            packages.map((package1) => (
                <div className="h-[250px] w-full rounded-xl flex flex-col items-center shadow-2xl relative">
                <img className='w-full h-full border-1 rounded-t-xl object-cover relative' src={package1.image} alt={package1.generalTitle} />
                <div className='w-full h-full flex flex-col justify-between absolute'>
                    <div className='text-white px-4'>
                        <div className="font-semibold uppercase text-lg mt-1 tracking-wide">
                            {package1.generalTitle}
                        </div>
                        <div className="text-left font-medium text-sm mt-1 mb-2">
                            USD 0
                        </div>
                    </div>
                    <div className='p-1 m-2 flex items-center'>
                        <Link className='font-semibold bg-white rounded-md px-3 py-2 text-blue-950 text-center hover:text-white hover:bg-blue-700  hover:font-semibold'
                        to={`/package/${package1._id}`}
                        >
                            See more
                        </Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default PackageList;
