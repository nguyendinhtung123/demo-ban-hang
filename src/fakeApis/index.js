import { createServer, Model } from 'miragejs';
export const setupServer = () => {
  createServer({
    models: {
      product: Model,
      
    },
    seeds(server) {
        server.db.loadData({
            products: {
                a: [
                  {
                    id: 1,
                    name: "T-Shirt",
                    price: 20,
                    img: ["https://product.hstatic.net/1000360022/product/id-2742a_dc57198d8ddc4f43bf3225acb9939eef_1024x1024.jpg","https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg"],
                    gender: "Unisex",
                    image: "https://product.hstatic.net/1000360022/product/27_327bdc164eb84c58b329bd105c69e06f_1024x1024.png",
                    category: "Cloths",
                    color: "White",
                    size : ["Small", "Medium", "Large"],
                    ratings: [
                      { userId: 1, rating: 5, review: "Great quality!" ,reviewdes: "The fabric is soft and the fit is perfect. Highly recommend!"},
                      { userId: 2, rating: 4, review: "Comfortable to wear." ,reviewdes: "I love the design and the material feels premium. Will buy again."},
                    ],
                  },
                  {
                    id: 2,
                    name: "Shorts",
                    price: 25,
                    image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465112/sub/goods_465112_sub14_3x4.jpg?width=369",
                    img: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSW7zLe9uaSX0E7EBqRkzogHL9x-7X27Hrkq6iCKoJi5oUSH0q4cSxwZc-D6s1eTwKEJgJGhRHBdaZW0gvAi6WlvZ-lhZPB1Y3FaogBvD5kGZJzsKez4y9g5wYeW4xWFnN2BjKH-OdT&usqp=CAc","https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470625/item/vngoods_09_470625_3x4.jpg?width=294"],
                    gender: "Men",
                    category: "Cloths",
                    color: "Black",
                    size : ["Small", "Medium", "Large"],
                    ratings: [
                      { userId: 3, rating: 3, review: "Average quality." ,reviewdes: "The shorts are okay, but the stitching could be better."},
                    ],
                  },
                ],
                b: [
                  {
                    id: 3,
                    name: "Jacket",
                    price: 50,
                    image : "https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg",
                    img: ["https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg","https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg"],
                    gender: "Women",
                    category: "Outerwear",
                    color: "Blue",
                    size : ["Small", "Medium", "Large"],
                    ratings: [
                      { userId: 4, rating: 5, review: "Perfect for winter!", reviewdes: "This jacket keeps me warm and stylish. Love the color and fit!" },
                    ],
                  },
                  {
                    id: 4,
                    name: "Cap",
                    price: 15,
                    image  : "https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg",
                    size : ["Small", "Medium", "Large"],
                    img: ["https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg","https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg"],
                    gender: "Unisex",
                    category: "Accessories",
                    color: "Red",
                    ratings: [],
                  },
                ],
                c: [
                  {
                    id: 5,
                    name: "Sneakers",
                    price: 80,
                    image : "https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg",
                    img: ["https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg","https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg"],
                    gender: "Unisex",
                    category: "Footwear",
                    color: "White",
                    size : ["Small", "Medium", "Large"],
                    ratings: [
                      { userId: 5, rating: 4, review: "Stylish and comfortable.",   reviewdes: "These sneakers are not only stylish but also very comfortable for daily wear." },
                    ],
                  },
                  {
                    id: 6,
                    name: "Socks",
                    price: 10,
                    image : "https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg",
                    img: ["https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg","https://tamanh.net/wp-content/uploads/2022/09/ao-thun-t-shirt-la-gi-copy.jpg"],
                    gender: "Unisex",
                    category: "Accessories",
                    size : ["Small", "Medium", "Large"],
                    color: "Gray",
                    size : ["Small", "Medium", "Large"],
                    ratings: [],
                  },
                ],
              },
              cart: [], // Initialize an empty cart
        });
      },
    routes() {
      this.get('/api/getfourproducts', (schema) => {
        return schema.products.all().models.map(product => product.attrs);
      });
      this.get('/api/getsingleproduct/:id', (schema, request) => {
        const id = parseInt(request.params.id);
        let dataTemp =  schema.db.products[0]
        const allProducts = [...dataTemp['a'],...dataTemp['b'],...dataTemp['c']] 
        
        const product = allProducts.find((product) => product.id === id);
        console.log("product", product);

        if (product) {
          return product;
        } else {
          return { error: "Product not found" };
        }
      });
      this.post('/api/addtocart', (schema, request) => {
        const productData = JSON.parse(request.requestBody);
    
        const existingProduct = schema.db.cart.find(
            productData.id 
          );
  
          console.log("existingProduct", existingProduct,productData);
          if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if product exists
            schema.db.cart.update(existingProduct.id, existingProduct);
          } else {
            schema.db.cart.insert({ ...productData, quantity: 1 }); // Add new product
          }
        return { message: "Product added to cart successfully", cart: schema.db.cart };
      });

      this.get('/api/removetocart', (schema, request) => {
        const id = request.queryParams.query?.toLowerCase();
    
        const existingProduct = schema.db.cart.find(
          id
          );
  
          if (existingProduct) {
            existingProduct.quantity -= 1; // Increase quantity if product exists
            if (existingProduct.quantity <= 0) {
              schema.db.cart.remove(existingProduct.id); // Remove product if quantity is 0
            } else
            schema.db.cart.update(existingProduct.id, existingProduct);
          } 
        return { message: "Product added to cart successfully", cart: schema.db.cart };
      });

      this.get('/api/getcart', (schema) => {
        return schema.db.cart;
      });

      this.get('/api/removeAllCart', (schema) => {
        return schema.db.cart.remove();
      });
      this.post('/api/getfilterdproducts', (schema, request) => {
        const filters = JSON.parse(request.requestBody);
      
        // Lấy toàn bộ sản phẩm
        let dataTemp =  schema.db.products[0]
        const allProducts = [...dataTemp['a'],...dataTemp['b'],...dataTemp['c']] 
      
        console.log('filters',filters,allProducts,schema.db.products)
        // Lọc sản phẩm theo các filter
        const filteredProducts = allProducts.filter(product => {
          // Gender filter
          const genderMatch = Object.entries(filters.Gender)
            .filter(([_, checked]) => checked)
            .map(([key]) => key.toLowerCase());
          if (genderMatch.length > 0 && !genderMatch.includes(product.gender?.toLowerCase())) {
            return false;
          }
      
          // Category filter
          const categoryMatch = Object.entries(filters.Category)
            .filter(([_, checked]) => checked)
            .map(([key]) => key.toLowerCase());
          console.log('categoryMatch',categoryMatch,product.category?.toLowerCase())

          if (categoryMatch.length > 0 && !categoryMatch.includes(product.category?.toLowerCase())) {
            return false;
          }
      
          // Size filter
          const sizeMatch = Object.entries(filters.Size)
      .filter(([_, checked]) => checked)
      .map(([key]) => key.toLowerCase());
   

    if (sizeMatch.length > 0 && !product.size?.some(c => sizeMatch.includes(c.toLowerCase()))) {
      return false;
    }

      
          // Color filter
          const colorMatch = Object.entries(filters.Color)
            .filter(([_, checked]) => checked)
            .map(([key]) => key.toLowerCase());
            console.log('colorMatch',colorMatch)
            if (colorMatch.length > 0 && !colorMatch.includes(product.color?.toLowerCase())) {
              return false;
            }
      
          return true;
        });
      
        return filteredProducts ;
      });

      this.get('/api/getallproducts', (schema, request) => {
        const pagename = request.queryParams.pagename?.toLowerCase(); // ví dụ "men", "women", "kids"
      
        // Lấy toàn bộ sản phẩm
        let dataTemp =  schema.db.products[0]
        const allProducts = [...dataTemp['a'],...dataTemp['b'],...dataTemp['c']] 
      
        // Nếu có pagename, lọc theo `gender`, không thì trả về toàn bộ
        const filtered = pagename
          ? allProducts.filter(product => product.gender?.toLowerCase() === pagename)
          : allProducts;
          console.log('filtered',filtered)
      
        return filtered;
      });
      this.get('/api/getsearchedproduct', (schema, request) => {
        const textQuery = request.queryParams.query?.toLowerCase(); // ví dụ "men", "women", "kids"
      
        // Lấy toàn bộ sản phẩm
        let dataTemp =  schema.db.products[0]
        const allProducts = [...dataTemp['a'],...dataTemp['b'],...dataTemp['c']] 
      
        // Nếu có pagename, lọc theo `gender`, không thì trả về toàn bộ
        const filtered = textQuery
          ? allProducts.filter(product => product.name?.toLowerCase().includes(textQuery))
          : allProducts;
          console.log('filtered',filtered)
      
        return filtered;
      });

      
    }
  });
};