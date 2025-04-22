import React, { useState, FormEvent } from 'react';
import { Form as BSForm, Button as BSButton } from 'react-bootstrap';

type BrandingData = {
  primaryColor: string;
  secondaryColor: string;
};

type Props = {
  onSubmit: (data: BrandingData) => void;
};

export default function BrandingForm({ onSubmit }: { onSubmit: (d: any) => void }) {
    const [primary, setPrimary] = useState('#0d6efd');
    const [secondary, setSecondary] = useState('#6c757d');
    const submit = (e: FormEvent) => { e.preventDefault(); onSubmit({ primary, secondary }); };
    return (
      <BSForm onSubmit={submit} className="mx-auto" style={{ maxWidth: 600 }}>
        <h5>Custom Branding</h5>
        <BSForm.Group className="mb-3">
          <BSForm.Label>Primary Color</BSForm.Label>
          <BSForm.Control type="color" value={primary} onChange={e => setPrimary(e.target.value)} />
        </BSForm.Group>
        <BSForm.Group className="mb-3">
          <BSForm.Label>Secondary Color</BSForm.Label>
          <BSForm.Control type="color" value={secondary} onChange={e => setSecondary(e.target.value)} />
        </BSForm.Group>
        <BSButton type="submit" variant="primary">Save Branding</BSButton>
      </BSForm>
    );
  }
  