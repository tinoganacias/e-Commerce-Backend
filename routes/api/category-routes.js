const router = require('express').Router();

const {Category, Product } = require('../../models');

router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll( 
      {
        include: [{ model: Product}],
      });
      
      res.json(categoryData)
      }
      catch (err) {
        res.json(err)
        console.log(err)
      }
});

router.get('/:id', async(req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, 
      {
        include: [{model:Product}],
      },
      {
        where:{
          id:req.params.id
        }
      });

  if (!categoryId) {
    res.json({ msg: "No Category found with this ID."});
    return;
  }    
  res.json(categoryId);
} 
  catch (err) {
    console.log(err)
    res.json(err)
  }
});

router.post('/', async(req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
      
    res.json(newCategory);
  }
    catch (err) {
      console.log(err)
      res.json({msg: "Could not create category"})
      console.log(err)
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const update = await Category.update({
      category_name:req.body.category_name
    },
      {
        where: {
          id: req.params.id}
      });
      if(update) {
        res.json(update)
      }
      else
      {
        res.json({msg: "could not update"})
      }
      } catch (err) {
        res.json({msg: "could not update category"})
        console.log(err)
      }
    });
      

router.delete('/:id', async (req, res) => {
  try { 
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      console.log(err)
      res.json({ message:"No Category found with this ID."});
        return;
    }

    res.json(deleteCategory);
  } catch (err) {
      console.log(err) 
      res.json(err);
  }
});

module.exports = router;
