// USER
import userRegistration from "./user/registration.js";
import userLogin from "./user/login.js";
import userVerify from "./user/auth.js";
import getAllUsers from "./user/getAll.js";
import getUserById from "./user/getUserById.js";
import updateUser from "./user/updateUser.js";
import deleteUser from "./user/delete.js";
import updateProfile from "./user/updateProfile.js";

// DEVICE
import createDevice from "./device/create.js";
import getAllDevices from "./device/getAll.js";
import getDeviceById from "./device/getOne.js";
import updateDevice from "./device/update.js";
import deleteDevice from "./device/delete.js";

// BRAND
import createBrand from "./brand/create.js";
import getAllBrands from "./brand/getAll.js";
import getBrandById from "./brand/getById.js";
import updateBrand from "./brand/update.js";
import deleteBrand from "./brand/delete.js";

// TYPE
import createType from "./type/create.js";
import getAllTypes from "./type/getAll.js";
import getTypeById from "./type/getById.js";
import updateType from "./type/update.js";
import deleteType from "./type/delete.js";

// CART
import addToCart from "./cart/addToCart.js";
import getCart from "./cart/getCart.js";
import removeFromCart from "./cart/removeFromCart.js";
import clearCart from "./cart/clearCart.js";
import updateCart from "./cart/update.js";

// RATING
import createRating from "./rating/create.js";
import getAverage from "./rating/getAverage.js";

export default {
  // USER
  "/api/user/registration": userRegistration,
  "/api/user/login": userLogin,
  "/api/user/auth": userVerify,
  "/api/user": { get: getAllUsers.get },
  "/api/user/{id}": {
    get: getUserById.get,
    put: updateUser.put,
    delete: deleteUser.delete,
  },
  "/api/user/profile": { put: updateProfile.put },

  // DEVICE
  "/api/device": { get: getAllDevices.get, post: createDevice.post },
  "/api/device/{id}": {
    get: getDeviceById.get,
    put: updateDevice.put,
    delete: deleteDevice.delete,
  },

  // BRAND
  "/api/brand": { get: getAllBrands.get, post: createBrand.post },
  "/api/brand/{id}": {
    get: getBrandById.get,
    put: updateBrand.put,
    delete: deleteBrand.delete,
  },

  // TYPE
  "/api/type": { get: getAllTypes.get, post: createType.post },
  "/api/type/{id}": {
    get: getTypeById.get,
    put: updateType.put,
    delete: deleteType.delete,
  },

  // CART
  "/api/cart": { get: getCart.get, put: updateCart.put },
  "/api/cart/add": { post: addToCart.post },
  "/api/cart/{deviceId}": { delete: removeFromCart.delete },
  "/api/cart/clear": { delete: clearCart.delete },

  // RATING
  "/api/rating": { post: createRating.post },
  "/api/rating/{deviceId}": { get: getAverage.get },
};