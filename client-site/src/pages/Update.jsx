import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function Update() {
    const [activeSection, setActiveSection] = useState('add');
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [updateForm, setUpdateForm] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        in_stock: false,
        featured: false,
        image: null,
    });

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (!error) setProducts(data);
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        if (!selectedProductId) return;

        const product = products.find(p => String(p.id) === String(selectedProductId));

        if (product) {
            setUpdateForm({
                name: product.product_name || '',
                price: product.price || '',
                description: product.description || '',
                category: product.category || '',
                in_stock: product.in_stock || false,
                featured: product.featured || false,
                image: product.image || null,
            });
        }
    }, [selectedProductId, products]);

    async function addProduct(e) {
        e.preventDefault();

        const form = e.target;
        const file = form.image.files[0];

        let imageUrl = null;

        if (file) {
            const fileName = `${Date.now()}-${file.name}`;

            const { error: uploadError } = await supabase
                .storage
                .from('product-images')
                .upload(fileName, file);

            if (uploadError) return;

            const { data } = supabase
                .storage
                .from('product-images')
                .getPublicUrl(fileName);

            imageUrl = data.publicUrl;
        }

        const newProduct = {
            product_name: form.product_name.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            image: imageUrl,
            featured: form.featured.checked,
            in_stock: form.stocked.checked,
        };

        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select();

        if (!error) {
            setProducts(prev => [...prev, data[0]]);
            form.reset();
        }
    }

    async function updateProduct(e) {
        e.preventDefault();

        const file = updateForm.image instanceof File ? updateForm.image : null;

        let imageUrl = null;

        if (file) {
            const fileName = `${Date.now()}-${file.name}`;

            const { error: uploadError } = await supabase
                .storage
                .from('product-images')
                .upload(fileName, file);

            if (uploadError) return;

            const { data } = supabase
                .storage
                .from('product-images')
                .getPublicUrl(fileName);

            imageUrl = data.publicUrl;
        }

        const { data, error } = await supabase
            .from('products')
            .update({
                product_name: updateForm.name,
                price: updateForm.price ? parseFloat(updateForm.price) : null,
                description: updateForm.description,
                category: updateForm.category,
                in_stock: updateForm.in_stock,
                featured: updateForm.featured,
                image: imageUrl || updateForm.image
            })
            .eq('id', selectedProductId)
            .select();

        if (!error) {
            setProducts(prev =>
                prev.map(p =>
                    String(p.id) === String(selectedProductId)
                        ? { ...p, ...data[0] }
                        : p
                )
            );
            setSelectedProductId('');
        }
    }

    async function deleteProduct(e) {
        e.preventDefault();

        const form = e.target;
        const productId = form.product_id.value;
        console.log('Deleting product with ID:', productId);

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) {
            console.error('Error deleting product:', error);
        } else {
            setProducts(prev =>
                prev.filter(p => String(p.id) !== String(productId))
            );
        }
    }

    return (
        <section>
            <div className="header-card">
                <h1>Manage Products</h1>
            </div>

            <div className="card" id="filters">
                <h1>Operation</h1>
                <hr />
                <div className="cat-options">
                    <button onClick={() => setActiveSection('add')}>Add New Product</button>
                    <button onClick={() => setActiveSection('update')}>Update Existing Product</button>
                    <button onClick={() => setActiveSection('delete')}>Delete Product</button>
                </div>
            </div>

            {activeSection === 'add' && (
                <div className="card">
                    <h2>Add a New Product</h2>
                    <form onSubmit={addProduct}>
                        <label>Name</label>
                        <input type="text" name="product_name" required />

                        <label>Category</label>
                        <select name="category">
                            <option value="papercrafts">Papercrafts</option>
                            <option value="ink-flowers-paper">Ink Flowers (Paper)</option>
                            <option value="ink-flowers-tile">Ink Flowers (Tile)</option>
                            <option value="shadowboxes">Shadowboxes</option>
                            <option value="cards">Cards</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>

                        <label>Price</label>
                        <input type="number" name="price" step="0.01" required />

                        <label>Description</label>
                        <textarea name="description" required />

                        <label>In Stock</label>
                        <input type="checkbox" name="stocked" />

                        <label>Featured</label>
                        <input type="checkbox" name="featured" />

                        <label>Image</label>
                        <input type="file" name="image" accept="image/*" />

                        <button type="submit">Add Product</button>
                    </form>
                </div>
            )}

            {activeSection === 'update' && (
                <div className="card">
                    <h2>Update Product</h2>

                    <form>
                        <label>Select Product</label>
                        <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                            <option value="">Select...</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.product_name}
                                </option>
                            ))}
                        </select>
                    </form>

                    {selectedProductId && (
                        <form onSubmit={updateProduct}>
                            <label>Name</label>
                            <input 
                                type="text" 
                                value={updateForm.name} 
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, name: e.target.value })
                                }
                            />

                            <label>Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={updateForm.price}
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, price: e.target.value })
                                }
                            />

                            <label>Description</label>
                            <textarea
                                value={updateForm.description}
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, description: e.target.value })
                                }
                            />

                            <label>Category</label>
                            <select
                                value={updateForm.category}
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, category: e.target.value })
                                }
                            >
                                <option value="papercrafts">Papercrafts</option>
                                <option value="ink-flowers-paper">Ink Flowers (Paper)</option>
                                <option value="ink-flowers-tile">Ink Flowers (Tile)</option>
                                <option value="shadowboxes">Shadowboxes</option>
                                <option value="cards">Cards</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>

                            <label>In Stock</label>
                            <input
                                type="checkbox"
                                checked={updateForm.in_stock}
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, in_stock: e.target.checked })
                                }
                            />

                            <label>Featured</label>
                            <input
                                type="checkbox"
                                checked={updateForm.featured}
                                onChange={(e) =>
                                    setUpdateForm({ ...updateForm, featured: e.target.checked })
                                }
                            />

                            <label>Image </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setUpdateForm({ ...updateForm, image: file });
                                }}
                            />


                            <button type="submit">Save Changes</button>
                        </form>
                    )}
                </div>
            )}

            {activeSection === 'delete' && (
                <div className="card">
                    <h2>Delete Product</h2>
                    <form onSubmit={deleteProduct}>
                        <select name="product_id">
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.product_name}
                                </option>
                            ))}
                        </select>

                        <button type="submit">Delete</button>
                    </form>
                </div>
            )}
        </section>
    );
}