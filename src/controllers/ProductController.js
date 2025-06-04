const ImageProductModel = require("../models/ImageProductModel");
const OptionsProductModel = require("../models/OptionsProductModel");
const ProductModel = require("../models/ProductModel");

class ProductController {
  constructor () {
    ProductModel.associate({ ImageProductModel, OptionsProductModel })
  }

  async search(request, response) {
    const { limit, page, fields, match, category_ids, price_range, option } = request.query;

    const limitResponse = limit === undefined ? 12 : Number(limit);
    const limitSearch = limitResponse < 0 ? 12: limitResponse;
    const pageSearch = page === undefined ? 1 : Number(page);
    const fieldsSearch = fields === undefined ?
      ['enabled', 'name', 'slug', 'use_in_menu', 'stock', 'description', 'price', 'price_with_discount', 'images', 'options']
      : fields.split(',');
    const matchSearch = match === undefined ? '' : match;
    const categoryIdsSearch = category_ids === undefined ? [] : category_ids.split(',');
    const priceRange = price_range === undefined ? [ -1, -1] : price_range.split('-');
    const [minRange, maxRange] = priceRange;
    const optionsSearch = options === undefined ? [] : option.split(',');

    const { rows, count } = await ProductModel.findAndCountAll({
      attributes: fieldsSearch,
      // where: ?
      limit: limitSearch,
      offset: pageSearch * limitSearch,
    })
    
    // - `match=Tênis`
    //   - Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
    // - `category_ids=15,24`
    //   - Query string usada para filtrar o resultado de produtos pelo ID das categorias
    // - `price-range=100-200`
    //   - Query string para filtrar o resultado de produtos por uma determinada "janela" de preços 
    // - `option[45]=GG,PP`
    //   - Query string para filtrar o resultado de produtos pelo valor das opções disponíveis
    return response.json({
      data: rows,
      total: count,
      limit: limitSearch,
      page: pageSearch,
    })
  }

  async getById(request, response) {
    const { id } = response.params;

    const product = await ProductModel.findByPk(id, {
      include: [ImageProductModel, OptionsProductModel],
    })

    if(product === null) {
      return response.json({
        message: "Produto não encontrado!"
      })
    }

    return response.json({
      product,
    })
  }

  async create(request, response) {
    const { images, options} = request.body;

    const product = await ProductModel.create(body, {
      include: [ ImageProductModel, OptionsProductModel ]
    });

    product.setImages(images);
    product.setOptions(options);

    return response.status(201).json({
      message: "Produto criado com sucesso!"
    })
  }

  async update(request, response) {
    const { id } = request.params;
    const body = request.body;

    await ProductModel.update(body, { where: id })

    return response.json({
      message: "Produto atualizado com sucesso!"
    })
  }

  async remove(request, response) {
    const { id } = request.params;

    await ProductModel.destroy({ where: id });

    return response.json({
      message: "Produto removido com sucesso!"
    })
  }
}

module.exports = ProductController;
