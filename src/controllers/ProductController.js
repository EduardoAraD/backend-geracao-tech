const { Op } = require("sequelize");

const CategoryModel = require("../models/CategoryModel");
const CategorysAndProducts = require("../models/CategorysAndProductsModel");
const ImageProductModel = require("../models/ImageProductModel");
const OptionsProductModel = require("../models/OptionsProductModel");
const ProductModel = require("../models/ProductModel");

class ProductController {
  constructor () {
    ProductModel.associate({ ImageProductModel, OptionsProductModel, CategorysAndProducts, CategoryModel })
  }

  async search(request, response) {
    try {
      const { limit, page, fields, match, category_ids, price_range, option } = request.query;

      const limitResponse = limit === undefined ? 12 : Number(limit);
      const limitSearch = limitResponse < 0 ? 12: limitResponse;
      const pageSearch = page === undefined ? 0 : Number(page);
      
      const fieldsSearch = fields === undefined ?
        ['enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount', 'rate', 'mark', 'gender', 'state']
        : fields.split(',');

      const matchSearch = match === undefined ? '' : match;
      const categoryIdsSearch = category_ids === undefined ? [] : category_ids.split(',');
      const priceRange = price_range === undefined ? [ -1, -1] : price_range.split('-');
      const [minRange, maxRange] = priceRange;
      const optionsSearch = option === undefined ? [] : option.split(',');

      const { rows, count } = await ProductModel.findAndCountAll({
        // attributes: fieldsSearch,
        include: [
          { model: ImageProductModel, attributes: ['path'], },
          { model: OptionsProductModel, attributes: ["title", "shape", "radius","type", "values"] },
          { model: CategoryModel, attributes: ['id', 'name'] },
        ],
        // where: {
        //   price: {
        //     [Op.and]: { [Op.gte]: minRange, [Op.lte]: maxRange }
        //   },
        //   [Op.or]: [
        //     {
        //       name: { [Op.substring]: matchSearch }
        //     },
        //     {
        //       description: { [Op.substring]: matchSearch }
        //     }
        //   ],
        //   // [CategoryModel.id]: categoryIdsSearch,
        //   // [OptionsProductModel.values]: { [Op.substring]: optionsSearch },
        // },
        limit: limitSearch,
        offset: pageSearch * limitSearch,
      })

      const products = rows.map(item => ({
        id: item.id,
        enabled: item.enabled,
        name: item.name,
        slug: item.slug,
        use_in_menu: item.use_in_menu,
        stock: item.stock,
        description: item.description,
        price: item.price,
        price_with_discount: item.price_with_discount,
        rate: item.rate,
        mark: item.mark,
        gender: item.gender,
        state: item.state,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        images: item.ImageProductModels.map(img => img.path),
        options: item.OptionsProductModels.map(opt => ({
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values.replace("{", '').replace("}", '').split(",")
        })),
        categorys: item.CategoryModels.map(categ => ({
          id: categ.id,
          name: categ.name,
        }))
      }))

      return response.status(200).json({
        data: products,
        total: count,
        limit: limitSearch,
        page: pageSearch,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async getProductHigh(request, response) {
    try {
      const data = await ProductModel.findOne({
        order: [
          ['price_with_discount', 'ASC']
        ],
        include: [
          { model: ImageProductModel, attributes: ['path'], },
          { model: OptionsProductModel, attributes: ["title", "shape", "radius","type", "values"] },
          { model: CategoryModel, attributes: ['id', 'name'] },
        ],
      })

      const product = {
        id: data.id,
        enabled: data.enabled,
        name: data.name,
        slug: data.slug,
        use_in_menu: data.use_in_menu,
        stock: data.stock,
        description: data.description,
        price: data.price,
        price_with_discount: data.price_with_discount,
        rate: data.rate,
        mark: data.mark,
        gender: data.gender,
        state: data.state,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        images: data.ImageProductModels.map(img => img.path),
        options: data.OptionsProductModels.map(opt => ({
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values.replace("{", '').replace("}", '').split(",")
        })),
        categorys: data.CategoryModels.map(categ => ({
          id: categ.id,
          name: categ.name,
        }))
      }

      return response.status(200).json({
        product,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;

      const data = await ProductModel.findByPk(id, {
        include: [ImageProductModel, OptionsProductModel, CategoryModel],
      })

      if(data === null) {
        return response.json({
          message: "Produto não encontrado!"
        })
      }

      const product = {
        id,
        enabled: data.enabled,
        name: data.name,
        slug: data.slug,
        use_in_menu: data.use_in_menu,
        stock: data.stock,
        description: data.description,
        price: data.price,
        price_with_discount: data.price_with_discount,
        rate: data.rate,
        mark: data.mark,
        gender: data.gender,
        state: data.state,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        images: data.ImageProductModels.map(img => img.path),
        options: data.OptionsProductModels.map(opt => ({
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values.replace("{", '').replace("}", '').split(",")
        })),
        categorys: data.CategoryModels.map(categ => ({
          id: categ.id,
          name: categ.name,
        }))
      }

      return response.status(200).json({
        product,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async create(request, response) {
    try {
      const { images, options, category_ids, ...body } = request.body;

      const product = await ProductModel.create(body);

      const imagesList = images.map(item => ({ product_id: product.id, ...item }));
      const optionsList = options.map(item => ({ product_id: product.id, values: item.values.join(','), ...item }));
      const categorysList = category_ids.map(item => ({ product_id: product.id, category_id: item }))

      await ImageProductModel.bulkCreate(imagesList);
      await OptionsProductModel.bulkCreate(optionsList);
      await CategorysAndProducts.bulkCreate(categorysList);

      return response.status(201).json({
        message: "Produto criado com sucesso!",
        product,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const body = request.body;

      await ProductModel.update(body, { where: id })

      return response.status(204).json({
        message: "Produto atualizado com sucesso!"
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
    
  }

  async remove(request, response) {
    try {
      const { id } = request.params;

      await ProductModel.destroy({ where: id });

      return response.status(204).json({
        message: "Produto removido com sucesso!"
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = ProductController;
