import { useState, useEffect } from "react";

function ProductPage({ addToCart, cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {products.map(product => (
                <div key={product.id} className="border p-4 flex flex-col">
                    <img src={product.image} alt={product.title} className="h-48 object-cover mb-4" />
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="mt-2">Price:$</p>
                    <p className="text-sm mt-2">{product.description.substring(0, 50)}...</p>
                    {cart.some(item => item.id === product.id) ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-auto bg-red-500 text-white p-2 rounded">
                            Remove from Cart
                        </button>
                    ) : (
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-auto bg-blue-500 text-white p-2 rounded">
                            Add to Cart
                        </button>
                    )}
                </div>

            ))}

        </div>
    )

}
export default ProductPage