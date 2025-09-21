// Utility functions for form handling

// Generate a unique 6-digit Order ID
export const generateOrderId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get user's IP address and system information
export const getUserSystemInfo = async () => {
  try {
    // Get IP address from multiple services for reliability
    let ipInfo = {};
    
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ipInfo.ip = ipData.ip;
    } catch (error) {
      // Fallback IP service
      try {
        const fallbackResponse = await fetch('https://httpbin.org/ip');
        const fallbackData = await fallbackResponse.json();
        ipInfo.ip = fallbackData.origin;
      } catch (fallbackError) {
        ipInfo.ip = 'Unable to detect';
      }
    }

    // Get additional system information
    const systemInfo = {
      ip: ipInfo.ip,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
    };

    // Get geolocation if possible (requires user permission)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          enableHighAccuracy: false
        });
      });
      
      systemInfo.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };
    } catch (error) {
      systemInfo.location = 'Permission denied or not available';
    }

    return systemInfo;
  } catch (error) {
    console.error('Error getting system info:', error);
    return {
      ip: 'Unable to detect',
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
      error: 'Some system information could not be retrieved'
    };
  }
};

// Format form data for Formspree submission
export const formatFormDataForSubmission = (formData, orderId, systemInfo, signatureData) => {
  const submissionData = {
    // Add Order ID
    orderId: orderId,
    
    // Form data
    ...formData,
    
    // System information for signature verification
    systemInfo: {
      ip: systemInfo.ip,
      userAgent: systemInfo.userAgent,
      platform: systemInfo.platform,
      language: systemInfo.language,
      timezone: systemInfo.timezone,
      timestamp: systemInfo.timestamp,
      screenResolution: systemInfo.screenResolution,
      location: systemInfo.location
    },
    
    // Signature data
    signature: {
      data: signatureData,
      timestamp: new Date().toISOString(),
      verified: true
    },
    
    // Submission metadata
    submissionDate: new Date().toLocaleDateString(),
    submissionTime: new Date().toLocaleTimeString(),
  };

  return submissionData;
};

// Validate form data before submission
export const validateFormData = (formData, step) => {
  const errors = {};

  switch (step) {
    case 1: // Order Info
      const requiredOrderFields = [
        'CustomerName', 'ShipDate', 'Mobile', 'Email', 
        'VehicleYear', 'Make', 'Model', 'Type', 
        'TotalTarif', 'FirstPayment', 'NextPayment'
      ];
      
      requiredOrderFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
          errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        }
      });

      // Validate email format
      if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
        errors.Email = 'Please enter a valid email address';
      }

      // Validate mobile number
      if (formData.Mobile && !/^\+?[\d\s\-\(\)]+$/.test(formData.Mobile)) {
        errors.Mobile = 'Please enter a valid mobile number';
      }
      break;

    case 2: // Origin
      const requiredOriginFields = [
        'OriginCity', 'OriginState', 'OriginPostal', 
        'PickupName', 'PickupContact', 'PickupAddress'
      ];
      
      requiredOriginFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
          errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        }
      });
      break;

    case 3: // Destination
      const requiredDestFields = [
        'DestinationCity', 'DestinationState', 'DestPostal',
        'DestinationName', 'DestinationContact', 'DestinationAddress'
      ];
      
      requiredDestFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
          errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        }
      });
      break;
  }

  return errors;
};
