const express = require('express');
const {
  CATEGORIES,
  getCategoryNames,
  getAllSubCategories,
  getSubCategories,
  getGender,
  getSizes,
  getFit,
  getProductTypes,
  getNeckTypes,
  getSleeveTypes,
  getCountryOfOrigin,
  getCareInstructions,
  getMadeOf,
  getColors,
  COLORS,
  getPatterns
} = require('../constant');

const router = express.Router();

router.get('/categories', (_req, res) => {
  res.json(getCategoryNames());
});

router.get('/category-keys', (_req, res) => {
  res.json(Object.keys(CATEGORIES));
});

router.get('/subcategories', (_req, res) => {
  res.json(getAllSubCategories());
});

router.get('/subcategories/:categoryKey', (req, res) => {
  const sub = getSubCategories(req.params.categoryKey);
  res.json(sub);
});

router.get('/gender', (_req, res) => res.json(getGender()));
router.get('/sizes', (_req, res) => res.json(getSizes()));
router.get('/fit', (_req, res) => res.json(getFit()));
router.get('/product-types', (_req, res) => res.json(getProductTypes()));
router.get('/neck-types', (_req, res) => res.json(getNeckTypes()));
router.get('/sleeve-types', (_req, res) => res.json(getSleeveTypes()));
router.get('/countries', (_req, res) => res.json(getCountryOfOrigin()));
router.get('/care-instructions', (_req, res) => res.json(getCareInstructions()));
router.get('/made-of', (_req, res) => res.json(getMadeOf()));
router.get('/colors', (_req, res) => res.json(getColors()));
router.get('/colors-full', (_req, res) => res.json(COLORS));
router.get('/patterns', (_req, res) => res.json(getPatterns()));

module.exports = router;

