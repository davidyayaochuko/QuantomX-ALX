// src/components/OrganizationRegistration/OrganizationForm.tsx
import { useState, FormEvent } from 'react';

type OrganizationData = {
  name: string;
  email: string;
  logo?: File;
};

type Props = {
  onSubmit: (data: OrganizationData) => void;
};

export default function OrganizationForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState<File | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSubmit({ name, email, logo });
    setName('');
    setEmail('');
    setLogo(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group mb-3">
        <label>Organization Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. QuantomX"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Organization Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="e.g. hello@quantomx.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Upload Logo (optional)</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setLogo(file);
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Register Organization
      </button>
    </form>
  );
}
