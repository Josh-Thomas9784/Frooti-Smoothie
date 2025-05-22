// Get URL parameters to determine which product was selected
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = parseFloat(urlParams.get('price'));
const productType = urlParams.get('type') || 'drink'; // Default to drink if not specified

// Product data (in a real app, this might come from a database)
const products = {
  'Strawberry Passion': {
    image: 'pictures/1.png',
    calories: 720,
    description: 'Made with strawberries, orange juice & banana. All natural ingredients blended to perfection.',
    ingredients: [
      { name: 'Strawberry', type: 'base', removable: false, calories: 150 },
      { name: 'Orange Juice', type: 'liquid', removable: true, calories: 120, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Ice', type: 'other', removable: true, calories: 0 }
    ],
    protein: 5,
    fat: 2,
    carbs: 40,
    sugar: 30
  },
  'Mango Smoothie': {
    image: 'pictures/2.png',
    calories: 680,
    description: 'Tropical mango blended with pineapple, orange juice & banana.',
    ingredients: [
      { name: 'Mango', type: 'base', removable: false, calories: 140 },
      { name: 'Pineapple', type: 'fruit', removable: true, calories: 80, swappable: true },
      { name: 'Orange Juice', type: 'liquid', removable: true, calories: 120, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true }
    ],
    protein: 4,
    fat: 1,
    carbs: 45,
    sugar: 35
  },
  'Berry Smoothie': {
    image: 'pictures/3.png',
    calories: 650,
    description: 'A blend of mixed berries, apple juice & yogurt for a refreshing treat.',
    ingredients: [
      { name: 'Mixed Berries', type: 'base', removable: false, calories: 120 },
      { name: 'Apple Juice', type: 'liquid', removable: true, calories: 110, swappable: true },
      { name: 'Yogurt', type: 'dairy', removable: true, calories: 100, swappable: true },
      { name: 'Honey', type: 'sweetener', removable: true, calories: 60, swappable: true }
    ],
    protein: 6,
    fat: 2,
    carbs: 38,
    sugar: 28
  },
  'Green Smoothie': {
    image: 'pictures/4.png',
    calories: 580,
    description: 'Spinach, kale, banana & almond milk. A nutritious green delight.',
    ingredients: [
      { name: 'Spinach', type: 'base', removable: false, calories: 40 },
      { name: 'Kale', type: 'base', removable: true, calories: 35, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Almond Milk', type: 'liquid', removable: true, calories: 80, swappable: true }
    ],
    protein: 8,
    fat: 3,
    carbs: 30,
    sugar: 20
  },
  'Tropical Paradise': {
    image: 'pictures/5.png',
    calories: 690,
    description: 'Pineapple, mango, coconut milk & a hint of lime. A tropical getaway in a cup.',
    ingredients: [
      { name: 'Pineapple', type: 'base', removable: false, calories: 80 },
      { name: 'Mango', type: 'fruit', removable: true, calories: 140, swappable: true },
      { name: 'Coconut Milk', type: 'liquid', removable: true, calories: 140, swappable: true },
      { name: 'Lime', type: 'other', removable: true, calories: 10, swappable: true }
    ],
    protein: 3,
    fat: 5,
    carbs: 42,
    sugar: 32
  },
  'Banana Blast': {
    image: 'pictures/6.png',
    calories: 640,
    description: 'Banana, peanut butter, milk & honey. A creamy, protein-rich treat.',
    ingredients: [
      { name: 'Banana', type: 'base', removable: false, calories: 105 },
      { name: 'Peanut Butter', type: 'other', removable: true, calories: 190, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true },
      { name: 'Honey', type: 'sweetener', removable: true, calories: 60, swappable: true }
    ],
    protein: 12,
    fat: 8,
    carbs: 35,
    sugar: 25
  },
  'Chocolate Dream': {
    image: 'pictures/7.png',
    calories: 750,
    description: 'Chocolate, banana, milk & a touch of vanilla. A dessert-like indulgence.',
    ingredients: [
      { name: 'Chocolate', type: 'base', removable: false, calories: 200 },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true },
      { name: 'Vanilla Extract', type: 'other', removable: true, calories: 10, swappable: true }
    ],
    protein: 10,
    fat: 12,
    carbs: 45,
    sugar: 35
  },
  'Peanut Butter Cup': {
    image: 'pictures/8.png',
    calories: 820,
    description: 'Peanut butter, chocolate, banana & milk. Like a liquid peanut butter cup.',
    ingredients: [
      { name: 'Peanut Butter', type: 'base', removable: false, calories: 190 },
      { name: 'Chocolate', type: 'other', removable: true, calories: 200, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true }
    ],
    protein: 15,
    fat: 18,
    carbs: 40,
    sugar: 30
  },
  'Coffee Energizer': {
    image: 'pictures/9.png',
    calories: 620,
    description: 'Coffee, banana, milk & a touch of cinnamon. The perfect morning boost.',
    ingredients: [
      { name: 'Coffee', type: 'base', removable: false, calories: 5 },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true },
      { name: 'Cinnamon', type: 'other', removable: true, calories: 5, swappable: true }
    ],
    protein: 8,
    fat: 5,
    carbs: 30,
    sugar: 20
  },
  'Protein Power': {
    image: 'pictures/10.png',
    calories: 700,
    description: 'Whey protein, banana, milk & peanut butter. Perfect post-workout recovery.',
    ingredients: [
      { name: 'Whey Protein', type: 'base', removable: false, calories: 120 },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true },
      { name: 'Peanut Butter', type: 'other', removable: true, calories: 190, swappable: true }
    ],
    protein: 30,
    fat: 10,
    carbs: 35,
    sugar: 20
  },
  'Strawberry Bowl': {
    image: 'pictures/drinks (1).png',
    calories: 720,
    description: 'Strawberry base topped with granola, fresh berries & honey.',
    ingredients: [
      { name: 'Strawberry', type: 'base', removable: false, calories: 150 },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Fresh Berries', type: 'topping', removable: true, calories: 80, swappable: true },
      { name: 'Honey', type: 'topping', removable: true, calories: 60, swappable: true },
      { name: 'Almond Milk', type: 'liquid', removable: true, calories: 80, swappable: true }
    ],
    protein: 10,
    fat: 6,
    carbs: 45,
    sugar: 30
  },
  'Blueberry Bowl': {
    image: 'pictures/drinks (2).png',
    calories: 700,
    description: 'Blueberry base topped with granola, banana slices & coconut flakes.',
    ingredients: [
      { name: 'Blueberry', type: 'base', removable: false, calories: 130 },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Banana Slices', type: 'topping', removable: true, calories: 105, swappable: true },
      { name: 'Coconut Flakes', type: 'topping', removable: true, calories: 35, swappable: true },
      { name: 'Almond Milk', type: 'liquid', removable: true, calories: 80, swappable: true }
    ],
    protein: 8,
    fat: 5,
    carbs: 40,
    sugar: 25
  },
  'Berry Bowl': {
    image: 'pictures/drinks (3).png',
    calories: 710,
    description: 'Acai, mixed berries, banana & granola. Topped with fresh fruit & honey.',
    ingredients: [
      { name: 'Acai', type: 'base', removable: false, calories: 100 },
      { name: 'Mixed Berries', type: 'fruit', removable: true, calories: 120, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Honey', type: 'topping', removable: true, calories: 60, swappable: true }
    ],
    protein: 8,
    fat: 4,
    carbs: 50,
    sugar: 35
  },
  'Green Bowl': {
    image: 'pictures/drinks (4).png',
    calories: 650,
    description: 'Spinach, kale, banana & almond milk base topped with granola & seeds.',
    ingredients: [
      { name: 'Spinach', type: 'base', removable: false, calories: 40 },
      { name: 'Kale', type: 'base', removable: true, calories: 35, swappable: true },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Chia Seeds', type: 'topping', removable: true, calories: 25, swappable: true }
    ],
    protein: 12,
    fat: 8,
    carbs: 35,
    sugar: 20
  },
  'Tropical Bowl': {
    image: 'pictures/drinks (5).png',
    calories: 730,
    description: 'Mango, pineapple & coconut milk base topped with tropical fruits & granola.',
    ingredients: [
      { name: 'Mango', type: 'base', removable: false, calories: 140 },
      { name: 'Pineapple', type: 'fruit', removable: true, calories: 80, swappable: true },
      { name: 'Coconut Milk', type: 'liquid', removable: true, calories: 140, swappable: true },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Coconut Flakes', type: 'topping', removable: true, calories: 35, swappable: true }
    ],
    protein: 7,
    fat: 10,
    carbs: 45,
    sugar: 35
  },
  'Chocolate Bowl': {
    image: 'pictures/drinks (6).png',
    calories: 780,
    description: 'Chocolate, banana & milk base topped with granola, banana slices & chocolate chips.',
    ingredients: [
      { name: 'Chocolate', type: 'base', removable: false, calories: 200 },
      { name: 'Banana', type: 'fruit', removable: true, calories: 105, swappable: true },
      { name: 'Milk', type: 'liquid', removable: true, calories: 90, swappable: true },
      { name: 'Granola', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Chocolate Chips', type: 'topping', removable: true, calories: 80, swappable: true }
    ],
    protein: 12,
    fat: 15,
    carbs: 50,
    sugar: 40
  },
  'Garden Salad': {
    image: 'pictures/drinks (7).png',
    calories: 320,
    description: 'Mixed greens, cucumber, tomatoes & carrots with a light vinaigrette.',
    ingredients: [
      { name: 'Mixed Greens', type: 'base', removable: false, calories: 20 },
      { name: 'Cucumber', type: 'topping', removable: true, calories: 15, swappable: true },
      { name: 'Tomatoes', type: 'topping', removable: true, calories: 25, swappable: true },
      { name: 'Carrots', type: 'topping', removable: true, calories: 30, swappable: true },
      { name: 'Vinaigrette', type: 'dressing', removable: true, calories: 80, swappable: true }
    ],
    protein: 5,
    fat: 15,
    carbs: 20,
    sugar: 8
  },
  'Greek Salad': {
    image: 'pictures/drinks (8).png',
    calories: 380,
    description: 'Mixed greens, cucumber, tomatoes, olives & feta cheese with olive oil dressing.',
    ingredients: [
      { name: 'Mixed Greens', type: 'base', removable: false, calories: 20 },
      { name: 'Cucumber', type: 'topping', removable: true, calories: 15, swappable: true },
      { name: 'Tomatoes', type: 'topping', removable: true, calories: 25, swappable: true },
      { name: 'Feta Cheese', type: 'topping', removable: true, calories: 100, swappable: true },
      { name: 'Olive Oil', type: 'dressing', removable: true, calories: 120, swappable: true }
    ],
    protein: 8,
    fat: 25,
    carbs: 15,
    sugar: 5
  },
  'Chickpea Salad': {
    image: 'pictures/drinks (10).png',
    calories: 380,
    description: 'Mixed greens, chickpeas, tomatoes & cucumber with balsamic dressing.',
    ingredients: [
      { name: 'Mixed Greens', type: 'base', removable: false, calories: 20 },
      { name: 'Chickpeas', type: 'topping', removable: true, calories: 120, swappable: true },
      { name: 'Tomatoes', type: 'topping', removable: true, calories: 25, swappable: true },
      { name: 'Cucumber', type: 'topping', removable: true, calories: 15, swappable: true },
      { name: 'Balsamic', type: 'dressing', removable: true, calories: 90, swappable: true }
    ],
    protein: 15,
    fat: 10,
    carbs: 25,
    sugar: 8
  },
  'Avocado Salad': {
    image: 'pictures/drinks (11).png',
    calories: 420,
    description: 'Fresh greens, avocado, cherry tomatoes & feta cheese with a light vinaigrette.',
    ingredients: [
      { name: 'Mixed Greens', type: 'base', removable: false, calories: 20 },
      { name: 'Avocado', type: 'topping', removable: true, calories: 160, swappable: true },
      { name: 'Cherry Tomatoes', type: 'topping', removable: true, calories: 30, swappable: true },
      { name: 'Feta Cheese', type: 'topping', removable: true, calories: 100, swappable: true },
      { name: 'Vinaigrette', type: 'dressing', removable: true, calories: 80, swappable: true }
    ],
    protein: 10,
    fat: 30,
    carbs: 15,
    sugar: 5
  },
};

// Add allergen information to products
const productAllergens = {
  'Strawberry Passion': ['milk'],
  'Mango Smoothie': ['milk'],
  'Berry Smoothie': ['milk'],
  'Green Smoothie': ['milk'],
  'Strawberry Bowl': ['milk', 'treenut'],
  'Blueberry Bowl': ['milk', 'treenut'],
  'Berry Bowl': ['milk', 'treenut'],
  'Green Bowl': ['milk', 'treenut', 'soy'],
  'Garden Salad': ['egg', 'soy'],
  'Greek Salad': ['milk', 'egg'],
  'Chickpea Salad': ['egg', 'soy'],
  'Avocado Salad': ['egg', 'sesame']
};

// Available add-ins with calories and price
const addIns = [
  { name: 'Acai', calories: 10, price: 1.00, image: 'pictures/acai.jpg' },
  { name: 'Almonds', calories: 40, price: 1.25, image: 'pictures/almonds.jpg' },
  { name: 'Chia Seeds', calories: 25, price: 0.75, image: 'pictures/chia-seeds.jpg' },
  { name: 'Coconut Flakes', calories: 35, price: 0.50, image: 'pictures/coconut-flakes.jpg' },
  { name: 'Granola', calories: 45, price: 0.75, image: 'pictures/granola.jpg' }
];

// Available supplements with calories and price
const supplements = [
  { name: 'Whey Protein', calories: 70, price: 1.50, image: 'pictures/whey-protein.jpg' },
  { name: 'Egg Protein', calories: 50, price: 1.50, image: 'pictures/egg-protein.jpg' },
  { name: 'Collagen', calories: 35, price: 2.00, image: 'pictures/collagen.jpg' },
  { name: 'Spirulina', calories: 20, price: 1.75, image: 'pictures/spirulina.jpg' },
  { name: 'Vitamin Boost', calories: 5, price: 1.25, image: 'pictures/vitamin-boost.jpg' }
];

// Ingredient swap options
const ingredientSwaps = {
  'liquid': ['Orange Juice', 'Apple Juice', 'Almond Milk', 'Coconut Milk', 'Milk', 'Water'],
  'fruit': ['Banana', 'Strawberry', 'Blueberry', 'Mango', 'Pineapple', 'Mixed Berries'],
  'base': ['Spinach', 'Kale', 'Acai', 'Mixed Berries', 'Mango', 'Strawberry'],
  'sweetener': ['Honey', 'Agave', 'Maple Syrup', 'Stevia', 'Sugar', 'None'],
  'dairy': ['Yogurt', 'Greek Yogurt', 'Milk', 'Almond Milk', 'Coconut Milk', 'None'],
  'other': ['Ice', 'Chia Seeds', 'Flax Seeds', 'Vanilla Extract', 'Cinnamon', 'Ginger'],
  'topping': ['Granola', 'Almonds', 'Coconut Flakes', 'Fresh Berries', 'Banana Slices', 'Honey'],
  'dressing': ['Vinaigrette', 'Ranch', 'Caesar', 'Balsamic', 'Olive Oil', 'Lemon Juice']
};

// Check if we're in build-your-own mode
const buildYourOwn = urlParams.get('build') === 'true';
const buildType = urlParams.get('type');

// Track selected add-ins and supplements
let selectedAddIns = [];
let selectedSupplements = [];
let totalPrice = productPrice;
let totalCalories = 0;
let selectedSweetness = 50;
let isFavorite = false;
let baseCalories = 0;
let baseSugar = 0;

// Initialize the page with product details or build-your-own interface
function initializeProductDetails() {
  if (buildYourOwn) {
    initializeBuildYourOwn(buildType);
    return;
  }

  if (!productName || !products[productName]) {
    // Redirect back to menu if product not found
    window.location.href = 'menu.html';
    return;
  }
  
  // Hide sweetness section for salads
  if (productName.includes('Salad')) {
    document.querySelector('.customize-section:has(.sweetness-selector)').style.display = 'none';
  }
  
  const product = products[productName];
  totalCalories = product.calories;
  baseCalories = product.calories;
  baseSugar = product.sugar;
  
  // Set product details
  document.getElementById('productName').textContent = productName;
  document.getElementById('productCalories').textContent = `${product.calories} Kcals`;
  document.getElementById('productDescription').textContent = product.description;
  document.getElementById('productPrice').textContent = `$${productPrice.toFixed(2)}`;
  document.getElementById('productImage').src = product.image;
  document.getElementById('finalPrice').textContent = `$${totalPrice.toFixed(2)}`;
  
  // Check if item is in favorites
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  isFavorite = favorites.some(item => item.name === productName);
  
  if (isFavorite) {
    document.getElementById('favoriteBtn').classList.add('active');
    document.getElementById('favoriteBtn').querySelector('i').style.color = 'black';
  }
  
  // Add event listener for favorite button
  document.getElementById('favoriteBtn').addEventListener('click', toggleFavorite);
  
  // Add event listeners for sweetness buttons
  document.querySelectorAll('.sweetness-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sweetness-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedSweetness = parseInt(this.getAttribute('data-value'));
      updateSweetness(selectedSweetness);
    });
  });
  
  // Initialize nutrition info
  updateNutritionInfo();
}

// Build your own functionality
function initializeBuildYourOwn(type) {
  // Set default product details for build your own
  let title, basePrice, baseImage, baseCalories;
  
  switch(type) {
    case 'drink':
      title = 'Build Your Own Smoothie';
      basePrice = 8.99;
      baseImage = 'pictures/custom-smoothie.jpg';
      baseCalories = 600;
      break;
    case 'bowl':
      title = 'Build Your Own Bowl';
      basePrice = 10.99;
      baseImage = 'pictures/custom-bowl.jpg';
      baseCalories = 650;
      break;
    case 'salad':
      title = 'Build Your Own Salad';
      basePrice = 9.99;
      baseImage = 'pictures/custom-salad.jpg';
      baseCalories = 400;
      break;
    default:
      title = 'Build Your Own';
      basePrice = 8.99;
      baseImage = 'pictures/custom-smoothie.jpg';
      baseCalories = 600;
  }
  
  // Update product name and other details
  productName = title;
  productPrice = basePrice;
  totalPrice = basePrice;
  totalCalories = baseCalories;
  baseCalories = baseCalories;
  baseSugar = 25; // Default sugar content
  
  // Set product details in UI
  document.getElementById('productName').textContent = title;
  document.getElementById('productCalories').textContent = `${baseCalories} Kcals`;
  document.getElementById('productDescription').textContent = 'Create your perfect custom item by selecting ingredients below.';
  document.getElementById('productPrice').textContent = `$${basePrice.toFixed(2)}`;
  document.getElementById('productImage').src = baseImage;
  document.getElementById('finalPrice').textContent = `$${totalPrice.toFixed(2)}`;
  
  // Create custom build interface
  if (type === 'drink') {
    createDrinkBuildInterface();
  } else {
    createBuildInterface(type);
  }
  
  // Add event listeners for sweetness buttons
  document.querySelectorAll('.sweetness-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sweetness-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedSweetness = parseInt(this.getAttribute('data-value'));
      updateSweetness(selectedSweetness);
    });
  });
  
  // Initialize nutrition info
  updateNutritionInfo();
}

// Create custom drink build interface with specific requirements
function createDrinkBuildInterface() {
  // Define the base options
  const baseOptions = [
    { name: 'Strawberry', calories: 150 },
    { name: 'Mango', calories: 140 },
    { name: 'Banana', calories: 105 },
    { name: 'Mixed Berries', calories: 120 },
    { name: 'Acai', calories: 100 }
  ];
  
  // Define the fruit options
  const fruitOptions = [
    { name: 'Pineapple', calories: 80 },
    { name: 'Blueberry', calories: 85 },
    { name: 'Raspberry', calories: 65 },
    { name: 'Kiwi', calories: 60 },
    { name: 'Peach', calories: 70 }
  ];
  
  // Define the add-in options
  const addInOptions = [
    { name: 'Yogurt', calories: 100 },
    { name: 'Almond Milk', calories: 80 },
    { name: 'Honey', calories: 60 },
    { name: 'Protein Powder', calories: 120 },
    { name: 'Chia Seeds', calories: 25 }
  ];
  
  // Create custom ingredients section
  const ingredientsSection = document.querySelector('.ingredients-section');
  ingredientsSection.innerHTML = `
    <h2>Create Your Custom Smoothie</h2>
    
    <div class="build-section">
      <h3>Step 1: Choose Your Base <span class="required">*</span></h3>
      <p class="build-instruction">Select 1 base for your smoothie</p>
      <div class="options-grid base-options-grid">
        ${baseOptions.map(option => `
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
            </div>
            <div class="option-select">Select</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="build-section">
      <h3>Step 2: Choose Your Fruits <span class="required">*</span></h3>
      <p class="build-instruction">Select up to 3 fruits for your smoothie</p>
      <div class="options-grid fruit-options-grid">
        ${fruitOptions.map(option => `
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
            </div>
            <div class="option-select">Select</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="build-section">
      <h3>Step 3: Choose Your Add-ins</h3>
      <p class="build-instruction">Select up to 2 add-ins for your smoothie</p>
      <div class="options-grid addin-options-grid">
        ${addInOptions.map(option => `
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
            </div>
            <div class="option-select">Select</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Add CSS for the build interface
  const style = document.createElement('style');
  style.textContent = `
    .build-section {
      margin-bottom: 30px;
    }
    
    .build-instruction {
      font-family: 'Fredoka', sans-serif;
      color: #666;
      margin-bottom: 15px;
    }
    
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
    }
    
    .option-item {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .option-item:hover {
      background-color: #f0f0f0;
      transform: translateY(-2px);
    }
    
    .option-item.selected {
      background-color: var(--secondary);
      color: white;
    }
    
    .option-content {
      display: flex;
      flex-direction: column;
    }
    
    .option-name {
      font-family: 'Fredoka', sans-serif;
      font-weight: bold;
      font-size: 16px;
    }
    
    .option-calories {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #888;
    }
    
    .option-item.selected .option-calories {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .option-select {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      text-align: center;
      padding: 5px 0;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.05);
      margin-top: 10px;
    }
    
    .option-item.selected .option-select {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .required {
      color: #e74c3c;
    }
  `;
  document.head.appendChild(style);
  
  // Track selected items
  window.selectedBase = null;
  window.selectedFruits = [];
  window.selectedAddIns = [];
  
  // Add event listeners for base options
  document.querySelectorAll('.base-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      
      // Deselect all other base options
      document.querySelectorAll('.base-options-grid .option-item').forEach(option => {
        option.classList.remove('selected');
      });
      
      // Select this option
      this.classList.add('selected');
      
      // Update selected base
      window.selectedBase = { name, calories };
      
      // Update nutrition info
      updateCustomDrinkNutrition();
    });
  });
  
  // Add event listeners for fruit options
  document.querySelectorAll('.fruit-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      
      // Check if already selected
      const isSelected = this.classList.contains('selected');
      
      if (isSelected) {
        // Deselect this option
        this.classList.remove('selected');
        
        // Remove from selected fruits
        window.selectedFruits = window.selectedFruits.filter(fruit => fruit.name !== name);
      } else {
        // Check if we already have 3 fruits selected
        if (window.selectedFruits.length >= 3) {
          alert('You can only select up to 3 fruits. Please deselect one first.');
          return;
        }
        
        // Select this option
        this.classList.add('selected');
        
        // Add to selected fruits
        window.selectedFruits.push({ name, calories });
      }
      
      // Update nutrition info
      updateCustomDrinkNutrition();
    });
  });
  
  // Add event listeners for add-in options
  document.querySelectorAll('.addin-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      
      // Check if already selected
      const isSelected = this.classList.contains('selected');
      
      if (isSelected) {
        // Deselect this option
        this.classList.remove('selected');
        
        // Remove from selected add-ins
        window.selectedAddIns = window.selectedAddIns.filter(addIn => addIn.name !== name);
      } else {
        // Check if we already have 2 add-ins selected
        if (window.selectedAddIns.length >= 2) {
          alert('You can only select up to 2 add-ins. Please deselect one first.');
          return;
        }
        
        // Select this option
        this.classList.add('selected');
        
        // Add to selected add-ins
        window.selectedAddIns.push({ name, calories });
      }
      
      // Update nutrition info
      updateCustomDrinkNutrition();
    });
  });
}

// Update nutrition info for custom drink
function updateCustomDrinkNutrition() {
  // Calculate total calories
  let calculatedCalories = 0;
  
  // Add base calories
  if (window.selectedBase) {
    calculatedCalories += window.selectedBase.calories;
  }
  
  // Add fruit calories
  window.selectedFruits.forEach(fruit => {
    calculatedCalories += fruit.calories;
  });
  
  // Add add-in calories
  window.selectedAddIns.forEach(addIn => {
    calculatedCalories += addIn.calories;
  });
  
  // Update total calories
  totalCalories = calculatedCalories;
  document.getElementById('productCalories').textContent = `${totalCalories} Kcals`;
  
  // Update nutrition info
  updateNutritionInfo();
}

// Create build your own interface
function createBuildInterface(type) {
  // Define ingredient categories based on type
  let categories = [];
  
  switch(type) {
    case 'drink':
      categories = [
        { name: 'Base', type: 'base', required: true },
        { name: 'Liquid', type: 'liquid', required: true },
        { name: 'Fruit', type: 'fruit', required: true },
        { name: 'Sweetener', type: 'sweetener', required: false },
        { name: 'Extra', type: 'other', required: false }
      ];
      break;
    case 'bowl':
      categories = [
        { name: 'Base', type: 'base', required: true },
        { name: 'Fruit', type: 'fruit', required: true },
        { name: 'Liquid', type: 'liquid', required: true },
        { name: 'Topping 1', type: 'topping', required: true },
        { name: 'Topping 2', type: 'topping', required: false }
      ];
      break;
    case 'salad':
      categories = [
        { name: 'Base', type: 'base', required: true },
        { name: 'Topping 1', type: 'topping', required: true },
        { name: 'Topping 2', type: 'topping', required: true },
        { name: 'Topping 3', type: 'topping', required: false },
        { name: 'Dressing', type: 'dressing', required: true }
      ];
      break;
    default:
      categories = [
        { name: 'Base', type: 'base', required: true },
        { name: 'Liquid', type: 'liquid', required: true },
        { name: 'Fruit', type: 'fruit', required: true },
        { name: 'Sweetener', type: 'sweetener', required: false },
        { name: 'Extra', type: 'other', required: false }
      ];
  }
  
  // Create custom ingredients section
  const ingredientsSection = document.querySelector('.ingredients-section');
  ingredientsSection.innerHTML = `
    <h2>Select Your Ingredients</h2>
    <div id="buildIngredientsList" class="build-ingredients-list">
      <!-- Build ingredients will be added here -->
    </div>
  `;
  
  const buildList = document.getElementById('buildIngredientsList');
  
  // Create selected ingredients array
  window.selectedBuildIngredients = [];
  
  // Add each category
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'build-category';
    
    categoryDiv.innerHTML = `
      <h3>${category.name} ${category.required ? '<span class="required">*</span>' : ''}</h3>
      <div class="ingredient-selector" data-type="${category.type}">
        <div class="selected-ingredient">
          <span>Select ${category.name}</span>
          <i class='bx bx-chevron-down'></i>
        </div>
        <div class="ingredient-options" style="display: none;">
          <!-- Options will be added dynamically -->
        </div>
      </div>
    `;
    
    buildList.appendChild(categoryDiv);
    
    // Add options for this category
    const optionsDiv = categoryDiv.querySelector('.ingredient-options');
    const options = ingredientSwaps[category.type] || [];
    
    // Ensure we have exactly 6 options
    const displayOptions = options.slice(0, 6);
    
    displayOptions.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'ingredient-option';
      optionDiv.textContent = option;
      
      optionDiv.addEventListener('click', function() {
        // Update selected ingredient
        const selectedSpan = categoryDiv.querySelector('.selected-ingredient span');
        selectedSpan.textContent = option;
        
        // Update selected ingredients array
        const existingIndex = window.selectedBuildIngredients.findIndex(i => i.type === category.type);
        
        if (existingIndex !== -1) {
          window.selectedBuildIngredients[existingIndex].name = option;
        } else {
          window.selectedBuildIngredients.push({
            name: option,
            type: category.type,
            calories: getIngredientCalories(option)
          });
        }
        
        // Hide options
        const optionsContainer = categoryDiv.querySelector('.ingredient-options');
        optionsContainer.style.display = 'none';
        
        // Update nutrition info
        updateNutritionInfo();
      });
      
      optionsDiv.appendChild(optionDiv);
    });
    
    // Add click event to show/hide options
    const selectedIngredient = categoryDiv.querySelector('.selected-ingredient');
    selectedIngredient.addEventListener('click', function() {
      const optionsContainer = categoryDiv.querySelector('.ingredient-options');
      if (optionsContainer.style.display === 'none') {
        // Hide all other option containers first
        document.querySelectorAll('.ingredient-options').forEach(container => {
          container.style.display = 'none';
        });
        optionsContainer.style.display = 'block';
      } else {
        optionsContainer.style.display = 'none';
      }
    });
  });
  
  // Add event listener to close options when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.ingredient-selector')) {
      document.querySelectorAll('.ingredient-options').forEach(container => {
        container.style.display = 'none';
      });
    }
  });
}

// Populate ingredients list with options to remove or swap
function populateIngredients(ingredients) {
  const ingredientsList = document.getElementById('ingredientsList');
  ingredientsList.innerHTML = '';
  
  ingredients.forEach(ingredient => {
    const ingredientItem = document.createElement('div');
    ingredientItem.className = 'ingredient-item';
    
    let actionsHtml = '';
    if (ingredient.removable) {
      actionsHtml += `<button class="remove-btn" data-ingredient="${ingredient.name}"><i class='bx bx-trash'></i></button>`;
    }
    
    if (ingredient.swappable) {
      actionsHtml += `<button class="swap-btn" data-ingredient="${ingredient.name}" data-type="${ingredient.type}"><i class='bx bx-transfer'></i></button>`;
    }
    
    ingredientItem.innerHTML = `
      <span class="ingredient-name">${ingredient.name}</span>
      <div class="ingredient-actions">
        ${actionsHtml}
      </div>
    `;
    
    ingredientsList.appendChild(ingredientItem);
  });
  
  // Add event listeners for remove and swap buttons
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const ingredientName = this.getAttribute('data-ingredient');
      removeIngredient(ingredientName);
    });
  });
  
  document.querySelectorAll('.swap-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const ingredientName = this.getAttribute('data-ingredient');
      const ingredientType = this.getAttribute('data-type');
      showSwapOptions(ingredientName, ingredientType);
    });
  });
}

// Remove an ingredient
function removeIngredient(ingredientName) {
  const product = products[productName];
  const ingredientIndex = product.ingredients.findIndex(i => i.name === ingredientName);
  
  if (ingredientIndex !== -1) {
    // Subtract calories
    totalCalories -= product.ingredients[ingredientIndex].calories;
    
    // Remove the ingredient
    product.ingredients.splice(ingredientIndex, 1);
    
    // Update the UI
    populateIngredients(product.ingredients);
    updateNutritionInfo();
    document.getElementById('productCalories').textContent = `${totalCalories} Kcals`;
  }
}

// Show swap options for an ingredient
function showSwapOptions(ingredientName, ingredientType) {
  const swapOptions = ingredientSwaps[ingredientType];
  
  if (!swapOptions) return;
  
  // Find the ingredient item
  const ingredientItems = document.querySelectorAll('.ingredient-item');
  let targetItem;
  
  for (const item of ingredientItems) {
    if (item.querySelector('.ingredient-name').textContent === ingredientName) {
      targetItem = item;
      break;
    }
  }
  
  if (!targetItem) return;
  
  // Remove any existing swap options container
  const existingContainer = document.querySelector('.swap-options-container');
  if (existingContainer) {
    existingContainer.parentNode.removeChild(existingContainer);
  }
  
  // Create swap options container
  const swapContainer = document.createElement('div');
  swapContainer.className = 'swap-options-container';
  swapContainer.style.maxHeight = '0';
  swapContainer.style.opacity = '0';
  
  swapOptions.forEach(option => {
    if (option !== ingredientName) {
      const optionElement = document.createElement('div');
      optionElement.className = 'swap-option';
      optionElement.textContent = option;
      optionElement.addEventListener('click', function() {
        swapIngredient(ingredientName, option);
        closeSwapOptions(swapContainer);
      });
      swapContainer.appendChild(optionElement);
    }
  });
  
  // Add cancel option
  const cancelOption = document.createElement('div');
  cancelOption.className = 'swap-option';
  cancelOption.textContent = 'Cancel';
  cancelOption.style.color = '#999';
  cancelOption.addEventListener('click', function() {
    closeSwapOptions(swapContainer);
  });
  swapContainer.appendChild(cancelOption);
  
  // Add to DOM after the target item
  targetItem.parentNode.insertBefore(swapContainer, targetItem.nextSibling);
  
  // Trigger animation
  setTimeout(() => {
    swapContainer.style.maxHeight = swapContainer.scrollHeight + 'px';
    swapContainer.style.opacity = '1';
  }, 10);
}

// Close swap options with animation
function closeSwapOptions(container) {
  container.style.maxHeight = '0';
  container.style.opacity = '0';
  
  // Remove from DOM after animation completes
  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 300);
}

// Swap an ingredient
function swapIngredient(originalName, newName) {
  const product = products[productName];
  const ingredientIndex = product.ingredients.findIndex(i => i.name === originalName);
  
  if (ingredientIndex !== -1) {
    // Update the ingredient name
    product.ingredients[ingredientIndex].name = newName;
    
    // Update the UI
    populateIngredients(product.ingredients);
  }
}

// Populate add-ins grid
function populateAddIns() {
  const addInsGrid = document.querySelector('.add-ins-grid');
  addInsGrid.innerHTML = '';
  
  addIns.forEach(addIn => {
    const isSelected = selectedAddIns.some(item => item.name === addIn.name);
    const addInItem = document.createElement('div');
    addInItem.className = `add-in-item ${isSelected ? 'selected' : ''}`;
    addInItem.setAttribute('data-name', addIn.name);
    
    addInItem.innerHTML = `
      <img src="${addIn.image}" alt="${addIn.name}">
      <p>${addIn.name}</p>
      <p class="calories">${addIn.calories} Calories</p>
      <p class="price">+$${addIn.price.toFixed(2)}</p>
    `;
    
    addInsGrid.appendChild(addInItem);
    
    // Add click event directly without rebuilding the grid
    addInItem.addEventListener('click', function() {
      const index = selectedAddIns.findIndex(item => item.name === addIn.name);
      
      if (index === -1) {
        // Add the add-in
        selectedAddIns.push(addIn);
        totalPrice += addIn.price;
        totalCalories += addIn.calories;
        this.classList.add('selected');
      } else {
        // Remove the add-in
        selectedAddIns.splice(index, 1);
        totalPrice -= addIn.price;
        totalCalories -= addIn.calories;
        this.classList.remove('selected');
      }
      
      // Update the count
      document.querySelector('.add-ins-count').textContent = `${selectedAddIns.length}x`;
      updatePriceAndCalories();
      updateNutritionInfo();
    });
  });
  
  // Update the count
  document.querySelector('.add-ins-count').textContent = `${selectedAddIns.length}x`;
}

// Populate supplements grid
function populateSupplements() {
  const supplementsGrid = document.querySelector('.supplements-grid');
  supplementsGrid.innerHTML = '';
  
  supplements.forEach(supplement => {
    const isSelected = selectedSupplements.some(item => item.name === supplement.name);
    const supplementItem = document.createElement('div');
    supplementItem.className = `supplement-item ${isSelected ? 'selected' : ''}`;
    supplementItem.setAttribute('data-name', supplement.name);
    
    supplementItem.innerHTML = `
      <img src="${supplement.image}" alt="${supplement.name}">
      <p>${supplement.name}</p>
      <p class="calories">${supplement.calories} Calories</p>
      <p class="price">+$${supplement.price.toFixed(2)}</p>
    `;
    
    supplementsGrid.appendChild(supplementItem);
    
    // Add click event directly without rebuilding the grid
    supplementItem.addEventListener('click', function() {
      const index = selectedSupplements.findIndex(item => item.name === supplement.name);
      
      if (index === -1) {
        // Add the supplement
        selectedSupplements.push(supplement);
        totalPrice += supplement.price;
        totalCalories += supplement.calories;
        this.classList.add('selected');
      } else {
        // Remove the supplement
        selectedSupplements.splice(index, 1);
        totalPrice -= supplement.price;
        totalCalories -= supplement.calories;
        this.classList.remove('selected');
      }
      
      // Update the count
      document.querySelector('.supplements-count').textContent = `${selectedSupplements.length}x`;
      updatePriceAndCalories();
      updateNutritionInfo();
    });
  });
  
  // Update the count
  document.querySelector('.supplements-count').textContent = `${selectedSupplements.length}x`;
}

// Update price and calories display
function updatePriceAndCalories() {
  document.getElementById('finalPrice').textContent = `$${totalPrice.toFixed(2)}`;
  document.getElementById('productCalories').textContent = `${totalCalories} Kcals`;
}

// Update sweetness and adjust nutrition
function updateSweetness(sweetness) {
  const product = products[productName];
  
  // Calculate sugar adjustment based on sweetness level
  // Default is 50%, so we calculate the difference
  const sugarAdjustment = (sweetness - 50) / 100 * baseSugar;
  
  // Each 1g of sugar is about 4 calories
  const calorieAdjustment = sugarAdjustment * 4;
  
  // Update total calories
  totalCalories = baseCalories + calorieAdjustment;
  
  // Update the UI
  document.getElementById('productCalories').textContent = `${Math.round(totalCalories)} Kcals`;
  
  // Update nutrition info
  updateNutritionInfo();
}

// Update nutrition info
function updateNutritionInfo() {
  // This would be calculated based on ingredients, add-ins, and supplements
  const product = products[productName];
  
  // Base nutrition values
  let protein = product.protein;
  let fat = product.fat;
  let carbs = product.carbs;
  
  // Adjust sugar based on sweetness level
  let sugar = baseSugar * (selectedSweetness / 50);
  
  // Add nutrition from add-ins (simplified calculation)
  selectedAddIns.forEach(addIn => {
    protein += 1;
    fat += 1;
    carbs += 2;
  });
  
  // Add nutrition from supplements
  selectedSupplements.forEach(supplement => {
    if (supplement.name.includes('Protein')) {
      protein += 15;
    } else if (supplement.name.includes('Collagen')) {
      protein += 10;
    }
    // Add other supplement nutrition calculations as needed
  });
  
  // Add nutrition from extras (cookie, kale straw)
  if (selectedExtras.length > 0) {
    selectedExtras.forEach(extra => {
      protein += extra.protein || 0;
      fat += extra.fat || 0;
      carbs += extra.carbs || 0;
      sugar += extra.sugar || 0;
    });
  }
  
  // Store updated nutrition info for modal display
  window.currentNutrition = {
    calories: Math.round(totalCalories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
    sugar: Math.round(sugar)
  };
}

// Show nutrition info modal
function showNutritionInfo() {
  const nutrition = window.currentNutrition;
  
  // Create a modal for nutrition info
  const modal = document.createElement('div');
  modal.className = 'nutrition-modal';
  
  modal.innerHTML = `
    <div class="nutrition-content">
      <h3>Nutrition Facts</h3>
      <div class="nutrition-item">
        <span>Calories</span>
        <span>${nutrition.calories}</span>
      </div>
      <div class="nutrition-item">
        <span>Protein</span>
        <span>${nutrition.protein}g</span>
      </div>
      <div class="nutrition-item">
        <span>Fat</span>
        <span>${nutrition.fat}g</span>
      </div>
      <div class="nutrition-item">
        <span>Carbohydrates</span>
        <span>${nutrition.carbs}g</span>
      </div>
      <div class="nutrition-item">
        <span>Sugar</span>
        <span>${nutrition.sugar}g</span>
      </div>
      <button class="close-modal">Close</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listener for close button
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.body.removeChild(modal);
  });
}

// Track selected extras (cookie, kale straw)
let selectedExtras = [];

// Initialize extras section
function initializeExtras() {
  const extrasData = [
    { 
      name: 'Chocolate Chip Cookie', 
      calories: 180, 
      price: 2.50, 
      image: 'pictures/cookie.jpg',
      protein: 2,
      fat: 9,
      carbs: 24,
      sugar: 15
    },
    { 
      name: 'Kale Chips', 
      calories: 250, 
      price: 3.75, 
      image: 'pictures/kale-straw.jpg',
      protein: 1,
      fat: 0,
      carbs: 3,
      sugar: 0
    }
  ];
  
  const recommendationsGrid = document.querySelector('.recommendations-grid');
  recommendationsGrid.innerHTML = '';
  
  extrasData.forEach(extra => {
    const isSelected = selectedExtras.some(item => item.name === extra.name);
    const extraItem = document.createElement('div');
    extraItem.className = `recommendation-item ${isSelected ? 'selected' : ''}`;
    extraItem.setAttribute('data-name', extra.name);
    
    extraItem.innerHTML = `
      <img src="${extra.image}" alt="${extra.name}">
      <p>${extra.name}</p>
      <p class="calories">${extra.calories} Calories</p>
      <p class="price">+$${extra.price.toFixed(2)}</p>
    `;
    
    recommendationsGrid.appendChild(extraItem);
    
    // Add click event directly without rebuilding the grid
    extraItem.addEventListener('click', function() {
      const index = selectedExtras.findIndex(item => item.name === extra.name);
      
      if (index === -1) {
        // Add the extra
        selectedExtras.push(extra);
        totalPrice += extra.price;
        totalCalories += extra.calories;
        this.classList.add('selected');
      } else {
        // Remove the extra
        selectedExtras.splice(index, 1);
        totalPrice -= extra.price;
        totalCalories -= extra.calories;
        this.classList.remove('selected');
      }
      
      updatePriceAndCalories();
      updateNutritionInfo();
    });
  });
}

// Add to cart functionality
function addToCart() {
  // Check if we're in custom drink build mode
  if (buildYourOwn && productName === 'Build Your Own Smoothie') {
    // Validate that required selections are made
    if (!window.selectedBase) {
      alert('Please select a base for your smoothie.');
      return;
    }
    
    if (window.selectedFruits.length === 0) {
      alert('Please select at least one fruit for your smoothie.');
      return;
    }
    
    // Create a customized item object
    const customItem = {
      name: 'Custom Smoothie',
      price: totalPrice,
      quantity: 1,
      customizations: {
        base: window.selectedBase.name,
        fruits: window.selectedFruits.map(fruit => fruit.name),
        addIns: window.selectedAddIns.map(addIn => addIn.name),
        sweetness: selectedSweetness
      }
    };
    
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the item to cart
    cart.push(customItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation animation
    showAddToCartAnimation();
    
    return;
  }
  
  // Original add to cart functionality for other items
  // Validate that all required ingredients are selected for build-your-own
  if (buildYourOwn) {
    const requiredCategories = document.querySelectorAll('.build-category h3 .required');
    const selectedIngredients = window.selectedBuildIngredients || [];
    
    if (requiredCategories.length > selectedIngredients.length) {
      alert('Please select all required ingredients before adding to cart.');
      return;
    }
  }
  
  // Create a customized item object
  let customItem;
  
  if (buildYourOwn) {
    customItem = {
      name: productName,
      price: totalPrice,
      quantity: 1,
      customizations: {
        ingredients: window.selectedBuildIngredients.map(i => i.name),
        addIns: selectedAddIns.map(i => i.name),
        supplements: selectedSupplements.map(i => i.name),
        sweetness: selectedSweetness,
        extras: selectedExtras.map(i => i.name)
      }
    };
  } else {
    customItem = {
      name: productName + " (Customized)",
      price: totalPrice,
      quantity: 1,
      customizations: {
        ingredients: products[productName].ingredients.map(i => i.name),
        addIns: selectedAddIns.map(i => i.name),
        supplements: selectedSupplements.map(i => i.name),
        sweetness: selectedSweetness,
        extras: selectedExtras.map(i => i.name)
      }
    };
  }
  
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Add the item to cart
  cart.push(customItem);
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show confirmation animation
  showAddToCartAnimation();
}

// Show add to cart animation
function showAddToCartAnimation() {
  // Create animation overlay
  const overlay = document.createElement('div');
  overlay.className = 'cart-animation-overlay';
  
  // Create animation content
  const content = document.createElement('div');
  content.className = 'cart-animation-content';
  content.innerHTML = `
    <div class="cart-success-icon">
      <i class='bx bx-check'></i>
    </div>
    <h3>Added to Cart!</h3>
    <p>${productName} has been added to your cart.</p>
    <div class="cart-animation-buttons">
      <button id="continueShoppingBtn">Continue Shopping</button>
      <button id="viewCartBtn">View Cart</button>
    </div>
  `;
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  // Add event listeners to buttons
  document.getElementById('continueShoppingBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
    window.location.href = 'menu.html';
  });
  
  document.getElementById('viewCartBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
    window.location.href = 'cart.html';
  });
  
  // Add animation classes after a small delay to trigger animations
  setTimeout(() => {
    overlay.classList.add('active');
    content.classList.add('active');
  }, 10);
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = totalItems;
}

// Toggle favorite status
function toggleFavorite() {
  const favoriteBtn = document.getElementById('favoriteBtn');
  isFavorite = !isFavorite;
  
  if (isFavorite) {
    favoriteBtn.classList.add('active');
    favoriteBtn.querySelector('i').style.color = 'black';
  } else {
    favoriteBtn.classList.remove('active');
    favoriteBtn.querySelector('i').style.color = '';
  }
  
  // Update favorites in localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  if (isFavorite) {
    // Add to favorites if not already there
    if (!favorites.some(item => item.name === productName)) {
      favorites.push({
        name: productName,
        image: products[productName].image,
        calories: products[productName].calories,
        price: productPrice,
        type: productType
      });
    }
  } else {
    // Remove from favorites
    favorites = favorites.filter(item => item.name !== productName);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeProductDetails();
  populateIngredients(products[productName].ingredients);
  populateAddIns();
  populateSupplements();
  initializeExtras();
  updateCartCount();
  
  // Add event listener for nutrition info button
  document.querySelector('.nutrition-info-btn').addEventListener('click', showNutritionInfo);
  
  // Add event listener for add to cart button
  document.getElementById('addToCartBtn').addEventListener('click', addToCart);
});

// Helper function to get estimated calories for an ingredient
function getIngredientCalories(ingredientName) {
  // This is a simplified approach - in a real app, you'd have a more complete database
  const caloriesMap = {
    // Base
    'Spinach': 40,
    'Kale': 35,
    'Acai': 100,
    'Mixed Berries': 120,
    'Mango': 140,
    'Strawberry': 150,
    'Pineapple': 80,
    'Banana': 105,
    'Chocolate': 200,
    'Peanut Butter': 190,
    'Coffee': 5,
    'Whey Protein': 120,
    'Romaine Lettuce': 15,
    'Mixed Greens': 20,
    
    // Liquid
    'Orange Juice': 120,
    'Apple Juice': 110,
    'Almond Milk': 80,
    'Coconut Milk': 140,
    'Milk': 90,
    'Water': 0,
    
    // Sweetener
    'Honey': 60,
    'Agave': 60,
    'Maple Syrup': 50,
    'Stevia': 0,
    'Sugar': 45,
    'None': 0,
    
    // Other
    'Ice': 0,
    'Chia Seeds': 25,
    'Flax Seeds': 30,
    'Vanilla Extract': 10,
    'Cinnamon': 5,
    'Ginger': 5,
    
    // Topping
    'Granola': 120,
    'Almonds': 90,
    'Coconut Flakes': 35,
    'Fresh Berries': 80,
    'Banana Slices': 105,
    'Grilledpea': 150,
    'Avocado': 160,
    'Cucumber': 15,
    'Tomatoes': 25,
    'Cherry Tomatoes': 30,
    'Feta Cheese': 100,
    'Croutons': 80,
    'Parmesan': 110,
    'Carrots': 30,
    'Chocolate Chips': 80,
    
    // Dressing
    'Vinaigrette': 80,
    'Ranch': 140,
    'Caesar': 120,
    'Balsamic': 90,
    'Olive Oil': 120,
    'Lemon Juice': 10
  };
  
  return caloriesMap[ingredientName] || 50; // Default to 50 calories if not found
}






















