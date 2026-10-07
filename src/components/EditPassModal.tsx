import React, { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { BusPassData } from '../types/pass';

interface EditPassModalProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: BusPassData) => void;
  onReset: () => void;
}

export const EditPassModal: React.FC<EditPassModalProps> = ({
  pass,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<BusPassData>({ ...pass });

  if (!isOpen) return null;

  const handleChange = (field: keyof BusPassData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-purple-800 px-5 py-3.5 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm">Customize Bus Pass</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Employee Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Employee ID</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => handleChange('employeeId', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Route Type</label>
              <input
                type="text"
                value={formData.routeType}
                onChange={(e) => handleChange('routeType', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Bus Stop Name</label>
            <input
              type="text"
              value={formData.busStopName}
              onChange={(e) => handleChange('busStopName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Office In Time</label>
              <input
                type="text"
                value={formData.officeInTime}
                onChange={(e) => handleChange('officeInTime', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Office Out Time</label>
              <input
                type="text"
                value={formData.officeOutTime}
                onChange={(e) => handleChange('officeOutTime', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Route Description Note</label>
            <textarea
              rows={2}
              value={formData.routeDescription}
              onChange={(e) => handleChange('routeDescription', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none text-xs"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Original
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
