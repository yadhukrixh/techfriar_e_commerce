import { response } from "express";
import { ordersData } from "../../../data/orders.js";
import {
  addProductToCart,
  checkProductInCart,
  decreaseProductCounRepo,
  deleteFromCartRepo,
  fetchAllProductRepo,
  fetchOffers,
  fetchOrderCount,
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


//fetch price details according to the requirements
export const fetchPriceAndOffers = async (req, res) => {
  const { userId } = req.body;
  const productsOncart = await fetchProductsOnCartRepo(userId);

  // price data list
  let priceDataList = [];

  // total price
  let totalPrice = 0;
  for (const i of productsOncart) {
    totalPrice = totalPrice + i.count * i.price;
  }

  // total payable amount
  let totalPayableAmount = 0;

  // offers
  let offerList = [];

  //response data
  let responseData = {};

  // conditions for per item
  for (const product of productsOncart) {
    // condition 1 -buy-1-get-1
    if (product.key === "PF1") {
      const data = {
        productId: product.productId,
        productName: product.name,
        totalAmountPerItem: (product.price / 2) * product.count,
        count:product.count,
        offers: ["BUY 1 GET 1"],
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
          count:product.count,
          offers: ["Bulk Purchase Discount"],
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
          count:product.count,
          offers: [],
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
            totalAmountPerItem: item.count * (item.price - 10),
            count:item.count,
            offers: ["Combo Discount"],
          };
          priceDataList.push(data);
          break;
        }
      }
    }else{
        if (product.key === "PF3") {
            const data = {
              productId: product.productId,
              productName: product.name,
              totalAmountPerItem: product.count * product.price,
              count:product.count,
              offers: [""],
            };
            priceDataList.push(data);
          }
    }

    // condtion 4 - limited time discount
    if (product.key === "PF4") {
      const startDate = new Date("2024,11,01");
      const endDate = new Date("2024,11,20");
      const date = new Date();
      if (date > startDate && date < endDate) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.count * product.price * (85 / 100),
          count:product.count,
          offers: ["Limited Time Discount"],
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
          count:product.count,
          offers: [""],
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
          count:product.count,
          offers: ["Tiered Discount"],
        };
        priceDataList.push(data);
      } else if (product.count >= 4) {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.count * product.price * (80 / 100),
          count:product.count,
          offers: ["Tiered Discount"],
        };
        priceDataList.push(data);
      } else {
        const data = {
          productId: product.productId,
          productName: product.name,
          totalAmountPerItem: product.price * product.count,
          count:product.count,
          offers: [],
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
            count:item.count,
            offers: ["Seasonal Discount"],
          };
          priceDataList.push(data);
          break;
        }
      }
    }
  }

  // conditions on cart

  //condition 8 - Loyality program discount
  const orderCount = await fetchOrderCount(userId); // fetch order count
  let loyalityPriceDataList = [];
  //format each item after checking loayality discount
  if (orderCount >= 5) {
    for (const product of priceDataList) {
      const data = {
        ...product,
        offers: product.offers.concat("Loyality Discount"),
        totalAmountPerItem: product.totalAmountPerItem * (95 / 100),
      };
      loyalityPriceDataList.push(data);
    }
  }

  if (orderCount >= 5) {
    for (const i of loyalityPriceDataList) {
      totalPayableAmount = totalPayableAmount + i.totalAmountPerItem;
    }

    // condition 7 - buy more save more
    if (loyalityPriceDataList.length === 5) {
      totalPayableAmount = totalPayableAmount * (90 / 100);

      offerList.push("Buy More Save More");
    } else if (loyalityPriceDataList.length >= 6) {
      totalPayableAmount = totalPayableAmount * (85 / 100);

      offerList.push("Buy More Save More");
    }

    // condition 9 -cartwide discount
    if (totalPayableAmount > 500) {
      totalPayableAmount = totalPayableAmount * (95 / 100);
      offerList.push("Cart Wide Discount");
    }

    // responseData
    responseData = {
      priceDataList: loyalityPriceDataList,
      cartOffers: offerList,
    };
  } else {
    for (const i of priceDataList) {
      totalPayableAmount = totalPayableAmount + i.totalAmountPerItem;
    }

    // conditiono 7 - buy more save more
    if (priceDataList.length === 5) {
      totalPayableAmount = totalPayableAmount * (90 / 100);

      offerList.push("Buy More Save More");
    } else if (priceDataList.length >= 6) {
      totalPayableAmount = totalPayableAmount * (85 / 100);

      offerList.push("Buy More Save More");
    }

    // condition 9 -cartwide discount
    if (totalPayableAmount > 500) {
      totalPayableAmount = totalPayableAmount * (95 / 100);
      offerList.push("Cart Wide Discount");
    }

    // response Data
    responseData = {
      priceDataList: priceDataList,
      cartOffers: offerList,
    };
  }

  // response
  responseData = {
    ...responseData,
    totalPrice:totalPrice,
    totalPayableAmount:totalPayableAmount,
    discount:totalPrice-totalPayableAmount
  }

  res.json({status:true,data:responseData});

};

// delete the cartItem
export const deleteProductsFromCart = async(req,res)=>{
    const { userId, productId } = req.body;
    const deleteCartProduct = await deleteFromCartRepo(userId,productId);
    res.json({status:deleteCartProduct,message:"Product removed Successfully."})
}

// decrease product count from cart
export const decreaseProductCountFromcart = async(req,res) => {
  const {userId,productId} = req.body;
  const productIsThere = await checkProductInCart(userId, productId);
  const response = await decreaseProductCounRepo(userId,productId,productIsThere.data);
  res.json({status:response});
}
