//require router and bring in Tag/Product/ProductTag sequelize Models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

  // find all tags
router.get('/', async (req, res) => {
  // be sure to include its associated Product data
    try {
    const TagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      
      include: [{ model: Product, through: ProductTag }],
    });

    if (!singleTagData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
    /* req.body should look like this...
    {
      "tag_name": "Basketball"
    }
  */
    try {
      const TagData = await Tag.create(req.body);
      res.status(200).json(TagData);
    } catch (err) {
      res.status(400).json(err);
    }
});

  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
      /* req.body should look like this...
    {
      "tag_name": "Basketball",
    }
    */
  try {
    const TagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export router
module.exports = router;
