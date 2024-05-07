import img from '../assets/img1.jpg'
import { Label, Paragraph } from '../components/UI';

function PackageDetail () {
    return (
        <div className="w-[90%] mx-auto grid grid-cols-5 gap-3 my-[90px]">
            <div className="bg-red-600 col-span-3 h-10 my-4">
                <div className='w-[90%] '>
                    <figure className='rounded-xl'>
                        <img src={img} alt="Imagen description" />
                    </figure>
                </div>
                <div className='my-4'>
                    <Label description="Package Name"/>
                    <Paragraph description="General description about the package."/>
                    <Label description="Tour Name"/>
                    <Paragraph description="Destination"/>
                </div>
            </div>
            <div className="bg-green-600 h-[300px] col-span-2 my-4"></div>
        </div>
    )
}

export default PackageDetail;