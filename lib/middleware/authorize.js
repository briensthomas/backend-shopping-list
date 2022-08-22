const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (req.user.email !== 'admin' && req.user.id !== item.user_id)
      throw new Error('Access denied');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
