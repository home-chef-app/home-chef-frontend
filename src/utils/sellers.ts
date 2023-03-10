import {SellerType} from 'store/sellers';

export const getLatitide = (seller: SellerType) => {
  return seller.location.coordinates[0];
};

export const getLongitude = (seller: SellerType) => {
  return seller.location.coordinates[1];
};
