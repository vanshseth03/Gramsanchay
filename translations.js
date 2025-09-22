// Translation system for ग्रामसंचय platform
const TRANSLATIONS = {
    en: {
        // Navigation
        home: "Home",
        marketplace: "Marketplace",
        orders: "My Orders",
        chat: "Messages",
        profile: "Profile",
        login: "Login",
        logout: "Logout",
        register: "Register",
        list_item: "List Item",
        
        // Home page
        rural_exchange: "Rural Exchange",
        trusted_village_exchange: "Trusted Village Exchange Platform",
        exchange_description: "Exchange tools, manpower, inputs, produce, and farm waste with protection and helper services",
        browse_marketplace: "Browse Marketplace",
        
        // Categories
        tools_equipment: "Tools & Equipment",
        seeds_inputs: "Seeds & Inputs",
        fresh_produce: "Fresh Produce",
        waste_value: "Waste-to-Value",
        skilled_labor: "Skilled Labor",
        protected_transactions: "Protected Transactions",
        
        // Category descriptions
        tools_equipment_desc: "Rent tractors, harvesters, and farming equipment from verified neighbors",
        seeds_inputs_desc: "Find quality seeds, fertilizers, and pesticides at fair prices",
        fresh_produce_desc: "Buy and sell farm-fresh vegetables and grains directly",
        waste_value_desc: "Convert stubble and waste into valuable resources",
        skilled_labor_desc: "Find experienced workers for seasonal farming needs",
        protected_transactions_desc: "Built-in protection and helper services for high-value items",
        
        // Page titles and forms
        list_your_item: "List Your Item",
        list_new_item: "List New Item",
        select_category: "Select Category",
        farm_waste: "Farm Waste",
        
        // Forms
        title: "Title",
        category: "Category",
        description: "Description",
        quantity: "Quantity",
        price_type: "Price Type",
        price: "Price",
        location: "Location",
        tags: "Tags",
        submit: "Submit",
        
        // Booking
        book_item: "Book Item",
        buy_now: "Buy Now",
        start_date: "Start Date",
        duration: "Duration",
        total: "Total",
        
        // Messages
        select_start_date: "Please select a start date for the rental",
        min_advance_booking: "Start date must be at least 3 days from today",
        booking_confirmed: "Booking confirmed successfully! Payment processed.",
        
        // Common
        available: "Available",
        unavailable: "Unavailable",
        yes: "Yes",
        no: "No",
        continue: "Continue",
        cancel: "Cancel",
        calculate_total: "Calculate Total",
        base_price: "Base Price",
        helper_fee: "Helper Fee",
        platform_fee: "Platform Fee",
        protection_fee: "Protection Fee",
        
        // Marketplace and Items
        condition: "Condition",
        location_label: "Location", 
        owner: "Owner",
        quantity_available: "Quantity Available",
        description_label: "Description",
        tags_label: "Tags",
        available_status: "Available",
        unavailable_status: "Unavailable", 
        booked_status: "Booked",
        verified_user: "Verified",
        protected_badge: "Protected",
        
        // Orders
        no_orders: "No orders found",
        transaction_id: "Transaction ID",
        renter: "Renter",
        helper: "Helper",
        amount: "Amount",
        start_date_label: "Start Date",
        end_date_label: "End Date", 
        payment_status: "Payment Status",
        chat_button: "Chat",
        report_issue: "Report Issue",
        mark_complete: "Mark Complete",
        confirm_return: "Confirm Return",
        helper_actions: "Helper Actions",
        
        // Chat/Messages
        no_messages: "No messages yet",
        send_message: "Send Message",
        type_message: "Type your message...",
        
        // Profile
        total_transactions: "Total Transactions", 
        completed_orders: "Completed Orders",
        active_orders: "Active Orders",
        total_earnings: "Total Earnings",
        member_since: "Member Since",
        all_time: "All time",
        success_rate: "Success rate",
        recent_activity: "Recent Activity",
        edit_profile: "Edit Profile",
        transaction_history: "Transaction History",
        verified_user_badge: "✅ Verified User",
        not_verified_badge: "⚠️ Not Verified",
        owner_role: "🏠 Owner/Lister",
        renter_role: "🛒 Renter/Buyer", 
        helper_role: "🤝 Helper",
        
        // Booking Confirmation
        confirm_booking: "Confirm Booking",
        delivery_address: "Delivery Address",
        full_address: "Full Address",
        item_fee: "Item Fee",
        total_amount: "Total Amount",
        payment_method: "Payment Method",
        confirm_pay: "Confirm & Pay",
        
        // Edit Profile
        edit_profile_title: "Edit Profile",
        full_name: "Full Name",
        village: "Village",
        district: "District",
        primary_role: "Primary Role",
        renter_buyer: "Renter/Buyer",
        owner_lister: "Owner/Lister",
        renter_desc: "Rent or buy items from others in the community",
        owner_desc: "List your items for rent or sale to others",
        save_changes: "Save Changes",
        
        // Admin
        no_transactions: "No transactions found",
        no_disputes: "No disputes found",
        resolve: "Resolve",
        reject: "Reject",
        
        // Marketplace filters
        search_items: "Search items...",
        all_categories: "All Categories",
        newest_first: "Newest First",
        price_low_high: "Price: Low to High",
        price_high_low: "Price: High to Low",
        by_distance: "By Distance",
        
        // Villages list
        select_village: "Select Village",
        bilaspur: "Bilaspur",
        rampur: "Rampur", 
        barola: "Barola",
        dadri: "Dadri",
        tigri: "Tigri",
        jharoda: "Jharoda",
        bamnauli: "Bamnauli",
        sultanpur: "Sultanpur",
        
        // Price range filters
        all_prices: "All Prices",
        price_under_500: "Under ₹500",
        price_500_1000: "₹500 - ₹1000",
        price_1000_2000: "₹1000 - ₹2000", 
        price_2000_5000: "₹2000 - ₹5000",
        price_above_5000: "Above ₹5000",
        
        // Location filters
        all_locations: "All Locations",
        
        // Service explanations
        how_it_works: "How ग्रामसंचय Works",
        caretaker_model: "Caretaker Model",
        caretaker_explanation: "Our local caretakers are trusted community members who help bridge the technology gap. They assist sellers in uploading products, managing inventory, and help buyers place orders. Caretakers also provide on-ground support for quality control and dispute resolution, ensuring smooth transactions even in areas with low digital literacy.",
        caretaker_feature_1: "Help with product listing and inventory management",
        caretaker_feature_2: "Assist buyers with order placement and tracking", 
        caretaker_feature_3: "Local quality control and verification",
        caretaker_feature_4: "Dispute resolution and customer support",
        delivery_model: "Secured Delivery System",
        delivery_explanation: "Our delivery system ensures safe and efficient transportation of goods between villages. For local orders, caretakers coordinate hand-delivery or local logistics. For distant orders, we partner with reliable courier services using a hub-and-spoke model that prioritizes nearby items first and provides real-time tracking.",
        delivery_feature_1: "Distance-based sorting (nearby items shown first)",
        delivery_feature_2: "Local caretaker coordination for nearby deliveries",
        delivery_feature_3: "Professional courier partnerships for distant orders",
        delivery_feature_4: "Real-time tracking and SMS/app notifications",
        protection_guarantee: "100% Protection Guarantee",
        protection_guarantee_desc: "All high-value transactions include helper services and secure payment holding",
        local_support: "24/7 Local Support",
        local_support_desc: "Caretakers available in your village for immediate assistance",
        verified_users: "Verified Community",
        verified_users_desc: "All users verified through local community networks"
    },
    
    hi: {
        // Navigation
        home: "होम",
        marketplace: "बाज़ार",
        orders: "मेरे ऑर्डर",
        chat: "संदेश",
        profile: "प्रोफ़ाइल",
        login: "लॉगिन",
        logout: "लॉगआउट",
        register: "रजिस्टर",
        list_item: "वस्तु सूचीबद्ध करें",
        
        // Home page
        rural_exchange: "ग्रामीण एक्सचेंज",
        trusted_village_exchange: "विश्वसनीय गांव एक्सचेंज प्लेटफॉर्म",
        exchange_description: "सुरक्षा और सहायक सेवाओं के साथ उपकरण, मजदूर, इनपुट, उत्पादन और कृषि अपशिष्ट का आदान-प्रदान करें",
        browse_marketplace: "बाज़ार देखें",
        
        // Categories
        tools_equipment: "उपकरण और मशीनरी",
        seeds_inputs: "बीज और इनपुट",
        fresh_produce: "ताज़ी उत्पादन",
        waste_value: "अपशिष्ट से मूल्य",
        skilled_labor: "कुशल मजदूर",
        protected_transactions: "सुरक्षित लेनदेन",
        
        // Category descriptions
        tools_equipment_desc: "सत्यापित पड़ोसियों से ट्रैक्टर, हार्वेस्टर और कृषि उपकरण किराए पर लें",
        seeds_inputs_desc: "उचित कीमत पर गुणवत्तापूर्ण बीज, उर्वरक और कीटनाशक पाएं",
        fresh_produce_desc: "सीधे खेत की ताज़ी सब्जियां और अनाज खरीदें और बेचें",
        waste_value_desc: "पराली और अपशिष्ट को मूल्यवान संसाधनों में बदलें",
        skilled_labor_desc: "मौसमी कृषि आवश्यकताओं के लिए अनुभवी मजदूर पाएं",
        protected_transactions_desc: "उच्च मूल्य की वस्तुओं के लिए अंतर्निहित सुरक्षा और सहायक सेवाएं",
        
        // Page titles and forms
        list_your_item: "अपनी वस्तु सूचीबद्ध करें",
        list_new_item: "नई वस्तु सूचीबद्ध करें",
        select_category: "श्रेणी चुनें",
        farm_waste: "कृषि अपशिष्ट",
        
        // Forms
        title: "शीर्षक",
        category: "श्रेणी",
        description: "विवरण",
        quantity: "मात्रा",
        price_type: "मूल्य प्रकार",
        price: "मूल्य",
        location: "स्थान",
        tags: "टैग",
        submit: "जमा करें",
        
        // Booking
        book_item: "वस्तु बुक करें",
        buy_now: "अभी खरीदें",
        start_date: "शुरुआती तारीख",
        duration: "अवधि",
        total: "कुल",
        
        // Messages
        select_start_date: "कृपया किराए के लिए एक शुरुआती तारीख चुनें",
        min_advance_booking: "शुरुआती तारीख आज से कम से कम 3 दिन बाद होनी चाहिए",
        booking_confirmed: "बुकिंग सफलतापूर्वक पुष्ट! भुगतान संसाधित।",
        
        // Common
        available: "उपलब्ध",
        unavailable: "अनुपलब्ध",
        yes: "हाँ",
        no: "नहीं",
        continue: "जारी रखें",
        cancel: "रद्द करें",
        calculate_total: "कुल गणना करें",
        base_price: "मूल मूल्य",
        helper_fee: "सहायक शुल्क",
        platform_fee: "प्लेटफॉर्म शुल्क",
        protection_fee: "सुरक्षा शुल्क",
        
        // Marketplace and Items  
        condition: "स्थिति",
        location_label: "स्थान",
        owner: "मालिक", 
        quantity_available: "उपलब्ध मात्रा",
        description_label: "विवरण",
        tags_label: "टैग",
        available_status: "उपलब्ध",
        unavailable_status: "अनुपलब्ध",
        booked_status: "बुक किया गया",
        verified_user: "सत्यापित",
        protected_badge: "सुरक्षित",
        
        // Orders
        no_orders: "कोई ऑर्डर नहीं मिला",
        transaction_id: "लेनदेन आईडी",
        renter: "किराएदार",
        helper: "सहायक",
        amount: "राशि",
        start_date_label: "शुरुआती तारीख",
        end_date_label: "अंतिम तारीख",
        payment_status: "भुगतान स्थिति",
        chat_button: "चैट",
        report_issue: "समस्या की रिपोर्ट करें",
        mark_complete: "पूर्ण का निशान लगाएं",
        confirm_return: "वापसी की पुष्टि करें",
        helper_actions: "सहायक क्रियाएं",
        
        // Chat/Messages
        no_messages: "अभी तक कोई संदेश नहीं",
        send_message: "संदेश भेजें",
        type_message: "अपना संदेश टाइप करें...",
        
        // Profile
        total_transactions: "कुल लेनदेन",
        completed_orders: "पूर्ण ऑर्डर",
        active_orders: "सक्रिय ऑर्डर",
        total_earnings: "कुल कमाई",
        member_since: "सदस्य बने से",
        all_time: "सभी समय",
        success_rate: "सफलता दर",
        recent_activity: "हाल की गतिविधि",
        edit_profile: "प्रोफ़ाइल संपादित करें",
        transaction_history: "लेनदेन इतिहास",
        verified_user_badge: "✅ सत्यापित उपयोगकर्ता",
        not_verified_badge: "⚠️ सत्यापित नहीं",
        owner_role: "🏠 मालिक/सूची बनाने वाला",
        renter_role: "🛒 किराएदार/खरीदार",
        helper_role: "🤝 सहायक",
        
        // Booking Confirmation
        confirm_booking: "बुकिंग की पुष्टि करें",
        delivery_address: "डिलीवरी पता",
        full_address: "पूरा पता",
        item_fee: "वस्तु शुल्क",
        total_amount: "कुल राशि",
        payment_method: "भुगतान का तरीका",
        confirm_pay: "पुष्टि करें और भुगतान करें",
        
        // Edit Profile
        edit_profile_title: "प्रोफ़ाइल संपादित करें",
        full_name: "पूरा नाम",
        village: "गांव",
        district: "जिला",
        primary_role: "प्राथमिक भूमिका",
        renter_buyer: "किराएदार/खरीदार",
        owner_lister: "मालिक/सूची बनाने वाला",
        renter_desc: "समुदाय में दूसरों से वस्तुएं किराए पर लें या खरीदें",
        owner_desc: "अपनी वस्तुओं को दूसरों को किराए या बिक्री के लिए सूचीबद्ध करें",
        save_changes: "परिवर्तन सहेजें",
        
        // Admin
        no_transactions: "कोई लेनदेन नहीं मिला",
        no_disputes: "कोई विवाद नहीं मिला", 
        resolve: "हल करें",
        reject: "अस्वीकार करें",
        
        // Marketplace filters
        search_items: "वस्तुएं खोजें...",
        all_categories: "सभी श्रेणियां",
        newest_first: "नवीनतम पहले",
        price_low_high: "मूल्य: कम से अधिक",
        price_high_low: "मूल्य: अधिक से कम",
        by_distance: "दूरी के अनुसार",
        
        // Villages list
        select_village: "गांव चुनें",
        bilaspur: "बिलासपुर",
        rampur: "रामपुर",
        barola: "बड़ोला",
        dadri: "दादरी", 
        tigri: "टिगरी",
        jharoda: "झरोदा",
        bamnauli: "बमनौली",
        sultanpur: "सुल्तानपुर",
        
        // Price range filters
        all_prices: "सभी कीमतें",
        price_under_500: "₹500 से कम",
        price_500_1000: "₹500 - ₹1000",
        price_1000_2000: "₹1000 - ₹2000",
        price_2000_5000: "₹2000 - ₹5000", 
        price_above_5000: "₹5000 से अधिक",
        
        // Location filters
        all_locations: "सभी स्थान",
        
        // Service explanations
        how_it_works: "ग्रामसंचय कैसे काम करता है",
        caretaker_model: "देखभाल करने वाला मॉडल",
        caretaker_explanation: "हमारे स्थानीय देखभाल करने वाले विश्वसनीय समुदायिक सदस्य हैं जो तकनीकी अंतर को पाटने में मदद करते हैं। वे विक्रेताओं को उत्पाद अपलोड करने, इन्वेंट्री प्रबंधन में सहायता करते हैं, और खरीदारों को ऑर्डर देने में मदद करते हैं। देखभाल करने वाले गुणवत्ता नियंत्रण और विवाद समाधान के लिए जमीनी स्तर पर सहायता प्रदान करते हैं।",
        caretaker_feature_1: "उत्पाद सूची और इन्वेंट्री प्रबंधन में सहायता",
        caretaker_feature_2: "खरीदारों को ऑर्डर देने और ट्रैकिंग में सहायता",
        caretaker_feature_3: "स्थानीय गुणवत्ता नियंत्रण और सत्यापन", 
        caretaker_feature_4: "विवाद समाधान और ग्राहक सहायता",
        delivery_model: "सुरक्षित डिलीवरी सिस्टम",
        delivery_explanation: "हमारा डिलीवरी सिस्टम गांवों के बीच माल की सुरक्षित और कुशल परिवहन सुनिश्चित करता है। स्थानीय ऑर्डर के लिए, देखभाल करने वाले हस्तांतरण या स्थानीय रसद का समन्वय करते हैं। दूर के ऑर्डर के लिए, हम विश्वसनीय कूरियर सेवाओं के साथ साझेदारी करते हैं।",
        delivery_feature_1: "दूरी-आधारित क्रमबद्धता (पास की वस्तुएं पहले दिखाई जाती हैं)",
        delivery_feature_2: "पास की डिलीवरी के लिए स्थानीय देखभाल करने वाले का समन्वय",
        delivery_feature_3: "दूर के ऑर्डर के लिए पेशेवर कूरियर साझेदारी",
        delivery_feature_4: "रियल-टाइम ट्रैकिंग और SMS/ऐप सूचनाएं",
        protection_guarantee: "100% सुरक्षा गारंटी",
        protection_guarantee_desc: "सभी उच्च-मूल्य लेनदेन में सहायक सेवाएं और सुरक्षित भुगतान होल्डिंग शामिल है",
        local_support: "24/7 स्थानीय सहायता",
        local_support_desc: "तत्काल सहायता के लिए आपके गांव में देखभाल करने वाले उपलब्ध",
        verified_users: "सत्यापित समुदाय", 
        verified_users_desc: "सभी उपयोगकर्ता स्थानीय समुदायिक नेटवर्क के माध्यम से सत्यापित"
    },
    
    pa: {
        // Navigation
        home: "ਘਰ",
        marketplace: "ਬਾਜ਼ਾਰ",
        orders: "ਮੇਰੇ ਆਰਡਰ",
        chat: "ਸੁਨੇਹੇ",
        profile: "ਪ੍ਰੋਫਾਈਲ",
        login: "ਲਾਗਇਨ",
        logout: "ਲਾਗਆਉਟ",
        register: "ਰਜਿਸਟਰ",
        list_item: "ਸਮਾਨ ਸੂਚੀਬੱਧ ਕਰੋ",
        
        // Home page
        rural_exchange: "ਪੇਂਡੂ ਐਕਸਚੇਂਜ",
        trusted_village_exchange: "ਭਰੋਸੇਮੰਦ ਪਿੰਡ ਐਕਸਚੇਂਜ ਪਲੇਟਫਾਰਮ",
        exchange_description: "ਸੁਰੱਖਿਆ ਅਤੇ ਸਹਾਇਕ ਸੇਵਾਵਾਂ ਨਾਲ ਔਜ਼ਾਰ, ਮਜ਼ਦੂਰ, ਇਨਪੁਟ, ਉਤਪਾਦ ਅਤੇ ਖੇਤੀ ਕੂੜੇ ਦਾ ਵਟਾਂਦਰਾ ਕਰੋ",
        browse_marketplace: "ਬਾਜ਼ਾਰ ਵੇਖੋ",
        
        // Categories
        tools_equipment: "ਔਜ਼ਾਰ ਅਤੇ ਮਸ਼ੀਨਰੀ",
        seeds_inputs: "ਬੀਜ ਅਤੇ ਇਨਪੁਟ",
        fresh_produce: "ਤਾਜ਼ਾ ਉਤਪਾਦ",
        waste_value: "ਕੂੜੇ ਤੋਂ ਮੁੱਲ",
        skilled_labor: "ਹੁਨਰਮੰਦ ਮਜ਼ਦੂਰ",
        protected_transactions: "ਸੁਰੱਖਿਤ ਲੈਣ-ਦੇਣ",
        
        // Category descriptions
        tools_equipment_desc: "ਪ੍ਰਮਾਣਿਤ ਗੁਆਂਢੀਆਂ ਤੋਂ ਟਰੈਕਟਰ, ਕਟਾਈ ਮਸ਼ੀਨ ਅਤੇ ਖੇਤੀ ਦੇ ਔਜ਼ਾਰ ਕਿਰਾਏ 'ਤੇ ਲਓ",
        seeds_inputs_desc: "ਉਚਿਤ ਕੀਮਤ 'ਤੇ ਗੁਣਵੱਤਾ ਵਾਲੇ ਬੀਜ, ਖਾਦ ਅਤੇ ਕੀੜੇ-ਮਾਰ ਦਵਾਈਆਂ ਲੱਭੋ",
        fresh_produce_desc: "ਖੇਤ ਦੀਆਂ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਅਤੇ ਅਨਾਜ ਸਿੱਧੇ ਖਰੀਦੋ ਅਤੇ ਵੇਚੋ",
        waste_value_desc: "ਪਰਾਲੀ ਅਤੇ ਕੂੜੇ ਨੂੰ ਕੀਮਤੀ ਸਰੋਤਾਂ ਵਿੱਚ ਬਦਲੋ",
        skilled_labor_desc: "ਮੌਸਮੀ ਖੇਤੀ ਦੀਆਂ ਲੋੜਾਂ ਲਈ ਤਜਰਬੇਕਾਰ ਮਜ਼ਦੂਰ ਲੱਭੋ",
        protected_transactions_desc: "ਉੱਚ ਮੁੱਲ ਵਾਲੀਆਂ ਵਸਤਾਂ ਲਈ ਬਿਲਟ-ਇਨ ਸੁਰੱਖਿਆ ਅਤੇ ਸਹਾਇਕ ਸੇਵਾਵਾਂ",
        
        // Page titles and forms
        list_your_item: "ਆਪਣਾ ਸਮਾਨ ਸੂਚੀਬੱਧ ਕਰੋ",
        list_new_item: "ਨਵਾਂ ਸਮਾਨ ਸੂਚੀਬੱਧ ਕਰੋ",
        select_category: "ਸ਼੍ਰੇਣੀ ਚੁਣੋ",
        farm_waste: "ਖੇਤੀ ਕੂੜਾ",
        
        // Forms
        title: "ਸਿਰਲੇਖ",
        category: "ਸ਼੍ਰੇਣੀ",
        description: "ਵੇਰਵਾ",
        quantity: "ਮਾਤਰਾ",
        price_type: "ਕੀਮਤ ਦੀ ਕਿਸਮ",
        price: "ਕੀਮਤ",
        location: "ਸਥਾਨ",
        tags: "ਟੈਗ",
        submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
        
        // Booking
        book_item: "ਆਈਟਮ ਬੁੱਕ ਕਰੋ",
        buy_now: "ਹੁਣੇ ਖਰੀਦੋ",
        start_date: "ਸ਼ੁਰੂਆਤੀ ਮਿਤੀ",
        duration: "ਮਿਆਦ",
        total: "ਕੁੱਲ",
        
        // Messages
        select_start_date: "ਕਿਰਾਏ ਲਈ ਇੱਕ ਸ਼ੁਰੂਆਤੀ ਮਿਤੀ ਚੁਣੋ",
        min_advance_booking: "ਸ਼ੁਰੂਆਤੀ ਮਿਤੀ ਅੱਜ ਤੋਂ ਘੱਟੋ-ਘੱਟ 3 ਦਿਨ ਬਾਅਦ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ",
        booking_confirmed: "ਬੁਕਿੰਗ ਸਫਲਤਾਪੂਰਵਕ ਪੁਸ਼ਟੀ! ਭੁਗਤਾਨ ਪ੍ਰਸੰਸਕਰਣ।",
        
        // Common
        available: "ਉਪਲਬਧ",
        unavailable: "ਅਣਉਪਲਬਧ",
        yes: "ਹਾਂ",
        no: "ਨਹੀਂ",
        continue: "ਜਾਰੀ ਰੱਖੋ",
        cancel: "ਰੱਦ ਕਰੋ",
        calculate_total: "ਕੁੱਲ ਗਿਣਤੀ",
        base_price: "ਮੂਲ ਕੀਮਤ",
        helper_fee: "ਸਹਾਇਕ ਫੀਸ",
        platform_fee: "ਪਲੇਟਫਾਰਮ ਫੀਸ",
        protection_fee: "ਸੁਰੱਖਿਆ ਫੀਸ",
        
        // Marketplace and Items
        condition: "ਸਥਿਤੀ",
        location_label: "ਟਿਕਾਣਾ",
        owner: "ਮਾਲਕ",
        quantity_available: "ਉਪਲਬਧ ਮਾਤਰਾ", 
        description_label: "ਵੇਰਵਾ",
        tags_label: "ਟੈਗ",
        available_status: "ਉਪਲਬਧ",
        unavailable_status: "ਅਣਉਪਲਬਧ",
        booked_status: "ਬੁੱਕ ਕੀਤਾ ਗਿਆ",
        verified_user: "ਪ੍ਰਮਾਣਿਤ",
        protected_badge: "ਸੁਰੱਖਿਤ",
        
        // Orders
        no_orders: "ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ",
        transaction_id: "ਲੈਣ-ਦੇਣ ਆਈਡੀ",
        renter: "ਕਿਰਾਏਦਾਰ",
        helper: "ਸਹਾਇਕ",
        amount: "ਰਕਮ",
        start_date_label: "ਸ਼ੁਰੂਆਤੀ ਮਿਤੀ",
        end_date_label: "ਅੰਤਮ ਮਿਤੀ",
        payment_status: "ਭੁਗਤਾਨ ਸਥਿਤੀ",
        chat_button: "ਚੈਟ",
        report_issue: "ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
        mark_complete: "ਪੂਰਾ ਨਿਸ਼ਾਨ ਲਗਾਓ",
        confirm_return: "ਵਾਪਸੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        helper_actions: "ਸਹਾਇਕ ਕਿਰਿਆਵਾਂ",
        
        // Chat/Messages  
        no_messages: "ਅਜੇ ਤੱਕ ਕੋਈ ਸੰਦੇਸ਼ ਨਹੀਂ",
        send_message: "ਸੰਦੇਸ਼ ਭੇਜੋ",
        type_message: "ਆਪਣਾ ਸੰਦੇਸ਼ ਟਾਈਪ ਕਰੋ...",
        
        // Profile
        total_transactions: "ਕੁੱਲ ਲੈਣ-ਦੇਣ",
        completed_orders: "ਪੂਰੇ ਹੋਏ ਆਰਡਰ",
        active_orders: "ਸਰਗਰਮ ਆਰਡਰ",
        total_earnings: "ਕੁੱਲ ਕਮਾਈ",
        member_since: "ਮੈਂਬਰ ਬਣਿਆ",
        all_time: "ਸਾਰੇ ਸਮੇਂ",
        success_rate: "ਸਫਲਤਾ ਦਰ",
        recent_activity: "ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ",
        edit_profile: "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
        transaction_history: "ਲੈਣ-ਦੇਣ ਇਤਿਹਾਸ",
        verified_user_badge: "✅ ਪ੍ਰਮਾਣਿਤ ਉਪਭੋਗਤਾ",
        not_verified_badge: "⚠️ ਪ੍ਰਮਾਣਿਤ ਨਹੀਂ",
        owner_role: "🏠 ਮਾਲਕ/ਸੂਚੀਕਾਰ",
        renter_role: "🛒 ਕਿਰਾਏਦਾਰ/ਖਰੀਦਦਾਰ",
        helper_role: "🤝 ਸਹਾਇਕ",
        
        // Booking Confirmation
        confirm_booking: "ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        delivery_address: "ਡਿਲੀਵਰੀ ਪਤਾ",
        full_address: "ਪੂਰਾ ਪਤਾ",
        item_fee: "ਵਸਤੂ ਫੀਸ",
        total_amount: "ਕੁੱਲ ਰਕਮ",
        payment_method: "ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ",
        confirm_pay: "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਭੁਗਤਾਨ ਕਰੋ",
        
        // Edit Profile
        edit_profile_title: "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
        full_name: "ਪੂਰਾ ਨਾਮ",
        village: "ਪਿੰਡ",
        district: "ਜ਼ਿਲ੍ਹਾ",
        primary_role: "ਮੁੱਖ ਭੂਮਿਕਾ",
        renter_buyer: "ਕਿਰਾਏਦਾਰ/ਖਰੀਦਦਾਰ",
        owner_lister: "ਮਾਲਕ/ਸੂਚੀਕਾਰ",
        renter_desc: "ਭਾਈਚਾਰੇ ਵਿੱਚ ਦੂਜਿਆਂ ਤੋਂ ਵਸਤਾਂ ਕਿਰਾਏ 'ਤੇ ਲਓ ਜਾਂ ਖਰੀਦੋ",
        owner_desc: "ਆਪਣੀਆਂ ਵਸਤਾਂ ਨੂੰ ਦੂਜਿਆਂ ਨੂੰ ਕਿਰਾਏ ਜਾਂ ਵਿਕਰੀ ਲਈ ਸੂਚੀਬੱਧ ਕਰੋ",
        save_changes: "ਤਬਦੀਲੀਆਂ ਸੁਰੱਖਿਅਤ ਕਰੋ",
        
        // Admin
        no_transactions: "ਕੋਈ ਲੈਣ-ਦੇਣ ਨਹੀਂ ਮਿਲਿਆ",
        no_disputes: "ਕੋਈ ਵਿਵਾਦ ਨਹੀਂ ਮਿਲਿਆ",
        resolve: "ਹੱਲ ਕਰੋ",
        reject: "ਰੱਦ ਕਰੋ",
        
        // Marketplace filters
        search_items: "ਵਸਤਾਂ ਖੋਜੋ...",
        all_categories: "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ",
        newest_first: "ਸਭ ਤੋਂ ਨਵਾਂ ਪਹਿਲਾਂ",
        price_low_high: "ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ",
        price_high_low: "ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ",
        by_distance: "ਦੂਰੀ ਦੇ ਅਨੁਸਾਰ",
        
        // Villages list
        select_village: "ਪਿੰਡ ਚੁਣੋ",
        bilaspur: "ਬਿਲਾਸਪੁਰ",
        rampur: "ਰਾਮਪੁਰ",
        barola: "ਬੜੋਲਾ",
        dadri: "ਦਾਦਰੀ",
        tigri: "ਟਿਗਰੀ", 
        jharoda: "ਝਰੋਦਾ",
        bamnauli: "ਬਮਨੌਲੀ",
        sultanpur: "ਸੁਲਤਾਨਪੁਰ",
        
        // Price range filters
        all_prices: "ਸਾਰੇ ਭਾਅ",
        price_under_500: "₹500 ਤੋਂ ਘੱਟ",
        price_500_1000: "₹500 - ₹1000",
        price_1000_2000: "₹1000 - ₹2000",
        price_2000_5000: "₹2000 - ₹5000",
        price_above_5000: "₹5000 ਤੋਂ ਜ਼ਿਆਦਾ",
        
        // Location filters
        all_locations: "ਸਾਰੇ ਸਥਾਨ",
        
        // Service explanations
        how_it_works: "ਗ੍ਰਾਮਸੰਚਯ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
        caretaker_model: "ਦੇਖਭਾਲ ਕਰਤਾ ਮਾਡਲ",
        caretaker_explanation: "ਸਾਡੇ ਸਥਾਨਕ ਦੇਖਭਾਲ ਕਰਤਾ ਭਰੋਸੇਯੋਗ ਕਮਿਊਨਿਟੀ ਮੈਂਬਰ ਹਨ ਜੋ ਟੈਕਨਾਲੋਜੀ ਗੈਪ ਨੂੰ ਪਾਟਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ। ਉਹ ਵਿਕਰੇਤਾਵਾਂ ਨੂੰ ਉਤਪਾਦ ਅਪਲੋਡ ਕਰਨ, ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੇ ਹਨ, ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਆਰਡਰ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।",
        caretaker_feature_1: "ਉਤਪਾਦ ਸੂਚੀ ਅਤੇ ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਮਦਦ",
        caretaker_feature_2: "ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਆਰਡਰ ਦੇਣ ਅਤੇ ਟਰੈਕਿੰਗ ਵਿੱਚ ਸਹਾਇਤਾ",
        caretaker_feature_3: "ਸਥਾਨਕ ਗੁਣਵੱਤਾ ਨਿਯੰਤਰਣ ਅਤੇ ਤਸਦੀਕ",
        caretaker_feature_4: "ਵਿਵਾਦ ਹੱਲ ਅਤੇ ਗਾਹਕ ਸਹਾਇਤਾ",
        delivery_model: "ਸੁਰੱਖਿਤ ਡਿਲੀਵਰੀ ਸਿਸਟਮ",
        delivery_explanation: "ਸਾਡਾ ਡਿਲੀਵਰੀ ਸਿਸਟਮ ਪਿੰਡਾਂ ਵਿਚਕਾਰ ਮਾਲ ਦੀ ਸੁਰੱਖਿਤ ਅਤੇ ਕੁਸ਼ਲ ਆਵਾਜਾਈ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ। ਸਥਾਨਕ ਆਰਡਰਾਂ ਲਈ, ਦੇਖਭਾਲ ਕਰਤਾ ਹੱਥੀਂ-ਡਿਲੀਵਰੀ ਜਾਂ ਸਥਾਨਕ ਲਾਜਿਸਟਿਕਸ ਦਾ ਤਾਲਮੇਲ ਕਰਦੇ ਹਨ।",
        delivery_feature_1: "ਦੂਰੀ-ਆਧਾਰਿਤ ਕ੍ਰਮਬੱਧਤਾ (ਨੇੜਲੀਆਂ ਚੀਜ਼ਾਂ ਪਹਿਲਾਂ ਦਿਖਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ)",
        delivery_feature_2: "ਨੇੜਲੀ ਡਿਲੀਵਰੀ ਲਈ ਸਥਾਨਕ ਦੇਖਭਾਲ ਕਰਤਾ ਤਾਲਮੇਲ",
        delivery_feature_3: "ਦੂਰ ਦੇ ਆਰਡਰਾਂ ਲਈ ਪੇਸ਼ੇਵਰ ਕੂਰੀਅਰ ਸਾਂਝੇਦਾਰੀ",
        delivery_feature_4: "ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ ਅਤੇ SMS/ਐਪ ਸੂਚਨਾਵਾਂ",
        protection_guarantee: "100% ਸੁਰੱਖਿਆ ਗਾਰੰਟੀ",
        protection_guarantee_desc: "ਸਾਰੇ ਉਚ-ਮੁੱਲ ਲੈਣ-ਦੇਣ ਵਿੱਚ ਸਹਾਇਕ ਸੇਵਾਵਾਂ ਅਤੇ ਸੁਰੱਖਿਤ ਭੁਗਤਾਨ ਹੋਲਡਿੰਗ ਸ਼ਾਮਲ ਹੈ",
        local_support: "24/7 ਸਥਾਨਕ ਸਹਾਇਤਾ",
        local_support_desc: "ਤੁਰੰਤ ਸਹਾਇਤਾ ਲਈ ਤੁਹਾਡੇ ਪਿੰਡ ਵਿੱਚ ਦੇਖਭਾਲ ਕਰਤਾ ਉਪਲਬਧ",
        verified_users: "ਤਸਦੀਕਸ਼ੁਦਾ ਕਮਿਊਨਿਟੀ",
        verified_users_desc: "ਸਾਰੇ ਯੂਜ਼ਰ ਸਥਾਨਕ ਕਮਿਊਨਿਟੀ ਨੈਟਵਰਕ ਰਾਹੀਂ ਤਸਦੀਕਸ਼ੁਦਾ"
    }
};

// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Language management
let currentLanguage = 'en';

function initializeLanguage() {
    const savedLanguage = getCookie('language') || 'en';
    currentLanguage = savedLanguage;
    document.getElementById('languageSelect').value = savedLanguage;
    translatePage();
}

function changeLanguage(language) {
    currentLanguage = language;
    setCookie('language', language, 365); // Store for 1 year
    translatePage();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
            element.textContent = TRANSLATIONS[currentLanguage][key];
        }
    });
    
    // Translate placeholder text
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
            element.placeholder = TRANSLATIONS[currentLanguage][key];
        }
    });
    
    // Re-translate dynamic content when language changes
    if (typeof updatePriceCalculation === 'function') {
        updatePriceCalculation();
    }
}

function translate(key) {
    return TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key] 
        ? TRANSLATIONS[currentLanguage][key] 
        : TRANSLATIONS['en'][key] || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', initializeLanguage);