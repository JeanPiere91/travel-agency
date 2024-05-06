import { Card, Label } from '../components/UI';

function Package() {
    return (
        <div className="w-[90%] mx-auto grid grid-cols-5 gap-3 my-[90px]">
            <div className="h-[60%] border-2 rounded-lg p-2">
                <div className='my-4 text-center'>
                    <Label description="Filters"/>
                </div>
            </div>

            <div className="col-span-4 p-2">
                <div className='my-4'>
                    <Label description="Packages & Promotions"/>
                </div>
                
                <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
                    <Card name="City Tour" price="30.00"/>
                    <Card name="Sacred Valley" price="60.00"/>
                    <Card name="Machupicchu" price="350.00"/>
                    <Card name="Maras & Moray" price="30.00"/>
                    <Card name="Rainbow Mountain" price="45.00"/>
                    <Card name="Humantay Lake" price="45.00"/>
                    <Card name="Inca Trail Machupicchu" price="700.00"/>
                </div>
                
            </div>
        </div>
        
    )
};

export default Package;