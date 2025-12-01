function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.querySelector('.total-amount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Ваша корзина пуста</p>
                <a href="index.html" class="continue-shopping">Продолжить покупки</a>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => {
            const price = parseInt(item.price.replace(/\s/g, '').replace('₽', '')) || 0;
            const itemTotal = price * item.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='res/placeholder.jpg'">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        ${item.specs ? `<div class="item-specs">${item.specs.slice(0, 3).join(' • ')}</div>` : ''}
                    </div>
                    <div class="item-price">${item.price}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="item-total">${itemTotal.toLocaleString()}₽</div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
                </div>
            `;
        }).join('');
    }
    
    totalAmount.textContent = `${total.toLocaleString()}₽`;
    updateCartCounter();
}

// Функция для изменения количества товара
function changeQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Функция для очистки корзины
function clearCart() {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        localStorage.removeItem('cart');
        updateCartDisplay();
    }
}

// Функция для обновления счетчика в хедере
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Функция для оформления заказа
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    alert('Заказ оформлен! Спасибо за покупку!');
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Добавляем обработчик для кнопки оформления заказа
    const checkoutBtn = document.querySelector('.cart-buy');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Добавляем обработчик для кнопки очистки корзины
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});