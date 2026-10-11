import React, { useState } from 'react';
import { X, Check, RotateCcw, Clock } from 'lucide-react';
import { BusPassData } from '../types/pass';

interface EditPassModalProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: BusPassData) => void;
  onReset: () => void;
  highlightDrop?: boolean;
}

export const EditPassModal: React.FC<EditPassModalProps> = ({
  pass,
  isOpen,
  onClose,
  onSave,
  onReset,
  highlightDrop = false,
}) => {
  const [formData, setFormData] = useState<BusPassData>({ ...pass });
  const dropInputRef = React.useRef<HTMLInputElement>(null);
  const dropLabelInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFormData({
      ...pass,
      dropLabel: pass.dropLabel || 'Drop Time',
      dropTime: pass.dropTime || pass.officeOutTime || '20:45',
    });
  }, [pass, isOpen]);

  React.useEffect(() => {
    if (isOpen && highlightDrop) {
      setTimeout(() => {
        dropLabelInputRef.current?.focus();
        dropLabelInputRef.current?.select();
      }, 100);
    }
  }, [isOpen, highlightDrop]);

  if (!isOpen) return null;

  const handleChange = (field: keyof BusPassData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      dropLabel: formData.dropLabel?.trim() || 'Drop Time',
      dropTime: formData.dropTime?.trim() || formData.officeOutTime || '20:45',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-purple-800 px-5 py-3.5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">
              {highlightDrop ? 'Edit Drop Timing & Pass Details' : 'Customize Bus Pass'}
            </h3>
            <p className="text-[11px] text-purple-200">
              All pass fields are fully editable
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
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

          <div>
            <label className="block text-slate-600 font-medium mb-1">Office In Time (Morning)</label>
            <input
              type="text"
              value={formData.officeInTime}
              onChange={(e) => handleChange('officeInTime', e.target.value)}
              placeholder="e.g. 10:20"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
          </div>

          {/* Dedicated Drop Timing & Editable Label Section */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              highlightDrop
                ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-400/50 shadow-sm'
                : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 font-semibold text-purple-950 text-xs">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>Drop Mode Text & Timing</span>
              </div>
              {highlightDrop && (
                <span className="text-[10px] text-purple-700 bg-purple-100 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                  Active Focus
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-medium mb-1 text-[11px]">
                  Drop Text / Label
                </label>
                <input
                  ref={dropLabelInputRef}
                  type="text"
                  value={formData.dropLabel ?? 'Drop Time'}
                  onChange={(e) => handleChange('dropLabel', e.target.value)}
                  placeholder="e.g. Start Time, Drop Time"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-600 focus:outline-none font-medium text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1 text-[11px]">
                  Time Value
                </label>
                <input
                  ref={dropInputRef}
                  type="text"
                  value={formData.dropTime || formData.officeOutTime || '20:45'}
                  onChange={(e) => {
                    handleChange('officeOutTime', e.target.value);
                    handleChange('dropTime', e.target.value);
                  }}
                  placeholder="e.g. 20:45, 22:00"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-600 focus:outline-none font-medium text-xs text-slate-800"
                  required
                />
              </div>
            </div>

            {/* Quick Text Presets */}
            <div className="mt-2.5">
              <div className="text-[10.5px] font-medium text-slate-500 mb-1.5">
                Quick Text Presets:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Start Time', 'Drop Time', 'Drop', 'Departure Time', 'Office Out Time'].map((preset) => {
                  const isSelected = (formData.dropLabel || 'Drop Time').trim().toLowerCase() === preset.toLowerCase();
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleChange('dropLabel', preset)}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Pass Card Preview */}
            <div className="mt-2.5 pt-2 border-t border-purple-200/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Live Pass Display Preview:</span>
              <span className="font-semibold text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded font-mono border border-purple-200/50">
                {(formData.dropLabel || 'Drop Time').trim().replace(/[-:]+$/, '').trim()}- {formData.dropTime || formData.officeOutTime || '20:45'}
              </span>
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
