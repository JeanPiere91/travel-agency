import { useState } from "react";
import Auth from '../../utils/auth';

function Cart({name, tours}) {
    console.log(tours);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const onChange = (e) => {
        const value = e.target.value;
        if(value < 1)
            setQuantity(1);
        setQuantity(value);
    }

    function calculateTotalTour() {
        let sum = 0;
        tours.map((item) => {
            sum = sum + item.price;
        })

        return sum.toFixed(2);
    }

    function calculateTotal() {
        let sum = 0;
        tours.map((item) => {
            sum = sum + item.price;
        })

        sum = quantity * sum;
        return sum.toFixed(2);
    }

    function submitCheckout() {
        console.log("Option doesn't implemented yet ");
    }

    return (
        <div className="border-2 p-5 grid grid-cols-1 grid-rows-5 w-full h-full content-evenly gy-2 rounded-2xl border-2 border-gray-600">
            <h1 className="text-3xl font-medium text-center rounded-lg bg-blue-200 flex justify-center items-center">Book your Package</h1>
            <div className="flex flex-row items-center justify-center p-4 m-2 gap-4">
                <h1 className="text-2xl font-thin">{name}</h1>
                <h1 className="text-2xl font-bold">$ {calculateTotalTour()}</h1>
            </div>
            <span className="text-center text-xl flex items-center justify-center ">How many people ?</span>
            <div className="flex justify-center">
                <input 
                type="number" 
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder={quantity} 
                onChange={onChange}
                min="1"
                value={quantity}
                />
            </div>
            
            <div className="flex flex-row items-center justify-around gap-4">
                <strong className="text-xl ">Total: ${calculateTotal()}</strong>
                {Auth.loggedIn() ? (
                    <button 
                        className=" border-blue-500 bg-blue-500 text-white font-semibold hover:bg-blue-900 tracking-wider px-3 py-2 rounded-lg"
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