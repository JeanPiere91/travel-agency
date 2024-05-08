import { useState } from "react";
import Auth from '../../utils/auth';

function Cart({item}) {
    const package1 = [{
        "name" : "name",
        "TotalAmount" : 125
    }]
    const [quantity, setQuantity] = useState(1);

    const onChange = (e) => {
        const value = e.target.value;
        if(value < 1)
            setQuantity(1);
        setQuantity(value);
    }

    function calculateTotal() {
        let sum = 0;
        sum = quantity * 25.00;
        return sum.toFixed(2);
    }

    function submitCheckout() {
        console.log("Option doesn't implemented yet ");
    }

    return (
        <div className="p-5 flex flex-col items-center w-full h-full content-evenly">
            <h1 className="text-2xl">Book your Package</h1>
            <div className="flex flex-row items-center justify-around p-4  gap-4">
                <h1 className="text-xl">Machupicchu 2d/1n </h1>
                <h1 className="text-xl">$ 25.00</h1>
            </div>
            <div className="gap-4">
                <span>How many people ?:</span>
                <input 
                type="number" 
                className="w-[40px]" 
                placeholder={quantity} 
                onChange={onChange}
                min="1"
                value={quantity}
                />
            </div>
            
            <div className="flex flex-row items-center justify-around gap-4">
                <strong>Total: ${calculateTotal()}</strong>
                {Auth.loggedIn() ? (
                    <button 
                        className="border-2 border-red-500 px-3 py-2 rounded-lg"
                        onClick={submitCheckout}>
                            Checkout
                    </button>
                ) : (
                <span>(log in to check out)</span>
                )}
            </div>
            
        </div>
        
    )
}

export default Cart