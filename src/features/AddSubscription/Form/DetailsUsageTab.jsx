import React from 'react';

const DetailsUsageTab = ({ formData, errors, handleInputChange }) => {
  return (
    <div className="tab-content">
      {/* Free Trial Toggle */}
      <div className="form-group">
        <label className="toggle-label">
          <input
            type="checkbox"
            name="isTrial"
            checked={formData.isTrial}
            onChange={handleInputChange}
          />
          <span className="toggle-slider"></span>
          This is a free trial
        </label>
      </div>

      {/* Trial End Date - Only show if trial is checked */}
      {formData.isTrial && (
        <div className="form-group">
          <label htmlFor="trialEndDate">Trial End Date *</label>
          <input
            type="date"
            id="trialEndDate"
            name="trialEndDate"
            value={formData.trialEndDate}
            onChange={handleInputChange}
            className={errors.trialEndDate ? 'error' : ''}
          />
          {errors.trialEndDate && <span className="error-message">{errors.trialEndDate}</span>}
        </div>
      )}

      {/* Usage Hours and Frequency */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="usageHours">Usage Hours (per week)</label>
          <input
            type="number"
            id="usageHours"
            name="usageHours"
            value={formData.usageHours}
            onChange={handleInputChange}
            placeholder="e.g., 10"
            min="0"
            max="168"
            className={errors.usageHours ? 'error' : ''}
          />
          {errors.usageHours && <span className="error-message">{errors.usageHours}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="usageFrequency">Usage Frequency</label>
          <select
            id="usageFrequency"
            name="usageFrequency"
            value={formData.usageFrequency}
            onChange={handleInputChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>

      {/* Renewal Date */}
      <div className="form-group">
        <label htmlFor="renewalDate">Next Renewal Date</label>
        <input
          type="date"
          id="renewalDate"
          name="renewalDate"
          value={formData.renewalDate}
          onChange={handleInputChange}
        />
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any additional notes about this subscription..."
          rows="3"
        />
      </div>
    </div>
  );
};

export default DetailsUsageTab;