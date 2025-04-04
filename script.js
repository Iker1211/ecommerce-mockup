document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle menu button appearance
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Navigation Menu Functionality
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if it's open
            if (navMenu.classList.contains('active') && mobileMenuBtn) {
                mobileMenuBtn.click();
            }
            
            // Get the href value
            const targetId = this.getAttribute('href');
            
            // If it's a real page link (not just "#")
            if (targetId && targetId !== '#') {
                // For demo purposes, we'll just log the navigation
                console.log(`Navigating to: ${targetId}`);
                
                // In a real application, you would navigate to the page:
                // window.location.href = targetId;
            } else {
                // For demo purposes, simulate section navigation
                const linkText = this.textContent.trim().toLowerCase();
                simulateNavigation(linkText);
            }
        });
    });
    
    // Function to simulate navigation for demo purposes
    function simulateNavigation(section) {
        // Create notification to show navigation
        showNotification(`Navegando a la sección: ${section}`);
        
        // You could also scroll to sections if they exist on the same page
        // For example:
        // const targetSection = document.querySelector(`#${section}`);
        // if (targetSection) {
        //     targetSection.scrollIntoView({ behavior: 'smooth' });
        // }
    }
    
    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Auto slide for testimonials
    function autoSlide() {
        currentSlide++;
        if (currentSlide >= testimonialItems.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    if (testimonialItems.length > 0) {
        setInterval(autoSlide, 5000);
    }
    
    // Shopping cart functionality
    const addToCartButtons = document.querySelectorAll('.product-actions a:nth-child(2)');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            count++;
            cartCount.textContent = count;
            
            // Animation for cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('pulse');
            setTimeout(() => {
                cartIcon.classList.remove('pulse');
            }, 500);
            
            // Get product info
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            
            // Show notification
            showNotification(`Añadido ${productName} al carrito - ${productPrice}`);
        });
    });
    
    // Notification function
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            
            // Add CSS for notification
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: opacity 0.3s, transform 0.3s;
                }
                .notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cart-icon.pulse {
                    animation: pulse 0.5s;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set message and show notification
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // In a real application, you would send this to your server
                showNotification('¡Gracias por suscribirte a nuestro boletín!');
                emailInput.value = '';
            }
        });
    }
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});