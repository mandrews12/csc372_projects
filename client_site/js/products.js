/*  =====================================
    Meghan Andrews - 2/2/2026

    This file contains the JavaScript code for the products page of Critter Haven Crafts and handles category navigation, 
    product detail modals, and interactions with the "Buy Now" and "Contact Seller" buttons.  The code ensures a smooth user 
    experience by dynamically updating the content based on user actions and providing feedback through alerts and modal displays.
    ====================================== */

// Get modal elements
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const modalStock = document.getElementById('modal-stock');
const buyNowBtn = document.getElementById('buy-now');
const contactSellerBtn = document.getElementById('contact-seller');
const closeBtn = document.querySelector('.close');

// Event listener for view details buttons
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.item');
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const price = item.querySelector('p').textContent;
        const description = item.getAttribute('data-description');
        const stock = item.getAttribute('data-stock');

        // Set styling and button state
        if(stock === "In Stock") {
            modalStock.style.color = "green";
            buyNowBtn.style.backgroundColor = "#4090d6";
            buyNowBtn.disabled = false;
        } else {
            modalStock.style.color = "red";
            buyNowBtn.disabled = true;
            buyNowBtn.style.backgroundColor = "grey";
        }

        // Populate modal
        modalImage.src = imgSrc;
        modalImage.alt = item.querySelector('img').alt;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDescription.textContent = description;
        modalStock.textContent = stock;

        // Show modal
        modal.style.display = 'block';
    });
});

// Close modal when clicking close button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Buy Now button
buyNowBtn.addEventListener('click', function() {
    alert('Purchase initiated! (This is a placeholder action)');
});

// Contact Seller button
contactSellerBtn.addEventListener('click', function() {
    window.location.href = 'mailto:charm_tails@yahoo.com?subject=Inquiry about ' + modalTitle.textContent;
});