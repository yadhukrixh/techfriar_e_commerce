import Cart from "../models/cart-model.js";
import Offers from "../models/offers.js";
import Order from "../models/ordres.js";
import Products from "../models/product-model.js";

// seed product
export const seedProduct = async (products) => {
  products.map(async (product) => {
    const uploadProduct = new Products({
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      key:product.key
    });
    await uploadProduct.save();
  });
};

// fetch all product
export const fetchAllProductRepo = async () => {
  const products = await Products.find();
  return products;
};


//fetch each product
export const fetchProduct = async (id) => {
    const product = await Products.findById(id);
    return product;
}

//check is the product on the cart
export const checkProductInCart = async (userId, productId) => {
  const productIsThere = await Cart.findOne({
    userId: userId,
    productId: productId,
  });
  if (productIsThere === null) {
    return {
      status: false,
    };
  } else {
    return {
      status: true,
      data:productIsThere.count
    };
  }
};

// add product to cart
export const addProductToCart = async (userId, productId) => {
  try {
    const product = await fetchProduct(productId)
    const count = product.key === 'PF1'?2:1

    const newCartProduct = new Cart({
      productId: productId,
      count: count,
      userId: userId,
    });
    await newCartProduct.save();
    return true;
  } catch {
    return false;
  }
};

// increase product count
export const updateProductCountOnCart = async (userId, productId,currentCount) => {
  try {
    const product = await fetchProduct(productId)
    const count = product.key === 'PF1'?2:1

    const updateCount = await Cart.updateOne({userId:userId,productId:productId},{
        $set:{
            count:currentCount+count
        }
    });

    return true
  } catch {
    return false;
  }
};



// fetch products on cart repo
export const fetchProductsOnCartRepo = async(userId) => {
    const products = await Cart.find({userId:userId}).populate({
        path: 'productId'
    });

    let formattedProducts = [];

    products.map((product)=>{
        const formattedProduct = {
            cartId:product._id,
            productId:product.productId._id,
            name:product.productId.name,
            image:product.productId.image,
            description:product.productId.description,
            price:product.productId.price,
            count: product.count,
            key:product.productId.key
        }
        formattedProducts.push(formattedProduct);
    })
    
    return  formattedProducts;
}


// fetch orders count
export const fetchOrderCount = async(userId) => {
    const order = await Order.find({
        userId:userId,
        status:"success"
    })

    return order.length
}

// fetch offers
export const fetchOffers = async() => {
    const offers = await Offers.find();
    return offers;
}

// fetch offers and price
export const fetchPriceAndOffersRepo = async(userId) => {

}
