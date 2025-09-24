// ग्रामसंचय Application - Main JavaScript File

// Global application state
let currentUser = null;
let isLoggedIn = false;
let currentPage = 'home';
let selectedItem = null;
let currentTransaction = null;
let currentChatContact = null;
let chatPollingInterval = null;

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Force initialize seed data first
        if (typeof initializeSeedData === 'function') {
            initializeSeedData();
        }
        
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
// Mobile Navigation Functions
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
}

async function showPage(pageId) {
    try {
        // Close mobile menu when navigating
        closeMobileMenu();
        
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
        
        // Show chat menu button on mobile when on chat page
        if (pageId === 'chat') {
            const chatMenuBtn = document.getElementById('chatMenuBtn');
            const chatSidebar = document.getElementById('chatSidebar');
            if (window.innerWidth <= 768 && chatMenuBtn) {
                chatMenuBtn.style.display = 'inline-block';
                // Always hide sidebar initially on mobile
                if (chatSidebar) chatSidebar.classList.remove('open');
            } else if (chatMenuBtn) {
                chatMenuBtn.style.display = 'none';
                // Always show sidebar on desktop
                if (chatSidebar) chatSidebar.classList.add('open');
            }
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
        case 'item-detail':
            // Item detail content is already loaded by showItemDetail function
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
        const address = document.getElementById('registerAddress').value;
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
            address: address || '',
            role: role,
            verified: false,
            rating: 0,
            totalTransactions: 0,
            joinedDate: new Date().toISOString().split('T')[0],
            avatar: role === 'helper' ? 'assets/images/Caretaker_service_agent_avatar_cc93feff.png' : (role === 'owner' ? 'assets/images/Male_farmer_avatar_profile_3effb6e6.png' : 'assets/images/Female_farmer_avatar_profile_a2917358.png')
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
        userDisplay.innerHTML = `<img src="${currentUser.avatar}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; vertical-align: middle; margin-right: 8px;"> ${currentUser.name} (${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)})`;
        
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
        priceRange: document.getElementById('priceRangeFilter')?.value || '',
        location: document.getElementById('locationFilter')?.value || '',
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
                    <span class="status-badge status-${item.availability}">${translate(item.availability + '_status')}</span>
                    ${item.protection_required ? `<span class="protection-badge">🛡️ ${translate('protected_badge')}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function updateDistrict() {
    const village = document.getElementById('registerVillage').value;
    const districtField = document.getElementById('registerDistrict');
    if (village) {
        districtField.value = 'Gautam Buddha Nagar';
    } else {
        districtField.value = '';
    }
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
        'Tools': '<img src="assets/images/Agricultural_tractor_tools_icon_79cbf122.png" alt="Tools" class="category-icon">',
        'Inputs': '<img src="assets/images/Agricultural_inputs_seedling_icon_02381cf7.png" alt="Inputs" class="category-icon">', 
        'Produce': '<img src="assets/images/Farm_produce_vegetables_icon_6e7d25e1.png" alt="Produce" class="category-icon">',
        'Waste': '<img src="assets/images/Agricultural_waste_recycling_icon_47728bd8.png" alt="Waste" class="category-icon">',
        'Manpower': '<img src="assets/images/Farm_worker_manpower_icon_8a9f5228.png" alt="Manpower" class="category-icon">'
    };
    return icons[category] || '<img src="assets/images/Agricultural_tractor_tools_icon_79cbf122.png" alt="Item" class="category-icon">';
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
            hideLoading();
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
                        <p><strong>${translate('condition')}:</strong> ${selectedItem.condition}</p>
                        <p><strong>${translate('location_label')}:</strong> ${selectedItem.location}</p>
                        <p><strong>${translate('owner')}:</strong> ${owner ? `<img src="${owner.avatar}" alt="Owner" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${owner.name}` : 'Unknown'} 
                           ${owner && owner.verified ? `✅ ${translate('verified_user')}` : ''}</p>
                        <p><strong>${translate('quantity_available')}:</strong> ${selectedItem.quantity}</p>
                    </div>
                    
                    <div class="item-description">
                        <h3>${translate('description_label')}</h3>
                        <p>${selectedItem.description}</p>
                    </div>
                    
                    ${selectedItem.tags && selectedItem.tags.length > 0 ? `
                        <div class="item-tags">
                            <h3>${translate('tags_label')}</h3>
                            <div class="tags">
                                ${selectedItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="item-detail-sidebar">
                <div class="price-section">
                    <h3>${translate('price')}</h3>
                    <div class="price-display">₹${formatPrice(selectedItem)}</div>
                </div>
                
                <div class="price-calculator">
                    <h4>${translate('calculate_total')}</h4>
                    <div class="calculator-inputs">
                        ${selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour' ? `
                            <div class="rental-booking-form">
                                <div class="form-group">
                                    <label for="rentalStartDate">${translate('start_date')}:</label>
                                    <input type="date" id="rentalStartDate" min="" onchange="updatePriceCalculation()" required>
                                </div>
                                <div class="form-group">
                                    <label for="rentalDuration">${translate('duration')}:</label>
                                    <input type="number" id="rentalDuration" min="1" value="1" onchange="updatePriceCalculation()">
                                    <select id="durationType" onchange="updatePriceCalculation()">
                                        ${selectedItem.price_type === 'per-day' ? '<option value="day">Days</option>' : '<option value="hour">Hours</option>'}
                                    </select>
                                </div>
                            </div>
                            <script>
                                // Set minimum date to 3 days from now
                                const minDate = new Date();
                                minDate.setDate(minDate.getDate() + 3);
                                document.getElementById('rentalStartDate').min = minDate.toISOString().split('T')[0];
                                
                                // Set max date based on item availability if available
                                ${selectedItem.available_to ? `document.getElementById('rentalStartDate').max = '${selectedItem.available_to}';` : ''}
                            </script>
                        ` : `
                            <label for="quantity">${translate('quantity')}:</label>
                            <input type="number" id="quantity" min="1" max="${selectedItem.quantity}" value="1" onchange="updatePriceCalculation()">
                        `}
                    </div>
                    
                    <div class="price-breakdown" id="priceBreakdown">
                        <!-- Will be populated by updatePriceCalculation() -->
                    </div>
                    
                    <div class="delivery-note">
                        <p><strong>📍 Delivery Charges:</strong> We will add delivery charges based on distance and item weight. A revised bill will be sent soon.</p>
                    </div>
                </div>
                
                ${selectedItem.availability === 'available' && currentUser?.role !== 'admin' && selectedItem.owner !== currentUser?.id ? `
                    <div class="booking-section">
                        ${selectedItem.high_value ? `
                            <div class="caretaker-option">
                                <label>
                                    <input type="checkbox" id="includeCaretaker" onchange="updatePriceCalculation()">
                                    Include Helper Service (Recommended for high-value items)
                                </label>
                                <div class="high-value-note">
                                    <p><strong>💰 High-Value Item (>₹1 Lakh):</strong></p>
                                    <p>A dedicated helper will be assigned to take care of this item. The helper fee includes meal and staying arrangements and is already included in the rental amount.</p>
                                </div>
                            </div>
                        ` : ''}
                        
                        <button class="btn btn-primary btn-block" onclick="initiateBooking()">
                            ${selectedItem.category === 'Produce' || selectedItem.category === 'Inputs' ? translate('buy_now') : translate('book_item')}
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
    const helperFee = includeCaretaker ? Math.floor(basePrice * 0.06) : 0;
    const platformCommission = Math.floor((basePrice + protectionFee + helperFee) * 0.05);
    
    const total = basePrice + protectionFee + helperFee + platformCommission;
    
    breakdownElement.innerHTML = `
        <div class="calculator-row">
            <span>${translate('base_price')}:</span>
            <span>₹${basePrice}</span>
        </div>
        ${protectionFee > 0 ? `
            <div class="calculator-row">
                <span>${translate('protection_fee')}:</span>
                <span>₹${protectionFee}</span>
            </div>
        ` : ''}
        ${helperFee > 0 ? `
            <div class="calculator-row">
                <span>${translate('helper_fee')}:</span>
                <span>₹${helperFee}</span>
            </div>
        ` : ''}
        <div class="calculator-row">
            <span>${translate('platform_fee')}:</span>
            <span>₹${platformCommission}</span>
        </div>
        <div class="calculator-row calculator-total">
            <span>${translate('total')}:</span>
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
            const startDate = document.getElementById('rentalStartDate')?.value;
            if (!startDate) {
                showError(translate('select_start_date'));
                hideLoading();
                return;
            }
            
            // Validate start date is at least 3 days from now
            const selectedDate = new Date(startDate);
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 3);
            if (selectedDate < minDate) {
                showError(translate('min_advance_booking'));
                hideLoading();
                return;
            }
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
        const helperFee = includeCaretaker ? Math.floor(basePrice * 0.06) : 0;
        const platformCommission = Math.floor((basePrice + protectionFee + helperFee) * 0.05);
        
        // Assign helper if needed
        let assignedHelper = null;
        if (includeCaretaker || selectedItem.high_value) {
            const users = await MockAPI.getUsers();
            const availableHelpers = users.filter(u => u.role === 'helper' && u.available);
            if (availableHelpers.length > 0) {
                assignedHelper = availableHelpers[0].id;
            }
        }
        
        // Create transaction
        const transactionData = {
            item_id: selectedItem.id,
            renter: currentUser.id,
            owner: selectedItem.owner,
            caretaker: assignedHelper,
            start_date: selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour' 
                ? document.getElementById('rentalStartDate')?.value 
                : new Date().toISOString().split('T')[0],
            end_date: selectedItem.price_type === 'per-day' || selectedItem.price_type === 'per-hour'
                ? new Date(new Date(document.getElementById('rentalStartDate')?.value).getTime() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                : new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'pending',
            item_fee: basePrice,
            protection_fee: protectionFee,
            caretaker_fee: helperFee,
            platform_commission: platformCommission,
            total_amount: basePrice + protectionFee + helperFee + platformCommission,
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
            <h3>${translate('confirm_booking')}</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <h4>${selectedItem.title}</h4>
            <p><strong>${translate('owner')}:</strong> ${owner ? `${owner.avatar} ${owner.name}` : 'Unknown'}</p>
            ${caretaker ? `<p><strong>${translate('helper')}:</strong> <img src="${caretaker.avatar}" alt="Helper" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${caretaker.name}</p>` : ''}
            
            <div class="address-section">
                <h4>${translate('delivery_address')}</h4>
                <div class="form-group">
                    <label for="deliveryAddress">${translate('full_address')} *</label>
                    <textarea id="deliveryAddress" placeholder="House/Plot number, Street, Landmark" rows="2" required>${currentUser.address || ''}</textarea>
                </div>
            </div>
            
            <div class="booking-details">
                <div class="calculator-row">
                    <span>${translate('item_fee')}:</span>
                    <span>₹${transactionData.item_fee}</span>
                </div>
                ${transactionData.protection_fee > 0 ? `
                    <div class="calculator-row">
                        <span>${translate('protection_fee')}:</span>
                        <span>₹${transactionData.protection_fee}</span>
                    </div>
                ` : ''}
                ${transactionData.caretaker_fee > 0 ? `
                    <div class="calculator-row">
                        <span>${translate('helper_fee')}:</span>
                        <span>₹${transactionData.caretaker_fee}</span>
                    </div>
                ` : ''}
                <div class="calculator-row">
                    <span>${translate('platform_fee')}:</span>
                    <span>₹${transactionData.platform_commission}</span>
                </div>
                <div class="calculator-row calculator-total">
                    <span>${translate('total_amount')}:</span>
                    <span>₹${transactionData.total_amount}</span>
                </div>
            </div>
            
            <div class="payment-methods">
                <h4>${translate('payment_method')}</h4>
                <label><input type="radio" name="paymentMethod" value="upi" checked> UPI</label>
                <label><input type="radio" name="paymentMethod" value="wallet"> Wallet</label>
                <label><input type="radio" name="paymentMethod" value="cod"> Cash on Delivery</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="confirmBooking('${JSON.stringify(transactionData).replace(/"/g, '&quot;')}')">${translate('confirm_pay')}</button>
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
        
        // Update item inventory
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        const itemIndex = items.findIndex(item => item.id === selectedItem.id);
        if (itemIndex !== -1) {
            // For quantity-based items, reduce the available quantity
            if (transactionData.quantity && items[itemIndex].quantity) {
                items[itemIndex].quantity -= transactionData.quantity;
                // Mark as unavailable if no quantity left
                if (items[itemIndex].quantity <= 0) {
                    items[itemIndex].availability = 'unavailable';
                }
            } else {
                // For rental items, mark as booked for the period
                items[itemIndex].availability = 'booked';
            }
            localStorage.setItem('items', JSON.stringify(items));
        }
        
        // Send initial messages
        if (transactionData.caretaker) {
            await MockAPI.sendMessage({
                transaction_id: transaction.id,
                sender: transactionData.caretaker,
                receiver: transactionData.renter,
                message: `Hello ${currentUser.name}, I am assigned as helper for this transaction. I will ensure proper handling of the item with meal and staying care.`,
                type: 'system'
            });
        }
        
        hideLoading();
        showSuccess(translate('booking_confirmed'));
        
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
            condition: 'Good', // Default condition
            available_from: document.getElementById('availableFrom').value || null,
            available_to: document.getElementById('availableTo').value || null
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
            // Show availability dates for rental items
            if (document.getElementById('availabilityDates')) {
                document.getElementById('availabilityDates').style.display = 'block';
                document.getElementById('availableFrom').required = true;
                document.getElementById('availableTo').required = true;
            }
            break;
        case 'Inputs':
        case 'Produce':
        case 'Waste':
            priceType.innerHTML = `
                <option value="per-kg">Per KG</option>
                <option value="per-unit">Per Unit/Bag</option>
                <option value="fixed">Fixed Price</option>
            `;
            // Hide availability dates for purchase items
            if (document.getElementById('availabilityDates')) {
                document.getElementById('availabilityDates').style.display = 'none';
                document.getElementById('availableFrom').required = false;
                document.getElementById('availableTo').required = false;
            }
            break;
        case 'Manpower':
            priceType.innerHTML = `
                <option value="per-hour">Per Hour</option>
                <option value="per-day">Per Day</option>
            `;
            // Show availability dates for service items
            if (document.getElementById('availabilityDates')) {
                document.getElementById('availabilityDates').style.display = 'block';
                document.getElementById('availableFrom').required = true;
                document.getElementById('availableTo').required = true;
            }
            break;
        default:
            priceType.innerHTML = '<option value="fixed">Fixed Price</option>';
    }
    
    // Set minimum date to 3 days from now for availability
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    const minDateStr = minDate.toISOString().split('T')[0];
    if (document.getElementById('availableFrom')) {
        document.getElementById('availableFrom').min = minDateStr;
    }
    if (document.getElementById('availableTo')) {
        document.getElementById('availableTo').min = minDateStr;
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
        container.innerHTML = `<div class="no-orders">${translate('no_orders')}</div>`;
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
                    <p><strong>${translate('transaction_id')}:</strong> ${transaction.id}</p>
                    <p><strong>${currentUser?.role === 'owner' ? translate('renter') : translate('owner')}:</strong> 
                       ${currentUser?.role === 'owner' ? 
                         (renter ? `<img src="${renter.avatar}" alt="Renter" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${renter.name}` : 'Unknown') : 
                         (owner ? `<img src="${owner.avatar}" alt="Owner" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${owner.name}` : 'Unknown')
                       }
                    </p>
                    ${caretaker ? `<p><strong>${translate('helper')}:</strong> <img src="${caretaker.avatar}" alt="Helper" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${caretaker.name}</p>` : ''}
                    <p><strong>${translate('amount')}:</strong> ₹${transaction.total_amount}</p>
                    <p><strong>${translate('start_date_label')}:</strong> ${transaction.start_date}</p>
                    <p><strong>${translate('end_date_label')}:</strong> ${transaction.end_date}</p>
                    <p><strong>${translate('payment_status')}:</strong> ${transaction.payment_status}</p>
                </div>
                
                <div class="order-actions">
                    <button class="btn btn-secondary" onclick="startChat('${transaction.item_id}', '${currentUser?.role === 'owner' ? transaction.renter : transaction.owner}', '${transaction.id}')">
                        💬 Chat
                    </button>
                    
                    ${transaction.status === 'active' && currentUser?.role === 'renter' ? `
                        <button class="btn btn-warning" onclick="reportIssue('${transaction.id}')">Report Issue</button>
                        <button class="btn btn-success" onclick="completeTransaction('${transaction.id}')">Mark Complete</button>
                    ` : ''}
                    
                    ${transaction.status === 'active' && currentUser?.role === 'owner' ? `
                        <button class="btn btn-success" onclick="confirmReturn('${transaction.id}')">Confirm Return</button>
                    ` : ''}
                    
                    ${currentUser?.role === 'helper' && transaction.caretaker === currentUser.id ? `
                        <button class="btn btn-primary" onclick="helperAction('${transaction.id}')">Helper Actions</button>
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

        // Transaction-based chats
        const transactions = await MockAPI.getTransactions();
        const userTransactions = transactions.filter(t => 
            t.renter === currentUser.id || 
            t.owner === currentUser.id || 
            t.caretaker === currentUser.id
        );

        // --- NEW: Load direct messages as chat threads ---
        const directMessages = JSON.parse(localStorage.getItem('directMessages') || '[]');
        // Group direct messages by (otherUserId + itemId)
        const directThreadsMap = {};
        directMessages.forEach(dm => {
            if (dm.sender === currentUser.id || dm.receiver === currentUser.id) {
                const otherUserId = dm.sender === currentUser.id ? dm.receiver : dm.sender;
                const threadKey = `${otherUserId}_${dm.item_id}`;
                if (!directThreadsMap[threadKey]) {
                    directThreadsMap[threadKey] = {
                        userId: otherUserId,
                        itemId: dm.item_id,
                        lastMessage: dm,
                        messages: []
                    };
                }
                directThreadsMap[threadKey].messages.push(dm);
                // Update lastMessage if newer
                if (new Date(dm.timestamp) > new Date(directThreadsMap[threadKey].lastMessage.timestamp)) {
                    directThreadsMap[threadKey].lastMessage = dm;
                }
            }
        });
        const directThreads = Object.values(directThreadsMap);

        // Pass both to displayChatList
        displayChatList(userTransactions, directThreads);

        if (currentTransaction) {
            await loadChatMessages(currentTransaction);
        } else if (currentChatContact) {
            await loadDirectMessages(currentChatContact.id, currentChatContact.itemId);
        }

    } catch (error) {
        console.error('Error loading chat:', error);
        showError('Failed to load chat');
    }
}

function displayChatList(transactions, directThreads = []) {
    const container = document.getElementById('chatList');
    if (!container) return;

    if ((transactions.length === 0) && (directThreads.length === 0)) {
        container.innerHTML = '<div class="no-chats">No conversations found</div>';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    let html = '';

    // Transaction-based chats
    transactions.forEach(transaction => {
        const item = items.find(i => i.id === transaction.item_id);
        const otherUser = currentUser.id === transaction.owner ? 
            users.find(u => u.id === transaction.renter) :
            users.find(u => u.id === transaction.owner);

        html += `
            <div class="chat-item ${currentTransaction?.id === transaction.id ? 'active' : ''}" 
                 onclick="selectChat('${transaction.id}')">
                <h4>${item ? item.title : 'Unknown Item'}</h4>
                <p>${otherUser ? `<img src="${otherUser.avatar}" alt="Avatar" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${otherUser.name}` : 'Unknown User'}</p>
                <small>Transaction: ${transaction.id}</small>
            </div>
        `;
    });

    // Direct message chats
    directThreads.forEach(thread => {
        const otherUser = users.find(u => u.id === thread.userId);
        const item = items.find(i => i.id === thread.itemId);
        const isActive = currentChatContact && currentChatContact.id === thread.userId && currentChatContact.itemId === thread.itemId;
        html += `
            <div class="chat-item ${isActive ? 'active' : ''}" 
                 onclick="selectDirectChat('${thread.userId}', '${thread.itemId}')">
                <h4>${item ? item.title : 'Unknown Item'}</h4>
                <p>${otherUser ? `<img src="${otherUser.avatar}" alt="Avatar" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 4px;"> ${otherUser.name}` : 'Unknown User'}</p>
                <small>Direct Message</small>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function selectChat(transactionId, isTransactionChat) {
    try {
        if (isTransactionChat) {
            currentTransaction = { id: transactionId };
            await showPage('chat');
        } else {
            // For direct message chats, load the contact and messages
            const directMessages = JSON.parse(localStorage.getItem('directMessages') || '[]');
            const messageThread = directMessages.find(dm => dm.id === transactionId);
            
            if (messageThread) {
                currentChatContact = {
                    id: messageThread.sender === currentUser.id ? messageThread.receiver : messageThread.sender,
                    itemId: messageThread.item_id
                };
                
                await loadDirectMessages(currentChatContact.id, currentChatContact.itemId);
                await showPage('chat');
            }
        }
        
        // Update chat list selection
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        
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
        container.innerHTML = `<div class="no-messages">${translate('no_messages')}</div>`;
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

    if (!message || !currentUser) return;

    try {
        // If in a transaction chat
        if (currentTransaction && currentTransaction.id) {
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
        }
        // If in a direct message chat (from marketplace)
        else if (currentChatContact && currentChatContact.id && currentChatContact.itemId) {
            await MockAPI.sendDirectMessage({
                sender: currentUser.id,
                receiver: currentChatContact.id,
                item_id: currentChatContact.itemId,
                message: message,
                type: 'text'
            });

            input.value = '';
            await loadDirectMessages(currentChatContact.id, currentChatContact.itemId);
        }
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
            // Create a direct message context with the item owner
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const owner = users.find(u => u.id === ownerId);
            
            if (owner) {
                // Set up direct message context
                currentChatContact = {
                    id: ownerId,
                    name: owner.name,
                    avatar: owner.avatar,
                    itemId: itemId
                };
                
                await showPage('chat');
                await loadDirectMessages(ownerId, itemId);
                
                // Auto-focus the message input
                setTimeout(() => {
                    const input = document.getElementById('chatInput');
                    if (input) input.focus();
                }, 100);
                
                return;
            }
        }
        
        currentTransaction = { id: transactionId };
        await showPage('chat');
        
    } catch (error) {
        console.error('Error starting chat:', error);
        showError('Failed to start chat');
    }
}

// Load direct messages for item inquiry
async function loadDirectMessages(ownerId, itemId) {
    try {
        const chatContainer = document.getElementById('chatMessages');
        const chatHeader = document.querySelector('.chat-header h3');
        
        if (chatHeader && currentChatContact) {
            chatHeader.textContent = `Chat with ${currentChatContact.name}`;
        }
        
        // For now, show a starter message or load existing messages
        if (chatContainer) {
            chatContainer.innerHTML = `
                <div class="chat-message system-message">
                    <div class="message-content">
                        <p>You are now chatting with ${currentChatContact.name} about their item.</p>
                        <p>Feel free to ask questions about availability, condition, or any other details!</p>
                    </div>
                </div>
            `;
            
            // Auto-scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // Load any existing messages for this conversation
        const messages = await MockAPI.getDirectMessages(currentUser.id, ownerId, itemId);
        if (messages && messages.length > 0) {
            displayDirectMessages(messages);
        }

        // --- FIX: Show chat input box for direct messages ---
        const inputContainer = document.getElementById('chatInputContainer');
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }
        // ----------------------------------------------------

    } catch (error) {
        console.error('Error loading direct messages:', error);
    }
}

function displayDirectMessages(messages) {
    const chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) return;
    
    const messagesHTML = messages.map(msg => {
        const isCurrentUser = msg.sender === currentUser.id;
        return `
            <div class="chat-message ${isCurrentUser ? 'sent' : 'received'}">
                <div class="message-content">
                    <p>${msg.message}</p>
                    <small class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
            </div>
        `;
    }).join('');
    
    chatContainer.innerHTML += messagesHTML;
    chatContainer.scrollTop = chatContainer.scrollHeight;
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
    const activeTransactions = transactions.filter(t => t.status === 'active').length;
    const totalEarnings = transactions
        .filter(t => t.status === 'completed' && currentUser.role === 'owner')
        .reduce((sum, t) => sum + (t.item_fee || 0), 0);
    
    // Calculate days since joining
    const joinedDate = new Date(user.joinedDate);
    const today = new Date();
    const daysSinceJoined = Math.floor((today - joinedDate) / (1000 * 60 * 60 * 24));
    
    // Get recent activity
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
        .slice(0, 3);
    
    // Format join date nicely
    const joinedDateFormatted = joinedDate.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar"><img src="${user.avatar}" alt="Profile Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"></div>
            <h2>${user.name}</h2>
            <p>${user.village}, ${user.district}</p>
            <div class="verification-status">
                ${user.verified ? translate('verified_user_badge') : translate('not_verified_badge')}
            </div>
            <div class="rating">
                ${'⭐'.repeat(Math.floor(user.rating || 0))} ${user.rating || 0}/5 • ${user.totalTransactions || 0} reviews
            </div>
            <div class="role-badge role-${user.role}">
                ${user.role === 'owner' ? translate('owner_role') : user.role === 'renter' ? translate('renter_role') : translate('helper_role')}
            </div>
        </div>
        
        <div class="profile-stats">
            <div class="stat-card">
                <h3>${translate('total_transactions')}</h3>
                <div class="stat-value">${user.totalTransactions || 0}</div>
                <div class="stat-subtitle">${translate('all_time')}</div>
            </div>
            <div class="stat-card">
                <h3>${translate('completed_orders')}</h3>
                <div class="stat-value">${completedTransactions}</div>
                <div class="stat-subtitle">${translate('success_rate')}: ${user.totalTransactions ? Math.round((completedTransactions / user.totalTransactions) * 100) : 0}%</div>
            </div>
            <div class="stat-card">
                <h3>${translate('active_orders')}</h3>
                <div class="stat-value">${activeTransactions}</div>
                <div class="stat-subtitle">Currently running</div>
            </div>
            <div class="stat-card">
                <h3>${translate('member_since')}</h3>
                <div class="stat-value">${joinedDateFormatted}</div>
                <div class="stat-subtitle">${daysSinceJoined} days ago</div>
            </div>
            ${currentUser.role === 'owner' ? `
                <div class="stat-card">
                    <h3>${translate('total_earnings')}</h3>
                    <div class="stat-value">₹${totalEarnings.toLocaleString()}</div>
                    <div class="stat-subtitle">From completed orders</div>
                </div>
            ` : ''}
        </div>
        
        ${recentTransactions.length > 0 ? `
            <div class="recent-activity">
                <h3>${translate('recent_activity')}</h3>
                <div class="activity-list">
                    ${recentTransactions.map(transaction => {
                        const createdDate = new Date(transaction.created_date);
                        const daysAgo = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
                        return `
                            <div class="activity-item">
                                <div class="activity-icon">${transaction.status === 'completed' ? '✅' : transaction.status === 'active' ? '🔄' : '📋'}</div>
                                <div class="activity-details">
                                    <div class="activity-title">Order ${transaction.status}</div>
                                    <div class="activity-subtitle">₹${transaction.total_amount} • ${daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : daysAgo + ' days ago'}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="profile-actions">
            <button class="btn btn-primary" onclick="showEditProfile()">${translate('edit_profile')}</button>
            <button class="btn btn-secondary" onclick="viewTransactionHistory()">${translate('transaction_history')}</button>
        </div>
    `;
}

// Admin dashboard functions
async function loadAdminDashboard() {
    if (currentUser?.role !== 'admin') {
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
        container.innerHTML = `<p>${translate('no_transactions')}</p>`;
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
        container.innerHTML = `<p>${translate('no_disputes')}</p>`;
        return;
    }
    
    container.innerHTML = disputes.map(dispute => `
        <div class="dispute-item">
            <h4>Dispute #${dispute.id}</h4>
            <p><strong>Transaction:</strong> ${dispute.transaction_id}</p>
            <p><strong>Issue:</strong> ${dispute.issue}</p>
            <p><strong>Status:</strong> ${dispute.status}</p>
            <div class="dispute-actions">
                <button class="btn btn-success" onclick="resolveDispute('${dispute.id}', 'resolved')">${translate('resolve')}</button>
                <button class="btn btn-danger" onclick="resolveDispute('${dispute.id}', 'rejected')">${translate('reject')}</button>
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
            <h3>${translate('edit_profile_title')}</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form class="edit-profile-form" id="editProfileForm" onsubmit="handleEditProfile(event)">
                <div class="form-group">
                    <label for="editName">${translate('full_name')}</label>
                    <input type="text" id="editName" value="${currentUser.name}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="editVillage">${translate('village')}</label>
                        <input type="text" id="editVillage" value="${currentUser.village}" required>
                    </div>
                    <div class="form-group">
                        <label for="editDistrict">${translate('district')}</label>
                        <input type="text" id="editDistrict" value="${currentUser.district}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="editAddress">Full Address</label>
                    <textarea id="editAddress" placeholder="House/Plot number, Street, Landmark" rows="2">${currentUser.address || ''}</textarea>
                </div>
                <div class="role-selection">
                    <h4>${translate('primary_role')}</h4>
                    <div class="role-option ${currentUser.role === 'renter' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="renter" ${currentUser.role === 'renter' ? 'checked' : ''}>
                        <div>
                            <strong>${translate('renter_buyer')}</strong>
                            <div class="role-description">${translate('renter_desc')}</div>
                        </div>
                    </div>
                    <div class="role-option ${currentUser.role === 'owner' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="owner" ${currentUser.role === 'owner' ? 'checked' : ''}>
                        <div>
                            <strong>${translate('owner_lister')}</strong>
                            <div class="role-description">${translate('owner_desc')}</div>
                        </div>
                    </div>
                    <div class="role-option ${currentUser.role === 'helper' ? 'selected' : ''}">
                        <input type="radio" name="editRole" value="helper" ${currentUser.role === 'helper' ? 'checked' : ''}>
                        <div>
                            <strong>Helper</strong>
                            <div class="role-description">Provide helper and caretaker services for the community</div>
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
        const address = document.getElementById('editAddress').value;
        const role = document.querySelector('input[name="editRole"]:checked').value;
        
        // Update current user
        currentUser.name = name;
        currentUser.village = village;
        currentUser.district = district;
        currentUser.address = address;
        
        // Handle role change
        if (currentUser.role !== role) {
            currentUser.role = role;
            currentUser.avatar = role === 'helper' ? 'assets/images/Caretaker_service_agent_avatar_cc93feff.png' : (role === 'owner' ? 'assets/images/Male_farmer_avatar_profile_3effb6e6.png' : 'assets/images/Female_farmer_avatar_profile_a2917358.png');
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

function helperAction(transactionId) {
    alert('Helper action interface coming soon!');
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

// Add this to your MockAPI definition
MockAPI.sendDirectMessage = async function({ sender, receiver, item_id, message, type }) {
    // Simulate delay
    await MockAPI.delay(500);

    // Get messages from localStorage
    let messages = JSON.parse(localStorage.getItem('directMessages') || '[]');
    const newMessage = {
        id: 'dm' + Date.now(),
        sender,
        receiver,
        item_id,
        message,
        type,
        timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    localStorage.setItem('directMessages', JSON.stringify(messages));
};

MockAPI.getDirectMessages = async function(user1, user2, itemId) {
    await MockAPI.delay(200);
    let messages = JSON.parse(localStorage.getItem('directMessages') || '[]');
    return messages.filter(
        m =>
            m.item_id === itemId &&
            (
                (m.sender === user1 && m.receiver === user2) ||
                (m.sender === user2 && m.receiver === user1)
            )
    );
};
// Toggle chat sidebar for mobile view
function toggleChatSidebar() {
    const sidebar = document.getElementById('chatSidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Select a direct chat thread (for direct messages)
function selectDirectChat(userId, itemId) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const otherUser = users.find(u => u.id === userId);
        currentTransaction = null;
        currentChatContact = {
            id: userId,
            name: otherUser ? otherUser.name : 'Unknown',
            avatar: otherUser ? otherUser.avatar : '',
            itemId: itemId
        };
        // Highlight the selected chat
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));

        // Show chat page and load messages
        showPage('chat').then(() => {
            loadDirectMessages(userId, itemId);
            // Hide sidebar on mobile after selecting chat
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('chatSidebar');
                if (sidebar) sidebar.classList.remove('open');
            }
        });
    } catch (error) {
        console.error('Error selecting direct chat:', error);
        showError('Failed to load chat');
    }
}