const mongoose = require('mongoose');
const { getCategoryNames, getSubCategories, getGender, getSizes, getFit, getProductTypes, GENDER, getNeckTypes, getSleeveTypes, getCountryOfOrigin, getCareInstructions, getMadeOf, getColors  } = require('../constant');

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
      enum: getSizes()
    },
    stock: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);


const productInfoSchema = new mongoose.Schema(
  {
    madeOf:{
      type: String,
      trim: true,
      enum: getMadeOf()
    },
    neckType:{
      type: String,
      enum: getNeckTypes(),
      trim: true
    },
    pattern:{
      type: String,
      trim: true
    },
    sleeve:{
      type: String,
      enum: getSleeveTypes(),
      trim: true
    },
    careInstructions:{
      type: String,
      trim: true,
      enum: getCareInstructions()
    },
    contryOfOrigin:{
      type: String,
      trim: true,
      enum: getCountryOfOrigin()
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    oldPrice: {
      type: Number,
      min: 0
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    sizes: {
      type: [sizeSchema],
      validate: {
        validator: (sizes) => Array.isArray(sizes) && sizes.length > 0,
        message: 'At least one size is required'
      }
    },
    color:{
      type: String,
      enum: getColors(),
      trim: true
    },
    gender: {
      type: String,
      enum: getGender(),
      default: GENDER.UNISEX
    },
    // categoryKey is the enum key like 'TOPWEAR', used to resolve subCategory list
    categoryKey: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      enum: getCategoryNames(),
      required: true
    },
    productType: {
      type: String,
      trim: true,
      enum: getProductTypes(),
      required: true
    },
    fit: {
      type: String,
      trim: true,
      enum: getFit(),
      required: true
    },
    subCategory: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (val) {
          const allowed = getSubCategories(this.categoryKey);
          return Array.isArray(allowed) && allowed.includes(val);
        },
        message: 'Invalid subCategory for the selected categoryKey'
      }
    },
    images: {
      type: [String],
      validate: {
        validator: (images) => Array.isArray(images) && images.length > 0,
        message: 'At least one product image is required'
      }
    },
    productInfo: {
      type: productInfoSchema
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: 'text', category: 'text', subCategory: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

