import React, { useState } from 'react';
import StepCard from './StepCard';
import ActionButton from './ActionButton';
import { Step } from '../types';

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface CustomerViewProps {
    steps: Step[];
    setView: (view: 'customer' | 'admin') => void;
}

const CustomerView: React.FC<CustomerViewProps> = ({ steps, setView }) => {
    const [ipCopied, setIpCopied] = useState(false);
    const [generatedIp, setGeneratedIp] = useState<string | null>(null);
    const [isGeneratingIp, setIsGeneratingIp] = useState(false);
    const [generatedIpCopied, setGeneratedIpCopied] = useState(false);
    
    const handleCopyIp = (ipAddress: string) => {
        navigator.clipboard.writeText(ipAddress);
        setIpCopied(true);
        setTimeout(() => setIpCopied(false), 2000);
    };

    const handleGenerateIp = async () => {
        setIsGeneratingIp(true);
        setGeneratedIp(null);
        setGeneratedIpCopied(false);
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setGeneratedIp(data.ip);
        } catch (error) {
            console.error("Failed to fetch IP:", error);
            setGeneratedIp("فشل في جلب الـ IP. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsGeneratingIp(false);
        }
    };

    const handleCopyGeneratedIp = () => {
        if (generatedIp) {
            navigator.clipboard.writeText(generatedIp);
            setGeneratedIpCopied(true);
            setTimeout(() => setGeneratedIpCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl mx-auto relative">
                 <button 
                    onClick={() => setView('admin')}
                    className="absolute top-0 right-0 m-2 p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 group"
                    aria-label="الذهاب إلى لوحة التحكم"
                    title="الذهاب إلى لوحة التحكم"
                >
                    <AdminIcon />
                </button>

                <header className="text-center mb-8 pt-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">🔓 خدمة إزالة FRP من أجهزة شاومي</h1>
                    <p className="text-lg text-gray-600">
                        احصل على إزالة FRP بشكل احترافي وسريع بخطوات بسيطة 👇
                    </p>
                </header>

                <main className="space-y-6">
                   {steps.map(step => (
                        <StepCard
                            key={step.id}
                            stepNumber={step.id}
                            title={step.title}
                            adminNote={step.adminNote}
                            adminImage={step.adminImage}
                        >
                            <p className="text-gray-600 mb-4">{step.description}</p>
                            
                            {step.action?.type === 'generate-ip' && (
                                <div className="space-y-4">
                                    <button
                                        onClick={handleGenerateIp}
                                        disabled={isGeneratingIp}
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        {isGeneratingIp ? (
                                            'جاري التوليد...'
                                        ) : (
                                            <>
                                                {step.action.text}
                                                <LinkIcon />
                                            </>
                                        )}
                                    </button>
                                    {generatedIp && (
                                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                                            <code className="text-lg font-mono text-gray-800 tracking-widest">{generatedIp}</code>
                                            <button
                                                onClick={handleCopyGeneratedIp}
                                                className={`p-2 rounded-md transition-all duration-200 text-gray-700 ${generatedIpCopied ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                aria-label="Copy Generated IP Address"
                                            >
                                                {generatedIpCopied ? <CheckIcon /> : <CopyIcon />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step.action && (step.action.type === 'download' || step.action.type === 'link') && (
                                 <ActionButton
                                    text={step.action.text}
                                    icon={step.action.type === 'download' ? <DownloadIcon /> : <LinkIcon />}
                                    href={step.action.href!}
                                    target={step.action.type === 'link' ? "_blank" : undefined}
                                    rel={step.action.type === 'link' ? "noopener noreferrer" : undefined}
                                    className="bg-blue-500 hover:bg-blue-600"
                                />
                            )}

                            {step.ipAddress && (
                                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                                    <code className="text-lg font-mono text-gray-800 tracking-widest">{step.ipAddress}</code>
                                    <button
                                        onClick={() => handleCopyIp(step.ipAddress!)}
                                        className={`p-2 rounded-md transition-all duration-200 text-gray-700 ${ipCopied ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        aria-label="Copy IP Address"
                                    >
                                        {ipCopied ? <CheckIcon /> : <CopyIcon />}
                                    </button>
                                </div>
                            )}
                            {step.details && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {step.details.map((detail, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: detail }} />
                                    ))}
                                </ul>
                            )}
                        </StepCard>
                   ))}
                </main>

                 <footer className="text-center mt-10 text-gray-500 text-sm">
                     <p>&copy; {new Date().getFullYear()} FRP Removal Service. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default CustomerView;