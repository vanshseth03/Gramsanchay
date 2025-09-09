// Seed data for ग्रामसंचय platform
const SEED_DATA = {
    users: [
        {
            id: "u1",
            name: "Ram Singh",
            role: "owner",
            village: "Bilaspur",
            district: "Punjab",
            verified: true,
            rating: 4.6,
            totalTransactions: 23,
            joinedDate: "2025-08-15",
            phone: "+91-9876543210",
            avatar: "assets/images/Male_farmer_avatar_profile_3effb6e6.png"
        },
        {
            id: "u2", 
            name: "Suman Devi",
            role: "renter",
            village: "Bilaspur", 
            district: "Punjab",
            verified: false,
            rating: 4.2,
            totalTransactions: 15,
            joinedDate: "2025-08-20",
            phone: "+91-9876543211",
            avatar: "assets/images/Female_farmer_avatar_profile_a2917358.png"
        },
        {
            id: "u3",
            name: "Mohan Kumar", 
            role: "owner",
            village: "Raikot",
            district: "Punjab",
            verified: true,
            rating: 4.8,
            totalTransactions: 31,
            joinedDate: "2025-07-10",
            phone: "+91-9876543212",
            avatar: "assets/images/Male_farmer_avatar_profile_3effb6e6.png"
        },
        {
            id: "u4",
            name: "Priya Sharma",
            role: "renter",
            village: "Khanna", 
            district: "Punjab",
            verified: true,
            rating: 4.5,
            totalTransactions: 19,
            joinedDate: "2025-08-05",
            phone: "+91-9876543213",
            avatar: "assets/images/Female_farmer_avatar_profile_a2917358.png"
        },
        {
            id: "c1",
            name: "Caretaker Mohan",
            role: "caretaker", 
            village: "Bilaspur",
            district: "Punjab",
            available: true,
            rating: 4.9,
            specialization: "Heavy Equipment",
            phone: "+91-9876543214",
            avatar: "assets/images/Caretaker_service_agent_avatar_cc93feff.png"
        },
        {
            id: "c2",
            name: "Caretaker Rajesh",
            role: "caretaker",
            village: "Raikot", 
            district: "Punjab",
            available: true,
            rating: 4.7,
            specialization: "Tools & Equipment",
            phone: "+91-9876543215",
            avatar: "assets/images/Caretaker_service_agent_avatar_cc93feff.png"
        },
        {
            id: "admin1",
            name: "Admin User",
            role: "admin",
            village: "Platform",
            district: "Punjab", 
            verified: true,
            avatar: "assets/images/Admin_manager_avatar_profile_656d34c4.png"
        }
    ],
    
    items: [
        {
            id: "i1",
            title: "Mahindra Tractor - 2020 Model",
            category: "Tools",
            owner: "u1",
            price_day: 2500,
            price_type: "per-day",
            protection_required: true,
            high_value: true,
            images: [],
            condition: "Excellent",
            location: "Bilaspur, Punjab",
            description: "Well-maintained Mahindra tractor with all implements. Perfect for farming operations, plowing, and harvesting. Available with fuel.",
            quantity: 1,
            availability: "available",
            tags: ["verified", "premium", "fuel-included"],
            created_date: "2024-12-01",
            distance: 0
        },
        {
            id: "i2", 
            title: "Premium Paddy Seeds (40kg)",
            category: "Inputs",
            owner: "u3",
            price_qty: 2000,
            price_type: "fixed",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Raikot, Punjab",
            description: "High-quality paddy seeds from certified suppliers. Guaranteed 90% germination rate. Suitable for Kharif season.",
            quantity: 10,
            availability: "available", 
            tags: ["organic", "certified", "high-yield"],
            created_date: "2024-12-02",
            distance: 15
        },
        {
            id: "i3",
            title: "Fresh Wheat (100kg bags)",
            category: "Produce", 
            owner: "u1",
            price_qty: 2200,
            price_type: "per-kg",
            price: 22,
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Farm-fresh wheat harvested this season. Premium quality grains suitable for flour mills and direct consumption.",
            quantity: 50,
            availability: "available",
            tags: ["fresh", "premium", "direct-farm"],
            created_date: "2024-12-03",
            distance: 0
        },
        {
            id: "i4",
            title: "Rice Straw Bales for Composting", 
            category: "Waste",
            owner: "u2",
            price_qty: 300,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Bilaspur, Punjab", 
            description: "Clean rice straw bales perfect for composting, mulching, or cattle feed. Properly dried and stored.",
            quantity: 25,
            availability: "available",
            tags: ["eco-friendly", "composting", "bulk-available"],
            created_date: "2024-12-04",
            distance: 2
        },
        {
            id: "i5",
            title: "Experienced Farm Labor (5 workers)",
            category: "Manpower",
            owner: "u3", 
            price_day: 1500,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Available",
            location: "Raikot, Punjab",
            description: "Team of 5 experienced farm workers available for harvesting, sowing, and general farm work. Tools included.",
            quantity: 5,
            availability: "available",
            tags: ["experienced", "tools-included", "reliable"],
            created_date: "2024-12-05",
            distance: 15
        },
        {
            id: "i6",
            title: "John Deere Harvester - 2019",
            category: "Tools",
            owner: "u3",
            price_day: 4500,
            price_type: "per-day", 
            protection_required: true,
            high_value: true,
            images: [],
            condition: "Very Good",
            location: "Raikot, Punjab",
            description: "Professional-grade harvester suitable for wheat, rice, and other crops. Includes operator if needed.",
            quantity: 1,
            availability: "booked",
            tags: ["premium", "operator-available", "multi-crop"],
            created_date: "2024-11-28",
            distance: 15
        },
        {
            id: "i7",
            title: "Organic Fertilizer (50kg bags)",
            category: "Inputs",
            owner: "u4",
            price_qty: 800, 
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Khanna, Punjab",
            description: "Organic compost fertilizer rich in nutrients. Perfect for organic farming and soil health improvement.",
            quantity: 20,
            availability: "available",
            tags: ["organic", "nutrient-rich", "soil-health"],
            created_date: "2024-12-06",
            distance: 25
        },
        {
            id: "i8",
            title: "Fresh Potatoes (Premium Quality)",
            category: "Produce",
            owner: "u4", 
            price_qty: 25,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Khanna, Punjab",
            description: "Farm-fresh potatoes of premium quality. Ideal for wholesale and retail markets. Well-sorted and cleaned.",
            quantity: 500,
            availability: "available",
            tags: ["premium", "wholesale", "sorted"],
            created_date: "2024-12-07",
            distance: 25
        }
    ],
    
    transactions: [
        {
            id: "t1",
            item_id: "i1",
            renter: "u2",
            owner: "u1", 
            caretaker: "c1",
            start_date: "2025-09-08",
            end_date: "2025-09-10",
            status: "active",
            item_fee: 5000,
            protection_fee: 500,
            caretaker_fee: 300,
            platform_commission: 290,
            total_amount: 6090,
            created_date: "2025-09-07",
            payment_status: "paid"
        },
        {
            id: "t2",
            item_id: "i3",
            renter: "u4",
            owner: "u1",
            caretaker: null,
            start_date: "2025-09-05",
            end_date: "2025-09-06",
            status: "completed",
            item_fee: 2200,
            protection_fee: 0,
            caretaker_fee: 0,
            platform_commission: 110,
            total_amount: 2310,
            created_date: "2025-09-04",
            payment_status: "paid"
        },
        {
            id: "t3",
            item_id: "i7",
            renter: "u2",
            owner: "u4",
            caretaker: null,
            start_date: "2025-09-06",
            end_date: "2025-09-06",
            status: "completed",
            item_fee: 1600,
            protection_fee: 0,
            caretaker_fee: 0,
            platform_commission: 80,
            total_amount: 1680,
            created_date: "2025-09-05",
            payment_status: "paid"
        }
    ],
    
    messages: [
        {
            id: "m1",
            transaction_id: "t1",
            sender: "u2",
            receiver: "u1",
            message: "Hi Ram Singh ji, is the tractor available for tomorrow?",
            timestamp: "2025-09-07T10:30:00Z",
            type: "text"
        },
        {
            id: "m2", 
            transaction_id: "t1",
            sender: "u1",
            receiver: "u2",
            message: "Yes Suman ji, it's available. The tractor is in excellent condition.",
            timestamp: "2024-12-09T10:45:00Z",
            type: "text"
        },
        {
            id: "m3",
            transaction_id: "t1",
            sender: "c1",
            receiver: "u2",
            message: "Hello, I am Mohan, assigned as caretaker for this transaction. I will inspect the tractor before and after use.",
            timestamp: "2024-12-09T15:20:00Z",
            type: "system"
        }
    ],
    
    disputes: [],
    
    platform: {
        revenue: 290,
        commissions: 290,
        total_transactions: 1,
        active_items: 7,
        pending_disputes: 0
    }
};

// Initialize localStorage with seed data if not exists
function initializeSeedData() {
    const keys = ['users', 'items', 'transactions', 'messages', 'disputes', 'platform'];
    
    keys.forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(SEED_DATA[key]));
        }
    });
    
    // Don't set default logged in user anymore - let users register/login properly
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', 'null');
    }
    
    if (!localStorage.getItem('currentRole')) {
        localStorage.setItem('currentRole', '');
    }
}

// Call initialization when script loads
if (typeof window !== 'undefined') {
    initializeSeedData();
}

// Data access functions with simulated API latency
class MockAPI {
    static delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    static async getUsers() {
        await this.delay();
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
    
    static async getItems(filters = {}) {
        await this.delay();
        let items = JSON.parse(localStorage.getItem('items') || '[]');
        
        // Apply filters
        if (filters.category) {
            items = items.filter(item => item.category === filters.category);
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            items = items.filter(item => 
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
            );
        }
        
        if (filters.availability) {
            items = items.filter(item => item.availability === filters.availability);
        }
        
        // Apply sorting
        if (filters.sort) {
            switch (filters.sort) {
                case 'price-low':
                    items.sort((a, b) => (a.price_day || a.price_qty || a.price || 0) - (b.price_day || b.price_qty || b.price || 0));
                    break;
                case 'price-high':
                    items.sort((a, b) => (b.price_day || b.price_qty || b.price || 0) - (a.price_day || a.price_qty || a.price || 0));
                    break;
                case 'distance':
                    items.sort((a, b) => a.distance - b.distance);
                    break;
                case 'newest':
                default:
                    items.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            }
        }
        
        return items;
    }
    
    static async getItem(id) {
        await this.delay();
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        return items.find(item => item.id === id);
    }
    
    static async createItem(itemData) {
        await this.delay();
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        const newItem = {
            id: 'i' + (Date.now()),
            ...itemData,
            created_date: new Date().toISOString().split('T')[0],
            availability: 'available'
        };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        return newItem;
    }
    
    static async getTransactions(userId = null, role = null) {
        await this.delay();
        let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        
        if (userId) {
            if (role === 'renter') {
                transactions = transactions.filter(t => t.renter === userId);
            } else if (role === 'owner') {
                transactions = transactions.filter(t => t.owner === userId);
            } else if (role === 'caretaker') {
                transactions = transactions.filter(t => t.caretaker === userId);
            }
        }
        
        return transactions;
    }
    
    static async createTransaction(transactionData) {
        await this.delay();
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const newTransaction = {
            id: 't' + Date.now(),
            ...transactionData,
            created_date: new Date().toISOString().split('T')[0]
        };
        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Update platform revenue
        const platform = JSON.parse(localStorage.getItem('platform') || '{}');
        platform.revenue += transactionData.platform_commission;
        platform.commissions += transactionData.platform_commission;
        platform.total_transactions += 1;
        localStorage.setItem('platform', JSON.stringify(platform));
        
        return newTransaction;
    }
    
    static async getMessages(transactionId = null) {
        await this.delay();
        let messages = JSON.parse(localStorage.getItem('messages') || '[]');
        
        if (transactionId) {
            messages = messages.filter(m => m.transaction_id === transactionId);
        }
        
        return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
    
    static async sendMessage(messageData) {
        await this.delay();
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const newMessage = {
            id: 'm' + Date.now(),
            ...messageData,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        return newMessage;
    }
    
    static async getDirectMessages(senderId, receiverId, itemId) {
        await this.delay();
        let messages = JSON.parse(localStorage.getItem('messages') || '[]');
        
        // Filter messages for the specific conversation
        messages = messages.filter(m => 
            (m.sender === senderId && m.receiver === receiverId) || 
            (m.sender === receiverId && m.receiver === senderId)
        );
        
        return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
    
    static async getPlatformStats() {
        await this.delay();
        const platform = JSON.parse(localStorage.getItem('platform') || '{}');
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
        
        return {
            ...platform,
            active_items: items.filter(item => item.availability === 'available').length,
            pending_disputes: disputes.filter(dispute => dispute.status === 'pending').length
        };
    }
    
    static async resetData() {
        const keys = ['users', 'items', 'transactions', 'messages', 'disputes', 'platform'];
        keys.forEach(key => {
            localStorage.setItem(key, JSON.stringify(SEED_DATA[key]));
        });
        return true;
    }
}

// Initialize seed data when script loads
initializeSeedData();