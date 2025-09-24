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
            role: "helper", 
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
            role: "helper",
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
        },
        {
            id: "i9",
            title: "Rotavator - 7.5 HP",
            category: "Tools",
            owner: "u2",
            price_day: 800,
            price_type: "per-day",
            protection_required: true,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Rampur",
            description: "7.5 HP rotavator for soil preparation. Perfect for small to medium fields. Well maintained and regularly serviced.",
            quantity: 1,
            availability: "available",
            tags: ["rotavator", "soil-preparation", "7.5hp"],
            created_date: "2024-12-08",
            distance: 8
        },
        {
            id: "i10",
            title: "Premium Basmati Rice",
            category: "Produce",
            owner: "u1",
            price_qty: 60,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Barola",
            description: "Premium quality Basmati rice from this year's harvest. Aromatic long grain rice, well dried and cleaned.",
            quantity: 500,
            availability: "available",
            tags: ["basmati", "premium", "new-harvest"],
            created_date: "2024-12-09",
            distance: 12
        },
        {
            id: "i11",
            title: "Corn Stalks & Leaves (Animal Feed)",
            category: "Waste",
            owner: "u4",
            price_qty: 5,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Dadri",
            description: "Fresh corn stalks and leaves available for animal feed. Good quality fodder from healthy corn plants.",
            quantity: 1000,
            availability: "available",
            tags: ["corn-stalks", "animal-feed", "fresh"],
            created_date: "2024-12-10",
            distance: 25
        },
        {
            id: "i12",
            title: "Water Pump Set - 5HP",
            category: "Tools",
            owner: "u2",
            price_day: 600,
            price_type: "per-day",
            protection_required: true,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Tigri",
            description: "5HP electric water pump with 200ft delivery pipe. Ideal for irrigation and water transfer. Recently serviced.",
            quantity: 1,
            availability: "available",
            tags: ["water-pump", "irrigation", "5hp"],
            created_date: "2024-12-11",
            distance: 18
        },
        {
            id: "i13",
            title: "DAP Fertilizer (50kg bag)",
            category: "Inputs",
            owner: "u3",
            price_qty: 1200,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Jharoda",
            description: "High quality DAP fertilizer for better crop yield. 50kg bag available. Helps in root development and flowering.",
            quantity: 20,
            availability: "available",
            tags: ["DAP", "fertilizer", "50kg"],
            created_date: "2024-12-12",
            distance: 22
        },
        {
            id: "i14",
            title: "Professional Harvesting Team",
            category: "Manpower",
            owner: "u1",
            price_day: 1500,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Professional",
            location: "Bamnauli",
            description: "Professional harvesting team with 4 workers. Available for wheat, rice, and other crop harvesting. Own tools provided.",
            quantity: 4,
            availability: "available",
            tags: ["harvesting-team", "professional", "4-workers"],
            created_date: "2024-12-13",
            distance: 30
        },
        {
            id: "i15",
            title: "Fresh Cauliflower",
            category: "Produce",
            owner: "u4",
            price_qty: 25,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Sultanpur",
            description: "Fresh cauliflower directly from field. Large size heads, crisp and white. Perfect for wholesale or retail.",
            quantity: 200,
            availability: "available",
            tags: ["cauliflower", "fresh", "large-size"],
            created_date: "2024-12-14",
            distance: 35
        },
        {
            id: "i16",
            title: "Wheat Seeds (HD-2967)",
            category: "Inputs",
            owner: "u1",
            price_qty: 35,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Certified",
            location: "Barola",
            description: "High yielding wheat variety HD-2967. Certified seeds with 95% germination rate. Suitable for timely sowing.",
            quantity: 100,
            availability: "available",
            tags: ["wheat-seeds", "HD-2967", "certified"],
            created_date: "2024-12-15",
            distance: 12
        },
        {
            id: "i17",
            title: "Seed Drill Machine (9-row)",
            category: "Tools",
            owner: "u3",
            price_day: 1000,
            price_type: "per-day",
            protection_required: true,
            high_value: true,
            images: [],
            condition: "Excellent",
            location: "Rampur",
            description: "9-row seed drill for precise seed planting. Adjustable row spacing and seed depth. Perfect for wheat and other cereals.",
            quantity: 1,
            availability: "available",
            tags: ["seed-drill", "9-row", "wheat"],
            created_date: "2024-12-16",
            distance: 8
        },
        {
            id: "i18",
            title: "Fresh Tomatoes",
            category: "Produce",
            owner: "u4",
            price_qty: 30,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Ripe",
            location: "Dadri",
            description: "Fresh ripe tomatoes ready for harvest. Red, firm, and suitable for market sale. Available in large quantities.",
            quantity: 300,
            availability: "available",
            tags: ["tomatoes", "ripe", "market-ready"],
            created_date: "2024-12-17",
            distance: 25
        },
        {
            id: "i19",
            title: "Mini Tiller Machine",
            category: "Tools",
            owner: "u2",
            price_day: 700,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Bilaspur, Punjab",
            description: "Compact tiller for small farms and gardens. Easy to operate.",
            quantity: 2,
            availability: "available",
            tags: ["tiller", "compact", "easy-use"],
            created_date: "2024-12-18",
            distance: 0
        },
        {
            id: "i20",
            title: "Hybrid Maize Seeds (10kg)",
            category: "Inputs",
            owner: "u3",
            price_qty: 1200,
            price_type: "fixed",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Raikot, Punjab",
            description: "High-yield hybrid maize seeds for Kharif season.",
            quantity: 15,
            availability: "available",
            tags: ["hybrid", "maize", "high-yield"],
            created_date: "2024-12-19",
            distance: 15
        },
        {
            id: "i21",
            title: "Fresh Spinach (50kg)",
            category: "Produce",
            owner: "u4",
            price_qty: 18,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Khanna, Punjab",
            description: "Green, fresh spinach harvested today. No pesticides.",
            quantity: 50,
            availability: "available",
            tags: ["spinach", "fresh", "organic"],
            created_date: "2024-12-20",
            distance: 25
        },
        {
            id: "i22",
            title: "Sugarcane Trash (Bulk)",
            category: "Waste",
            owner: "u1",
            price_qty: 2,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Dry",
            location: "Bilaspur, Punjab",
            description: "Dry sugarcane trash for mulching or fuel.",
            quantity: 1000,
            availability: "available",
            tags: ["sugarcane", "mulch", "bulk"],
            created_date: "2024-12-21",
            distance: 0
        },
        {
            id: "i23",
            title: "Experienced Tractor Driver",
            category: "Manpower",
            owner: "u3",
            price_day: 900,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Available",
            location: "Raikot, Punjab",
            description: "Tractor driver with 10+ years experience. Available for hire.",
            quantity: 1,
            availability: "available",
            tags: ["driver", "tractor", "experienced"],
            created_date: "2024-12-22",
            distance: 15
        },
        {
            id: "i24",
            title: "Pesticide Sprayer (Manual)",
            category: "Tools",
            owner: "u2",
            price_day: 150,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Bilaspur, Punjab",
            description: "Manual sprayer for pesticides and fertilizers.",
            quantity: 3,
            availability: "available",
            tags: ["sprayer", "manual", "pesticide"],
            created_date: "2024-12-23",
            distance: 0
        },
        {
            id: "i25",
            title: "Organic Mustard Oil (20L)",
            category: "Produce",
            owner: "u1",
            price_qty: 3200,
            price_type: "fixed",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Cold-pressed organic mustard oil. Pure and healthy.",
            quantity: 10,
            availability: "available",
            tags: ["mustard-oil", "organic", "cold-pressed"],
            created_date: "2024-12-24",
            distance: 0
        },
        {
            id: "i26",
            title: "Cow Dung Cakes (Fuel)",
            category: "Waste",
            owner: "u4",
            price_qty: 3,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Dry",
            location: "Khanna, Punjab",
            description: "Traditional cow dung cakes for fuel or manure.",
            quantity: 500,
            availability: "available",
            tags: ["cow-dung", "fuel", "manure"],
            created_date: "2024-12-25",
            distance: 25
        },
        {
            id: "i27",
            title: "Farm Supervisor (Seasonal)",
            category: "Manpower",
            owner: "u3",
            price_day: 2000,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Available",
            location: "Raikot, Punjab",
            description: "Experienced supervisor for seasonal farm management.",
            quantity: 1,
            availability: "available",
            tags: ["supervisor", "seasonal", "management"],
            created_date: "2024-12-26",
            distance: 15
        },
        {
            id: "i28",
            title: "Hybrid Tomato Seeds (100g)",
            category: "Inputs",
            owner: "u2",
            price_qty: 250,
            price_type: "fixed",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Bilaspur, Punjab",
            description: "High-yield hybrid tomato seeds for kitchen gardens.",
            quantity: 20,
            availability: "available",
            tags: ["tomato", "hybrid", "seeds"],
            created_date: "2024-12-27",
            distance: 0
        },
        {
            id: "i29",
            title: "Fresh Carrots (100kg)",
            category: "Produce",
            owner: "u1",
            price_qty: 20,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Crunchy, sweet carrots. No chemicals used.",
            quantity: 100,
            availability: "available",
            tags: ["carrots", "fresh", "organic"],
            created_date: "2024-12-28",
            distance: 0
        },
        {
            id: "i30",
            title: "Plastic Drums (200L)",
            category: "Waste",
            owner: "u2",
            price_qty: 400,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Used",
            location: "Bilaspur, Punjab",
            description: "Used plastic drums, suitable for water storage or compost.",
            quantity: 8,
            availability: "available",
            tags: ["drums", "plastic", "storage"],
            created_date: "2024-12-29",
            distance: 0
        },
        {
            id: "i31",
            title: "Diesel Water Pump (3HP)",
            category: "Tools",
            owner: "u3",
            price_day: 500,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Raikot, Punjab",
            description: "Diesel pump for irrigation. 3HP, recently serviced.",
            quantity: 1,
            availability: "available",
            tags: ["pump", "diesel", "irrigation"],
            created_date: "2024-12-30",
            distance: 15
        },
        {
            id: "i32",
            title: "Fresh Green Peas (30kg)",
            category: "Produce",
            owner: "u4",
            price_qty: 35,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Khanna, Punjab",
            description: "Sweet, tender green peas. Direct from farm.",
            quantity: 30,
            availability: "available",
            tags: ["peas", "fresh", "tender"],
            created_date: "2024-12-31",
            distance: 25
        },
        {
            id: "i33",
            title: "Electric Chaff Cutter",
            category: "Tools",
            owner: "u1",
            price_day: 350,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Very Good",
            location: "Bilaspur, Punjab",
            description: "Electric chaff cutter for animal feed preparation.",
            quantity: 1,
            availability: "available",
            tags: ["chaff-cutter", "electric", "animal-feed"],
            created_date: "2025-01-01",
            distance: 0
        },
        {
            id: "i34",
            title: "Neem Cake Fertilizer (25kg)",
            category: "Inputs",
            owner: "u3",
            price_qty: 600,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Raikot, Punjab",
            description: "Organic neem cake fertilizer for pest control and soil health.",
            quantity: 10,
            availability: "available",
            tags: ["neem-cake", "fertilizer", "organic"],
            created_date: "2025-01-02",
            distance: 15
        },
        {
            id: "i35",
            title: "Fresh Onions (200kg)",
            category: "Produce",
            owner: "u2",
            price_qty: 15,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Red onions, freshly harvested and sorted.",
            quantity: 200,
            availability: "available",
            tags: ["onions", "fresh", "sorted"],
            created_date: "2025-01-03",
            distance: 0
        },
        {
            id: "i36",
            title: "Rice Husk Ash (Bulk)",
            category: "Waste",
            owner: "u4",
            price_qty: 1,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Dry",
            location: "Khanna, Punjab",
            description: "Rice husk ash for soil amendment or construction.",
            quantity: 500,
            availability: "available",
            tags: ["rice-husk", "ash", "soil"],
            created_date: "2025-01-04",
            distance: 25
        },
        {
            id: "i37",
            title: "Farm Helper (Daily Wage)",
            category: "Manpower",
            owner: "u1",
            price_day: 600,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Available",
            location: "Bilaspur, Punjab",
            description: "Farm helper available for daily wage work.",
            quantity: 1,
            availability: "available",
            tags: ["helper", "daily-wage", "farm"],
            created_date: "2025-01-05",
            distance: 0
        },
        {
            id: "i38",
            title: "Hybrid Okra Seeds (500g)",
            category: "Inputs",
            owner: "u3",
            price_qty: 180,
            price_type: "fixed",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Raikot, Punjab",
            description: "High-yielding okra seeds for summer sowing.",
            quantity: 10,
            availability: "available",
            tags: ["okra", "hybrid", "seeds"],
            created_date: "2025-01-06",
            distance: 15
        },
        {
            id: "i39",
            title: "Fresh Cabbage (80kg)",
            category: "Produce",
            owner: "u4",
            price_qty: 22,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Khanna, Punjab",
            description: "Green cabbage, crisp and fresh. Bulk available.",
            quantity: 80,
            availability: "available",
            tags: ["cabbage", "fresh", "bulk"],
            created_date: "2025-01-07",
            distance: 25
        },
        {
            id: "i40",
            title: "Manual Seed Planter",
            category: "Tools",
            owner: "u2",
            price_day: 120,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Bilaspur, Punjab",
            description: "Manual seed planter for small plots and gardens.",
            quantity: 2,
            availability: "available",
            tags: ["seed-planter", "manual", "garden"],
            created_date: "2025-01-08",
            distance: 0
        },
        {
            id: "i41",
            title: "Vermicompost (50kg)",
            category: "Inputs",
            owner: "u1",
            price_qty: 900,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Bilaspur, Punjab",
            description: "Organic vermicompost for soil enrichment.",
            quantity: 15,
            availability: "available",
            tags: ["vermicompost", "organic", "soil"],
            created_date: "2025-01-09",
            distance: 0
        },
        {
            id: "i42",
            title: "Fresh Brinjal (60kg)",
            category: "Produce",
            owner: "u3",
            price_qty: 28,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Raikot, Punjab",
            description: "Purple brinjal, fresh and tender.",
            quantity: 60,
            availability: "available",
            tags: ["brinjal", "fresh", "tender"],
            created_date: "2025-01-10",
            distance: 15
        },
        {
            id: "i43",
            title: "Farm Mulching Sheet (100m)",
            category: "Tools",
            owner: "u4",
            price_day: 100,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Good",
            location: "Khanna, Punjab",
            description: "Plastic mulching sheet for weed control.",
            quantity: 5,
            availability: "available",
            tags: ["mulching", "sheet", "weed-control"],
            created_date: "2025-01-11",
            distance: 25
        },
        {
            id: "i44",
            title: "Fresh Mangoes (Alphonso, 100kg)",
            category: "Produce",
            owner: "u2",
            price_qty: 60,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Alphonso mangoes, sweet and juicy. Limited stock.",
            quantity: 100,
            availability: "available",
            tags: ["mango", "alphonso", "fresh"],
            created_date: "2025-01-12",
            distance: 0
        },
        {
            id: "i45",
            title: "Paddy Straw (Bulk)",
            category: "Waste",
            owner: "u1",
            price_qty: 2,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Dry",
            location: "Bilaspur, Punjab",
            description: "Paddy straw for composting or animal bedding.",
            quantity: 1500,
            availability: "available",
            tags: ["paddy-straw", "compost", "bedding"],
            created_date: "2025-01-13",
            distance: 0
        },
        {
            id: "i46",
            title: "Farm Labour (Female, 3 workers)",
            category: "Manpower",
            owner: "u4",
            price_day: 700,
            price_type: "per-day",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Available",
            location: "Khanna, Punjab",
            description: "Female farm workers for sowing, weeding, and harvesting.",
            quantity: 3,
            availability: "available",
            tags: ["female", "labour", "farm"],
            created_date: "2025-01-14",
            distance: 25
        },
        {
            id: "i47",
            title: "Fresh Lady Finger (Okra, 40kg)",
            category: "Produce",
            owner: "u3",
            price_qty: 32,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Raikot, Punjab",
            description: "Tender lady finger, hand-picked and sorted.",
            quantity: 40,
            availability: "available",
            tags: ["okra", "lady-finger", "fresh"],
            created_date: "2025-01-15",
            distance: 15
        },
        {
            id: "i48",
            title: "Biofertilizer (Liquid, 5L)",
            category: "Inputs",
            owner: "u2",
            price_qty: 350,
            price_type: "per-unit",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "New",
            location: "Bilaspur, Punjab",
            description: "Liquid biofertilizer for foliar spray and soil application.",
            quantity: 10,
            availability: "available",
            tags: ["biofertilizer", "liquid", "organic"],
            created_date: "2025-01-16",
            distance: 0
        },
        {
            id: "i49",
            title: "Fresh Guavas (50kg)",
            category: "Produce",
            owner: "u1",
            price_qty: 38,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Fresh",
            location: "Bilaspur, Punjab",
            description: "Sweet guavas, freshly plucked from orchard.",
            quantity: 50,
            availability: "available",
            tags: ["guava", "fresh", "orchard"],
            created_date: "2025-01-17",
            distance: 0
        },
        {
            id: "i50",
            title: "Farm Compost (Bulk)",
            category: "Waste",
            owner: "u3",
            price_qty: 4,
            price_type: "per-kg",
            protection_required: false,
            high_value: false,
            images: [],
            condition: "Ready",
            location: "Raikot, Punjab",
            description: "Organic compost ready for use in fields and gardens.",
            quantity: 1000,
            availability: "available",
            tags: ["compost", "organic", "bulk"],
            created_date: "2025-01-18",
            distance: 15
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
            message: "Hello, I am Mohan, assigned as helper for this transaction. I will inspect the tractor before and after use with proper care.",
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
        
        // Apply price range filter
        if (filters.priceRange) {
            items = items.filter(item => {
                const price = item.price_day || item.price_qty || item.price || 0;
                if (filters.priceRange === '0-500') return price < 500;
                if (filters.priceRange === '500-1000') return price >= 500 && price <= 1000;
                if (filters.priceRange === '1000-2000') return price >= 1000 && price <= 2000;
                if (filters.priceRange === '2000-5000') return price >= 2000 && price <= 5000;
                if (filters.priceRange === '5000+') return price > 5000;
                return true;
            });
        }
        
        // Apply location filter
        if (filters.location) {
            items = items.filter(item => 
                item.location.includes(filters.location)
            );
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
            } else if (role === 'helper') {
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