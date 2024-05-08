import {Label, Image, Paragraph } from '../components/UI';
import data from '../utils/data.json'
import img1 from '../assets/andrii.jpg';
import img2 from '../assets/harry.jpg';
import img3 from '../assets/jean-piere.png';

function About() {
    return (
        <div className="w-[80%] mx-auto my-[100px]">
            <Label description="About us"/>

            <div className='grid grid-cols-5 gap-3'>
                 <div className='col-span-1'>
                    <Image path={img1}/>
                </div>
                <div className='col-span-4'>
                    <Paragraph className="col-span-4" description={data.information[0].description}/>
                </div>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                <div className='col-span-4'>
                    <Paragraph className="col-span-4" description={data.information[1].description}/>
                </div>
                
                <div className='col-span-1'>
                    <Image path={img2}/>
                </div>
                
            </div>

            <div className='grid grid-cols-5 gap-3'>
                <div className='col-span-1'>
                    <Image path={img3}/>
                </div>
                
                <div className='col-span-4'>
                <Paragraph className="col-span-4" description={data.information[2].description}/>
                </div>
            </div>

        </div>
    );
}

export default About;