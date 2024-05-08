import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Label, Paragraph, Cart } from '../components/UI';
import { QUERY_SINGLE_PACKAGE } from '../utils/queries';

function PackageDetail () {

    const { packageId } = useParams();
    
    const { loading, data } = useQuery(QUERY_SINGLE_PACKAGE, {
        variables: { packageId: packageId },
    });

    const package1 = data?.package || {};
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[80%] mx-auto grid grid-cols-5 gap-3 my-[90px]">
            <div className="col-span-3 h-full my-4">
                <div className='w-[90%] rounded-xl'>
                    <figure className='rounded-xl w-full h-full'>
                        <img src={package1.image} alt={package1.generalTitle} />
                    </figure>
                </div>
                <div className='my-4'>
                    <Label description={package1.generalTitle}/>
                    <Paragraph description={package1.generalDescription}/>
                    {
                        package1.tours.map((tour) => (
                            <div key={tour._id}>
                                <Label description={tour.title} />
                                <Paragraph description={tour.description}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="h-[300px] col-span-2 my-4 flex flex-col content-evenly">
                <Cart name={package1.generalTitle} tours={package1.tours}/>
            </div>
        </div>
    )
}

export default PackageDetail;