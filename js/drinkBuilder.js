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
      <h3>Step 3: Add Extras (Optional)</h3>
      <p class="build-instruction">Select up to 2 add-ins for your smoothie</p>
      <div class="options-grid add-in-options-grid">
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
    
    <div class="build-section">
      <h3>Step 4: Choose Sweetness Level (Optional)</h3>
      <div class="sweetness-selector">
        <button class="sweetness-btn" data-value="25">Less Sweet</button>
        <button class="sweetness-btn active" data-value="50">Normal</button>
        <button class="sweetness-btn" data-value="75">More Sweet</button>
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
  
  // Add event listeners for base options
  document.querySelectorAll('.base-options-grid .option-item').forEach(item => {
    item.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const calories = parseInt(this.getAttribute('data-calories'));
      const price = parseFloat(this.getAttribute('data-price'));
      
      // If there was a previously selected base, subtract its price
      if (window.selectedBase) {
        window.totalBuildPrice -= window.selectedBase.price;
      }
      
      // Deselect all other base options
      document.querySelectorAll('.base-options-grid .option-item').forEach(option => {
        option.classList.remove('selected');
      });
      
      // Select this option
      this.classList.add('selected');
      
      // Update selected base
      window.selectedBase = { name, calories, price };
      window.totalBuildPrice += price;
      window.totalBuildCalories = calculateTotalCalories();
      
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
        const index = window.selectedFruits.findIndex(fruit => fruit.name === name);
        if (index !== -1) {
          window.totalBuildPrice -= window.selectedFruits[index].price;
          window.selectedFruits.splice(index, 1);
        }
      } else {
        // Check if we already have 3 fruits selected
        if (window.selectedFruits.length >= 3) {
          alert('You can only select up to 3 fruits. Please deselect one first.');
          return;
        }
        
        // Select this option
        this.classList.add('selected');
        
        // Add to selected fruits
        window.selectedFruits.push({ name, calories, price });
        window.totalBuildPrice += price;
      }
      
      window.totalBuildCalories = calculateTotalCalories();
      
      // Update UI
      updateBuildSummary();
      updatePriceAndCalories();
    });
  });
  
  // Add event listeners for add-in options
  document.querySelectorAll('.add-in-options-grid .option-item').forEach(item => {
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
        const index = window.selectedAddIns.findIndex(addIn => addIn.name === name);
        if (index !== -1) {
          window.totalBuildPrice -= window.selectedAddIns[index].price;
          window.selectedAddIns.splice(index, 1);
        }
      } else {
        // Check if we already have 2 add-ins selected
        if (window.selectedAddIns.length >= 2) {
          alert('You can only select up to 2 add-ins. Please deselect one first.');
          return;
        }
        
        // Select this option
        this.classList.add('selected');
        
        // Add to selected add-ins
        window.selectedAddIns.push({ name, calories, price });
        window.totalBuildPrice += price;
      }
      
      window.totalBuildCalories = calculateTotalCalories();
      
      // Update UI
      updateBuildSummary();
      updatePriceAndCalories();
    });
  });
  
  // Add event listeners for sweetness buttons
  document.querySelectorAll('.sweetness-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Deselect all other sweetness buttons
      document.querySelectorAll('.sweetness-btn').forEach(button => {
        button.classList.remove('active');
      });
      
      // Select this button
      this.classList.add('active');
    });
  });
}

// Helper function to calculate total calories
function calculateTotalCalories() {
  let total = 0;
  
  // Add base calories
  if (window.selectedBase) {
    total += window.selectedBase.calories;
  }
  
  // Add fruits calories
  window.selectedFruits.forEach(fruit => {
    total += fruit.calories;
  });
  
  // Add add-ins calories
  window.selectedAddIns.forEach(addIn => {
    total += addIn.calories;
  });
  
  return total;
}

// Helper function to update the build summary
function updateBuildSummary() {
  const selectedItemsList = document.getElementById('selectedItemsList');
  
  if (!window.selectedBase && window.selectedFruits.length === 0 && window.selectedAddIns.length === 0) {
    selectedItemsList.innerHTML = '<p class="empty-selection">Make your selections above to see them here</p>';
    return;
  }
  
  let html = '';
  
  // Add base
  if (window.selectedBase) {
    html += `
      <div class="selected-item">
        <span class="item-name">${window.selectedBase.name} (Base)</span>
        <span class="item-calories">${window.selectedBase.calories} cal</span>
        ${window.selectedBase.price > 0 ? `<span class="item-price">+$${window.selectedBase.price.toFixed(2)}</span>` : ''}
      </div>
    `;
  }
  
  // Add fruits
  window.selectedFruits.forEach(fruit => {
    html += `
      <div class="selected-item">
        <span class="item-name">${fruit.name}</span>
        <span class="item-calories">${fruit.calories} cal</span>
        ${fruit.price > 0 ? `<span class="item-price">+$${fruit.price.toFixed(2)}</span>` : ''}
      </div>
    `;
  });
  
  // Add add-ins
  window.selectedAddIns.forEach(addIn => {
    html += `
      <div class="selected-item">
        <span class="item-name">${addIn.name}</span>
        <span class="item-calories">${addIn.calories} cal</span>
        ${addIn.price > 0 ? `<span class="item-price">+$${addIn.price.toFixed(2)}</span>` : ''}
      </div>
    `;
  });
  
  selectedItemsList.innerHTML = html;
}