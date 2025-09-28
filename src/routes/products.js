const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find({}).lean();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

const makeSlug = (name) => {
  const base = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${base}-${Date.now()}`;
};

router.post('/', async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.name) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (!payload.slug) {
      payload.slug = makeSlug(payload.name);
    }
    const product = await Product.create(payload);
    console.log(product);
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
