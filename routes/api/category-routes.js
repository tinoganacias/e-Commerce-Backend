const router = require('express').Router();
const { rawListeners } = require('process');
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const CategoryData = await Category.findAll(req.params.id, 
      {
        include: [{ model: product}],
      });
      
      res.json(CategoryData)
      }
      catch (err) {
        res.json(err)
        console.log(err)
      }
});

router.get('/:id', async(req, res) => {
  try {
    const CatagoryData = await Category.findByPk(req.params.id, 
      {
        include: [{model:Product}]
      });

  if (!CategoryData) {
    res.json({ msg: "No Category found with this ID."});
    return;
  }    
  res.json(CategoryData);
} 
  catch (err) {
    console.log(err)
    res.json(err)
  }
});

router.post('/', async(req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    res.json(CategoryData);
  }
    catch (err) {
      console.log(err)
      res.json(err);
    }
  });

router.put('/:id', async(req, res) => {
  try {
    const CategoryData = await Category.update(req.body, 
      {
        where: {
          id: req.params.id},
      })
        console.log(CategoryData)
          res.json(CategoryData)
      }
        catch(err) {
          console.log(err)
            res.json(err)
        }
      });

router.delete('/:id', async (req, res) => {
  try { 
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.json({ msg: "No Category found with this ID."});
        return;
    }

    res.json(CategoryData);
  } catch (err) {
      console.log(err) 
      res.json(err);
  }
});

module.exports = router;
