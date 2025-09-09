// ग्रामसंचय API - Node.js Express Backend
// Rural Peer-to-Peer Exchange Platform API

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

// Load environment variables (fake ones for development)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy environment variables for simulation
const FAKE_ENV = {
    MONGO_URI: 'mongodb+srv://gramxchange:fakepassword@cluster0.mongodb.net/gramxchange',
    IMAGEKIT_URL: 'https://ik.imagekit.io/gramxchange/',
    IMAGEKIT_PRIVATE_KEY: 'private_fake_key_123',
    JWT_SECRET: 'fake_jwt_secret_key_for_development',
    FRONTEND_URL: 'https://username.github.io/gramxchange'
};

// Dummy data store (simulating database)
let users = [];
let listings = [];
let transactions = [];
let chats = [];

// Utility function to generate fake JWT token
const generateFakeJWT = (userId) => {
    return Buffer.from(JSON.stringify({ userId, exp: Date.now() + 86400000 })).toString('base64');
};

// Utility function to generate fake IDs
const generateId = () => crypto.randomBytes(12).toString('hex');

// ============================================================================
// AUTH ROUTES
// ============================================================================

/**
 * POST /api/auth/register
 * Register a new user in the platform
 * 
 * Expected Request Body:
 * {
 *   "name": "Ramesh Kumar",
 *   "email": "ramesh@example.com",
 *   "password": "securePassword123",
 *   "phone": "+91-9876543210",
 *   "village": "Khanpur",
 *   "district": "Punjab",
 *   "role": "owner" // owner, renter, caretaker
 * }
 * 
 * Future Integration: MongoDB Atlas user collection
 * Will hash passwords with bcrypt and validate email uniqueness
 */
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, password, phone, village, district, role } = req.body;
        
        // Simulate validation checks
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'सभी आवश्यक फ़ील्ड भरें (All required fields must be filled)'
            });
        }

        // Simulate checking if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'यह ईमेल पहले से पंजीकृत है (This email is already registered)'
            });
        }

        // Create fake user
        const newUser = {
            id: generateId(),
            name,
            email,
            phone,
            village,
            district,
            role,
            verified: false,
            rating: 0,
            totalTransactions: 0,
            joinedDate: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`
        };

        users.push(newUser);

        // Generate fake JWT token
        const token = generateFakeJWT(newUser.id);

        res.status(201).json({
            success: true,
            message: 'खाता सफलता से बना दिया गया (Account created successfully)',
            data: {
                token,
                user: { ...newUser, password: undefined }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 * 
 * Expected Request Body:
 * {
 *   "email": "ramesh@example.com",
 *   "password": "securePassword123"
 * }
 * 
 * Future Integration: MongoDB user lookup and bcrypt password comparison
 */
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'ईमेल और पासवर्ड आवश्यक है (Email and password required)'
            });
        }

        // Simulate user lookup
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'गलत ईमेल या पासवर्ड (Invalid email or password)'
            });
        }

        // Generate fake JWT token
        const token = generateFakeJWT(user.id);

        res.json({
            success: true,
            message: 'लॉगिन सफल (Login successful)',
            data: {
                token,
                user: { ...user, password: undefined }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

// ============================================================================
// LISTINGS ROUTES
// ============================================================================

/**
 * POST /api/listings
 * Create a new marketplace listing
 * 
 * Expected Request Body:
 * {
 *   "title": "John Deere Tractor 5050D",
 *   "description": "Well-maintained tractor for rent",
 *   "category": "Tools", // Tools, Inputs, Produce, Waste, Manpower
 *   "priceType": "per-day",
 *   "price": 1500,
 *   "quantity": 1,
 *   "condition": "Good",
 *   "location": "Khanpur, Punjab",
 *   "images": ["fake-image-url-1", "fake-image-url-2"],
 *   "tags": ["tractor", "farming", "heavy-equipment"]
 * }
 * 
 * Future Integration: MongoDB listings collection, ImageKit image validation
 */
app.post('/api/listings', (req, res) => {
    try {
        // Simulate authentication check
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'प्राधिकरण आवश्यक है (Authorization required)'
            });
        }

        const { title, description, category, priceType, price, quantity, condition, location, images, tags } = req.body;

        if (!title || !category || !price || !location) {
            return res.status(400).json({
                success: false,
                message: 'आवश्यक फ़ील्ड गुम हैं (Required fields missing)'
            });
        }

        // Create fake listing
        const newListing = {
            id: generateId(),
            owner: 'fake-user-id', // Would extract from JWT in real implementation
            title,
            description,
            category,
            priceType,
            price,
            quantity,
            condition,
            location,
            images: images || [],
            tags: tags || [],
            availability: 'available',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            views: 0,
            highValue: price > 10000
        };

        listings.push(newListing);

        res.status(201).json({
            success: true,
            message: 'लिस्टिंग सफलता से बनाई गई (Listing created successfully)',
            data: newListing
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * GET /api/listings
 * Fetch all listings with optional filters
 * 
 * Query Parameters:
 * ?category=Tools&location=Punjab&search=tractor&sort=price-low&page=1&limit=10
 * 
 * Future Integration: MongoDB aggregation pipeline for complex filtering
 */
app.get('/api/listings', (req, res) => {
    try {
        const { category, location, search, sort, page = 1, limit = 10 } = req.query;
        
        let filteredListings = [...listings];

        // Apply filters
        if (category) {
            filteredListings = filteredListings.filter(item => item.category === category);
        }

        if (location) {
            filteredListings = filteredListings.filter(item => 
                item.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (search) {
            filteredListings = filteredListings.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply sorting
        if (sort) {
            switch (sort) {
                case 'price-low':
                    filteredListings.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredListings.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    filteredListings.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                    break;
                case 'popular':
                    filteredListings.sort((a, b) => b.views - a.views);
                    break;
            }
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedListings = filteredListings.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: {
                listings: paginatedListings,
                pagination: {
                    total: filteredListings.length,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(filteredListings.length / limit)
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * GET /api/listings/:id
 * Fetch single listing details
 * 
 * Future Integration: MongoDB findById with owner population
 */
app.get('/api/listings/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const listing = listings.find(item => item.id === id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'लिस्टिंग नहीं मिली (Listing not found)'
            });
        }

        // Increment view count (simulate)
        listing.views += 1;

        res.json({
            success: true,
            data: listing
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * PATCH /api/listings/:id
 * Update listing information
 * 
 * Future Integration: MongoDB findByIdAndUpdate with owner validation
 */
app.patch('/api/listings/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const listingIndex = listings.findIndex(item => item.id === id);
        if (listingIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'लिस्टिंग नहीं मिली (Listing not found)'
            });
        }

        // Simulate owner validation
        // In real app: verify JWT token and check if user owns this listing

        listings[listingIndex] = {
            ...listings[listingIndex],
            ...updates,
            updatedDate: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'लिस्टिंग अपडेट की गई (Listing updated)',
            data: listings[listingIndex]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * DELETE /api/listings/:id
 * Delete a listing
 * 
 * Future Integration: MongoDB findByIdAndDelete with owner validation
 */
app.delete('/api/listings/:id', (req, res) => {
    try {
        const { id } = req.params;

        const listingIndex = listings.findIndex(item => item.id === id);
        if (listingIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'लिस्टिंग नहीं मिली (Listing not found)'
            });
        }

        // Simulate owner validation
        listings.splice(listingIndex, 1);

        res.json({
            success: true,
            message: 'लिस्टिंग डिलीट की गई (Listing deleted)'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

// ============================================================================
// TRANSACTIONS ROUTES (Escrow Simulation)
// ============================================================================

/**
 * POST /api/transactions
 * Initiate a rental/purchase/exchange transaction
 * 
 * Expected Request Body:
 * {
 *   "listingId": "listing-id-123",
 *   "sellerId": "seller-user-id",
 *   "quantity": 1,
 *   "duration": 3, // for rentals
 *   "startDate": "2025-09-15",
 *   "endDate": "2025-09-18",
 *   "includeCaretaker": true,
 *   "totalAmount": 4500
 * }
 * 
 * Future Integration: MongoDB transactions collection, payment gateway integration
 */
app.post('/api/transactions', (req, res) => {
    try {
        const { listingId, sellerId, quantity, duration, startDate, endDate, includeCaretaker, totalAmount } = req.body;

        if (!listingId || !sellerId || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: 'आवश्यक फ़ील्ड गुम हैं (Required fields missing)'
            });
        }

        // Create fake transaction
        const newTransaction = {
            id: generateId(),
            listingId,
            buyer: 'fake-buyer-id', // Would extract from JWT
            seller: sellerId,
            quantity,
            duration,
            startDate,
            endDate,
            includeCaretaker,
            caretaker: includeCaretaker ? 'fake-caretaker-id' : null,
            totalAmount,
            status: 'pending', // pending, active, completed, cancelled, disputed
            paymentStatus: 'escrow', // escrow, released, refunded
            createdDate: new Date().toISOString(),
            escrowAmount: totalAmount * 0.1, // 10% protection fee
            platformFee: totalAmount * 0.05 // 5% platform fee
        };

        transactions.push(newTransaction);

        res.status(201).json({
            success: true,
            message: 'ट्रांज़ैक्शन शुरू की गई (Transaction initiated)',
            data: newTransaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * GET /api/transactions/:id
 * Fetch transaction details
 * 
 * Future Integration: MongoDB findById with user and listing population
 */
app.get('/api/transactions/:id', (req, res) => {
    try {
        const { id } = req.params;

        const transaction = transactions.find(t => t.id === id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'ट्रांज़ैक्शन नहीं मिली (Transaction not found)'
            });
        }

        res.json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * PATCH /api/transactions/:id/confirm
 * Confirm transaction completion and release escrow
 * 
 * Future Integration: Payment gateway escrow release, MongoDB status update
 */
app.patch('/api/transactions/:id/confirm', (req, res) => {
    try {
        const { id } = req.params;

        const transactionIndex = transactions.findIndex(t => t.id === id);
        if (transactionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'ट्रांज़ैक्शन नहीं मिली (Transaction not found)'
            });
        }

        // Simulate escrow release
        transactions[transactionIndex] = {
            ...transactions[transactionIndex],
            status: 'completed',
            paymentStatus: 'released',
            completedDate: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'ट्रांज़ैक्शन पूरी हुई (Transaction completed)',
            data: transactions[transactionIndex]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * PATCH /api/transactions/:id/cancel
 * Cancel transaction and process refund
 * 
 * Future Integration: Payment gateway refund processing
 */
app.patch('/api/transactions/:id/cancel', (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const transactionIndex = transactions.findIndex(t => t.id === id);
        if (transactionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'ट्रांज़ैक्शन नहीं मिली (Transaction not found)'
            });
        }

        // Simulate refund processing
        transactions[transactionIndex] = {
            ...transactions[transactionIndex],
            status: 'cancelled',
            paymentStatus: 'refunded',
            cancelReason: reason,
            cancelledDate: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'ट्रांज़ैक्शन रद्द की गई (Transaction cancelled)',
            data: transactions[transactionIndex]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

// ============================================================================
// CHAT ROUTES
// ============================================================================

/**
 * GET /api/chats/:transactionId
 * Fetch chat messages for a specific transaction
 * 
 * Future Integration: MongoDB messages collection with transaction filtering
 */
app.get('/api/chats/:transactionId', (req, res) => {
    try {
        const { transactionId } = req.params;

        // Find chat messages for this transaction
        const chatMessages = chats.filter(chat => chat.transactionId === transactionId);

        res.json({
            success: true,
            data: {
                transactionId,
                messages: chatMessages
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * POST /api/chats/:transactionId
 * Send a chat message in a transaction
 * 
 * Expected Request Body:
 * {
 *   "message": "क्या यह ट्रैक्टर अभी उपलब्ध है?",
 *   "messageType": "text" // text, image, location
 * }
 * 
 * Future Integration: MongoDB messages collection, WebSocket for real-time updates
 */
app.post('/api/chats/:transactionId', (req, res) => {
    try {
        const { transactionId } = req.params;
        const { message, messageType = 'text' } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'संदेश आवश्यक है (Message is required)'
            });
        }

        // Create new chat message
        const newMessage = {
            id: generateId(),
            transactionId,
            sender: 'fake-sender-id', // Would extract from JWT
            message,
            messageType,
            timestamp: new Date().toISOString(),
            read: false
        };

        chats.push(newMessage);

        // In real implementation: emit WebSocket event for real-time delivery

        res.status(201).json({
            success: true,
            message: 'संदेश भेजा गया (Message sent)',
            data: newMessage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

// ============================================================================
// IMAGE UPLOAD ROUTE
// ============================================================================

/**
 * POST /api/upload
 * Upload image to ImageKit and return URL
 * 
 * Expected: FormData with image file
 * 
 * Future Integration: ImageKit.io SDK for actual image upload and optimization
 */
app.post('/api/upload', (req, res) => {
    try {
        // Simulate image upload processing
        // In real implementation: use multer middleware and ImageKit SDK

        // Generate fake image URLs
        const fakeImageUrls = [
            `${FAKE_ENV.IMAGEKIT_URL}uploads/item_${generateId()}_640x480.jpg`,
            `${FAKE_ENV.IMAGEKIT_URL}uploads/item_${generateId()}_1280x960.jpg` // Different resolutions
        ];

        // Simulate upload delay
        setTimeout(() => {
            res.json({
                success: true,
                message: 'छवि अपलोड की गई (Image uploaded)',
                data: {
                    originalUrl: fakeImageUrls[1],
                    thumbnailUrl: fakeImageUrls[0],
                    fileId: `img_${generateId()}`,
                    size: Math.floor(Math.random() * 2000000) + 100000, // Random size 100KB-2MB
                    format: 'jpg'
                }
            });
        }, 1000);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'छवि अपलोड में त्रुटि (Image upload error)',
            error: error.message
        });
    }
});

// ============================================================================
// USER PROFILE ROUTES
// ============================================================================

/**
 * GET /api/users/:id
 * Fetch user profile information
 * 
 * Future Integration: MongoDB users collection with transaction history aggregation
 */
app.get('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'उपयोगकर्ता नहीं मिला (User not found)'
            });
        }

        // Remove sensitive information
        const { password, ...publicUser } = user;

        res.json({
            success: true,
            data: publicUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * PATCH /api/users/:id
 * Update user profile (KYC verification, role changes)
 * 
 * Expected Request Body:
 * {
 *   "phone": "+91-9876543210",
 *   "village": "Updated Village",
 *   "kyc": {
 *     "aadhar": "1234-5678-9012",
 *     "verified": true
 *   }
 * }
 * 
 * Future Integration: MongoDB users collection, KYC verification service
 */
app.patch('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'उपयोगकर्ता नहीं मिला (User not found)'
            });
        }

        // Simulate authorization check
        // In real app: verify JWT token and check if user can update this profile

        users[userIndex] = {
            ...users[userIndex],
            ...updates,
            updatedDate: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'प्रोफाइल अपडेट की गई (Profile updated)',
            data: { ...users[userIndex], password: undefined }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

// ============================================================================
// ADDITIONAL UTILITY ROUTES
// ============================================================================

/**
 * GET /api/stats
 * Get platform statistics for admin dashboard
 */
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalUsers: users.length,
            totalListings: listings.length,
            activeTransactions: transactions.filter(t => t.status === 'active').length,
            completedTransactions: transactions.filter(t => t.status === 'completed').length,
            totalRevenue: transactions
                .filter(t => t.status === 'completed')
                .reduce((sum, t) => sum + t.platformFee, 0)
        };

        res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'सर्वर में त्रुटि (Server error)',
            error: error.message
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API स्वस्थ है (API is healthy)',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ============================================================================
// ERROR HANDLING & SERVER STARTUP
// ============================================================================

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API रूट नहीं मिला (API route not found)',
        path: req.originalUrl
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'आंतरिक सर्वर त्रुटि (Internal server error)',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚜 ग्रामसंचय API Server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export app for testing
module.exports = app;
