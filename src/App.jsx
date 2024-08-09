
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductDetails from './Pages/ProductDetails';
import ProductList from './Pages/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;