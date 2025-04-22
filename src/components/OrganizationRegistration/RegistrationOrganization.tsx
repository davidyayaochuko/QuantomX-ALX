// src/components/OrganizationRegistration/RegistrationOrganization.tsx
import OrganizationForm from './OrganizationForm';

export default function RegistrationOrganization() {
  const onSubmit = (data: any) => console.log('Org Data:', data);
  return <OrganizationForm onSubmit={onSubmit} />;
}