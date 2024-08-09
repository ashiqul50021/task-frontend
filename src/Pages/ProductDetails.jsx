
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <div className="container">
            <h1 className="display-4">{product.name}</h1>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} className="img-fluid" />
            <button className="btn btn-primary" onClick={() => {
                axios.put(`/api/products/${id}`, { name: 'Updated Name' })
                    .then(response => {
                        setProduct(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }}>Update Product</button>
        </div>
    );
}

export default ProductDetails;