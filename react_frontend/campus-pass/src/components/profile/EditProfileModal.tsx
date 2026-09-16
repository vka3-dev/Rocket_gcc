import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { showToast } = useData();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [institution, setInstitution] = useState(currentUser.institution);

  useEffect(() => {
    setName(currentUser.name);
    setPhone(currentUser.phone);
    setInstitution(currentUser.institution);
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim(),
      phone: phone.trim(),
      institution: institution.trim(),
    });
    showToast('Profile updated successfully', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">edit_note</span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Edit Personal Information
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant block">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant block">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant block">
              College / Department
            </label>
            <input
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container transition-colors"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-primary-container mt-0.5">
              info
            </span>
            <span className="font-body-sm text-body-sm">
              Institutional email and Student Roll are locked by Apex Academic Services SSO.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high active:scale-95 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container active:scale-95 transition-all shadow-sm flex items-center gap-1.5 font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
