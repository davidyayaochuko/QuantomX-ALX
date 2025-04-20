// src/components/OrganizationRegistration/RegistrationOrganization.tsx
import OrganizationForm from './OrganizationForm';

export default function RegistrationOrganization() {
  const handleSubmit = (data: {
    name: string;
    email: string;
    logo?: File;
  }) => {
    console.log('Organization Data Submitted:', data);
    // Later: Send to API or save in context/store
  };

  return (
    <div className="container">
      <h3 className="mt-4 mb-4">Register Your Organization</h3>
      <OrganizationForm onSubmit={handleSubmit} />
    </div>
  );
}
