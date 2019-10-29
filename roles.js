const {Role, validate} = require('../models/roles');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let role = await Role.findOne({ email: req.body.name });
    if (role) return res.status(400).send('Role already Save.');
    role = new Role(_.pick(req.body, ['name', 'permissions']));
    await role.save();
    res.send("role is save");
});
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const role = await Role.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    }); 
    if (!role) return res.status(404).send('The role with the given ID was not found.');
    res.send(role);
  });
  //db.roles.update({"_id": ObjectId("5c6bdf42ce3d8919c0fb4f80")}, {$addToSet: { permissions: { $each: [ "password1234", "permission2","permission3"] } } })
//db.roles.update({"_id": ObjectId("5c6bdf42ce3d8919c0fb4f80")}, {$pull: { permissions: { $in: [ "password1234"] } } })

router.delete('/:id',async (req, res) => {
    const role = await Role.findByIdAndRemove(req.params.id);
    if (!role) return res.status(404).send('The role with the given ID was not found.');
    res.send(role);
});
router.get('/:id', async (req, res) => {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).send('The role with the given ID was not found.');
    res.send(role);
  });
  
module.exports = router;