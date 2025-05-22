// This script fixes the cart animation and nutrition modal issues

document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for add to cart button
  document.getElementById('addToCartBtn').addEventListener('click', function() {
    // Validate selections
    if (!selectedBase) {
      alert('Please select a base for your smoothie.');
      return;
    }
    
    if (selectedFruits.length === 0) {
      alert('Please select at least one fruit for your smoothie.');
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
    
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add item to cart
    cart.push(customItem);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
    
    // Show add to cart animation
    showAddToCartAnimation();
  });
  
  // Add event listener for nutrition info button
  const nutritionBtn = document.querySelector('.nutrition-info-btn');
  if (nutritionBtn) {
    nutritionBtn.addEventListener('click', function() {
      // Calculate nutrition values
      let protein = 0;
      let fat = 0;
      let carbs = 0;
      let sugar = 0;
      let calories = totalBuildCalories;
      
      // Base nutrition values
      if (selectedBase) {
        protein += 2;
        fat += 1;
        carbs += 15;
        sugar += 10;
      }
      
      // Add nutrition from fruits
      selectedFruits.forEach(fruit => {
        protein += 0.5;
        fat += 0.2;
        carbs += 10;
        sugar += 8;
      });
      
      // Add nutrition from add-ins
      selectedAddIns.forEach(addIn => {
        protein += 0.5;
        fat += 0.3;
        carbs += 5;
        sugar += 2;
      });
      
      // Create and show nutrition modal
      showNutritionModal(calories, protein, fat, carbs, sugar);
    });
  }
});

// Function to show nutrition modal
function showNutritionModal(calories, protein, fat, carbs, sugar) {
  // Remove any existing modal
  const existingModal = document.getElementById('nutritionModal');
  if (existingModal) {
    document.body.removeChild(existingModal);
  }
  
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'nutritionModal';
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Nutrition Information</h2>
      <div class="nutrition-table">
        <div class="nutrition-row">
          <span>Calories</span>
          <span id="nutrition-calories">${calories}</span>
        </div>
        <div class="nutrition-row">
          <span>Protein</span>
          <span id="nutrition-protein">${protein.toFixed(1)}g</span>
        </div>
        <div class="nutrition-row">
          <span>Fat</span>
          <span id="nutrition-fat">${fat.toFixed(1)}g</span>
        </div>
        <div class="nutrition-row">
          <span>Carbohydrates</span>
          <span id="nutrition-carbs">${carbs.toFixed(1)}g</span>
        </div>
        <div class="nutrition-row">
          <span>Sugar</span>
          <span id="nutrition-sugar">${sugar.toFixed(1)}g</span>
        </div>
      </div>
      <p class="nutrition-disclaimer">Values are approximate and may vary based on exact ingredients and portion sizes.</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Show modal
  setTimeout(() => {
    modal.style.display = 'flex';
  }, 10);
  
  // Add event listener for close button
  modal.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  });
  
  // Close when clicking outside the modal
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  });
}

// Function to show the add to cart animation
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


// This script fixes the nutrition modal issues by ensuring events are only attached once
// and the modal properly appears and disappears

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  const nutritionModal = document.getElementById('nutritionModal');
  
  // Initially hide the modal
  nutritionModal.style.display = 'none';
  
  // Add event listener for nutrition info button - use once to ensure it's not duplicated
  const nutritionBtn = document.querySelector('.nutrition-info-btn');
  
  // Remove any existing click listeners to prevent duplicates
  const newNutritionBtn = nutritionBtn.cloneNode(true);
  nutritionBtn.parentNode.replaceChild(newNutritionBtn, nutritionBtn);
  
  // Add the event listener to the new button
  newNutritionBtn.addEventListener('click', function() {
    // Update nutrition info and show modal
    updateNutritionInfo();
    nutritionModal.style.display = 'flex';  // Changed to flex to match the CSS
  });
  
  // Get the close button and add event listener
  const closeBtn = document.querySelector('.close-modal');
  // Remove any existing click listeners
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  
  // Add event listener to the new close button
  newCloseBtn.addEventListener('click', function() {
    nutritionModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target === nutritionModal) {
      nutritionModal.style.display = 'none';
    }
  };
});

// Function to update nutrition info in the modal
function updateNutritionInfo() {
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
  
  // Update the modal with nutrition info
  document.getElementById('nutrition-calories').textContent = calories;
  document.getElementById('nutrition-protein').textContent = protein.toFixed(1) + 'g';
  document.getElementById('nutrition-fat').textContent = fat.toFixed(1) + 'g';
  document.getElementById('nutrition-carbs').textContent = carbs.toFixed(1) + 'g';
  document.getElementById('nutrition-sugar').textContent = sugar.toFixed(1) + 'g';
}
