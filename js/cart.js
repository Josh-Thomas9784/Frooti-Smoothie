const cartContainer = document.getElementById('cartItems');
const totalDiv = document.getElementById('total');
const deliveryData = JSON.parse(localStorage.getItem('deliveryInfo'));

if (!deliveryData) window.location.href = 'delivery.html';
// Update the delivery info display to include estimated time
if (deliveryData) {
  const deliveryInfoElement = document.getElementById('deliveryInfo');
  let infoText = `${deliveryData.type.toUpperCase()} - ${deliveryData.address}`;
  
  if (deliveryData.estimatedTime) {
    infoText += `<br>${deliveryData.estimatedTime}`;
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
      return { discount: 2.50, message: 'Free drink ($2.50) applied!', code };
    case 'SAVE5':
      if (total > 25) {
        return { discount: 5.00, message: 'Save $5 on orders over $25 applied!', code };
      } else {
        return { discount: 0, message: 'Save $5 coupon requires orders over $25.', code };
      }
    case 'FREESHIP':
      return { discount: 3.00, message: 'Free shipping applied!', code }; // example shipping cost
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

