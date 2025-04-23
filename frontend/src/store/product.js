//creating a global state for all to use (zustand is the global "storage" for the app)
import {create} from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        //add the new product into the data base (check product.controller.js to see what is the type to return the data)
        set((state) => ({products:[...state.products, data.data]}))
        return {success:true, message:"Product created successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message};
        
        //using the filter method to remove the product from the state
        //updating the ui without having to refresh the page
        set(state => ({products: state.products.filter((product) => product._id !== pid)}));
        return {success:true, message:data.message};
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        

        //updating the UI without having to refresh the page
        set((state) => ({
            products: state.products.map((product) => product._id === pid ? data.data : product),
        }));

        return { success: true, message: data.message };
    },

}));