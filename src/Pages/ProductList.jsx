import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '' });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleAddProduct = () => {
        axios.post('http://127.0.0.1:8000/api/products', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({ name: '', description: '', images: [] });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteProduct = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
            .then(response => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <h2 className="mt-4">Add New Product</h2>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" className="form-control" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                </div>

                <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
            </form>
            <h1 className="display-4">Product List</h1>
            <table className='table'>
                <thead>
                    <th>SL.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </thead>
            </table>

            {products.map((product, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td></td>
                    <td>{product?.name}</td>
                    <td>{product?.description}</td>
                    <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">View</Link>
                    </td>

                </tr>

            ))}


        </div>
    );
}

export default ProductList;