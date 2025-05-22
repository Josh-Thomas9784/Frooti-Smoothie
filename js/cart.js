const cartContainer = document.getElementById('cartItems');
const totalDiv = document.getElementById('total');
const deliveryData = JSON.parse(localStorage.getItem('deliveryInfo'));

if (!deliveryData) window.location.href = 'delivery.html';
// Update the delivery info display to include estimated time
if (deliveryData) {
  const deliveryInfoElement = document.getElementById('deliveryInfo');
  
  // Format the delivery type with proper capitalization
  const formattedType = deliveryData.type.charAt(0).toUpperCase() + deliveryData.type.slice(1);
  
  let infoText = `<strong>${formattedType}</strong><br>${deliveryData.address}`;
  
  if (deliveryData.estimatedTime) {
    // Clean up the estimated time text to remove HTML tags if present
    let cleanEstimatedTime = deliveryData.estimatedTime;
    if (cleanEstimatedTime.includes('<strong>')) {
      // Extract just the time information
      if (deliveryData.type === 'delivery') {
        cleanEstimatedTime = `Estimated Delivery: ${cleanEstimatedTime.match(/(\d+) minutes/)[0]}`;
      } else {
        cleanEstimatedTime = cleanEstimatedTime.replace(/<strong>|<\/strong>|<br>/g, '')
          .replace('Pickup Location:', 'Location:')
          .replace('Ready In:', 'Ready in');
      }
    }
    
    infoText += `<br><span class="estimated-time">${cleanEstimatedTime}</span>`;
  }
  
  deliveryInfoElement.innerHTML = infoText;
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function getCouponDiscount(total) {
  const code = localStorage.getItem('appliedCoupon');

  if (!code) return { discount: 0, message: '', code: null };

  switch (code.toUpperCase()) {
    case 'DISCOUNT10':
      return { discount: total * 0.10, message: '10% off applied!', code };
    case 'FREEDRINK':
      return { discount: 3.00, message: '$3 off applied!', code };
    case 'SAVE5':
      if (total > 25) {
        return { discount: 5.00, message: 'Save $5 on orders over $25 applied!', code };
      } else {
        return { discount: 0, message: 'Save $5 coupon requires orders over $25.', code };
      }
    case 'FREESHIP':
      return { discount: 7.00, message: 'Free shipping applied!', code }; // example shipping cost
    default:
      return { discount: 0, message: '', code: null };
  }
}


function updateCartDisplay() {
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="item-line">
        <span class="item-name">${item.name} x ${item.quantity}</span>
        <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div class='changeQty-button'>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
      </div>
    `;
    total += item.price * item.quantity;
    cartContainer.appendChild(div);
  });

  const { discount, message, code } = getCouponDiscount(total);
  const finalTotal = total - discount;

totalDiv.innerHTML = `
  <p class='total-number item-line2'>
    <span>Subtotal:</span>
    <span>$${total.toFixed(2)}</span>
  </p>
  ${code ? `
    <div style="display: flex; align-items: center; gap: 10px;" class="discount-container">
      <p style="color: green; margin: 0;" class='discount-text'>${message} (-$${discount.toFixed(2)})</p>
      <button onclick="removeCoupon()" class='remove-coupon-button'>Remove Coupon</button>
    </div>
  ` : ''}
  <strong class='total-number item-line2'>
    <span>Total:</span>
    <span>$${finalTotal.toFixed(2)}</span>
  </strong>
`;

  localStorage.setItem('cart', JSON.stringify(cart));
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function removeCoupon() {
  localStorage.removeItem('appliedCoupon');
  updateCartDisplay();
}

updateCartDisplay();




// Add item to cart from menu
function addToCart(name, price) {
  const deliveryInfo = localStorage.getItem('deliveryInfo');
  if (!deliveryInfo) {
    alert('Please select a delivery or carryout address first.');
    window.location.href = 'delivery.html';
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay(); // refresh the cart display after adding
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = totalItems;
}

updateCartCount();


// Removes coupon once purchased and clears cart
const applied = localStorage.getItem("appliedCoupon");
if (applied) {
  const used = JSON.parse(localStorage.getItem("usedCoupons") || "[]");
  if (!used.includes(applied)) {
    used.push(applied);
    localStorage.setItem("usedCoupons", JSON.stringify(used));
  }
  localStorage.removeItem("appliedCoupon");
}


document.getElementById('purchaseBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    // Show empty cart popup instead of alert
    const overlay = document.getElementById('emptyCartOverlay');
    const content = overlay.querySelector('.empty-cart-content');
    
    overlay.classList.add('active');
    content.classList.add('active');
    
    // Add event listeners to buttons
    document.getElementById('emptyCartCloseBtn').addEventListener('click', () => {
      overlay.classList.remove('active');
      content.classList.remove('active');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    });
    
    document.getElementById('browseMenuBtn').addEventListener('click', () => {
      window.location.href = 'menu.html';
    });
    
    return;
  }

  // Clear cart and coupon
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.removeItem('appliedCoupon');

  // Update UI
  updateCartDisplay();
  updateCartCount();

  // Show purchase confirmation popup
  const overlay = document.getElementById('purchaseConfirmationOverlay');
  const content = overlay.querySelector('.purchase-confirmation-content');
  
  overlay.classList.add('active');
  content.classList.add('active');
  
  // Start animation after a short delay
  setTimeout(() => {
    const truck = overlay.querySelector('.delivery-truck');
    const route = overlay.querySelector('.route-line');
    
    truck.classList.add('animate');
    route.classList.add('animate');
    
    // Redirect to home page after animation completes
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3500); // Animation takes 3s, add a bit extra
  }, 1000);
});

// Add this after the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Name validation - only letters and spaces
  const nameInput = document.getElementById('name');
  nameInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
  });

  // Card number validation - only numbers, max 16 digits
  const cardNumberInput = document.getElementById('card-number');
  cardNumberInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
    // Limit to 16 digits
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
    // Format with spaces for readability (optional)
    // this.value = this.value.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  // CVV validation - only numbers, 3-4 digits
  const cvvInput = document.getElementById('cvv');
  cvvInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
    // Limit to 4 digits (some cards use 3, others 4)
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });

  // Expiry validation - MM/YY format
  const expiryInput = document.getElementById('expiry');
  expiryInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d\/]/g, '');
    
    // Format as MM/YY automatically
    if (this.value.length === 2 && !this.value.includes('/')) {
      this.value += '/';
    }
    
    // Limit month to valid values (01-12)
    if (this.value.length === 2 && !this.value.includes('/')) {
      const month = parseInt(this.value);
      if (month > 12) {
        this.value = '12';
      }
      if (month < 1) {
        this.value = '01';
      }
    }
    
    // Limit total length to 5 chars (MM/YY)
    if (this.value.length > 5) {
      this.value = this.value.slice(0, 5);
    }
  });
});

