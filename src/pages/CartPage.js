import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function CartPage({ cart, addToCart, removeFromCart }) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const navigate = useNavigate();
    

    useEffect(() => {
        
        //calculate the total price before discount
        const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(price);

        //Apply 10% discount to the total price
        const discounted = price - price * 0.1;
        setDiscountedPrice(discounted);
  

    }, [cart]);

    return (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-yellow-200 p-6  rounded-lg">
                {/* <h2 className="font-bold text-lg mb-4">My cart</h2> */}
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item) => {
                            const itemTotalPrice = item.price * item.quantity;
                            return (
                                <div key={item.id} className="flex justify-between items-center border-b py-4">
                                    <div>
                                        <h2 className="text-lg">{item.title}</h2>
                                        <p>
                                            Price:${itemTotalPrice}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-3 py-1">-</button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-3 py-1">+</button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-4 text-lg font-bold">
                            {/* total before discount */}
                            <p> Total Amount: ${totalPrice.toFixed(2)}</p>


                            {/* total after discount */}

                            <p> Discounted Amount: ${discountedPrice.toFixed(2)} (10% discount applied)</p>

                        </div>
                    </div>
                )}
                {/* cart button at the end */}

                <div className="w-full mt-5 flex justify-end">
                   

                        <button
                            onClick={() => navigate(-1)} className="py-2 px-4 bg-green-500 text-white rounded-lg text-lg" >
                            Go to Product
                        </button>
                    

                </div>



            </div>
        </div>
    );
}
export default CartPage;


