const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  try {
    const tagData = await tag.findAll();
    res.json(tagData);
  }
    catch(err) {
      console.log(err)
      res.json(err);
    }
  });


  router.get('/:id', (req, res) => {
    try {
      const tagData = await tag.findByPk(req.params.id, 
        {
          include: [{ model: product}, { model: productTag }],
        });
    
      if (!tagData) {
        res.json({ message: "No tag found with this ID."});
          return;
    }
      res.json(tagData);
    }  
      catch(err) {
        console.log(err)
        res.json(err);
      }
});

router.post('/', (req, res) => {
  try {
    const tagData = await tag.create(req.body);
      res.json(tagData);
      }
        catch(err) {
          console.log(err)
          res.json(err);
      }
  });

router.put('/:id', (req, res) => {
  try {
    const tagData = await tag.update(req.body, 
      {
        where: {
          id:req.params.id
        },
        })
          console.log(tagData)
          res.json(tagData)
      }
          catch(err) {
            console.log(err)
            res.json(err)
          }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await tag.destroy({
      where: {
        id: req.params.id,
      },
    });

  if (!tagData) {
    res.json({ msg: "No tag found with this ID."});
      return;
  }
  
  res.json(tagData);
  }
  catch(err) {
    console.log(err)
    res.json(err);
  }
});

module.exports = router;
