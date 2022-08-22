const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getById(req.params.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll();
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.insert({
        user_id: req.user.id,
        ...req.body,
      });
      res.json(items);
    } catch (e) {
      next(e);
    }
  });
// TO DO - implement items CRUD
