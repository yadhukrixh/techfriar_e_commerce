import {
  addProductToCart,
  checkProductInCart,
  fetchAllProductRepo,
  fetchProduct,
  fetchProductsOnCartRepo,
  updateProductCountOnCart,
} from "../repository/product-repo.js";

import moment from "moment";

export const fetchAllProducts = async (req, res) => {
  const products = await fetchAllProductRepo();
  res.json({
    status: true,
    message: "Products fetched successfully",
    data: products,
  });
};

// add to cart logic
export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  // check is there the product already there
  const productIsThere = await checkProductInCart(userId, productId);
  if (productIsThere.status) {
    // add count of product
    const updateCount = await updateProductCountOnCart(
      userId,
      productId,
      productIsThere.data
    );
    return res.json({ status: updateCount });
  } else {
    // add new produt
    const addProduct = await addProductToCart(userId, productId);
    return res.json({ status: addProduct });
  }
};

// fetch products to cart
export const fetchProductsOnCart = async (req, res) => {
  const { userId } = req.body;
  const cartData = await fetchProductsOnCartRepo(userId);
  res.json({ data: cartData });
};

export const fetchPriceAndOffers = async (req, res) => {
  const { userId } = req.body;
  const productsOncart = await fetchProductsOnCartRepo(userId);

  // price data list
  let priceDataList = [];

  let totalPrice = 0;

  for (const i of priceDataList) {
    totalPrice = totalPrice + i.totalAmountPerItem
  }

  // conditions for per item
  for (const product of productsOncart) {
    // condition 1 -buy-1-get-1
    if (product.key === "PF1") {
      const data = {
        productId: product.productId,
        productName: product.name,
        totalAmountPerItem: (product.price / 2) * product.count,
      };
      priceDataList.push(data);
    }

    // condition 2 bulk-purchase
    if (product.key === "PF2") {
      if (product.count >= 3) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: 75 * product.count,
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
        };
        priceDataList.push(data);
      }
    }

    // condition 3 -combo discount
    if (product.key === "PF1") {
      for (const item of productsOncart) {
        if (item.key === "PF3") {
          const data = {
            productId: item.productId,
            productName: item.name,
            totalAmountPerItem: item.count * item.price - 10,
          };
          priceDataList.push(data);
          break;
        }
      }
    }

    // condtion 4 - limited time discount
    if (product.key === "PF4") {
      const startDate = new Date("2024,11,01");
      const endDate = new Date("2024,11,03");
      const date = new Date();
      if (date > startDate && date < endDate) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.count * product.price * (85 / 100),
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
        };
        priceDataList.push(data);
      }
    }

    // condition -5 Tiered discount
    if (product.key === "PF5") {
      if (product.count === 2 || product.count === 3) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.count * product.price * (90 / 100),
        };
        priceDataList.push(data);
      } else if (product.count >= 4) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: 2 * product.price * (80 / 100),
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
        };
        priceDataList.push(data);
      }
    }

    //condition 6 seasonal discount
    if (product.key === "PF4") {
      for (const item of productsOncart) {
        if (item.key === "PF6") {
          const data = {
            productId: item.productId,
            productName: item.name,
            totalAmountPerItem: item.count * item.price * (75 / 100),
          };
          priceDataList.push(data);
          break;
        }
      }
    }
  }


  // calculating total price
  for (const i of priceDataList) {
    totalPrice = totalPrice + i.totalAmountPerItem
  }

  // conditions on cart
  if(priceDataList.length === 5){
    totalPrice = totalPrice * (90/100)
  }else if(priceDataList.length >= 6){
    totalPrice = totalPrice * (85/100)
  }




  res.json({ status: true, data: priceDataList });
};
