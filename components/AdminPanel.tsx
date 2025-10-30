import React from 'react';
import { Step } from '../types';

interface AdminPanelProps {
    steps: Step[];
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
    setView: (view: 'customer' | 'admin') => void;
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ steps, setSteps, setView, onLogout }) => {

    const handleInputChange = (index: number, field: keyof Step, value: any) => {
        const newSteps = [...steps];
        // @ts-ignore
        newSteps[index][field] = value;
        setSteps(newSteps);
    };
    
    const handleActionChange = (index: number, field: 'text' | 'href', value: string) => {
        const newSteps = [...steps];
        if (newSteps[index].action) {
            // @ts-ignore
            newSteps[index].action[field] = value;
            setSteps(newSteps);
        }
    };

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange(index, 'adminImage', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">لوحة التحكم</h1>
                    <div className="flex items-center space-x-4">
                         <button
                            onClick={() => setView('customer')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            عرض صفحة العميل
                        </button>
                        <button
                            onClick={onLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </header>

                <main className="space-y-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                الخطوة {step.id}: {step.title}
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor={`adminNote-${step.id}`} className="block text-sm font-medium text-gray-600 mb-1">ملاحظة الإدارة</label>
                                    <textarea
                                        id={`adminNote-${step.id}`}
                                        rows={3}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                        value={step.adminNote}
                                        onChange={(e) => handleInputChange(index, 'adminNote', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor={`adminImage-${step.id}`} className="block text-sm font-medium text-gray-600 mb-1">رفع صورة توضيحية</label>
                                    <input
                                        type="file"
                                        id={`adminImage-${step.id}`}
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                    {step.adminImage && <img src={step.adminImage} alt="Preview" className="mt-2 rounded-lg max-h-40" />}
                                </div>

                                {step.action && (step.action.type === 'download' || step.action.type === 'link') && (
                                     <div>
                                        <label htmlFor={`actionLink-${step.id}`} className="block text-sm font-medium text-gray-600 mb-1">
                                            {step.action.type === 'download' ? 'رابط التحميل' : 'الرابط الخارجي'}
                                        </label>
                                        <input
                                            type="text"
                                            id={`actionLink-${step.id}`}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                            value={step.action.href || ''}
                                            onChange={(e) => handleActionChange(index, 'href', e.target.value)}
                                        />
                                    </div>
                                )}
                                
                                {step.ipAddress && (
                                     <div>
                                        <label htmlFor={`ipAddress-${step.id}`} className="block text-sm font-medium text-gray-600 mb-1">عنوان IP</label>
                                        <input
                                            type="text"
                                            id={`ipAddress-${step.id}`}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 font-mono tracking-widest focus:ring-blue-500 focus:border-blue-500"
                                            value={step.ipAddress}
                                            onChange={(e) => handleInputChange(index, 'ipAddress', e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;