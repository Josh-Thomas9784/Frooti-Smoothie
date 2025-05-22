// buildYourOwn.js - Handles all Build Your Own functionality

// Global variables for tracking selections
let selectedBase = null;
let selectedFruits = [];
let selectedAddIns = [];
let totalBuildPrice = 8.99; // Default starting price
let totalBuildCalories = 0;

// Initialize the build your own page
document.addEventListener('DOMContentLoaded', function() {
  initializeBuildYourOwn();
  updateCartCount();
  
  // Add event listener for nutrition info button
  const nutritionBtn = document.querySelector('.nutrition-info-btn');
  if (nutritionBtn) {
    // Remove any existing listeners
    const newNutritionBtn = nutritionBtn.cloneNode(true);
    nutritionBtn.parentNode.replaceChild(newNutritionBtn, nutritionBtn);
    
    // Add new listener
    newNutritionBtn.onclick = function() {
      showNutritionInfo();
    };
  }
  
  // Add event listener for add to cart button
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    // Remove any existing listeners
    const newAddToCartBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
    
    // Add new listener
    newAddToCartBtn.onclick = function() {
      addCustomItemToCart();
    };
  }
  
  // Set up modal close buttons
  setupModalCloseButtons();
});

// Set up modal close buttons
function setupModalCloseButtons() {
  // Nutrition modal close button
  const nutritionCloseBtn = document.querySelector('#nutritionModal .close-modal');
  if (nutritionCloseBtn) {
    nutritionCloseBtn.addEventListener('click', function() {
      document.getElementById('nutritionModal').style.display = 'none';
    });
  }
  
  // Close modals when clicking outside
  window.onclick = function(event) {
    const nutritionModal = document.getElementById('nutritionModal');
    const cartConfirmationModal = document.getElementById('cartConfirmationModal');
    
    if (event.target === nutritionModal) {
      nutritionModal.style.display = 'none';
    }
    
    if (event.target === cartConfirmationModal) {
      cartConfirmationModal.style.display = 'none';
    }
  };
}

// Initialize the build your own page
function initializeBuildYourOwn() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const buildType = urlParams.get('type') || 'drink';
  
  // Set page title and description based on type
  let title, basePrice, baseImage;
  
  switch(buildType) {
    case 'drink':
      title = 'Build Your Own Smoothie';
      basePrice = 8.99;
      baseImage = 'pictures/pictures.png';
      break;
    case 'bowl':
      title = 'Build Your Own Bowl';
      basePrice = 10.99;
      baseImage = 'pictures/custom-bowl.jpg';
      break;
    case 'salad':
      title = 'Build Your Own Salad';
      basePrice = 9.99;
      baseImage = 'pictures/custom-salad.jpg';
      break;
    default:
      title = 'Build Your Own Smoothie';
      basePrice = 8.99;
      baseImage = 'pictures/custom-smoothie.jpg';
  }
  
  // Update page elements
  document.getElementById('productName').textContent = title;
  document.getElementById('productDescription').textContent = 'Create your perfect custom item by selecting ingredients below.';
  document.getElementById('productPrice').textContent = `$${basePrice.toFixed(2)}`;
  document.getElementById('productImage').src = baseImage;
  document.getElementById('finalPrice').textContent = `$${basePrice.toFixed(2)}`;
  
  // Set initial price
  totalBuildPrice = basePrice;
  
  // Create the appropriate build interface
  if (buildType === 'drink') {
    createDrinkBuildInterface();
  } else if (buildType === 'bowl') {
    // Future implementation for bowls
    alert('Build Your Own Bowl coming soon!');
    window.location.href = 'menu.html';
  } else if (buildType === 'salad') {
    // Future implementation for salads
    alert('Build Your Own Salad coming soon!');
    window.location.href = 'menu.html';
  } else {
    createDrinkBuildInterface(); // Default to drink
  }
}

// Create the drink build interface
function createDrinkBuildInterface() {
  // Define the base options
  const baseOptions = [
    { name: 'Strawberry', calories: 150, price: 0 },
    { name: 'Mango', calories: 140, price: 0 },
    { name: 'Banana', calories: 105, price: 0 },
    { name: 'Mixed Berries', calories: 120, price: 0 },
    { name: 'Acai', calories: 100, price: 0.50 }
  ];
  
  // Define the fruit options
  const fruitOptions = [
    { name: 'Pineapple', calories: 80, price: 0 },
    { name: 'Blueberry', calories: 85, price: 0 },
    { name: 'Raspberry', calories: 65, price: 0 },
    { name: 'Kiwi', calories: 60, price: 0.50 },
    { name: 'Peach', calories: 70, price: 0 }
  ];
  
  // Define the add-in options
  const addInOptions = [
    { name: 'Yogurt', calories: 100, price: 0 },
    { name: 'Almond Milk', calories: 80, price: 0.50 },
    { name: 'Honey', calories: 60, price: 0 },
    { name: 'Protein Powder', calories: 120, price: 1.50 },
    { name: 'Chia Seeds', calories: 25, price: 0.75 }
  ];
  
  // Get the ingredients section
  const ingredientsSection = document.querySelector('.ingredients-section');
  
  // Clear any existing content
  ingredientsSection.innerHTML = '';
  
  // Create the build interface HTML
  const buildHTML = `
    <h2>Create Your Custom Smoothie</h2>
    
    <div class="build-section">
      <h3>Step 1: Choose Your Base <span class="required">*</span></h3>
      <p class="build-instruction">Select 1 base for your smoothie</p>
      <div class="options-grid base-options-grid">
        ${baseOptions.map(option => `
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}" data-price="${option.price}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
              ${option.price > 0 ? `<span class="option-price">+$${option.price.toFixed(2)}</span>` : ''}
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
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}" data-price="${option.price}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
              ${option.price > 0 ? `<span class="option-price">+$${option.price.toFixed(2)}</span>` : ''}
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
          <div class="option-item" data-name="${option.name}" data-calories="${option.calories}" data-price="${option.price}">
            <div class="option-content">
              <span class="option-name">${option.name}</span>
              <span class="option-calories">${option.calories} cal</span>
              ${option.price > 0 ? `<span class="option-price">+$${option.price.toFixed(2)}</span>` : ''}
            </div>
            <div class="option-select">Select</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="selected-items-summary">
      <h3>Your Custom Smoothie</h3>
      <div id="selectedItemsList">
        <p class="empty-selection">Make your selections above to see them here</p>
      </div>
    </div>
  `;
  
  // Add the HTML to the page
  ingredientsSection.innerHTML = buildHTML;
  
  // Add CSS for the build interface
  const style = document.createElement('style');
  style.textContent = `

  .build-section:first-of-type h3::after {
      content: none;
    }

    .build-section {
      margin-bottom: 30px;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .build-section h3 {
      font-family: 'Fredoka', sans-serif;
      color: var(--secondary);
      margin-top: 0;
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
    
    .option-calories, .option-price {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #888;
    }
    
    .option-item.selected .option-calories,
    .option-item.selected .option-price {
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
    
    .selected-items-summary {
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      margin-bottom: 30px;
    }
    
    .selected-items-summary h3 {
      font-family: 'Fredoka', sans-serif;
      color: var(--secondary);
      margin-top: 0;
    }
    
    .empty-selection {
      font-family: 'Fredoka', sans-serif;
      color: #888;
      font-style: italic;
    }
    
    .selected-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      font-family: 'Fredoka', sans-serif;
    }
    
    .selected-item:last-child {
      border-bottom: none;
    }
    
    .selected-item-name {
      font-weight: bold;
    }
    
    .selected-item-details {
      color: #888;
      font-size: 14px;
    }
  `;
  document.head.appendChild(style);
  
  // Add event listeners for base options
  document.querySelectorAll('.base-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      const price = parseFloat(this.getAttribute('data-price'));
      
      // If there was a previously selected base, subtract its price
      if (selectedBase) {
        totalBuildPrice -= selectedBase.price;
      }
      
      // Deselect all other base options
      document.querySelectorAll('.base-options-grid .option-item').forEach(option => {
        option.classList.remove('selected');
      });
      
      // Select this option
      this.classList.add('selected');
      
      // Update selected base
      selectedBase = { name, calories, price };
      totalBuildPrice += price;
      
      // Update UI
      updateBuildSummary();
      updatePriceAndCalories();
    });
  });
  
  // Add event listeners for fruit options
  document.querySelectorAll('.fruit-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      const price = parseFloat(this.getAttribute('data-price'));
      
      // Check if already selected
      const isSelected = this.classList.contains('selected');
      
      if (isSelected) {
        // Deselect this option
        this.classList.remove('selected');
        
        // Remove from selected fruits and subtract price
        const index = selectedFruits.findIndex(fruit => fruit.name === name);
        if (index !== -1) {
          totalBuildPrice -= selectedFruits[index].price;
          selectedFruits.splice(index, 1);
        }
      } else {
        // Check if we already have 3 fruits selected
        if (selectedFruits.length >= 3) {
          // Instead of alert, add with extra charge
          const extraCharge = 0.75;
          totalBuildPrice += price + extraCharge;
          selectedFruits.push({ name, calories, price: price + extraCharge, extraCharge: true });
          
          // Show a notification about the extra charge
          const notification = document.createElement('div');
          notification.className = 'extra-charge-notification';
          notification.innerHTML = `<p>Extra fruit added! $0.75 surcharge applied.</p>`;
          document.querySelector('.build-section').appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.remove();
          }, 3000);
        } else {
          // Select this option with normal price
          totalBuildPrice += price;
          selectedFruits.push({ name, calories, price });
        }
        
        // Select this option
        this.classList.add('selected');
      }
      
      // Update UI
      updateBuildSummary();
      updatePriceAndCalories();
    });
  });
  
  // Add event listeners for add-in options
  document.querySelectorAll('.addin-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      const price = parseFloat(this.getAttribute('data-price'));
      
      // Check if already selected
      const isSelected = this.classList.contains('selected');
      
      if (isSelected) {
        // Deselect this option
        this.classList.remove('selected');
        
        // Remove from selected add-ins and subtract price
        const index = selectedAddIns.findIndex(addIn => addIn.name === name);
        if (index !== -1) {
          totalBuildPrice -= selectedAddIns[index].price;
          selectedAddIns.splice(index, 1);
        }
      } else {
        // Check if we already have 2 add-ins selected
        if (selectedAddIns.length >= 2) {
          // Instead of alert, add with extra charge
          const extraCharge = 1.00;
          totalBuildPrice += price + extraCharge;
          selectedAddIns.push({ name, calories, price: price + extraCharge, extraCharge: true });
          
          // Show a notification about the extra charge
          const notification = document.createElement('div');
          notification.className = 'extra-charge-notification';
          notification.innerHTML = `<p>Extra add-in added! $1.00 surcharge applied.</p>`;
          document.querySelector('.build-section').appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
            notification.remove();
          }, 3000);
        } else {
          // Select this option with normal price
          totalBuildPrice += price;
          selectedAddIns.push({ name, calories, price });
        }
        
        // Select this option
        this.classList.add('selected');
      }
      
      // Update UI
      updateBuildSummary();
      updatePriceAndCalories();
    });
  });
}

// Update the summary of selected items
function updateBuildSummary() {
  const summaryList = document.getElementById('selectedItemsList');
  
  // If nothing is selected yet, show empty message
  if (!selectedBase && selectedFruits.length === 0 && selectedAddIns.length === 0) {
    summaryList.innerHTML = '<p class="empty-selection">Make your selections above to see them here</p>';
    return;
  }
  
  // Build the summary HTML
  let summaryHTML = '';
  
  // Add base
  if (selectedBase) {
    summaryHTML += `
      <div class="selected-item">
        <span class="selected-item-name">Base: ${selectedBase.name}</span>
        <span class="selected-item-details">${selectedBase.calories} cal</span>
      </div>
    `;
  }
  
  // Add fruits
  if (selectedFruits.length > 0) {
    summaryHTML += `
      <div class="selected-item">
        <span class="selected-item-name">Fruits: ${selectedFruits.map(f => f.name).join(', ')}</span>
        <span class="selected-item-details">${selectedFruits.reduce((sum, f) => sum + f.calories, 0)} cal</span>
        ${selectedFruits.length > 3 ? '<span class="extra-charge-label">Extra charge applied</span>' : ''}
      </div>
    `;
  }
  
  // Add add-ins
  if (selectedAddIns.length > 0) {
    summaryHTML += `
      <div class="selected-item">
        <span class="selected-item-name">Add-ins: ${selectedAddIns.map(a => a.name).join(', ')}</span>
        <span class="selected-item-details">${selectedAddIns.reduce((sum, a) => sum + a.calories, 0)} cal</span>
        ${selectedAddIns.length > 2 ? '<span class="extra-charge-label">Extra charge applied</span>' : ''}
      </div>
    `;
  }
  
  // Update the summary
  summaryList.innerHTML = summaryHTML;
}

// Update price and calories display
function updatePriceAndCalories() {
  // Calculate total calories
  totalBuildCalories = 0;
  
  if (selectedBase) {
    totalBuildCalories += selectedBase.calories;
  }
  
  selectedFruits.forEach(fruit => {
    totalBuildCalories += fruit.calories;
  });
  
  selectedAddIns.forEach(addIn => {
    totalBuildCalories += addIn.calories;
  });
  
  // Update UI
  document.getElementById('finalPrice').textContent = `$${totalBuildPrice.toFixed(2)}`;
  document.getElementById('productCalories').textContent = `${totalBuildCalories} Kcals`;
}

// Show nutrition info modal
function showNutritionInfo() {
  // Calculate nutrition values
  let protein = 0;
  let fat = 0;
  let carbs = 0;
  let sugar = 0;
  let calories = totalBuildCalories;
  
  // Base nutrition values (estimated)
  if (selectedBase) {
    protein += 1;
    fat += 0.5;
    carbs += 15;
    sugar += 10;
  }
  
  // Add nutrition from fruits (estimated)
  selectedFruits.forEach(fruit => {
    protein += 0.5;
    fat += 0.2;
    carbs += 10;
    sugar += 8;
  });
  
  // Add nutrition from add-ins (estimated)
  selectedAddIns.forEach(addIn => {
    if (addIn.name === 'Protein Powder') {
      protein += 15;
      fat += 1;
      carbs += 3;
      sugar += 1;
    } else if (addIn.name === 'Yogurt') {
      protein += 5;
      fat += 3;
      carbs += 6;
      sugar += 5;
    } else if (addIn.name === 'Almond Milk') {
      protein += 1;
      fat += 2.5;
      carbs += 1;
      sugar += 0;
    } else if (addIn.name === 'Honey') {
      protein += 0;
      fat += 0;
      carbs += 17;
      sugar += 17;
    } else if (addIn.name === 'Chia Seeds') {
      protein += 2;
      fat += 3;
      carbs += 5;
      sugar += 0;
    }
  });
  
  // Remove any existing nutrition modal first
  const existingModal = document.querySelector('.nutrition-facts-modal');
  if (existingModal) {
    document.body.removeChild(existingModal);
  }
  
  // Create a modal for nutrition info
  const modal = document.createElement('div');
  modal.className = 'nutrition-facts-modal';
  
  modal.innerHTML = `
    <div class="nutrition-facts-content">
      <h2>Nutrition Facts</h2>
      <div class="nutrition-facts-table">
        <div class="nutrition-facts-row">
          <span>Calories</span>
          <span>${Math.round(calories)}</span>
        </div>
        <div class="nutrition-facts-row">
          <span>Protein</span>
          <span>${Math.round(protein)}g</span>
        </div>
        <div class="nutrition-facts-row">
          <span>Fat</span>
          <span>${Math.round(fat)}g</span>
        </div>
        <div class="nutrition-facts-row">
          <span>Carbohydrates</span>
          <span>${Math.round(carbs)}g</span>
        </div>
        <div class="nutrition-facts-row">
          <span>Sugar</span>
          <span>${Math.round(sugar)}g</span>
        </div>
      </div>
      <button class="nutrition-facts-close">Close</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Make sure the modal is visible
  modal.style.display = 'flex';
  
  // Add event listener for close button
  document.querySelector('.nutrition-facts-close').addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  // Close when clicking outside the content
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // Prevent the default behavior that might be causing the direct display
  event.preventDefault();
  event.stopPropagation();
  return false;
}

// Add custom item to cart
function addCustomItemToCart() {
  // Validate selections
  if (!selectedBase) {
    showValidationError('Please select a base for your smoothie.');
    return;
  }
  
  if (selectedFruits.length === 0) {
    showValidationError('Please select at least one fruit for your smoothie.');
    return;
  }
  
  // Get selected sweetness level
  const sweetnessBtn = document.querySelector('.sweetness-btn.active');
  const sweetness = sweetnessBtn ? parseInt(sweetnessBtn.getAttribute('data-value')) : 50;
  
  // Create custom item object
  const customItem = {
    name: 'Custom Smoothie',
    price: totalBuildPrice,
    quantity: 1,
    calories: totalBuildCalories,
    customizations: {
      base: selectedBase.name,
      fruits: selectedFruits.map(fruit => fruit.name),
      addIns: selectedAddIns.map(addIn => addIn.name),
      sweetness: sweetness
    }
  };
  
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Add the item to cart
  cart.push(customItem);
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showAddToCartAnimation();
}

// Show add to cart animation
function showAddToCartAnimation() {
  // Remove any existing overlay first
  const existingOverlay = document.querySelector('.cart-animation-overlay');
  if (existingOverlay) {
    document.body.removeChild(existingOverlay);
  }

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
    <p>Custom Smoothie has been added to your cart.</p>
    <div class="cart-animation-buttons">
      <button id="continueShoppingBtn">Continue Shopping</button>
      <button id="viewCartBtn">View Cart</button>
    </div>
  `;
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  // Add animation classes immediately
  overlay.classList.add('active');
  content.classList.add('active');
  
  // Add event listeners to buttons with direct navigation
  document.getElementById('continueShoppingBtn').onclick = function() {
    window.location.href = 'menu.html';
  };
  
  document.getElementById('viewCartBtn').onclick = function() {
    window.location.href = 'cart.html';
  };
}

// Show cart confirmation modal
function showCartConfirmation() {
  const modal = document.getElementById('cartConfirmationModal');
  modal.style.display = 'flex';
  
  // Add event listeners to buttons
  document.getElementById('continueShoppingBtn').addEventListener('click', function() {
    modal.style.display = 'none';
    window.location.href = 'menu.html';
  });
  
  document.getElementById('viewCartBtn').addEventListener('click', function() {
    modal.style.display = 'none';
    window.location.href = 'cart.html';
  });
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
    <p>Custom Smoothie has been added to your cart.</p>
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

// Update the event listener for the nutrition info button
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the nutrition info button
  const nutritionInfoBtn = document.querySelector('.nutrition-info-btn');
  if (nutritionInfoBtn) {
    // Remove any existing event listeners first
    const newNutritionInfoBtn = nutritionInfoBtn.cloneNode(true);
    nutritionInfoBtn.parentNode.replaceChild(newNutritionInfoBtn, nutritionInfoBtn);
    
    // Add our event listener
    newNutritionInfoBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      showNutritionInfo(event);
      return false;
    });
  }
  
  // Find and disable any other nutrition info buttons or elements
  const allNutritionButtons = document.querySelectorAll('[class*="nutrition"]');
  allNutritionButtons.forEach(button => {
    if (button !== newNutritionInfoBtn && button.classList.contains('nutrition-info-btn')) {
      button.style.display = 'none';
    }
  });
  
  // Remove any existing nutrition information displays
  const nutritionDisplays = document.querySelectorAll('.nutrition-information, .nutrition-facts, .nutrition-data');
  nutritionDisplays.forEach(display => {
    if (display.parentNode) {
      display.parentNode.removeChild(display);
    }
  });
});

// Override any other nutrition info functions that might be defined in other files
window.showNutritionInfo = showNutritionInfo;
window.showNutritionModal = showNutritionInfo;
window.displayNutritionInfo = showNutritionInfo;
window.updateNutritionInfo = function() { return false; };

// Add event listener for the Add to Cart button
document.getElementById('addToCartBtn').addEventListener('click', function() {
  // Validate selections
  if (!selectedBase) {
    showValidationError('Please select a base for your smoothie.');
    return;
  }
  
  if (selectedFruits.length === 0) {
    showValidationError('Please select at least one fruit for your smoothie.');
    return;
  }
  
  // Create custom item object
  const customItem = {
    name: 'Custom Smoothie',
    price: totalBuildPrice,
    quantity: 1,
    calories: totalBuildCalories,
    customizations: {
      base: selectedBase.name,
      fruits: selectedFruits.map(fruit => fruit.name),
      addIns: selectedAddIns.map(addIn => addIn.name)
    }
  };
  
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Add the item to cart
  cart.push(customItem);
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showAddToCartAnimation();
});

// Show validation error popup
function showValidationError(message) {
  // Remove any existing error popup
  const existingPopup = document.querySelector('.validation-error-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
  
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'validation-error-popup';
  popup.innerHTML = `
    <div class="validation-error-content">
      <div class="error-icon">
        <i class='bx bx-error-circle'></i>
      </div>
      <p>${message}</p>
      <button class="error-close-btn">OK</button>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(popup);
  
  // Add CSS for the popup
  const style = document.createElement('style');
  if (!document.querySelector('style[data-for="validation-popup"]')) {
    style.setAttribute('data-for', 'validation-popup');
    style.textContent = `
      .validation-error-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }
      
      .validation-error-content {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
      }
      
      .error-icon {
        font-size: 48px;
        color: #e74c3c;
        margin-bottom: 15px;
      }
      
      .validation-error-content p {
        font-family: 'Fredoka', sans-serif;
        font-size: 18px;
        margin-bottom: 20px;
        color: #333;
      }
      
      .error-close-btn {
        background-color: var(--secondary);
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 5px;
        font-family: 'Fredoka', sans-serif;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      .error-close-btn:hover {
        background-color: #d35400;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add close functionality
  popup.querySelector('.error-close-btn').addEventListener('click', function() {
    popup.remove();
  });
  
  // Also close when clicking outside
  popup.addEventListener('click', function(event) {
    if (event.target === popup) {
      popup.remove();
    }
  });
}

// At the beginning of the file, add this function
document.addEventListener('DOMContentLoaded', function() {
  // Override the default alert function to use our custom popup
  const originalAlert = window.alert;
  window.alert = function(message) {
    showValidationError(message);
  };
  
  // Custom validation error popup function
  function showValidationError(message) {
    // Remove any existing error popup
    const existingPopup = document.querySelector('.validation-error-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
    
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'validation-error-popup';
    popup.innerHTML = `
      <div class="validation-error-content">
        <div class="error-icon">
          <i class='bx bx-error-circle'></i>
        </div>
        <p>${message}</p>
        <button class="error-close-btn">OK</button>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(popup);
    
    // Add CSS for the popup
    if (!document.querySelector('style[data-for="validation-popup"]')) {
      const style = document.createElement('style');
      style.setAttribute('data-for', 'validation-popup');
      style.textContent = `
        .validation-error-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        .validation-error-content {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          animation: slideIn 0.3s ease;
        }
        
        .error-icon {
          font-size: 48px;
          color: #e74c3c;
          margin-bottom: 15px;
        }
        
        .validation-error-content p {
          font-family: 'Fredoka', sans-serif;
          font-size: 18px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .error-close-btn {
          background-color: var(--secondary);
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 5px;
          font-family: 'Fredoka', sans-serif;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .error-close-btn:hover {
          background-color: #d35400;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add close functionality
    popup.querySelector('.error-close-btn').addEventListener('click', function() {
      popup.remove();
    });
    
    // Also close when clicking outside
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        popup.remove();
      }
    });
  }
});







