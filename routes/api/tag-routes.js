const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {include: [{model:Product}]}
    );
    res.json(tagData
);
  }
    catch(err) {
      console.log(err)
      res.json(err);
    }
  });


  router.get('/:id', async(req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, 
 
        {
          include: [{ model: Product}]
        },
        {
          where:{ 
            id:req.params.id
          }
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

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name:req.body.tag_name
    });
      res.json(newTag);
      }
        catch(err) {
          console.log(err)
          res.json(err);
      }
  });

router.put('/:id', async(req, res) => {
  try {
    const update = await Tag.update({
      tag_name:req.body.tag_name
    },{
      where:{
        id:req.params.id
      }
    });
 if(update) {
   res.json(update)

 }else {
   res.json({msg: "could not update"})
 }
} catch (err) {
  res.json({msg: "could not update tag"})
console.log(err)
}
});

router.delete('/:id', async(req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });

  if (!deleteTag) {
    res.json({ msg: "No tag found with this ID."});
      return;
  }
  
  res.json(deleteTag);
  }
  catch(err) {
    console.log(err)
    res.json(err);
  }
});

module.exports = router;
