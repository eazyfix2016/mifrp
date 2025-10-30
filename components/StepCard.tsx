import React from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  adminNote?: string;
  adminImage?: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, children, adminNote, adminImage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
          {stepNumber}
        </div>
        <h2 className="mr-4 text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        <div>{children}</div>
        
        {(adminNote || adminImage) && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            {adminImage && (
              <div>
                <img src={adminImage} alt={`توضيح للخطوة ${stepNumber}`} className="rounded-lg w-full object-cover" />
              </div>
            )}
            {adminNote && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-blue-800"><span className="font-bold text-blue-600">ملاحظة من الإدارة:</span> {adminNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;