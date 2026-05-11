// ============================================================
// ELECTRO WORLD — MAIN JS
// ============================================================

const ADMIN_PASSWORD = "123";   // ← Change this to your own strong password

// ==================== AUTH ====================

function showTab(n) {
    document.getElementById('customerTab').style.display = n === 0 ? 'block' : 'none';
    document.getElementById('adminTab').style.display   = n === 1 ? 'block' : 'none';
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === n));
}

function customerRegister() {
    const email = document.getElementById('custEmail').value.trim();
    const pass  = document.getElementById('custPass').value.trim();
    if (!email || !pass) { alert("Please enter email and password"); return; }
    localStorage.setItem('customerEmail', email);
    localStorage.setItem('customerPass',  pass);
    alert("✅ Registration successful! You can now login.");
}

function customerLogin() {
    const email = document.getElementById('custEmail').value.trim();
    const pass  = document.getElementById('custPass').value.trim();
    if (email === localStorage.getItem('customerEmail') && pass === localStorage.getItem('customerPass')) {
        loginSuccess("customer");
    } else {
        alert("❌ Invalid email or password");
    }
}

function adminLogin() {
    const pass = document.getElementById('adminPass').value.trim();
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        
        loadProductsFromFirebase();   // ← Important line added
        showAdminControls();
        setupEventListeners();
        updateCartUI();
    } else {
        alert("❌ Wrong Admin Pass Key! Access Denied.");
    }
}

function loginSuccess(role) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    
    loadProductsFromFirebase();   // ← Important line added
    
    if (role === "admin") {
        document.getElementById('adminPanel').style.display = 'block';
        showAdminControls();
    }
    setupEventListeners();
    updateCartUI();
}

// ==================== PRODUCT DATA ====================

let products = [

    // -------- APPLE PHONES --------
    {
        id: 1, name: "iPhone 17 Pro Max", brand: "Apple", category: "phones", price: 145990,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.9, badge: "New",
        description: "The ultimate iPhone experience. iPhone 17 Pro Max features Apple's most advanced chip, a stunning 6.9-inch Super Retina XDR ProMotion display, pro camera system with 5x optical zoom, and an all-day titanium build that's lighter yet stronger.",
        specs: [["Display","6.9\" ProMotion OLED"],["Chip","Apple A19 Pro"],["Camera","200MP Triple"],["Battery","4685 mAh"],["Storage","256GB–1TB"],["OS","iOS 18"]]
    },
    {
        id: 2, name: "iPhone 17 Pro", brand: "Apple", category: "phones", price: 129900,
        image: "https://images.unsplash.com/photo-1702435705077-8cdec1f96f46?w=400",
        rating: 4.9, badge: "New",
        description: "iPhone 17 Pro — packed with A19 Pro chip, ProRes video recording, and a refined titanium design. Perfect for creators and power users who want the best in a comfortable size.",
        specs: [["Display","6.3\" ProMotion OLED"],["Chip","Apple A19 Pro"],["Camera","48MP Triple"],["Battery","3650 mAh"],["Storage","128GB–512GB"],["OS","iOS 18"]]
    },
    {
        id: 3, name: "iPhone 17", brand: "Apple", category: "phones", price: 89900,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.9, badge: "New",
        description: "The standard iPhone 17 delivers flagship-level performance with A18 chip, beautiful 6.1-inch OLED display, improved dual-camera system, and all-day battery life.",
        specs: [["Display","6.1\" OLED"],["Chip","Apple A18"],["Camera","48MP Dual"],["Battery","3375 mAh"],["Storage","128GB–512GB"],["OS","iOS 18"]]
    },
    {
        id: 4, name: "iPhone 16 Pro Max", brand: "Apple", category: "phones", price: 119900,
        image: "https://images.unsplash.com/photo-1690489876627-64b4f729f5f2?w=400",
        rating: 4.9, badge: "Best Seller",
        description: "iPhone 16 Pro Max with A18 Pro chip, 4K 120fps video recording, massive 6.9-inch display and 5x optical zoom telephoto. The most powerful iPhone ever made.",
        specs: [["Display","6.9\" ProMotion OLED"],["Chip","Apple A18 Pro"],["Camera","48MP Triple + 5x Zoom"],["Battery","4685 mAh"],["Storage","256GB–1TB"],["OS","iOS 18"]]
    },
    {
        id: 5, name: "iPhone 16 Pro", brand: "Apple", category: "phones", price: 99900,
        image: "https://images.unsplash.com/photo-1670823546920-f2fd3b8b51ce?w=400",
        rating: 4.9, badge: "Best Seller",
        description: "iPhone 16 Pro brings Apple Intelligence, A18 Pro chip, and a redesigned Camera Control button. Captures 4K ProRes video with action mode for smooth shots.",
        specs: [["Display","6.3\" ProMotion OLED"],["Chip","Apple A18 Pro"],["Camera","48MP Triple"],["Battery","3650 mAh"],["Storage","128GB–1TB"],["OS","iOS 18"]]
    },
    {
        id: 6, name: "iPhone 16", brand: "Apple", category: "phones", price: 79900,
        image: "https://images.unsplash.com/photo-1670823546920-f2fd3b8b51ce?w=400",
        rating: 4.8, badge: "Popular",
        description: "iPhone 16 with A18 chip, Camera Control, customizable Action button, and 48MP dual-camera. Designed for Apple Intelligence and built to last with aerospace-grade aluminum.",
        specs: [["Display","6.1\" OLED"],["Chip","Apple A18"],["Camera","48MP Dual"],["Battery","3561 mAh"],["Storage","128GB–512GB"],["OS","iOS 18"]]
    },
    {
        id: 7, name: "iPhone 15 Pro Max", brand: "Apple", category: "phones", price: 100999,
        image: "https://images.unsplash.com/photo-1690489876627-64b4f729f5f2?w=400",
        rating: 4.9, badge: "Popular",
        description: "iPhone 15 Pro Max — the first iPhone with a titanium frame. Features A17 Pro chip, 5x tetraprism zoom, Action button, and USB-C with USB 3 speeds.",
        specs: [["Display","6.7\" ProMotion OLED"],["Chip","Apple A17 Pro"],["Camera","48MP Triple + 5x"],["Battery","4422 mAh"],["Storage","256GB–1TB"],["OS","iOS 17"]]
    },
    {
        id: 8, name: "iPhone 15 Pro", brand: "Apple", category: "phones", price: 79900,
        image: "https://images.unsplash.com/photo-1702435705077-8cdec1f96f46?w=400",
        rating: 4.8, badge: "Best Seller",
        description: "Titanium design meets A17 Pro performance. iPhone 15 Pro has a versatile 48MP camera, Action button, and USB-C with fast data transfer speeds.",
        specs: [["Display","6.1\" ProMotion OLED"],["Chip","Apple A17 Pro"],["Camera","48MP Triple"],["Battery","3274 mAh"],["Storage","128GB–1TB"],["OS","iOS 17"]]
    },
    {
        id: 9, name: "iPhone 14", brand: "Apple", category: "phones", price: 59900,
        image: "https://images.unsplash.com/photo-1670823546920-f2fd3b8b51ce?w=400",
        rating: 4.7, badge: "Value Pick",
        description: "iPhone 14 offers excellent value with A15 Bionic chip, 12MP dual-camera with Photonic Engine, and Crash Detection. A proven performer at an attractive price.",
        specs: [["Display","6.1\" Super Retina XDR"],["Chip","Apple A15 Bionic"],["Camera","12MP Dual"],["Battery","3279 mAh"],["Storage","128GB–512GB"],["OS","iOS 16"]]
    },
    {
        id: 10, name: "MacBook Pro 16 M3", brand: "Apple", category: "laptops", price: 199900,
        image: "https://images.unsplash.com/photo-1587829741303-dc12662b0c5d?w=400",
        rating: 4.9, badge: "New",
        description: "The most powerful MacBook Pro ever. M3 Max chip delivers incredible performance for video editing, 3D rendering, and machine learning. Up to 22 hours battery life.",
        specs: [["Chip","Apple M3 Max"],["Display","16.2\" Liquid Retina XDR"],["RAM","36–128GB"],["Storage","512GB–8TB SSD"],["Battery","22 hrs"],["Weight","2.14 kg"]]
    },
    {
        id: 11, name: "MacBook Air M2", brand: "Apple", category: "laptops", price: 109900,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
        rating: 4.8, badge: "Best Seller",
        description: "Impossibly thin and fast. MacBook Air M2 with a fanless design, stunning Liquid Retina display, 18-hour battery, and M2 chip for desktop-class performance.",
        specs: [["Chip","Apple M2"],["Display","13.6\" Liquid Retina"],["RAM","8–24GB"],["Storage","256GB–2TB SSD"],["Battery","18 hrs"],["Weight","1.24 kg"]]
    },
    {
        id: 12, name: "AirPods Pro 2nd Gen", brand: "Apple", category: "headsets", price: 24900,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        rating: 4.8, badge: "Wireless",
        description: "AirPods Pro 2 with next-level Active Noise Cancellation, Adaptive Audio, and Transparency mode. H2 chip delivers personalised sound, while the MagSafe case adds up to 30 hours total.",
        specs: [["ANC","H2 Chip ANC"],["Battery","6 hrs (30 with case)"],["Chip","Apple H2"],["Connectivity","Bluetooth 5.3"],["Water Resist","IPX4"],["Features","Spatial Audio"]]
    },

    // -------- SAMSUNG PHONES --------
    {
        id: 13, name: "Galaxy S24 Ultra", brand: "Samsung", category: "phones", price: 129900,
        image: "https://images.unsplash.com/photo-1701844246602-341a890fcc64?w=400",
        rating: 4.9, badge: "New",
        description: "Galaxy S24 Ultra — the ultimate Galaxy AI phone with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3. Experience Circle to Search and Live Translate powered by Galaxy AI.",
        specs: [["Display","6.8\" QHD+ AMOLED 120Hz"],["Chip","Snapdragon 8 Gen 3"],["Camera","200MP + 5x + 10x Zoom"],["Battery","5000 mAh"],["RAM","12GB"],["Storage","256GB–1TB"]]
    },
    {
        id: 14, name: "Galaxy S24+", brand: "Samsung", category: "phones", price: 99900,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.8, badge: "Best Seller",
        description: "Galaxy S24+ brings Galaxy AI to a larger 6.7-inch display with Snapdragon 8 Gen 3, 4900mAh battery, and a pro-grade triple-camera system. All-day power, all-night performance.",
        specs: [["Display","6.7\" FHD+ AMOLED 120Hz"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP Triple"],["Battery","4900 mAh"],["RAM","12GB"],["Storage","256GB–512GB"]]
    },
    {
        id: 15, name: "Galaxy S23", brand: "Samsung", category: "phones", price: 69900,
        image: "https://images.unsplash.com/photo-1592899678534-8f3547c7fd91?w=400",
        rating: 4.7, badge: "Popular",
        description: "Galaxy S23 with Snapdragon 8 Gen 2, 50MP wide camera, and compact 6.1-inch display. Smooth 120Hz display and 3900mAh battery for all-day use.",
        specs: [["Display","6.1\" FHD+ AMOLED 120Hz"],["Chip","Snapdragon 8 Gen 2"],["Camera","50MP Triple"],["Battery","3900 mAh"],["RAM","8GB"],["Storage","128GB–256GB"]]
    },
    {
        id: 16, name: "Galaxy Book4 Pro", brand: "Samsung", category: "laptops", price: 149900,
        image: "https://images.unsplash.com/photo-1587829741303-dc12662b0c5d?w=400",
        rating: 4.7, badge: "New",
        description: "Galaxy Book4 Pro with Intel Core Ultra 7 processor, 16-inch AMOLED display, and Galaxy AI integration. Works seamlessly with your Galaxy phone for connected productivity.",
        specs: [["Chip","Intel Core Ultra 7"],["Display","16\" AMOLED 2880×1800"],["RAM","16–32GB"],["Storage","512GB–1TB SSD"],["Battery","76Wh"],["Weight","1.56 kg"]]
    },
    {
        id: 17, name: "Galaxy Buds3 Pro", brand: "Samsung", category: "headsets", price: 18900,
        image: "https://images.unsplash.com/photo-1579586140626-0a78b4b2ee8f?w=400",
        rating: 4.6, badge: "Wireless",
        description: "Galaxy Buds3 Pro with intelligent ANC, Hi-Fi audio with 24-bit processing, and Blade Lite design for secure fit. Up to 30 hours total with case.",
        specs: [["ANC","Intelligent ANC"],["Battery","6 hrs (30 with case)"],["Audio","24-bit Hi-Fi"],["Connectivity","Bluetooth 5.4"],["Water Resist","IPX7"],["Features","360 Audio"]]
    },
    {
        id: 18, name: "Galaxy Buds2 Pro", brand: "Samsung", category: "headsets", price: 12900,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        rating: 4.7, badge: "Best Seller",
        description: "Galaxy Buds2 Pro with 360 Audio, intelligent ANC that reads your environment, and a compact ergonomic design. Perfect for Galaxy ecosystem users.",
        specs: [["ANC","Intelligent ANC"],["Battery","5 hrs (29 with case)"],["Audio","360 Spatial Audio"],["Connectivity","Bluetooth 5.3"],["Water Resist","IPX7"],["Weight","5.5g each"]]
    },

    // -------- ONEPLUS PHONES --------
    {
        id: 19, name: "OnePlus 12", brand: "OnePlus", category: "phones", price: 67999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.8, badge: "Top Rated",
        description: "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad-tuned triple camera, 100W SUPERVOOC charging, and a stunning 6.82-inch ProXDR display. Fast, beautiful, and premium.",
        specs: [["Display","6.82\" ProXDR 120Hz"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP Hasselblad Triple"],["Battery","5400 mAh"],["Charging","100W SUPERVOOC"],["RAM","12–16GB"]]
    },
    {
        id: 20, name: "OnePlus 12R", brand: "OnePlus", category: "phones", price: 39999,
        image: "https://images.unsplash.com/photo-1592899678534-8f3547c7fd91?w=400",
        rating: 4.7, badge: "Value Pick",
        description: "OnePlus 12R delivers flagship vibes at a mid-range price. Snapdragon 8 Gen 1, 100W charging, and a 6.78-inch fluid AMOLED display that's buttery smooth.",
        specs: [["Display","6.78\" 120Hz AMOLED"],["Chip","Snapdragon 8 Gen 1"],["Camera","50MP Triple"],["Battery","5500 mAh"],["Charging","100W SUPERVOOC"],["RAM","8–16GB"]]
    },
    {
        id: 21, name: "OnePlus Nord 4", brand: "OnePlus", category: "phones", price: 29999,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.6, badge: "Popular",
        description: "OnePlus Nord 4 — the first OnePlus phone with all-metal unibody design. Snapdragon 7+ Gen 3, 100W charging, and a 6.74-inch ProXDR display. Premium, fast, affordable.",
        specs: [["Display","6.74\" ProXDR 120Hz"],["Chip","Snapdragon 7+ Gen 3"],["Camera","50MP Dual"],["Battery","5500 mAh"],["Charging","100W SUPERVOOC"],["RAM","8–12GB"]]
    },

    // -------- XIAOMI / REDMI --------
    {
        id: 22, name: "Xiaomi 14 Pro", brand: "Xiaomi", category: "phones", price: 99999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.8, badge: "New",
        description: "Xiaomi 14 Pro with Snapdragon 8 Gen 3, Leica Summilux lenses, 120W HyperCharge, and a 6.73-inch LTPO AMOLED display. Flagship camera meets blazing-fast charging.",
        specs: [["Display","6.73\" LTPO AMOLED 120Hz"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP Leica Triple"],["Battery","4880 mAh"],["Charging","120W HyperCharge"],["RAM","12–16GB"]]
    },
    {
        id: 23, name: "Redmi Note 13 Pro+", brand: "Xiaomi", category: "phones", price: 29999,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.7, badge: "Best Seller",
        description: "Redmi Note 13 Pro+ with 200MP camera, 120W HyperCharge, Dimensity 7200 Ultra, and IP68 water resistance. The most feature-packed midrange phone you can buy.",
        specs: [["Display","6.67\" AMOLED 120Hz"],["Chip","Dimensity 7200 Ultra"],["Camera","200MP + OIS"],["Battery","5000 mAh"],["Charging","120W HyperCharge"],["Water Resist","IP68"]]
    },
    {
        id: 24, name: "POCO X6 Pro", brand: "Xiaomi", category: "phones", price: 22999,
        image: "https://images.unsplash.com/photo-1592899678534-8f3547c7fd91?w=400",
        rating: 4.6, badge: "Value Pick",
        description: "POCO X6 Pro with Dimensity 8300 Ultra, 67W turbo charging, and a 6.67-inch AMOLED 120Hz display. The gaming phone that doesn't break the bank.",
        specs: [["Display","6.67\" AMOLED 120Hz"],["Chip","Dimensity 8300 Ultra"],["Camera","64MP Triple"],["Battery","5000 mAh"],["Charging","67W Turbo"],["RAM","8–12GB"]]
    },

    // -------- REALME --------
    {
        id: 25, name: "Realme GT 6", brand: "Realme", category: "phones", price: 39999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.7, badge: "New",
        description: "Realme GT 6 with Snapdragon 8s Gen 3, industry-first 6000 nit AI-powered display, 120W SUPERVOOC, and a pro-camera system with 50MP Sony OIS sensor.",
        specs: [["Display","6.78\" 6000 nit AMOLED 120Hz"],["Chip","Snapdragon 8s Gen 3"],["Camera","50MP Sony Triple"],["Battery","5500 mAh"],["Charging","120W SUPERVOOC"],["RAM","8–12GB"]]
    },
    {
        id: 26, name: "Realme Narzo 70 Pro", brand: "Realme", category: "phones", price: 19999,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.5, badge: "Budget Pick",
        description: "Realme Narzo 70 Pro 5G — budget flagship with Dimensity 7050, 50MP Sony camera, and 67W SUPERVOOC. Thin glass back, big battery, fast charging.",
        specs: [["Display","6.67\" AMOLED 120Hz"],["Chip","Dimensity 7050"],["Camera","50MP Sony"],["Battery","5000 mAh"],["Charging","67W SUPERVOOC"],["RAM","8–12GB"]]
    },

    // -------- VIVO --------
    {
        id: 27, name: "Vivo X100 Pro", brand: "Vivo", category: "phones", price: 89999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.8, badge: "Top Rated",
        description: "Vivo X100 Pro — ZEISS-tuned camera with a 1-inch sensor, Dimensity 9300 chip, 100W FlashCharge, and a 6.78-inch curved AMOLED display. Moonshot photography at your fingertips.",
        specs: [["Display","6.78\" Curved AMOLED 120Hz"],["Chip","Dimensity 9300"],["Camera","50MP 1-inch ZEISS"],["Battery","5400 mAh"],["Charging","100W FlashCharge"],["RAM","12–16GB"]]
    },
    {
        id: 28, name: "Vivo V30 Pro", brand: "Vivo", category: "phones", price: 39999,
        image: "https://images.unsplash.com/photo-1592899678534-8f3547c7fd91?w=400",
        rating: 4.6, badge: "Popular",
        description: "Vivo V30 Pro with ZEISS-tuned 50MP portrait cameras, ultra-slim 7.49mm design, 80W FlashCharge, and a premium 3D curved AMOLED display.",
        specs: [["Display","6.78\" 3D Curved AMOLED 120Hz"],["Chip","Dimensity 8200"],["Camera","50MP ZEISS Dual Portrait"],["Battery","5000 mAh"],["Charging","80W FlashCharge"],["Thickness","7.49 mm"]]
    },

    // -------- OPPO --------
    {
        id: 29, name: "OPPO Find X7 Pro", brand: "OPPO", category: "phones", price: 79999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.7, badge: "New",
        description: "OPPO Find X7 Pro with Hasselblad quad-camera, Snapdragon 8 Gen 3, 100W SUPERVOOC + 50W wireless charging, and an ultra-smooth 6.82-inch curved AMOLED.",
        specs: [["Display","6.82\" 120Hz Curved AMOLED"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP Hasselblad Quad"],["Battery","5000 mAh"],["Charging","100W + 50W Wireless"],["RAM","12–16GB"]]
    },
    {
        id: 30, name: "OPPO Reno 12 Pro", brand: "OPPO", category: "phones", price: 36999,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.5, badge: "Trending",
        description: "OPPO Reno 12 Pro with 80MP AI portrait camera, Dimensity 7300 Energy, 80W SUPERVOOC, and ultra-slim design with premium AG glass back. Style meets performance.",
        specs: [["Display","6.7\" AMOLED 120Hz"],["Chip","Dimensity 7300 Energy"],["Camera","50MP + 8MP Portrait"],["Battery","5000 mAh"],["Charging","80W SUPERVOOC"],["Thickness","7.42 mm"]]
    },

    // -------- GOOGLE PIXEL --------
    {
        id: 31, name: "Google Pixel 9 Pro", brand: "Google", category: "phones", price: 109999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.8, badge: "New",
        description: "Google Pixel 9 Pro with Tensor G4 chip, advanced computational photography, 7 years of OS updates, and Google AI built right in. The smartest Android phone available.",
        specs: [["Display","6.3\" LTPO OLED 120Hz"],["Chip","Google Tensor G4"],["Camera","50MP Triple + Periscope"],["Battery","4700 mAh"],["Charging","27W + Wireless"],["Updates","7 Years OS"]]
    },
    {
        id: 32, name: "Google Pixel 9", brand: "Google", category: "phones", price: 79999,
        image: "https://images.unsplash.com/photo-1592899678534-8f3547c7fd91?w=400",
        rating: 4.7, badge: "Popular",
        description: "Google Pixel 9 — the purest Android experience with Tensor G4, stunning camera smarts, magic eraser, and call screening. 7 years of guaranteed updates.",
        specs: [["Display","6.3\" OLED 120Hz"],["Chip","Google Tensor G4"],["Camera","50MP + 10.5MP"],["Battery","4700 mAh"],["Charging","27W Fast"],["Updates","7 Years OS"]]
    },

    // -------- MOTOROLA --------
    {
        id: 33, name: "Motorola Edge 50 Ultra", brand: "Motorola", category: "phones", price: 59999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.6, badge: "New",
        description: "Motorola Edge 50 Ultra with Snapdragon 8s Gen 3, 125W TurboPower charging, 50MP with OIS triple camera, and industry-first 6.67-inch pOLED display with 165Hz.",
        specs: [["Display","6.67\" pOLED 165Hz"],["Chip","Snapdragon 8s Gen 3"],["Camera","50MP OIS Triple"],["Battery","4500 mAh"],["Charging","125W TurboPower"],["RAM","12–16GB"]]
    },

    // -------- NOKIA --------
    {
        id: 34, name: "Nokia G42 5G", brand: "Nokia", category: "phones", price: 13999,
        image: "https://images.unsplash.com/photo-1679106873575-09bdef4953d9?w=400",
        rating: 4.4, badge: "Budget 5G",
        description: "Nokia G42 5G — the world's first repairable 5G smartphone with Snapdragon 480+ chip, 50MP camera, 3-day battery, and 3 years OS updates. Durable and eco-friendly.",
        specs: [["Display","6.56\" HD+ 90Hz"],["Chip","Snapdragon 480+"],["Camera","50MP + 2MP + 2MP"],["Battery","5000 mAh"],["5G","Yes"],["Updates","3 Years OS"]]
    },

    // -------- OTHER LAPTOPS --------
    {
        id: 35, name: "Dell XPS 15", brand: "Dell", category: "laptops", price: 169900,
        image: "https://images.unsplash.com/photo-1587829741303-dc12662b0c5d?w=400",
        rating: 4.8, badge: "Premium",
        description: "Dell XPS 15 with Intel Core i9-14900H, NVIDIA RTX 4070, and a stunning 15.6-inch OLED display. The ultimate laptop for creative professionals.",
        specs: [["Chip","Intel Core i9-14900H"],["GPU","NVIDIA RTX 4070 8GB"],["Display","15.6\" OLED 3.5K 120Hz"],["RAM","16–64GB"],["Storage","512GB–2TB SSD"],["Weight","1.86 kg"]]
    },
    {
        id: 36, name: "ASUS ROG Zephyrus G14", brand: "ASUS", category: "laptops", price: 129900,
        image: "https://images.unsplash.com/photo-1587829741303-dc12662b0c5d?w=400",
        rating: 4.8, badge: "Gaming",
        description: "ASUS ROG Zephyrus G14 — AMD Ryzen 9, RTX 4070, 165Hz QHD display, and AniMe Matrix LED. The best gaming laptop that doubles as a premium ultrabook.",
        specs: [["Chip","AMD Ryzen 9 8945HS"],["GPU","NVIDIA RTX 4070 8GB"],["Display","14\" QHD+ 165Hz OLED"],["RAM","16–32GB"],["Storage","1TB SSD"],["Battery","73Wh"]]
    },
    {
        id: 37, name: "HP Spectre x360 14", brand: "HP", category: "laptops", price: 149900,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
        rating: 4.7, badge: "Premium",
        description: "HP Spectre x360 14 — a stunning 2-in-1 convertible with Intel Core Ultra 7, OLED display, OLED pen included, and premium gem-cut aluminum design.",
        specs: [["Chip","Intel Core Ultra 7 155H"],["Display","14\" 2.8K OLED Touch 120Hz"],["RAM","16–32GB"],["Storage","512GB–2TB SSD"],["Battery","17 hrs"],["Weight","1.41 kg"]]
    },

    // -------- SONY HEADSETS --------
    {
        id: 38, name: "Sony WH-1000XM5", brand: "Sony", category: "headsets", price: 29990,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        rating: 4.9, badge: "Best ANC",
        description: "Sony WH-1000XM5 — the world's best noise cancelling headphones with 8 microphones, 30-hour battery, speak-to-chat, and exceptional audio quality with LDAC codec.",
        specs: [["ANC","8 Mic Industry-Best ANC"],["Battery","30 hrs (ANC on)"],["Codec","LDAC, AAC, SBC"],["Connectivity","Bluetooth 5.2"],["Weight","250g"],["Features","360 Reality Audio"]]
    },
    {
        id: 39, name: "Bose QC45", brand: "Bose", category: "headsets", price: 25990,
        image: "https://images.unsplash.com/photo-1579586140626-0a78b4b2ee8f?w=400",
        rating: 4.7, badge: "Comfortable",
        description: "Bose QuietComfort 45 with class-leading passive noise reduction, balanced Aware mode, 24-hour battery, and the legendary Bose comfort that you can wear all day.",
        specs: [["ANC","Bose Quiet Comfort"],["Battery","24 hrs"],["Connectivity","Bluetooth 5.1"],["Modes","Quiet / Aware"],["Weight","238g"],["Foldable","Yes"]]
    },

    // -------- JBL --------
    {
        id: 40, name: "JBL Tour One M2", brand: "JBL", category: "headsets", price: 19990,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        rating: 4.6, badge: "Premium Sound",
        description: "JBL Tour One M2 with Adaptive ANC, SpatialSound, 30-hour battery, and JBL Personi-Fi 2.0 personalisation. Premium wireless sound at a great price.",
        specs: [["ANC","Adaptive ANC"],["Battery","30 hrs"],["Connectivity","Bluetooth 5.3"],["Audio","SpatialSound"],["Weight","261g"],["Foldable","Yes"]]
    },

    // -------- FRIDGES --------
    {
        id: 41, name: "Samsung 253L Double Door Fridge", brand: "Samsung", category: "fridges", price: 28990,
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400",
        rating: 4.6, badge: "5 Star",
        description: "Samsung 253L Double Door refrigerator with Digital Inverter Technology, All-Around Cooling system, and SpaceMax design for maximum storage. 5-star energy efficiency.",
        specs: [["Capacity","253 Litres"],["Type","Double Door"],["Energy Rating","5 Star"],["Compressor","Digital Inverter"],["Cooling","All-Around Cooling"],["Colour","EZ Clean Steel"]]
    },
    {
        id: 42, name: "LG 260L Double Door Fridge", brand: "LG", category: "fridges", price: 29990,
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400",
        rating: 4.7, badge: "Smart Inverter",
        description: "LG 260L with Smart Inverter Compressor, Moist Balance Crisper for 11 days fresher vegetables, Door Cooling+ for quick temperature recovery, and 10-year compressor warranty.",
        specs: [["Capacity","260 Litres"],["Type","Double Door"],["Energy Rating","4 Star"],["Compressor","Smart Inverter"],["Feature","Moist Balance Crisper"],["Warranty","10yr Compressor"]]
    },
    {
        id: 43, name: "Whirlpool 265L Triple-Door Fridge", brand: "Whirlpool", category: "fridges", price: 27990,
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400",
        rating: 4.5, badge: "Popular",
        description: "Whirlpool 265L FreshMagic Fridge with 6th Sense ActiveFresh technology for 5X better freshness, triple-door design for organised storage, and ZeroF technology for ice-cold beverages.",
        specs: [["Capacity","265 Litres"],["Type","Triple Door"],["Energy Rating","3 Star"],["Technology","FreshMagic + ZeroF"],["Feature","6th Sense ActiveFresh"],["Colour","Magnum Steel"]]
    },
    {
        id: 44, name: "Haier 258L Side-by-Side Fridge", brand: "Haier", category: "fridges", price: 34990,
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400",
        rating: 4.5, badge: "New",
        description: "Haier 258L Side-by-Side refrigerator with Twin Inverter Technology, ErP Compliant for power saving, and a sleek mirror-glass finish. Separate fresh and frozen storage.",
        specs: [["Capacity","258 Litres"],["Type","Side by Side"],["Energy Rating","3 Star"],["Compressor","Twin Inverter"],["Finish","Mirror Glass"],["Colour","Brushed Silver"]]
    },
    {
        id: 45, name: "Godrej 236L Single Door Fridge", brand: "Godrej", category: "fridges", price: 18990,
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400",
        rating: 4.4, badge: "Value Pick",
        description: "Godrej 236L direct cool refrigerator with PC anti-bacterial gasket, jumbo vegetable tray, coolpad for cooling up to 12 hours during power cuts, and 1-year compressor warranty.",
        specs: [["Capacity","236 Litres"],["Type","Single Door"],["Energy Rating","3 Star"],["Cooling","Cool Pad (12 hrs)"],["Feature","Anti-Bacterial Gasket"],["Colour","Aqua Blue"]]
    },
    {
        id: 46, name: "Voltas Beko 320L Double Door Fridge", brand: "Voltas", category: "fridges", price: 38990,
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400",
        rating: 4.5, badge: "HarvestFresh",
        description: "Voltas Beko 320L with HarvestFresh technology that mimics natural light cycle to retain 3X more Vitamin C. NeoFrost Dual Cooling prevents odour mixing between fridge and freezer.",
        specs: [["Capacity","320 Litres"],["Type","Double Door"],["Energy Rating","3 Star"],["Technology","HarvestFresh"],["Cooling","NeoFrost Dual Cool"],["Feature","Vitamins C Retention"]]
    },

    // -------- AIR CONDITIONERS --------
    {
        id: 51, name: "Voltas 1.5 Ton 5 Star Inverter AC", brand: "Voltas", category: "ac", price: 42990,
        image: "https://images.unsplash.com/photo-1631908942829-c09c8fb98c98?w=400",
        rating: 4.6, badge: "5 Star",
        description: "Voltas 1.5 Ton Split AC with 5 Star rating, Adjustable inverter technology, Smart Diagnosis, 4D Cooling for uniform temperature, and Wi-Fi control via Voltas app.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Technology","Adjustable Inverter"],["Control","Wi-Fi + Alexa"],["Compressor","Copper Condenser"]]
    },
    {
        id: 52, name: "Daikin 1.5 Ton 5 Star Inverter AC", brand: "Daikin", category: "ac", price: 47990,
        image: "https://images.unsplash.com/photo-1617817546471-d5a51d26f1db?w=400",
        rating: 4.8, badge: "Best Cooling",
        description: "Daikin FTKF 1.5 Ton AC with Coanda Airflow for uniform cooling, PM2.5 filter, R32 eco-friendly refrigerant, self-cleaning mode, and 5-star BEE rating.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Refrigerant","R32 Eco-friendly"],["Filter","PM2.5 Filter"],["Feature","Self-Cleaning"]]
    },
    {
        id: 53, name: "LG 1.5 Ton 5 Star Dual Inverter AC", brand: "LG", category: "ac", price: 44990,
        image: "https://images.unsplash.com/photo-1631908942829-c09c8fb98c98?w=400",
        rating: 4.7, badge: "Dual Inverter",
        description: "LG 1.5 Ton Dual Inverter AC with Dual Inverter Compressor for faster cooling and 70% energy savings, Wi-Fi ThinQ control, HD filter, and 10-year compressor warranty.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Compressor","Dual Inverter"],["Control","Wi-Fi ThinQ + Alexa"],["Warranty","10yr Compressor"]]
    },
    {
        id: 54, name: "Samsung 1.5 Ton 5 Star WindFree AC", brand: "Samsung", category: "ac", price: 48990,
        image: "https://images.unsplash.com/photo-1617817546471-d5a51d26f1db?w=400",
        rating: 4.7, badge: "WindFree",
        description: "Samsung WindFree AC cools without direct cold draught, with 23,000+ micro holes dispersing air gently. Wind-Free Comfort mode maintains temperature without blowing cold air.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Technology","Wind-Free Comfort"],["Control","SmartThings + Alexa"],["Filter","PM1.0 + Virus Doctor"]]
    },
    {
        id: 55, name: "Hitachi 1.5 Ton 5 Star Inverter AC", brand: "Hitachi", category: "ac", price: 43990,
        image: "https://images.unsplash.com/photo-1631908942829-c09c8fb98c98?w=400",
        rating: 4.6, badge: "Reliable",
        description: "Hitachi 1.5 Ton Kaze with 5 Star rating, Dual Sensor Inverter technology, Frost Wash self-cleaning, and Hi-Temperature cooling up to 55°C outdoor temperature — perfect for Indian summers.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Feature","Frost Wash Auto-Clean"],["Outdoor Temp","Cools till 55°C"],["Refrigerant","R32"]]
    },
    {
        id: 56, name: "Blue Star 1.5 Ton 5 Star Inverter AC", brand: "Blue Star", category: "ac", price: 39990,
        image: "https://images.unsplash.com/photo-1617817546471-d5a51d26f1db?w=400",
        rating: 4.5, badge: "Best Value",
        description: "Blue Star IC518ZLTX with 5-star rating, Turbo Cool for fast cooling, Auto Restart and self-diagnosis, Comfort Sleep mode, and full 5-year warranty on PCB.",
        specs: [["Capacity","1.5 Ton"],["Type","Split AC"],["Energy Rating","5 Star"],["Feature","Turbo Cool + Sleep Mode"],["PCB Warranty","5 Years"],["Filter","HEPA filter"]]
    },
    {
        id: 57, name: "Carrier 1.5 Ton 5 Star Flexicool AC", brand: "Carrier", category: "ac", price: 41990,
        image: "https://images.unsplash.com/photo-1631908942829-c09c8fb98c98?w=400",
        rating: 4.5, badge: "Flexicool",
        description: "Carrier Flexicool Inverter AC — India's first AC with switchable 1.5T/1T capacity so you use only the power you need. PM 2.5 filter, 100% copper condenser, and turbo cool mode.",
        specs: [["Capacity","1.5 Ton / 1 Ton Switchable"],["Type","Split AC"],["Energy Rating","5 Star"],["Feature","Dual Capacity"],["Filter","PM2.5"],["Condenser","100% Copper"]]
    },

    // -------- TELEVISIONS --------
    {
        id: 61, name: "Samsung 55\" Neo QLED 4K QN90D", brand: "Samsung", category: "tv", price: 129990,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
        rating: 4.8, badge: "Neo QLED",
        description: "Samsung 55\" Neo QLED 4K TV with Quantum Mini LED backlight, Object Tracking Sound+, 144Hz refresh rate for gaming, and 4K AI upscaling. The perfect living room centrepiece.",
        specs: [["Screen","55\" Neo QLED 4K"],["Refresh Rate","144Hz (Gaming)"],["HDR","HDR10+ Certified"],["Sound","60W Object Tracking Sound+"],["OS","Tizen Smart TV"],["Gaming","HDMI 2.1 + FreeSync"]]
    },
    {
        id: 62, name: "LG 55\" OLED C3 4K evo", brand: "LG", category: "tv", price: 159990,
        image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400",
        rating: 4.9, badge: "OLED",
        description: "LG OLED C3 55\" — self-lit OLED pixels deliver perfect blacks, infinite contrast, and stunning colour. α9 Gen6 AI processor, Dolby Vision IQ, and NVIDIA G-Sync Compatible.",
        specs: [["Screen","55\" OLED evo 4K"],["Pixel Tech","Self-Lit OLED"],["Refresh Rate","120Hz (Gaming)"],["HDR","Dolby Vision IQ + HDR10"],["Processor","α9 Gen6 AI"],["Gaming","HDMI 2.1 x4, G-Sync"]]
    },
    {
        id: 63, name: "Sony 55\" Bravia XR 4K OLED", brand: "Sony", category: "tv", price: 149990,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
        rating: 4.8, badge: "Bravia XR",
        description: "Sony Bravia XR A80L 55\" OLED with Cognitive Processor XR for natural scene reproduction, Acoustic Surface Audio+ that makes the screen itself a speaker, and Google TV.",
        specs: [["Screen","55\" OLED 4K"],["Processor","Cognitive Processor XR"],["Sound","Acoustic Surface Audio+"],["OS","Google TV"],["HDR","Dolby Vision + HDR10"],["Feature","Bravia CORE"]]
    },
    {
        id: 64, name: "OnePlus 65\" QLED 4K TV U1S", brand: "OnePlus", category: "tv", price: 79990,
        image: "https://images.unsplash.com/photo-1571903042069-5d57c4fb3e35?w=400",
        rating: 4.5, badge: "Best Value",
        description: "OnePlus 65\" QLED with Quantum Dot technology, 60W Onkyo sound, 120Hz refresh rate, and OxygenOS Smart TV for a fast, bloatware-free experience.",
        specs: [["Screen","65\" QLED 4K"],["Refresh Rate","120Hz"],["Sound","60W Onkyo"],["OS","OxygenOS Smart TV"],["HDR","HDR10+"],["Ports","HDMI 2.1 + USB 3.0"]]
    },
    {
        id: 65, name: "Mi 43\" 4K Ultra HD Smart TV", brand: "Xiaomi", category: "tv", price: 34990,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
        rating: 4.4, badge: "Budget 4K",
        description: "Xiaomi Mi TV 5X 43\" with 4K HDR display, 30W speakers with Dolby Audio + DTS-X, Vivid Picture Engine, and Android TV with Google Play — all under ₹35,000.",
        specs: [["Screen","43\" 4K LED"],["Sound","30W Dolby + DTS-X"],["OS","Android TV 11"],["HDR","HDR10 + HLG"],["Ports","3x HDMI + 2x USB"],["Feature","Vivid Picture Engine"]]
    },

    // -------- WASHING MACHINES --------
    {
        id: 71, name: "LG 7kg Front Load Washer", brand: "LG", category: "washing-machines", price: 47990,
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400",
        rating: 4.7, badge: "Steam Wash",
        description: "LG 7kg Front Load with AI Direct Drive motor that senses load and adjusts, TurboWash 360° for fast 39-min wash, Steam technology to remove 99.9% allergens, and ThinQ Wi-Fi.",
        specs: [["Capacity","7 kg"],["Type","Front Load"],["Motor","AI Direct Drive"],["Feature","Steam Wash + TurboWash"],["Control","ThinQ Wi-Fi + Alexa"],["RPM","1400 RPM"]]
    },
    {
        id: 72, name: "Samsung 8kg Front Load Washer", brand: "Samsung", category: "washing-machines", price: 52990,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        rating: 4.6, badge: "AI Wash",
        description: "Samsung 8kg EcoBubble Front Load Washer with AI Wash that recommends optimal wash settings, EcoBubble for deep clean at low temperatures, and QuickDrive 50% faster wash.",
        specs: [["Capacity","8 kg"],["Type","Front Load"],["Motor","Digital Inverter"],["Feature","EcoBubble + AI Wash"],["Speed","QuickDrive (50% faster)"],["Control","SmartThings App"]]
    },
    {
        id: 73, name: "Whirlpool 7kg Semi-Automatic Washer", brand: "Whirlpool", category: "washing-machines", price: 14990,
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400",
        rating: 4.5, badge: "Budget Pick",
        description: "Whirlpool 7kg Super Wash with Soak technology, Power-Scrub pulsator for stubborn stains, and 3D Scrub pads for collar & cuff cleaning. Simple, reliable, and affordable.",
        specs: [["Capacity","7 kg"],["Type","Semi-Automatic"],["Feature","Soak + Power-Scrub"],["Pulsator","3D Scrub"],["Tub","Stainless Steel"],["Warranty","2 Years"]]
    },
    {
        id: 74, name: "IFB 8kg Front Load Washer Senator", brand: "IFB", category: "washing-machines", price: 55990,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        rating: 4.7, badge: "Aqua Energie",
        description: "IFB Senator 8kg with Aqua Energie for better detergent activation, Ballbearing Drive for quiet operation, Cradle Wash for delicates, and 3D wash system — the most reliable front-loader in India.",
        specs: [["Capacity","8 kg"],["Type","Front Load"],["Feature","Aqua Energie"],["Wash System","3D Wash"],["Motor","Ballbearing Drive"],["Warranty","4 Years Comprehensive"]]
    },
    {
        id: 75, name: "Bosch 8kg Front Load Washer", brand: "Bosch", category: "washing-machines", price: 59990,
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400",
        rating: 4.8, badge: "EcoSilence",
        description: "Bosch 8kg WAJ2846WIN with EcoSilence Drive motor rated A+++, AntiVibration design for ultra-quiet wash, SpeedPerfect for 65% faster wash, and AllergyPlus program.",
        specs: [["Capacity","8 kg"],["Type","Front Load"],["Motor","EcoSilence Drive"],["Feature","AntiVibration + SpeedPerfect"],["Energy","A+++ Rating"],["Warranty","2 Years"]]
    },

    // -------- CAMERAS --------
    {
        id: 81, name: "Canon EOS R10 Mirrorless Camera", brand: "Canon", category: "cameras", price: 89990,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        rating: 4.7, badge: "Mirrorless",
        description: "Canon EOS R10 with 24.2MP APS-C sensor, Dual Pixel CMOS AF II with 651 AF points, up to 23fps shooting, 4K 30p video, and lightweight compact body — the perfect entry into RF mirrorless.",
        specs: [["Sensor","24.2MP APS-C CMOS"],["AF","Dual Pixel AF II 651 Points"],["Burst","23 fps"],["Video","4K 30p / FHD 120p"],["Display","3\" Vari-angle Touch"],["Connectivity","Wi-Fi + Bluetooth"]]
    },
    {
        id: 82, name: "Sony Alpha ZV-E10 Vlog Camera", brand: "Sony", category: "cameras", price: 62990,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
        rating: 4.7, badge: "Vlog Ready",
        description: "Sony ZV-E10 with 24.2MP APS-C sensor, interchangeable E-mount lenses, Product Showcase mode, Real-time Eye AF, and front-facing screen for perfect vlogging.",
        specs: [["Sensor","24.2MP APS-C"],["AF","Real-Time Eye AF"],["Video","4K 30p"],["Display","3\" Side-flip LCD"],["Audio","3-Capsule Mic"],["Mount","Sony E-mount"]]
    },
    {
        id: 83, name: "Nikon Z30 Mirrorless Camera", brand: "Nikon", category: "cameras", price: 72990,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        rating: 4.6, badge: "Creator Kit",
        description: "Nikon Z30 with 20.9MP APS-C sensor, subject detection AF for people, pets & vehicles, 125-min 4K video, and a built-in stereo mic with wind noise reduction. Built for creators.",
        specs: [["Sensor","20.9MP DX CMOS"],["AF","Subject Detection AF"],["Video","4K 30p / FHD 120fps"],["Battery","125 min 4K recording"],["Display","3\" Vari-angle Touch"],["Audio","Built-in Stereo Mic"]]
    },
    {
        id: 84, name: "Fujifilm X-T30 II Mirrorless", brand: "Fujifilm", category: "cameras", price: 82990,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
        rating: 4.8, badge: "Film Simulation",
        description: "Fujifilm X-T30 II with 26.1MP X-Trans BSI CMOS 4, 19 film simulations including Classic Neg, in-body AF with face & eye detection, and a retro design that turns heads.",
        specs: [["Sensor","26.1MP X-Trans CMOS 4"],["AF","Phase Detection + Eye AF"],["Film Sims","19 Film Simulations"],["Video","4K 30p 10-bit"],["Display","3\" Tilting LCD"],["Mount","Fujifilm X-Mount"]]
    }

];

// ==================== LOAD/SAVE PRODUCTS ====================
function loadMyProducts() {
    const saved = localStorage.getItem("electroProducts");
    if (saved) {
        const parsed = JSON.parse(saved);
        // Merge: keep saved overrides but preserve new products
        const savedIds = parsed.map(p => p.id);
        const newDefaults = products.filter(p => !savedIds.includes(p.id));
        products.length = 0;
        products.push(...parsed, ...newDefaults);
    } else {
        localStorage.setItem("electroProducts", JSON.stringify(products));
    }
}

// ==================== CART & WISHLIST ====================
let cart     = JSON.parse(localStorage.getItem('electroCart'))     || [];
let wishlist = JSON.parse(localStorage.getItem('electroWishlist')) || [];

function saveCart()     { localStorage.setItem('electroCart',     JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('electroWishlist', JSON.stringify(wishlist)); }

function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    const p   = products.find(p => p.id === productId);
    if (idx === -1) {
        wishlist.push(productId);
        showNotification(`❤️ ${p.name} added to Wishlist!`);
    } else {
        wishlist.splice(idx, 1);
        showNotification(`💔 ${p.name} removed from Wishlist!`);
    }
    saveWishlist();
}

// ==================== DOM REFS ====================
const productsGrid = document.getElementById('productsGrid');
const cartIcon     = document.getElementById('cartIcon');
const cartModal    = document.getElementById('cartModal');
const closeCart    = document.getElementById('closeCart');
const cartCount    = document.getElementById('cartCount');
const cartItems    = document.getElementById('cartItems');
const cartTotal    = document.getElementById('cartTotal');
const filterBtns   = document.querySelectorAll('.filter-btn');

// ==================== RENDER PRODUCTS ====================
function renderProducts(productList) {
    productsGrid.innerHTML = '';
    productList.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card" data-category="${product.category}" data-brand="${product.brand.toLowerCase()}">
                <div class="product-image" onclick="openProductDetail(${product.id})" style="cursor:pointer;">
                    <img src="${product.image}" alt="${product.name}" loading="lazy"
                         onerror="this.src='https://via.placeholder.com/300x250/eee/666?text=Image+Not+Found'">
                    <span class="product-badge">${product.badge}</span>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name" onclick="openProductDetail(${product.id})" style="cursor:pointer;">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">₹ ${product.price.toLocaleString('en-IN')}</div>
                    <div style="display:flex; gap:8px; margin-top:10px;">
                        <button class="add-to-cart" data-product-id="${product.id}" style="flex:1;">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn" data-product-id="${product.id}"
                                style="width:48px; background:white; border:2px solid #ddd; border-radius:12px; color:#e74c3c; font-size:1.1rem; cursor:pointer;">
                            ❤️
                        </button>
                    </div>
                    <button class="view-details-btn" onclick="openProductDetail(${product.id})">
                        <i class="fas fa-eye" style="margin-right:5px;"></i> View Details
                    </button>
                </div>
            </div>`;
    });

    // Attach events
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() { addToCart(parseInt(this.dataset.productId)); });
    });
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() { toggleWishlist(parseInt(this.dataset.productId)); });
    });
}

// ==================== FIREBASE CONFIG & INITIALIZATION ====================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcwkPCvkV9cGDfWuZIidHp6CR_DlOLUNY",
  authDomain: "electroworld-f3c0c.firebaseapp.com",
  projectId: "electroworld-f3c0c",
  storageBucket: "electroworld-f3c0c.firebasestorage.app",
  messagingSenderId: "762961741481",
  appId: "1:762961741481:web:ed72005732a905dd2f0bb8",
  measurementId: "G-2595EJPPEQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global products array (loaded from Firebase)
let products = [];

// 🔥 Load products from Firebase Firestore
async function loadProductsFromFirebase() {
    try {
        const snapshot = await db.collection("products").get();
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(`✅ Loaded ${products.length} products from Firebase`);
        renderProducts(products);
        if (typeof renderFeaturedProducts === 'function') renderFeaturedProducts();
    } catch (error) {
        console.error("❌ Error loading products:", error);
        alert("Could not load products from database.");
    }
}

// ==================== PRODUCT DETAIL MODAL ====================
function openProductDetail(productId) {
    const p = products.find(p => p.id === productId);
    if (!p) return;

    document.getElementById('pdBreadcrumb').textContent = `Home / ${p.category.charAt(0).toUpperCase() + p.category.slice(1)} / ${p.name}`;
    document.getElementById('pdImage').src = p.image;
    document.getElementById('pdBrand').textContent = p.brand;
    document.getElementById('pdCategory').textContent = p.category.charAt(0).toUpperCase() + p.category.slice(1);
    document.getElementById('pdBadge').textContent = p.badge;
    document.getElementById('pdName').textContent = p.name;

    const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
    document.getElementById('pdStars').textContent = stars;
    document.getElementById('pdRatingText').textContent = `(${p.rating}) · Verified Buyers`;

    document.getElementById('pdPrice').textContent = `₹ ${p.price.toLocaleString('en-IN')}`;
    const emi = Math.round(p.price / 12);
    document.getElementById('pdEmi').textContent = `✅ EMI from ₹${emi.toLocaleString('en-IN')}/month · Free Delivery · Easy Returns`;

    document.getElementById('pdDesc').textContent = p.description || `${p.name} is a top-quality product from ${p.brand}. Designed for reliability, performance, and value.`;

    // Specs
    const specGrid = document.getElementById('pdSpecGrid');
    specGrid.innerHTML = '';
    if (p.specs && p.specs.length) {
        p.specs.forEach(([label, value]) => {
            specGrid.innerHTML += `
                <div class="pd-spec-item">
                    <span class="sl">${label}</span>
                    <span class="sv">${value}</span>
                </div>`;
        });
    }

    document.getElementById('pdAddCart').onclick  = () => { addToCart(p.id); closeProductDetail(); };
    document.getElementById('pdWishlist').onclick = () => toggleWishlist(p.id);

    document.getElementById('productDetailModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    document.getElementById('productDetailModal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close detail modal on backdrop click
document.getElementById('productDetailModal').addEventListener('click', function(e) {
    if (e.target === this) closeProductDetail();
});

// ==================== CART ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) { existing.quantity += 1; }
    else           { cart.push({ ...product, quantity: 1 }); }
    saveCart();
    updateCartUI();
    showNotification(`🛒 ${product.name} added to cart!`);
}

function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    if (!cart.length) {
        cartItems.innerHTML = '<p style="text-align:center; color:#666; padding:2rem;">Your cart is empty</p>';
        cartTotal.textContent = '₹ 0';
        return;
    }
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60/eee/666?text=No+Image'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹ ${item.price.toLocaleString('en-IN')}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
                </div>
            </div>
        </div>`).join('');
    const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    cartTotal.textContent = `₹ ${total.toLocaleString('en-IN')}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId);
        else { saveCart(); updateCartUI(); renderCartItems(); }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart(); updateCartUI(); renderCartItems();
}

// ==================== WISHLIST MODAL ====================
function showWishlist() {
    document.getElementById('dotsDropdown').style.display = 'none';
    document.getElementById('wishlistModal').style.display = 'block';
    renderWishlist();
}
function closeWishlistModal() { document.getElementById('wishlistModal').style.display = 'none'; }

function renderWishlist() {
    const container = document.getElementById('wishlistItems');
    if (!wishlist.length) {
        container.innerHTML = '<p style="text-align:center; padding:40px; color:#666;">Your wishlist is empty</p>';
        return;
    }
    container.innerHTML = wishlist.map(id => {
        const p = products.find(prod => prod.id === id);
        if (!p) return '';
        return `<div class="cart-item">
            <img src="${p.image}" alt="${p.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
            <div class="cart-item-info">
                <h4>${p.name}</h4>
                <p>₹ ${p.price.toLocaleString('en-IN')}</p>
                <button onclick="addToCart(${p.id}); renderWishlist();" style="background:#007AFF;color:white;border:none;padding:8px 16px;border-radius:8px;margin-top:8px;cursor:pointer;">🛒 Add to Cart</button>
            </div>
            <button onclick="removeFromWishlist(${p.id})" style="color:#e74c3c;background:none;border:none;font-size:1.4rem;cursor:pointer;">🗑️</button>
        </div>`;
    }).join('');
}
function removeFromWishlist(id) {
    wishlist = wishlist.filter(i => i !== id);
    saveWishlist(); renderWishlist();
}

// ==================== NOTIFICATION ====================
function showNotification(message) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = message;
    n.style.cssText = 'position:fixed;top:100px;right:20px;background:#34C759;color:white;padding:1rem 2rem;border-radius:10px;z-index:30000;font-weight:500;box-shadow:0 10px 30px rgba(52,199,89,0.4);transform:translateX(400px);transition:transform 0.3s ease;font-family:Poppins,sans-serif;';
    document.body.appendChild(n);
    setTimeout(() => n.style.transform = 'translateX(0)', 100);
    setTimeout(() => { n.style.transform = 'translateX(400px)'; setTimeout(() => n.remove(), 300); }, 3000);
}

// ==================== SCROLL TO TOP ====================
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    if (scrollToTopBtn.style.display === 'flex') {
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    }
});
scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==================== SCROLL TO PRODUCTS ====================
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ==================== SETUP EVENT LISTENERS ====================
function setupEventListeners() {
    let currentMinPrice = 5000;

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyAllFilters();
        });
    });

    // Price slider
    const minPriceSlider = document.getElementById('minPrice');
    const priceDisplay   = document.getElementById('priceRangeDisplay');
    if (minPriceSlider) {
        minPriceSlider.addEventListener('input', () => {
            currentMinPrice = parseInt(minPriceSlider.value);
            priceDisplay.textContent = `₹${currentMinPrice.toLocaleString('en-IN')} – ₹3,00,000`;
            applyAllFilters();
        });
    }

    // Search
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        const searchBox = searchInput.parentElement;
        const clearBtn  = document.createElement('span');
        clearBtn.innerHTML = '×';
        clearBtn.style.cssText = 'position:absolute;right:15px;top:50%;transform:translateY(-50%);font-size:1.6rem;color:#999;cursor:pointer;display:none;';
        searchBox.style.position = 'relative';
        searchBox.appendChild(clearBtn);
        searchInput.addEventListener('input', () => {
            clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
            applyAllFilters();
        });
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            applyAllFilters();
            searchInput.focus();
        });
    }

    function applyAllFilters() {
        const activeBtn   = document.querySelector('.filter-btn.active');
        const filterValue = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchTerm  = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const minP        = parseInt(document.getElementById('minPrice')?.value || 5000);

        let filtered = products;

        if (filterValue !== 'all') {
            filtered = filtered.filter(p => {
                if (filterValue === 'apple')   return p.brand.toLowerCase() === 'apple';
                if (filterValue === 'samsung') return p.brand.toLowerCase() === 'samsung';
                if (filterValue === 'oneplus') return p.brand.toLowerCase() === 'oneplus';
                if (filterValue === 'xiaomi')  return p.brand.toLowerCase() === 'xiaomi' || p.brand.toLowerCase() === 'poco' || p.brand.toLowerCase() === 'redmi';
                if (filterValue === 'lg')      return p.brand.toLowerCase() === 'lg';
                return p.category === filterValue;
            });
        }

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm) ||
                (p.description && p.description.toLowerCase().includes(searchTerm))
            );
        }

        filtered = filtered.filter(p => p.price >= minP);
        renderProducts(filtered);
    }

    // Cart modal
    if (cartIcon)  cartIcon.addEventListener('click',  () => { cartModal.style.display = 'block'; renderCartItems(); });
    if (closeCart) closeCart.addEventListener('click', () => { cartModal.style.display = 'none'; });
    window.addEventListener('click', e => { if (e.target === cartModal) cartModal.style.display = 'none'; });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (!cart.length) { alert("Your cart is empty!"); return; }
            cartModal.style.display = 'none';
            const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
            document.getElementById('checkoutTotal').textContent = `₹ ${total.toLocaleString('en-IN')}`;
            document.getElementById('checkoutModal').style.display = 'block';
        });
    }

    // Three dots dropdown
    const menuDots    = document.getElementById('menuDots');
    const dotsDropdown= document.getElementById('dotsDropdown');
    if (menuDots) {
        menuDots.addEventListener('click', e => {
            e.stopImmediatePropagation();
            dotsDropdown.style.display = dotsDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    document.addEventListener('click', e => {
        if (menuDots && !menuDots.contains(e.target)) dotsDropdown.style.display = 'none';
    });
}

// ==================== CHECKOUT ====================
function closeCheckoutModal() { document.getElementById('checkoutModal').style.display = 'none'; }

function proceedToPayment() {
    const name    = document.getElementById('checkoutName').value.trim();
    const phone   = document.getElementById('checkoutPhone').value.trim();
    const email   = document.getElementById('checkoutEmail').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    if (!name || !phone || !email || !address) { alert("❌ Please fill all the fields!"); return; }

    alert(`🎉 Order Placed Successfully!\n\nThank you, ${name}!\n📞 Phone: ${phone}\n📧 Email: ${email}\n📍 Address: ${address}\n\nYour order has been confirmed. We'll contact you at +91 9641253844 for delivery details.`);
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    document.getElementById('cartModal').style.display = 'none';
}

// ==================== ADMIN PANEL ====================
// ==================== ADMIN PANEL - FIREBASE CRUD ====================

async function addNewProduct() {
    const name     = document.getElementById('newName').value.trim();
    const brand    = document.getElementById('newBrand').value.trim();
    const category = document.getElementById('newCategory').value.trim();
    const price    = parseInt(document.getElementById('newPrice').value);
    const image    = document.getElementById('newImage').value.trim();

    if (!name || !brand || !category || isNaN(price) || !image) {
        alert("Please fill all fields");
        return;
    }

    try {
        await db.collection("products").add({
            name, brand, category, price, image,
            rating: 4.5,
            badge: "New",
            description: `${name} from ${brand}. Available at Electro World.`,
            specs: [["Brand", brand], ["Category", category], ["Price", `₹${price}`]]
        });
        alert(`✅ Product "${name}" added to Firebase!`);
        loadProductsFromFirebase();
        // Clear form
        ['newName','newBrand','newCategory','newPrice','newImage'].forEach(id => {
            document.getElementById(id).value = '';
        });
    } catch (e) {
        console.error(e);
        alert("Error adding product");
    }
}

async function quickChangePrice() {
    const id = document.getElementById('pricePid').value.trim();
    const price = parseInt(document.getElementById('newPriceVal').value);
    if (!id || isNaN(price)) return alert("Invalid Product ID or Price");

    try {
        await db.collection("products").doc(id).update({ price });
        alert(`✅ Price updated!`);
        loadProductsFromFirebase();
    } catch (e) {
        alert("Error updating price");
    }
}

async function quickChangeImage() {
    const id  = document.getElementById('pid').value.trim();
    const url = document.getElementById('purl').value.trim();
    if (!id || !url) return alert("Enter valid Product ID and Image URL");

    try {
        await db.collection("products").doc(id).update({ image: url });
        alert(`✅ Image updated!`);
        loadProductsFromFirebase();
    } catch (e) {
        alert("Error updating image");
    }
}

function addNewProduct() {
    const name     = document.getElementById('newName').value.trim();
    const brand    = document.getElementById('newBrand').value.trim();
    const category = document.getElementById('newCategory').value.trim();
    const price    = parseInt(document.getElementById('newPrice').value);
    const image    = document.getElementById('newImage').value.trim();
    if (!name || !brand || !category || isNaN(price) || !image) { alert("Please fill all fields"); return; }

    const newId = Math.max(...products.map(p => p.id)) + 1;
    products.push({ id: newId, name, brand, category, price, image, rating: 4.5, badge: "New", description: `${name} from ${brand}. Available at Electro World.`, specs: [["Brand", brand], ["Category", category], ["Price", `₹${price.toLocaleString('en-IN')}`]] });
    localStorage.setItem("electroProducts", JSON.stringify(products));
    renderProducts(products);
    alert(`✅ Product "${name}" added successfully!`);
    ['newName','newBrand','newCategory','newPrice','newImage'].forEach(id => { document.getElementById(id).value = ''; });
}

// ==================== CONTACT FORM ====================
function submitContactForm() {
    const name    = document.getElementById('cName').value.trim();
    const phone   = document.getElementById('cPhone').value.trim();
    const email   = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value;
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !phone || !email || !subject || !message) {
        showNotification('❌ Please fill all required fields!');
        return;
    }

    // Simulate form submission
    showNotification('✅ Message sent! We\'ll respond within 24 hours.');
    ['cName','cPhone','cEmail','cMessage'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('cSubject').selectedIndex = 0;
}

// ==================== FEEDBACK FORM ====================
let currentRating = 0;
let currentFeedbackType = '';

function setRating(val) {
    currentRating = val;
    const labels = ['😞 Poor', '😐 Fair', '🙂 Good', '😊 Great', '🤩 Excellent!'];
    document.getElementById('ratingLabel').textContent = labels[val - 1];
    document.querySelectorAll('#starRating span').forEach((s, i) => {
        s.classList.toggle('active', i < val);
    });
}

function selectFeedbackType(btn, type) {
    currentFeedbackType = type;
    document.querySelectorAll('.feedback-type-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('fbType').value = type;
}

function submitFeedback() {
    const name    = document.getElementById('fbName').value.trim();
    const email   = document.getElementById('fbEmail').value.trim();
    const message = document.getElementById('fbMessage').value.trim();

    if (!name) { showNotification('❌ Please enter your name!'); return; }
    if (!message) { showNotification('❌ Please write your feedback!'); return; }
    if (!currentRating) { showNotification('❌ Please select a rating!'); return; }

    // Simulate submission
    showNotification(`🙏 Thank you, ${name}! Your ${currentRating}-star feedback has been submitted.`);
    document.getElementById('fbName').value    = '';
    document.getElementById('fbEmail').value   = '';
    document.getElementById('fbMessage').value = '';
    currentRating = 0;
    currentFeedbackType = '';
    document.getElementById('ratingLabel').textContent = 'Tap a star to rate';
    document.querySelectorAll('#starRating span').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.feedback-type-btn').forEach(b => b.classList.remove('selected'));
}

// Login background slider
let loginSlideIndex = 0;
const loginSlides = document.querySelectorAll('.login-slide');
if (loginSlides.length > 0) {
    setInterval(() => {
        loginSlides[loginSlideIndex].classList.remove('active');
        loginSlideIndex = (loginSlideIndex + 1) % loginSlides.length;
        loginSlides[loginSlideIndex].classList.add('active');
    }, 4000);
}
