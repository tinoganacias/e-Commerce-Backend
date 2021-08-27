const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const productData = await product.findAll({
      include: [{ model: category }, { model: tag }],
    });

    res.json(productData);
  }
    catch(err) {
      console.log(err);
      res.json(err);
    }
  });


router.get('/:id', async (req, res) => {
  try {
    const productData = await product.findByPk(req.params.id,
      {
        include: [{ model: category}, { model: tag}], 
      });

  if (!productData) {
    res.json({ msg: "No product found matching this ID"});
      return;
  }

  res.json(productData);
  }
  catch(err) {
    console.log(err);
    res.json(err);
  }
});


router.post('/', (req, res) => {

  Product.create(req.body)
    .then((product) => {
     
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.json(product);
    })
    .then((productTagIds) => res.json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


router.put('/:id', (req, res) => {
 
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
  
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
     
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
     
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
    
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

     
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
        res.json(err);
    });
});


router.delete('/:id', async (req, res) => {
  try {
    const productData = await product.destroy({
      where: {
        id: req.params.id,
      },
});

if (!productData) {
  res.json({ msg: "No product found with this ID."});
    return;
}
  res.json(productData);
  } 
    catch(err) {
      console.log(err);
      res.json(err);
  }
});


module.exports = router;
