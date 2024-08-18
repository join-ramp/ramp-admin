import { getErrorMessage } from '@/utils/helpers';
import request from './index';

export interface CreateShopDataType {
  name: string;
  description: string;
  address: string[];
  cover_image: File;
  image: File;
}
export interface EditShopDataType {
  uid: string;
  description: string;
  address: string[];
  cover_image?: File | string;
  image?: File | string;

  name?: string;
}

export const createShopFn = async (data: CreateShopDataType) => {
  try {
    const newData = new FormData();
    newData.append('name', data.name);
    newData.append('description', data.description);
    newData.append('address["address"]', data.address[0]);
    newData.append('address["city"]', data.address[1]);
    newData.append('address["state"]', data.address[2]);
    newData.append('address["country"]', data.address[3]);
    newData.append('image', data.image);
    newData.append('cover_image', data.cover_image);

    const res = await request.post('/shop', newData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const editShopFn = async (data: EditShopDataType) => {
  try {
    const newData = new FormData();
    newData.append('uid', data.uid);
    newData.append('description', data.description);
    newData.append('address["address"]', data.address[0]);
    newData.append('address["city"]', data.address[1]);
    newData.append('address["state"]', data.address[2]);
    newData.append('address["country"]', data.address[3]);
    // newData.append('image', data.image);
    // newData.append('cover_image', data.cover_image);

    const res = await request.post('/shop/update', newData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteShopFn = async (uid: string) => {
  try {
    const res = await request.post('/shop/delete', { uid });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getShopsFn = async () => {
  try {
    const res = await request.get('/shop');

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getShopDetailsFn = async (uid: string) => {
  try {
    const res = await request.post('/shop/details', { uid });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// products

export const getShopProductsFn = async (uid: string) => {
  try {
    const res = await request.get(`/shop/product?uid=${uid}`);

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export interface CreateShopProductDataType {
  shop_uid: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  cover_image: File;
  image: File;
}
export interface EditShopProductDataType {
  uid: string; // product uid
  description: string;
  price: number;
  quantity: number;

  name?: string;
  cover_image?: File;
  image?: File;
}

export const createShopProductFn = async (data: CreateShopProductDataType) => {
  try {
    const newData = new FormData();
    newData.append('shop_uid', data.shop_uid);
    newData.append('name', data.name);
    newData.append('description', data.description);
    newData.append('price', data.price);
    newData.append('quantity', data.quantity);
    newData.append('image', data.image);
    newData.append('cover_image', data.cover_image);

    const res = await request.post('/shop/product', newData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const editShopProductFn = async (data: EditShopProductDataType) => {
  try {
    const res = await request.post('/shop/product', data);

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};