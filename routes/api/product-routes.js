const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }]
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
    const productData = await Product.findByPk(req.params.id,
      {
        include: [Category, { model: Tag, through: ProductTag}] 
      },
      {
        where: {
          id: req.params.id
        }
      });

  if (!productData) {
    res.json({ msg: "No Product found matching this ID"});
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
    .then((Product) => {
     
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
    
      res.json(Product);
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
  
      return ProductTag.findAll({ where: { Product_id: req.params.id } });
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
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
});

if (!deleteProduct) {
  res.json({ msg: "No Product found with this ID."});
    return;
}
  res.json(deleteProduct);
  } 
    catch(err) {
      console.log(err);
      res.json(err);
  }
});


module.exports = router;
