import { useProductFactory } from '@vue-storefront/core';
import { mapProductSearchByQueryParams, mapProductSearchBySingleProductParams } from '../../helpers';
import { UseProduct, BapiProduct } from '../../types';
import { getProductsByQuery, getProductById } from '@vue-storefront/about-you-api';

const useProduct: (cacheId: string) => UseProduct<BapiProduct, any> = useProductFactory<BapiProduct, any, any>({
  productsSearch: async ({id, ...params}) => {
    let products: { entities: Array<BapiProduct>; pagination: any};

    if (id) {
      const product = await getProductById(id, mapProductSearchBySingleProductParams(params));
      products = { entities: [product], pagination: { total: 1 } };
    } else {
      products = await getProductsByQuery(mapProductSearchByQueryParams(params));
    }

    return {
      data: products.entities,
      total: products.pagination.total
    };
  },
  sortByOptions: [
    { value: 'price-asc', label: 'Price from low to high' },
    { value: 'price-desc', label: 'Price from high to low' },
    { value: 'new-asc', label: 'Latest' },
    { value: 'reduction-desc', label: 'Discount from high to low' },
    { value: 'reduction-asc', label: 'Discount from low to hight' },
    { value: 'new-desc', label: 'Oldest' }
  ]
});

export default useProduct;
