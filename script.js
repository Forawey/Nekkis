function validateLogin() {
	window.location.href = "index.html";
	return false;
}

function validateRegister() {
	window.location.href = "index.html";
	return false;
}

function scrollToSection() {
    const hash = window.location.hash;

    if (hash) {
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                element.style.backgroundColor = "#f8f9fa";
                element.style.transition = "background-color 0.5s";

                setTimeout(() => {
                    element.style.backgroundColor = "";
                }, 500);
            }
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", scrollToSection);

window.addEventListener("hashchange", scrollToSection);

function buyCommand(productId, productName) {
    const productCard = event.target.closest('.product-card');
    const productPrice = productCard.querySelector('.current-price').textContent.trim();
    const productImage = productCard.querySelector('img').src;
    const specs = Array.from(productCard.querySelectorAll('.specs span')).map(span => span.textContent);
    
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        specs: specs,
        quantity: 1,
        dateAdded: new Date().toISOString()
    };
    
    addToCart(product);
    
    showNotification(`Товар "${productName}" добавлен в корзину!`);
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCounter();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
	
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
});