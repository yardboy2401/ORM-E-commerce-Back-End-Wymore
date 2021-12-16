//require express router and bring in Category/Product sequelize Models
const router = require('express').Router();
const { Category, Product } = require('../../models');

//get route for all categories from database
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get route for obtaining category data from db for specific id
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product }],
    });

    if (!singleCategoryData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
    /* req.body should look like this...
    {
      "category_name": "Basketball",
    }
  */
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
});

  // update a category by its `id` value
router.put('/:id', async (req, res) => {

      /* req.body should look like this...
    {
      "category_name": "Basketball",
    }
  */
  try {
    const CategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export router
module.exports = router;
