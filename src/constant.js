const createCategory = (name, subCategories) => ({
  name,
  subCategories
});

const PRODUCT_TYPE = {
  T_SHIRT: 'T-shirt',
  HOODIE: 'Hoodie'
}

const getProductTypes = () => Object.values(PRODUCT_TYPE);

const CATEGORIES = {
  TOPWEAR: createCategory('Top Wear', [
    'Oversized Printed T-Shirts',
    'Oversized Plain T-Shirts',
    'Premium T-Shirts'
  ]),
  HOODIES: createCategory('Hoodies', [
    'Printed Hoodies',
    'Plain Hoodies'
  ])
};

const getCategoryNames = () => Object.values(CATEGORIES).map(category => category.name);

const getSubCategories = (categoryKey) => CATEGORIES[categoryKey]?.subCategories || [];

const getAllSubCategories = () => 
  Object.values(CATEGORIES).flatMap(category => category.subCategories);

const GENDER = {
  MEN: 'Men',
  WOMEN: 'Women',
  UNISEX: 'Unisex'
}

const FIT = {
  REGULAR: 'Regular Fit',
  OVERSIZED: 'Oversized Fit'
}

const SIZES = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL'
}

const getGender = () => Object.values(GENDER);

const getSizes = () => Object.values(SIZES);

const getFit = () => Object.values(FIT);

const NECK_TYPE = {
  V_NECK: 'V-Neck',
  POLO_NECK: 'Polo Neck',
  SQUARE_NECK: 'Square Neck',
  ROUND_NECK: 'Round Neck'
}
const getNeckTypes = () => Object.values(NECK_TYPE);

const SLEEVE_TYPE = {
  HALF_SLEEVE: 'Half Sleeve',
  FULL_SLEEVE: 'Full Sleeve'
}
const getSleeveTypes = () => Object.values(SLEEVE_TYPE);

const COUNTRY_OF_ORIGIN = {
  INDIA: 'India'
}
const getCountryOfOrigin = () => Object.values(COUNTRY_OF_ORIGIN);

const CARE_INSTRUCTIONS = {
  HAND_WASH: 'Hand Wash',
  MACHINE_WASH: 'Machine Wash',
  DRY_CLEAN: 'Dry Clean'
}
const getCareInstructions = () => Object.values(CARE_INSTRUCTIONS);

const MADE_OF = {
  COTTON: 'Cotton',
  POLYSTER: 'Polyster',
  LINEN: 'Linen',
  WOOL: 'Wool',
  SILK: 'Silk',
}
const getMadeOf = () => Object.values(MADE_OF);

const COLORS = [
  { name: "Lilac", hex: "#C8A2C8" },
  { name: "Navy", hex: "#000080" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Aqua Blue", hex: "#00FFFF" },
  { name: "Green", hex: "#556B2F" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Peach", hex: "#FFDAB9" },
  { name: "Maroon", hex: "#800000" },
  { name: "Red", hex: "#FF0000" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Black", hex: "#000000" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Cork", hex: "#C2B280" },
  { name: "Swanwhite", hex: "#F8F8F8" }
]

const getColors = () => COLORS.map(color => color.name);

const PATTERNS = {
  GRAPHIC: 'Graphic Print',
  TYPOPGRAPHIC: 'Typographic Print',
  PLAIN: 'Plain',
  PUMP_PRINT: 'Pump Print'
}

const getPatterns = () => Object.values(PATTERNS);


module.exports = {
  CATEGORIES,
  GENDER,
  SIZES,
  PRODUCT_TYPE,
  FIT,
  COLORS,
  getFit,
  getCategoryNames,
  getSubCategories,
  getAllSubCategories,
  getGender,
  getSizes,
  getProductTypes,
  getNeckTypes,
  getSleeveTypes,
  getCountryOfOrigin,
  getCareInstructions,
  getMadeOf,
  getColors,
  getPatterns
}
