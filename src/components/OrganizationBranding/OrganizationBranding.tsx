import React from 'react';
import BrandingForm from './BrandingForm';

export default function OrganizationBranding() {
  const handleBrandingSubmit = (data: any) => {
    console.log('Branding:', data);
  };

  return <BrandingForm onSubmit={handleBrandingSubmit} />;
}
