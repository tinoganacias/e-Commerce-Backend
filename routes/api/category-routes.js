const router = require('express').Router();
const { rawListeners } = require('process');
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const categoryData = await category.findAll(req.params.id, 
      {
        include: [{ model: product}],
      });
      
      res.json(categoryData)
      }
      catch (err) {
        res.json(err)
        console.log(err)
      }
});

router.get('/:id', (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, 
      {
        include: [{model:Product}]
      });

  if (!categoryData) {
    res.json({ msg: "No category found with this ID."});
    return;
  }    
  res.json(categoryData);
} 
  catch (err) {
    console.log(err)
    res.json(err)
  }
});

router.post('/', async(req, res) => {
  try {
    const categoryData = await category.create(req.body);
    res.json(categoryData);
  }
    catch (err) {
      console.log(err)
      res.json(err);
    }
  });

router.put('/:id', (req, res) => {
  try {
    const categoryData = await category.update(req.body, 
      {
        where: {
          id: req.params.id},
      })
        console.log(categoryData)
          res.json(categoryData)
      }
        catch(err) {
          console.log(err)
            res.json(err)
        }
      });

router.delete('/:id', (req, res) => {
  try { 
    const categoryData = await category.destory({
      where: {
        id: req.params.id,
      },
    }),

    if (!categoryData) {
      res.json({ msg: "No category found with this ID."});
        return;
    }

    res.json(categoryData);
  } catch (err) {
      console.log(err) 
      res.json(err);
  }
});

module.exports = router;
