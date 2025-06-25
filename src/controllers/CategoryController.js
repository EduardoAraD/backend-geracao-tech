const CategoryModel = require("../models/CategoryModel");

class CategoryController {

  async search(request, response) {
    try {
      const { limit, page, fields, use_in_menu } = request.query;

      const limitResponse = limit === undefined ? 12 : Number(limit);
      const limitSearch = limitResponse < 0 ? 12: limitResponse;
      const pageSearch = (page === undefined ? 0 : Number(page));
      const fieldsSearch = fields === undefined ? ['id', 'name', 'slug', 'use_in_menu'] : fields.split(',');
      const useInMenuSearch = use_in_menu === undefined ? true : use_in_menu === '1' ? true : false;

      const where = useInMenuSearch ? { use_in_menu: true } : {}

      const { rows, count } = await CategoryModel.findAndCountAll({
        attributes: fieldsSearch,
        where,
        limit: limitSearch,
        offset: pageSearch * limitSearch,
      })
      
      return response.status(200).json({
        data: rows,
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

  async getById(request, response) {
    const { id } = request.params;

    const category = await CategoryModel.findOne({ where: { id }});

    if(category === null) {
      return response.status(404).json({
        message: "Categoria não encontrada!"
      })
    }

    return response.status(200).json({
      category,
    })
  }

  async create(request, response) {
    try {
      const body = request.body;

      await CategoryModel.create(body);

      return response.status(201).json({
        message: "Categoria criada com sucesso!"
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

      await CategoryModel.update(body, { where: { id }})

      return response.status(204).json({
        message: "Categoria atualizada com sucesso!"
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

      await CategoryModel.destroy({ where: { id }})

      return response.status(204).json({
        message: "Categoria removida com sucesso!"
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = CategoryController;
