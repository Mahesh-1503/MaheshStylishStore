// Sample product data with real images
const products = [
    { id: 1, name: "Stylish T-Shirt", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Designer Jeans", price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Elegant Watch", price: 129.99, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Fashionable Sunglasses", price: 59.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Leather Handbag", price: 89.99, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Sneakers", price: 69.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
];

// Function to render products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
        const rupeeValue = (product.price * 74.5).toFixed(2); // Assuming 1 USD = 74.5 INR
        productElement.innerHTML = `
            <div class="product-item h-100">
                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                <h3>${product.name}</h3>
                <p class="price" data-rupee="${rupeeValue}">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });

    // Add event listeners for price hover
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(el => {
        el.addEventListener('mouseover', showRupeeValue);
        el.addEventListener('mouseout', hideRupeeValue);
    });
}

// Function to show rupee value
function showRupeeValue(event) {
    const rupeeValue = event.target.dataset.rupee;
    const tooltip = document.createElement('span');
    tooltip.classList.add('rupee-tooltip');
    tooltip.textContent = `₹${rupeeValue}`;
    event.target.appendChild(tooltip);
}

// Function to hide rupee value
function hideRupeeValue(event) {
    const tooltip = event.target.querySelector('.rupee-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Function to add product to cart (placeholder)
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement cart functionality here
}

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    if (body.getAttribute('data-bs-theme') === 'light') {
        body.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
        body.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    // Reinitialize tooltips after changing the theme
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Function to set initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme) {
        body.setAttribute('data-bs-theme', savedTheme);
        if (savedTheme === 'dark') {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    }
}

// Function to toggle logo display
function toggleLogoDisplay(logo) {
    if (logo.style.display === 'none') {
        logo.style.display = 'inline-block';
    } else {
        logo.style.display = 'none';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setInitialTheme();

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Add logo click functionality
    const logo = document.querySelector('.navbar-brand img');
    const logoContainer = document.querySelector('.navbar-brand');
    
    // Create a new img element for the larger logo
    const largerLogo = document.createElement('img');
    largerLogo.src = 'mahesh.png';
    largerLogo.alt = 'MaheshStylishStore Large Logo';
    largerLogo.style.display = 'none';
    largerLogo.style.position = 'fixed';
    largerLogo.style.top = '50%';
    largerLogo.style.left = '50%';
    largerLogo.style.transform = 'translate(-50%, -50%)';
    largerLogo.style.maxWidth = '80%';
    largerLogo.style.maxHeight = '80%';
    largerLogo.style.zIndex = '1000';
    document.body.appendChild(largerLogo);

    logo.addEventListener('click', function(e) {
        e.preventDefault();
        toggleLogoDisplay(largerLogo);
    });

    // Close larger logo when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== logo && e.target !== largerLogo) {
            largerLogo.style.display = 'none';
        }
    });
});