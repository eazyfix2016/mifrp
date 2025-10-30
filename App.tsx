import React, { useState, useEffect } from 'react';
import CustomerView from './components/CustomerView';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { Step } from './types';

const initialSteps: Step[] = [
    {
        id: 1,
        title: "تحميل برنامج USB 197",
        description: "قم بتحميل الأداة المخصصة لعملية الاتصال.",
        adminNote: "تأكد من تعطيل برنامج مكافحة الفيروسات قبل تشغيل الأداة لتجنب أي مشاكل.",
        adminImage: "",
        action: {
            text: "تحميل برنامج USB 197",
            href: "#",
            type: "download"
        }
    },
    {
        id: 2,
        title: "إضافة الـ IP في البرنامج",
        description: "افتح البرنامج وأضف العنوان التالي:",
        ipAddress: "104.218.49.37",
        adminNote: "",
        adminImage: ""
    },
    {
        id: 3,
        title: "توليد عنوان الـ IP الخاص بك",
        description: "اضغط الزر أدناه للحصول على عنوان IP الخاص بك تلقائياً.",
        adminNote: "",
        adminImage: "",
        action: {
            text: "توليد IP الخاص بي",
            type: "generate-ip"
        }
    },
    {
        id: 4,
        title: "توصيل الهاتف عبر Mi Assistant",
        description: "قم بتوصيل جهازك أثناء وجوده في وضع الريكفري (Recovery Mode):",
        details: [
            "ادخل إلى Recovery Mode.",
            "ستظهر لك 3 خيارات: <span class=\"font-semibold text-blue-600\">Reboot, Wipe Data, Connect with Mi Assistant</span>",
            "اختر <span class=\"font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded\">Connect with Mi Assistant</span> ثم انتظر حتى يتم الاتصال بنجاح 👌"
        ],
        adminNote: "",
        adminImage: "https://placehold.co/600x300/3b82f6/ffffff/png?text=Connect+with+Mi+Assistant"
    }
];


const App: React.FC = () => {
    const [view, setView] = useState('customer'); // 'customer' or 'admin'
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) return false;
        try {
            // تحقق من صلاحية التوكن (مثال بسيط)
            const [timestamp, hash] = token.split('.');
            const isValid = parseInt(timestamp) > Date.now() - (24 * 60 * 60 * 1000); // 24 ساعة
            return isValid;
        } catch {
            return false;
        }
    });
    const [steps, setSteps] = useState<Step[]>(() => {
        try {
            const savedSteps = localStorage.getItem('frpSteps');
            return savedSteps ? JSON.parse(savedSteps) : initialSteps;
        } catch (error) {
            console.error("Failed to parse steps from localStorage", error);
            return initialSteps;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('frpSteps', JSON.stringify(steps));
        } catch (error) {
            console.error("Failed to save steps to localStorage", error);
        }
    }, [steps]);

    const generateToken = () => {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2);
        return `${timestamp}.${random}`;
    };

    const handleLogin = () => {
        const token = generateToken();
        sessionStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setView('customer');
        // تنظيف أي بيانات حساسة من الذاكرة
        setSteps(initialSteps);
    };

    if (view === 'admin') {
        if (isAuthenticated) {
            return <AdminPanel steps={steps} setSteps={setSteps} setView={setView} onLogout={handleLogout} />;
        } else {
            return <LoginPage onLogin={handleLogin} />;
        }
    }

    return <CustomerView steps={steps} setView={setView} />;
};

export default App;