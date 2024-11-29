const productService = require('../services/productService');
const resolvers = {
  Query: {
    products: async () => await productService.getProducts(),
    product: async (_, { _id }) => await productService.getProductById(_id),
    // Aquí no debe existir nada como 'users'
  },
  Mutation: {
    createProduct: async (_, args) => await productService.createProduct(args),
    updateProduct: async (_, args) => await productService.updateProduct(args),
    deleteProduct: async (_, { _id }) => await productService.deleteProduct(_id),
  },
};

module.exports = resolvers;

