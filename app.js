// ग्रामसंचय Application - Main JavaScript File

// Global application state
let currentUser = null;
let isLoggedIn = false;
let currentPage = 'home';
let selectedItem = null;
let currentTransaction = null;
let chatPollingInterval = null;

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load current user session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser && savedUser !== 'null') {
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
        } else {
            currentUser = null;
            isLoggedIn = false;
        }
        
        // Update UI based on login status
        updateAuthUI();
        
        // Load initial page
        await showPage('home');
        
        // Start chat polling if on chat page and logged in
        if (currentPage === 'chat' && isLoggedIn) {
            startChatPolling();
        }
        
        console.log('ग्रामसंचय application initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize application');
    }
}

// Page navigation
async function showPage(pageId) {
    try {
        showLoading();
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;
            
            // Update active nav link
            const navLink = document.getElementById(`nav-${pageId}`);
            if (navLink) {
                navLink.classList.add('active');
            }
            
            // Load page content
            await loadPageContent(pageId);
        }
        
        hideLoading();
    } catch (error) {
        console.error('Error showing page:', error);
        hideLoading();
        showError('Failed to load page');
    }
}

// Load specific page content
async function loadPageContent(pageId) {
    switch (pageId) {
        case 'marketplace':
            await loadMarketplace();
            break;
        case 'orders':
            await loadOrders();
            break;
        case 'chat':
            await loadChat();
            break;
        case 'profile':
            await loadProfile();
            break;
        case 'admin':
            if (currentUser && currentUser.role === 'admin') {
                await loadAdminDashboard();
            } else {
                showError('Admin access required');
                await showPage('home');
            }
            break;
        case 'login':
        case 'register':
            // No additional loading needed for auth pages
            break;
    }
}

// Authentication functions
async function showLogin() {
    await showPage('login');
}

async function showRegister() {
    await showPage('register');
}

async function handleLogin(event) {
    event.preventDefault();
    
    try {
        showLoading();
        
        const phone = document.getElementById('loginPhone').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate API call
        await MockAPI.delay(1000);
        
        // For demo purposes, create/find user based on phone
        const users = await MockAPI.getUsers();
        let user = users.find(u => u.phone === phone);
        
        if (!user) {
            hideLoading();
            showError('User not found. Please register first.');
            return;
        }
        
        // In a real app, you'd verify the password
        // For demo, we'll just log them in
        
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        updateAuthUI();
        hideLoading();
        showSuccess('Login successful!');
        
        await showPage('home');
        
    } catch (error) {
        console.error('Login error:', error);
        hideLoading();
        showError('Login failed. Please try again.');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    try {
        showLoading();
        
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone').value;
        const village = document.getElementById('registerVillage').value;
        const district = document.getElementById('registerDistrict').value;
        const role = document.getElementById('registerRole').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            hideLoading();
            showError('Passwords do not match');
            return;
        }
        
        // Check if user already exists
        const users = await MockAPI.getUsers();
        const existingUser = users.find(u => u.phone === phone);
        
        if (existingUser) {
            hideLoading();
            showError('User with this phone number already exists');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'u' + Date.now(),
            name: name,
            phone: phone,
            village: village,
            district: district,
            role: role,
            verified: false,
            rating: 0,
            totalTransactions: 0,
            joinedDate: new Date().toISOString().split('T')[0],
            avatar: role === 'caretaker' ? '🛡️' : (role === 'owner' ? '👨‍🌾' : '👩‍🌾')
        };
        
        // Add to users list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Log them in
        currentUser = newUser;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        updateAuthUI();
        hideLoading();
        showSuccess('Registration successful! Welcome to ग्रामसंचय!');
        
        await showPage('home');
        
    } catch (error) {
        console.error('Registration error:', error);
        hideLoading();
        showError('Registration failed. Please try again.');
    }
}

async function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    
    updateAuthUI();
    showSuccess('Logged out successfully');
    
    await showPage('home');
    
    // Stop chat polling
    if (chatPollingInterval) {
        clearInterval(chatPollingInterval);
        chatPollingInterval = null;
    }
}

// Update authentication UI
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('currentUserInfo');
    const userDisplay = document.getElementById('currentUserDisplay');
    
    if (isLoggedIn && currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userInfo.style.display = 'block';
        userDisplay.textContent = `${currentUser.avatar} ${currentUser.name} (${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)})`;
        
        // Show/hide admin navigation based on user role
        updateAdminNavigation();
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userInfo.style.display = 'none';
        
        // Remove admin navigation
        const navAdmin = document.getElementById('nav-admin');
        if (navAdmin) {
            navAdmin.remove();
        }
    }
}

// Update admin navigation based on user role
function updateAdminNavigation() {
    const navAdmin = document.getElementById('nav-admin');
    
    if (currentUser && currentUser.role === 'admin') {
        if (!navAdmin) {
            const navMenu = document.querySelector('.nav-menu');
            const adminLink = document.createElement('a');
            adminLink.href = '#';
            adminLink.onclick = () => showPage('admin');
            adminLink.className = 'nav-link';
            adminLink.id = 'nav-admin';
            adminLink.textContent = 'Admin';
            navMenu.appendChild(adminLink);
        }
    } else {
        if (navAdmin) {
            navAdmin.remove();
        }
        if (currentPage === 'admin') {
            showPage('home');
        }
    }
}

// Marketplace functions
async function loadMarketplace() {
    try {
        const filters = getMarketplaceFilters();
        const items = await MockAPI.getItems(filters);
        displayMarketplaceItems(items);
    } catch (error) {
        console.error('Error loading marketplace:', error);
        showError('Failed to load marketplace items');
    }
}

function getMarketplaceFilters() {
    return {
        search: document.getElementById('searchInput')?.value || '',
        category: document.getElementById('categoryFilter')?.value || '',
        sort: document.getElementById('sortFilter')?.value || 'newest'
    };
}

function displayMarketplaceItems(items) {
    const grid = document.getElementById('marketplaceGrid');
    if (!grid) return;
    
    if (items.length === 0) {
        grid.innerHTML = '<div class="no-items">No items found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = items.map(item => `
        <div class="item-card" onclick="showItemDetail('${item.id}')">
            <div class="item-image">
                ${item.images && item.images.length > 0 ? 
                    `<img src="${item.images[0]}" alt="${item.title}">` : 
                    getCategoryIcon(item.category)
                }
            </div>
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-category">${item.category}</div>
                <div class="item-price">₹${formatPrice(item)}</div>
                <div class="item-location">📍 ${item.location}</div>
                <div class="item-status">
                    <span class="status-badge status-${item.availability}">${item.availability.charAt(0).toUpperCase() + item.availability.slice(1)}</span>
                    ${item.protection_required ? '<span class="protection-badge">🛡️ Protected</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function formatPrice(item) {
    const price = item.price_day || item.price_qty || item.price || 0;
    const type = item.price_type || 'fixed';
    
    switch (type) {
        case 'per-day': return `${price}/day`;
        case 'per-hour': return `${price}/hour`;
        case 'per-kg': return `${price}/kg`;
        case 'per-unit': return `${price}/unit`;
        default: return price;
    }
}

function getCategoryIcon(category) {
    const icons = {
        'Tools': '🚜',
        'Inputs': '🌱', 
        'Produce': '🥕',
        'Waste': '♻️',
        'Manpower': '👷'
    };
    return icons[category] || '📦';
}

// Filter items
async function filterItems() {
    await loadMarketplace();
}

// Item detail functions
async function showItemDetail(itemId) {
    try {
        showLoading();
        selectedItem = await MockAPI.getItem(itemId);
        
        if (!selectedItem) {
            showError('Item not found');
            return;
        }
        
        displayItemDetail();
        await showPage('item-detail');
        hideLoading();
    } catch (error) {
        console.error('Error loading item detail:', error);
        hideLoading();
        showError('Failed to load item details');
    }
}

function displayItemDetail() {
    const container = document.getElementById('itemDetailContent');
    if (!container || !selectedItem) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const owner = users.find(u => u.id === selectedItem.owner);
    
    container.innerHTML = `
        <div class="item-detail-container">
            <div class="item-detail-main">
                <div class="item-detail-images">
                    <div class="item-detail-image">
                        ${selectedItem.images && selectedItem.images.length > 0 ? 
                            `<img src="${selectedItem.images[0]}" alt="${selectedItem.title}">` : 
                            getCategoryIcon(selectedItem.category)
                        }
                    </div>
                </div>
                
                <div class="item-detail-info">
                    <h2>${selectedItem.title}</h2>
                    <div class="item-category">${selectedItem.category}</div>
                    
                    <div class="item-meta">
                        <p><strong>Condition:</strong> ${selectedItem.condition}</p>
                        <p><strong>Location:</strong> ${selectedItem.location}</p>
                        <p><strong>Owner:</strong> ${owner ? `${owner.avatar} ${owner.name}` : 'Unknown'} 
                           ${owner && owner.verified ? '✅ Verified' : ''}</p>
                        <p><strong>Quantity Available:</strong> ${selectedItem.quantity}</p>
                    </div>
                    
                    <div class="item-description">
                        <h3>Description</h3>
                        <p>${selectedItem.description}</p>
                    </div>
                    
                    ${selectedItem.tags && selectedItem.tags.length > 0 ? `
                        <div class="item-tags">
                            <h3>Tags</h3>
                            <div class="tags">
                                ${selectedItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="item-detail-sidebar">
                <div class="price-section">
                    <h3>Price</h3>
                    <div class="price-display">₹${formatPrice(selectedItem)}</div>
                </div>
                
                <div class="price-calculator">
                    <h4>Calculate Total</h4>
                    <div class="calculator-inputs">
                        ${selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour' ? `
                            <label for="rentalDuration">Duration:</label>
                            <input type="number" id="rentalDuration" min="1" value="1" onchange="updatePriceCalculation()">
                            <select id="durationType" onchange="updatePriceCalculation()">
                                ${selectedItem.price_type === 'per-day' ? '<option value="day">Days</option>' : '<option value="hour">Hours</option>'}
                            </select>
                        ` : `
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" min="1" max="${selectedItem.quantity}" value="1" onchange="updatePriceCalculation()">
                        `}
                    </div>
                    
                    <div class="price-breakdown" id="priceBreakdown">
                        <!-- Will be populated by updatePriceCalculation() -->
                    </div>
                </div>
                
                ${selectedItem.availability === 'available' && currentRole !== 'admin' && selectedItem.owner !== currentUser?.id ? `
                    <div class="booking-section">
                        ${selectedItem.high_value ? `
                            <div class="caretaker-option">
                                <label>
                                    <input type="checkbox" id="includeCaretaker" onchange="updatePriceCalculation()">
                                    Include Caretaker Service (Recommended for high-value items)
                                </label>
                            </div>
                        ` : ''}
                        
                        <button class="btn btn-primary btn-block" onclick="initiateBooking()">
                            ${selectedItem.category === 'Produce' || selectedItem.category === 'Inputs' ? 'Buy Now' : 'Book Item'}
                        </button>
                        
                        <button class="btn btn-secondary btn-block" onclick="startChat('${selectedItem.id}', '${selectedItem.owner}')">
                            💬 Message Owner
                        </button>
                    </div>
                ` : ''}
                
                ${selectedItem.availability !== 'available' ? `
                    <div class="unavailable-notice">
                        <p>This item is currently ${selectedItem.availability}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Initialize price calculation
    setTimeout(() => updatePriceCalculation(), 100);
}

// Update price calculation
function updatePriceCalculation() {
    if (!selectedItem) return;
    
    const breakdownElement = document.getElementById('priceBreakdown');
    if (!breakdownElement) return;
    
    let quantity = 1;
    let duration = 1;
    
    if (selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour') {
        duration = parseInt(document.getElementById('rentalDuration')?.value || 1);
    } else {
        quantity = parseInt(document.getElementById('quantity')?.value || 1);
    }
    
    const includeCaretaker = document.getElementById('includeCaretaker')?.checked || false;
    
    // Base price calculation
    let basePrice = 0;
    if (selectedItem.price_type === 'per-day') {
        basePrice = selectedItem.price_day * duration;
    } else if (selectedItem.price_type === 'per-hour') {
        basePrice = selectedItem.price_hour * duration;
    } else {
        basePrice = (selectedItem.price_qty || selectedItem.price || 0) * quantity;
    }
    
    // Additional fees
    const protectionFee = selectedItem.protection_required ? Math.floor(basePrice * 0.1) : 0;
    const caretakerFee = includeCaretaker ? Math.floor(basePrice * 0.06) : 0;
    const platformCommission = Math.floor((basePrice + protectionFee + caretakerFee) * 0.05);
    
    const total = basePrice + protectionFee + caretakerFee + platformCommission;
    
    breakdownElement.innerHTML = `
        <div class="calculator-row">
            <span>Base Price:</span>
            <span>₹${basePrice}</span>
        </div>
        ${protectionFee > 0 ? `
            <div class="calculator-row">
                <span>Protection Fee:</span>
                <span>₹${protectionFee}</span>
            </div>
        ` : ''}
        ${caretakerFee > 0 ? `
            <div class="calculator-row">
                <span>Caretaker Fee:</span>
                <span>₹${caretakerFee}</span>
            </div>
        ` : ''}
        <div class="calculator-row">
            <span>Platform Fee:</span>
            <span>₹${platformCommission}</span>
        </div>
        <div class="calculator-row calculator-total">
            <span>Total:</span>
            <span>₹${total}</span>
        </div>
    `;
}

// Booking functions
async function initiateBooking() {
    if (!selectedItem || !currentUser) {
        showError('Please login to book items');
        return;
    }
    
    try {
        showLoading();
        
        // Get booking details
        let quantity = 1;
        let duration = 1;
        
        if (selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour') {
            duration = parseInt(document.getElementById('rentalDuration')?.value || 1);
        } else {
            quantity = parseInt(document.getElementById('quantity')?.value || 1);
        }
        
        const includeCaretaker = document.getElementById('includeCaretaker')?.checked || false;
        
        // Calculate pricing
        let basePrice = 0;
        if (selectedItem.price_type === 'per-day') {
            basePrice = selectedItem.price_day * duration;
        } else if (selectedItem.price_type === 'per-hour') {
            basePrice = selectedItem.price_hour * duration;
        } else {
            basePrice = (selectedItem.price_qty || selectedItem.price || 0) * quantity;
        }
        
        const protectionFee = selectedItem.protection_required ? Math.floor(basePrice * 0.1) : 0;
        const caretakerFee = includeCaretaker ? Math.floor(basePrice * 0.06) : 0;
        const platformCommission = Math.floor((basePrice + protectionFee + caretakerFee) * 0.05);
        
        // Assign caretaker if needed
        let assignedCaretaker = null;
        if (includeCaretaker || selectedItem.high_value) {
            const users = await MockAPI.getUsers();
            const availableCaretakers = users.filter(u => u.role === 'caretaker' && u.available);
            if (availableCaretakers.length > 0) {
                assignedCaretaker = availableCaretakers[0].id;
            }
        }
        
        // Create transaction
        const transactionData = {
            item_id: selectedItem.id,
            renter: currentUser.id,
            owner: selectedItem.owner,
            caretaker: assignedCaretaker,
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'pending',
            item_fee: basePrice,
            protection_fee: protectionFee,
            caretaker_fee: caretakerFee,
            platform_commission: platformCommission,
            total_amount: basePrice + protectionFee + caretakerFee + platformCommission,
            payment_status: 'pending',
            quantity: quantity,
            duration: duration
        };
        
        // Show booking confirmation
        await showBookingConfirmation(transactionData);
        
        hideLoading();
    } catch (error) {
        console.error('Error initiating booking:', error);
        hideLoading();
        showError('Failed to initiate booking');
    }
}

// Show booking confirmation modal
async function showBookingConfirmation(transactionData) {
    const users = await MockAPI.getUsers();
    const owner = users.find(u => u.id === transactionData.owner);
    const caretaker = transactionData.caretaker ? users.find(u => u.id === transactionData.caretaker) : null;
    
    const modalContent = `
        <div class="modal-header">
            <h3>Confirm Booking</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <h4>${selectedItem.title}</h4>
            <p><strong>Owner:</strong> ${owner ? `${owner.avatar} ${owner.name}` : 'Unknown'}</p>
            ${caretaker ? `<p><strong>Caretaker:</strong> ${caretaker.avatar} ${caretaker.name}</p>` : ''}
            
            <div class="booking-details">
                <div class="calculator-row">
                    <span>Item Fee:</span>
                    <span>₹${transactionData.item_fee}</span>
                </div>
                ${transactionData.protection_fee > 0 ? `
                    <div class="calculator-row">
                        <span>Protection Fee:</span>
                        <span>₹${transactionData.protection_fee}</span>
                    </div>
                ` : ''}
                ${transactionData.caretaker_fee > 0 ? `
                    <div class="calculator-row">
                        <span>Caretaker Fee:</span>
                        <span>₹${transactionData.caretaker_fee}</span>
                    </div>
                ` : ''}
                <div class="calculator-row">
                    <span>Platform Fee:</span>
                    <span>₹${transactionData.platform_commission}</span>
                </div>
                <div class="calculator-row calculator-total">
                    <span>Total Amount:</span>
                    <span>₹${transactionData.total_amount}</span>
                </div>
            </div>
            
            <div class="payment-methods">
                <h4>Payment Method</h4>
                <label><input type="radio" name="paymentMethod" value="upi" checked> UPI</label>
                <label><input type="radio" name="paymentMethod" value="wallet"> Wallet</label>
                <label><input type="radio" name="paymentMethod" value="cod"> Cash on Delivery</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="confirmBooking('${JSON.stringify(transactionData).replace(/"/g, '&quot;')}')">Confirm & Pay</button>
        </div>
    `;
    
    showModal(modalContent);
}

// Confirm booking and payment
async function confirmBooking(transactionDataStr) {
    try {
        const transactionData = JSON.parse(transactionDataStr.replace(/&quot;/g, '"'));
        
        showLoading();
        closeModal();
        
        // Simulate payment processing
        await MockAPI.delay(2000);
        
        // Update transaction status
        transactionData.status = 'active';
        transactionData.payment_status = 'paid';
        
        // Create transaction
        const transaction = await MockAPI.createTransaction(transactionData);
        
        // Update item availability
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        const itemIndex = items.findIndex(item => item.id === selectedItem.id);
        if (itemIndex !== -1) {
            items[itemIndex].availability = 'booked';
            localStorage.setItem('items', JSON.stringify(items));
        }
        
        // Send initial messages
        if (transactionData.caretaker) {
            await MockAPI.sendMessage({
                transaction_id: transaction.id,
                sender: transactionData.caretaker,
                receiver: transactionData.renter,
                message: `Hello ${currentUser.name}, I am assigned as caretaker for this transaction. I will ensure proper handling of the item.`,
                type: 'system'
            });
        }
        
        hideLoading();
        showSuccess('Booking confirmed successfully! Payment processed.');
        
        // Redirect to orders page
        setTimeout(() => showPage('orders'), 2000);
        
    } catch (error) {
        console.error('Error confirming booking:', error);
        hideLoading();
        showError('Failed to confirm booking');
    }
}

// List item functions
async function submitListing(event) {
    event.preventDefault();
    
    if (!isLoggedIn || !currentUser || currentUser.role !== 'owner') {
        showError('Please login as an owner to list items');
        return;
    }
    
    try {
        showLoading();
        
        const formData = new FormData(event.target);
        const itemData = {
            title: document.getElementById('itemTitle').value,
            category: document.getElementById('itemCategory').value,
            description: document.getElementById('itemDescription').value,
            quantity: parseInt(document.getElementById('itemQuantity').value),
            price_type: document.getElementById('priceType').value,
            location: document.getElementById('itemLocation').value,
            owner: currentUser.id,
            protection_required: document.getElementById('protectionRequired').checked,
            high_value: document.getElementById('protectionRequired').checked, // Assume protected items are high value
            tags: document.getElementById('itemTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            images: [], // Will be populated by image processing
            condition: 'Good' // Default condition
        };
        
        // Set price based on type
        const price = parseInt(document.getElementById('itemPrice').value);
        switch (itemData.price_type) {
            case 'per-day':
                itemData.price_day = price;
                break;
            case 'per-hour':
                itemData.price_hour = price;
                break;
            case 'per-kg':
                itemData.price = price;
                itemData.price_qty = price;
                break;
            default:
                itemData.price_qty = price;
        }
        
        // Process images
        const imageFiles = document.getElementById('itemImages').files;
        for (let file of imageFiles) {
            if (file.size > 500000) { // 500KB limit
                showWarning('Image size too large, compressing...');
            }
            const base64 = await fileToBase64(file);
            itemData.images.push(base64);
        }
        
        // Create item
        const newItem = await MockAPI.createItem(itemData);
        
        hideLoading();
        showSuccess('Item listed successfully!');
        
        // Reset form
        event.target.reset();
        document.getElementById('imagePreview').innerHTML = '';
        
        // Redirect to marketplace
        setTimeout(() => showPage('marketplace'), 2000);
        
    } catch (error) {
        console.error('Error submitting listing:', error);
        hideLoading();
        showError('Failed to list item');
    }
}

// Image preview functions
function previewImages(event) {
    const files = event.target.files;
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="image-preview-remove" onclick="this.parentElement.remove()">&times;</button>
                `;
                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    }
}

// File to base64 conversion
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Update category fields based on selection
function updateCategoryFields() {
    const category = document.getElementById('itemCategory').value;
    const priceType = document.getElementById('priceType');
    
    // Update price type options based on category
    priceType.innerHTML = '';
    
    switch (category) {
        case 'Tools':
            priceType.innerHTML = `
                <option value="per-hour">Per Hour</option>
                <option value="per-day">Per Day</option>
            `;
            break;
        case 'Inputs':
        case 'Produce':
            priceType.innerHTML = `
                <option value="per-kg">Per KG</option>
                <option value="per-unit">Per Unit/Bag</option>
                <option value="fixed">Fixed Price</option>
            `;
            break;
        case 'Waste':
            priceType.innerHTML = `
                <option value="per-unit">Per Unit</option>
                <option value="per-kg">Per KG</option>
                <option value="fixed">Fixed Price</option>
            `;
            break;
        case 'Manpower':
            priceType.innerHTML = `
                <option value="per-hour">Per Hour</option>
                <option value="per-day">Per Day</option>
            `;
            break;
        default:
            priceType.innerHTML = '<option value="fixed">Fixed Price</option>';
    }
}

// Orders management
async function loadOrders() {
    try {
        if (!isLoggedIn || !currentUser) {
            document.getElementById('ordersList').innerHTML = '<p>Please login to view orders</p>';
            return;
        }
        
        const transactions = await MockAPI.getTransactions(currentUser.id, currentUser.role);
        displayOrders(transactions);
    } catch (error) {
        console.error('Error loading orders:', error);
        showError('Failed to load orders');
    }
}

function displayOrders(transactions) {
    const container = document.getElementById('ordersList');
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = '<div class="no-orders">No orders found</div>';
        return;
    }
    
    container.innerHTML = transactions.map(transaction => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        
        const item = items.find(i => i.id === transaction.item_id);
        const owner = users.find(u => u.id === transaction.owner);
        const renter = users.find(u => u.id === transaction.renter);
        const caretaker = transaction.caretaker ? users.find(u => u.id === transaction.caretaker) : null;
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <h4>${item ? item.title : 'Unknown Item'}</h4>
                    <span class="status-badge status-${transaction.status}">${transaction.status.toUpperCase()}</span>
                </div>
                
                <div class="order-details">
                    <p><strong>Transaction ID:</strong> ${transaction.id}</p>
                    <p><strong>${currentRole === 'owner' ? 'Renter' : 'Owner'}:</strong> 
                       ${currentRole === 'owner' ? 
                         (renter ? `${renter.avatar} ${renter.name}` : 'Unknown') : 
                         (owner ? `${owner.avatar} ${owner.name}` : 'Unknown')
                       }
                    </p>
                    ${caretaker ? `<p><strong>Caretaker:</strong> ${caretaker.avatar} ${caretaker.name}</p>` : ''}
                    <p><strong>Amount:</strong> ₹${transaction.total_amount}</p>
                    <p><strong>Start Date:</strong> ${transaction.start_date}</p>
                    <p><strong>End Date:</strong> ${transaction.end_date}</p>
                    <p><strong>Payment Status:</strong> ${transaction.payment_status}</p>
                </div>
                
                <div class="order-actions">
                    <button class="btn btn-secondary" onclick="startChat('${transaction.item_id}', '${currentRole === 'owner' ? transaction.renter : transaction.owner}', '${transaction.id}')">
                        💬 Chat
                    </button>
                    
                    ${transaction.status === 'active' && currentRole === 'renter' ? `
                        <button class="btn btn-warning" onclick="reportIssue('${transaction.id}')">Report Issue</button>
                        <button class="btn btn-success" onclick="completeTransaction('${transaction.id}')">Mark Complete</button>
                    ` : ''}
                    
                    ${transaction.status === 'active' && currentRole === 'owner' ? `
                        <button class="btn btn-success" onclick="confirmReturn('${transaction.id}')">Confirm Return</button>
                    ` : ''}
                    
                    ${currentRole === 'caretaker' && transaction.caretaker === currentUser.id ? `
                        <button class="btn btn-primary" onclick="caretakerAction('${transaction.id}')">Caretaker Actions</button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Order tab switching
function showOrderTab(tab) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter and display orders based on tab
    // This is a simplified implementation - in a real app, you'd filter by status
    loadOrders();
}

// Transaction actions
async function completeTransaction(transactionId) {
    try {
        showLoading();
        
        // Update transaction status
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const transactionIndex = transactions.findIndex(t => t.id === transactionId);
        
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = 'completed';
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            // Update item availability
            const items = JSON.parse(localStorage.getItem('items') || '[]');
            const item = items.find(i => i.id === transactions[transactionIndex].item_id);
            if (item) {
                item.availability = 'available';
                localStorage.setItem('items', JSON.stringify(items));
            }
        }
        
        hideLoading();
        showSuccess('Transaction completed successfully!');
        await loadOrders();
        
    } catch (error) {
        console.error('Error completing transaction:', error);
        hideLoading();
        showError('Failed to complete transaction');
    }
}

async function confirmReturn(transactionId) {
    try {
        showLoading();
        
        // Similar to completeTransaction but from owner's perspective
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const transactionIndex = transactions.findIndex(t => t.id === transactionId);
        
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = 'returned';
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            // Update item availability
            const items = JSON.parse(localStorage.getItem('items') || '[]');
            const item = items.find(i => i.id === transactions[transactionIndex].item_id);
            if (item) {
                item.availability = 'available';
                localStorage.setItem('items', JSON.stringify(items));
            }
        }
        
        hideLoading();
        showSuccess('Return confirmed successfully!');
        await loadOrders();
        
    } catch (error) {
        console.error('Error confirming return:', error);
        hideLoading();
        showError('Failed to confirm return');
    }
}

async function reportIssue(transactionId) {
    const issue = prompt('Please describe the issue:');
    if (!issue) return;
    
    try {
        showLoading();
        
        // Create dispute record
        const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
        const newDispute = {
            id: 'd' + Date.now(),
            transaction_id: transactionId,
            reporter: currentUser.id,
            issue: issue,
            status: 'pending',
            created_date: new Date().toISOString().split('T')[0]
        };
        
        disputes.push(newDispute);
        localStorage.setItem('disputes', JSON.stringify(disputes));
        
        // Update transaction status
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const transactionIndex = transactions.findIndex(t => t.id === transactionId);
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = 'disputed';
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
        
        hideLoading();
        showSuccess('Issue reported successfully. Our team will review it.');
        await loadOrders();
        
    } catch (error) {
        console.error('Error reporting issue:', error);
        hideLoading();
        showError('Failed to report issue');
    }
}

// Chat functions
async function loadChat() {
    try {
        if (!isLoggedIn || !currentUser) {
            document.getElementById('chatList').innerHTML = '<p>Please login to view messages</p>';
            return;
        }
        
        const transactions = await MockAPI.getTransactions();
        const userTransactions = transactions.filter(t => 
            t.renter === currentUser.id || 
            t.owner === currentUser.id || 
            t.caretaker === currentUser.id
        );
        
        displayChatList(userTransactions);
        
        if (currentTransaction) {
            await loadChatMessages(currentTransaction);
        }
        
    } catch (error) {
        console.error('Error loading chat:', error);
        showError('Failed to load chat');
    }
}

function displayChatList(transactions) {
    const container = document.getElementById('chatList');
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = '<div class="no-chats">No conversations found</div>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    
    container.innerHTML = transactions.map(transaction => {
        const item = items.find(i => i.id === transaction.item_id);
        const otherUser = currentUser.id === transaction.owner ? 
            users.find(u => u.id === transaction.renter) :
            users.find(u => u.id === transaction.owner);
            
        return `
            <div class="chat-item ${currentTransaction?.id === transaction.id ? 'active' : ''}" 
                 onclick="selectChat('${transaction.id}')">
                <h4>${item ? item.title : 'Unknown Item'}</h4>
                <p>${otherUser ? `${otherUser.avatar} ${otherUser.name}` : 'Unknown User'}</p>
                <small>Transaction: ${transaction.id}</small>
            </div>
        `;
    }).join('');
}

async function selectChat(transactionId) {
    try {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        currentTransaction = transactions.find(t => t.id === transactionId);
        
        // Update chat list selection
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        
        await loadChatMessages(transactionId);
        
    } catch (error) {
        console.error('Error selecting chat:', error);
        showError('Failed to load chat');
    }
}

async function loadChatMessages(transactionId) {
    try {
        const messages = await MockAPI.getMessages(transactionId);
        displayChatMessages(messages);
        
        // Show chat input
        const inputContainer = document.getElementById('chatInputContainer');
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }
        
        // Update chat header
        const header = document.getElementById('chatHeader');
        if (header && currentTransaction) {
            const items = JSON.parse(localStorage.getItem('items') || '[]');
            const item = items.find(i => i.id === currentTransaction.item_id);
            header.textContent = item ? `Chat: ${item.title}` : 'Chat';
        }
        
        // Start polling for new messages
        startChatPolling();
        
    } catch (error) {
        console.error('Error loading chat messages:', error);
        showError('Failed to load messages');
    }
}

function displayChatMessages(messages) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="no-messages">No messages yet</div>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    container.innerHTML = messages.map(message => {
        const sender = users.find(u => u.id === message.sender);
        const isSent = message.sender === currentUser.id;
        const timestamp = new Date(message.timestamp).toLocaleString();
        
        return `
            <div class="message ${isSent ? 'sent' : 'received'}">
                ${!isSent ? `<div class="message-sender">${sender ? sender.name : 'Unknown'}</div>` : ''}
                <div class="message-content">${message.message}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message || !currentTransaction || !currentUser) return;
    
    try {
        // Determine receiver
        let receiver = currentTransaction.owner;
        if (currentUser.id === currentTransaction.owner) {
            receiver = currentTransaction.renter;
        }
        
        await MockAPI.sendMessage({
            transaction_id: currentTransaction.id,
            sender: currentUser.id,
            receiver: receiver,
            message: message,
            type: 'text'
        });
        
        input.value = '';
        await loadChatMessages(currentTransaction.id);
        
    } catch (error) {
        console.error('Error sending message:', error);
        showError('Failed to send message');
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function startChat(itemId, ownerId, transactionId = null) {
    try {
        if (!transactionId) {
            // Create a new chat context - in a real app, this might create a conversation
            // For now, we'll just switch to chat page
            await showPage('chat');
            return;
        }
        
        currentTransaction = { id: transactionId };
        await showPage('chat');
        
    } catch (error) {
        console.error('Error starting chat:', error);
        showError('Failed to start chat');
    }
}

// Chat polling for real-time updates
function startChatPolling() {
    if (chatPollingInterval) {
        clearInterval(chatPollingInterval);
    }
    
    if (currentPage === 'chat' && currentTransaction) {
        chatPollingInterval = setInterval(async () => {
            if (currentPage === 'chat' && currentTransaction) {
                await loadChatMessages(currentTransaction.id);
            } else {
                clearInterval(chatPollingInterval);
                chatPollingInterval = null;
            }
        }, 5000); // Poll every 5 seconds
    }
}

// Profile functions
async function loadProfile() {
    if (!isLoggedIn || !currentUser) {
        document.getElementById('profileContent').innerHTML = '<p>Please login to view profile</p>';
        return;
    }
    
    try {
        const transactions = await MockAPI.getTransactions(currentUser.id, currentUser.role);
        const users = await MockAPI.getUsers();
        
        displayProfile(currentUser, transactions);
        
    } catch (error) {
        console.error('Error loading profile:', error);
        showError('Failed to load profile');
    }
}

function displayProfile(user, transactions) {
    const container = document.getElementById('profileContent');
    if (!container) return;
    
    const completedTransactions = transactions.filter(t => t.status === 'completed').length;
    const totalEarnings = transactions
        .filter(t => t.status === 'completed' && currentUser.role === 'owner')
        .reduce((sum, t) => sum + (t.item_fee || 0), 0);
    
    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">${user.avatar}</div>
            <h2>${user.name}</h2>
            <p>${user.village}, ${user.district}</p>
            <div class="verification-status">
                ${user.verified ? '✅ Verified User' : '⚠️ Not Verified'}
            </div>
            <div class="rating">
                ${'⭐'.repeat(Math.floor(user.rating || 0))} ${user.rating || 0}/5
            </div>
        </div>
        
        <div class="profile-stats">
            <div class="stat-card">
                <h3>Total Transactions</h3>
                <div class="stat-value">${user.totalTransactions || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Completed Orders</h3>
                <div class="stat-value">${completedTransactions}</div>
            </div>
            <div class="stat-card">
                <h3>Member Since</h3>
                <div class="stat-value">${user.joinedDate || 'Unknown'}</div>
            </div>
            ${currentUser.role === 'owner' ? `
                <div class="stat-card">
                    <h3>Total Earnings</h3>
                    <div class="stat-value">₹${totalEarnings}</div>
                </div>
            ` : ''}
        </div>
        
        <div class="profile-actions">
            <button class="btn btn-primary" onclick="showEditProfile()">Edit Profile</button>
            <button class="btn btn-secondary" onclick="viewTransactionHistory()">Transaction History</button>
        </div>
    `;
}

// Admin dashboard functions
async function loadAdminDashboard() {
    if (currentRole !== 'admin') {
        document.getElementById('page-admin').innerHTML = '<p>Access denied. Admin role required.</p>';
        return;
    }
    
    try {
        const stats = await MockAPI.getPlatformStats();
        const transactions = await MockAPI.getTransactions();
        const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
        
        displayAdminStats(stats);
        displayRecentTransactions(transactions.slice(0, 10));
        displayDisputes(disputes);
        
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        showError('Failed to load admin dashboard');
    }
}

function displayAdminStats(stats) {
    document.getElementById('totalTransactions').textContent = stats.total_transactions || 0;
    document.getElementById('platformRevenue').textContent = `₹${stats.revenue || 0}`;
    document.getElementById('activeItems').textContent = stats.active_items || 0;
    document.getElementById('pendingDisputes').textContent = stats.pending_disputes || 0;
}

function displayRecentTransactions(transactions) {
    const container = document.getElementById('recentTransactions');
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = '<p>No transactions found</p>';
        return;
    }
    
    container.innerHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <span>${transaction.id}</span>
            <span>₹${transaction.total_amount}</span>
            <span class="status-badge status-${transaction.status}">${transaction.status}</span>
            <span>${transaction.created_date}</span>
        </div>
    `).join('');
}

function displayDisputes(disputes) {
    const container = document.getElementById('disputesList');
    if (!container) return;
    
    if (disputes.length === 0) {
        container.innerHTML = '<p>No disputes found</p>';
        return;
    }
    
    container.innerHTML = disputes.map(dispute => `
        <div class="dispute-item">
            <h4>Dispute #${dispute.id}</h4>
            <p><strong>Transaction:</strong> ${dispute.transaction_id}</p>
            <p><strong>Issue:</strong> ${dispute.issue}</p>
            <p><strong>Status:</strong> ${dispute.status}</p>
            <div class="dispute-actions">
                <button class="btn btn-success" onclick="resolveDispute('${dispute.id}', 'resolved')">Resolve</button>
                <button class="btn btn-danger" onclick="resolveDispute('${dispute.id}', 'rejected')">Reject</button>
            </div>
        </div>
    `).join('');
}

// Admin actions
async function resolveDispute(disputeId, resolution) {
    try {
        showLoading();
        
        const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
        const disputeIndex = disputes.findIndex(d => d.id === disputeId);
        
        if (disputeIndex !== -1) {
            disputes[disputeIndex].status = resolution;
            disputes[disputeIndex].resolved_date = new Date().toISOString().split('T')[0];
            localStorage.setItem('disputes', JSON.stringify(disputes));
        }
        
        hideLoading();
        showSuccess(`Dispute ${resolution} successfully`);
        await loadAdminDashboard();
        
    } catch (error) {
        console.error('Error resolving dispute:', error);
        hideLoading();
        showError('Failed to resolve dispute');
    }
}

async function exportData() {
    try {
        const data = {
            users: JSON.parse(localStorage.getItem('users') || '[]'),
            items: JSON.parse(localStorage.getItem('items') || '[]'),
            transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
            messages: JSON.parse(localStorage.getItem('messages') || '[]'),
            disputes: JSON.parse(localStorage.getItem('disputes') || '[]'),
            platform: JSON.parse(localStorage.getItem('platform') || '{}')
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gramxchange-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSuccess('Data exported successfully');
        
    } catch (error) {
        console.error('Error exporting data:', error);
        showError('Failed to export data');
    }
}

async function resetData() {
    if (confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
        try {
            await MockAPI.resetData();
            showSuccess('Demo data reset successfully');
            location.reload();
        } catch (error) {
            console.error('Error resetting data:', error);
            showError('Failed to reset data');
        }
    }
}

// Utility functions
function showModal(content) {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modalContent');
    
    modal.innerHTML = content;
    overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
}

function showSuccess(message) {
    // Simple alert for now - in a real app, use a toast notification
    alert('✅ ' + message);
}

function showError(message) {
    alert('❌ ' + message);
}

function showWarning(message) {
    alert('⚠️ ' + message);
}

// Profile editing functions
function showEditProfile() {
    if (!currentUser) {
        showError('Please login to edit profile');
        return;
    }
    
    const modalContent = `
        <div class="modal-header">
            <h3>Edit Profile</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form class="edit-profile-form" id="editProfileForm" onsubmit="handleEditProfile(event)">
                <div class="form-group">
                    <label for="editName">Full Name</label>
                    <input type="text" id="editName" value="${currentUser.name}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="editVillage">Village</label>
                        <input type="text" id="editVillage" value="${currentUser.village}" required>
                    </div>
                    <div class="form-group">
                        <label for="editDistrict">District</label>
                        <input type="text" id="editDistrict" value="${currentUser.district}" required>
                    </div>
                </div>
                <div class="role-selection">
                    <h4>Primary Role</h4>
                    <div class="role-option ${currentUser.role === 'renter' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="renter" ${currentUser.role === 'renter' ? 'checked' : ''}>
                        <div>
                            <strong>Renter/Buyer</strong>
                            <div class="role-description">Rent or buy items from others in the community</div>
                        </div>
                    </div>
                    <div class="role-option ${currentUser.role === 'owner' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="owner" ${currentUser.role === 'owner' ? 'checked' : ''}>
                        <div>
                            <strong>Owner/Lister</strong>
                            <div class="role-description">List your items for rent or sale to others</div>
                        </div>
                    </div>
                    <div class="role-option ${currentUser.role === 'caretaker' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="caretaker" ${currentUser.role === 'caretaker' ? 'checked' : ''}>
                        <div>
                            <strong>Caretaker</strong>
                            <div class="role-description">Provide protection and inspection services</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="document.getElementById('editProfileForm').requestSubmit()">Save Changes</button>
        </div>
    `;
    
    showModal(modalContent);
}

async function handleEditProfile(event) {
    event.preventDefault();
    
    try {
        showLoading();
        
        const name = document.getElementById('editName').value;
        const village = document.getElementById('editVillage').value;
        const district = document.getElementById('editDistrict').value;
        const role = document.querySelector('input[name="editRole"]:checked').value;
        
        // Update current user
        currentUser.name = name;
        currentUser.village = village;
        currentUser.district = district;
        
        // Handle role change
        if (currentUser.role !== role) {
            currentUser.role = role;
            currentUser.avatar = role === 'caretaker' ? '🛡️' : (role === 'owner' ? '👨‍🌾' : '👩‍🌾');
        }
        
        // Update in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update users list
        const users = await MockAPI.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        updateAuthUI();
        hideLoading();
        closeModal();
        showSuccess('Profile updated successfully!');
        
        // Refresh profile page
        if (currentPage === 'profile') {
            await loadProfile();
        }
        
    } catch (error) {
        console.error('Error updating profile:', error);
        hideLoading();
        showError('Failed to update profile');
    }
}

function viewTransactionHistory() {
    showPage('orders');
}

function caretakerAction(transactionId) {
    alert('Caretaker action interface coming soon!');
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}