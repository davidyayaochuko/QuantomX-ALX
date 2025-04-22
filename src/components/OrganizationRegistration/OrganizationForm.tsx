// src/components/OrganizationRegistration/OrganizationForm.tsx
import React, { useState, FormEvent } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';


type OrganizationData = {
  name: string;
  email: string;
  logo?: File;
};

type Props = {
  onSubmit: (data: OrganizationData) => void;
};

export default function OrganizationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, logo });
    setName(''); setEmail(''); setLogo(null); setPreview(null);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 600 }}>
      <Card.Header>Register Organization</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="QuantomX" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@quantomx.com" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFile} />
            {preview && <Image src={preview} thumbnail className="mt-2" style={{ maxHeight: 100 }} />}
          </Form.Group>
          <Button type="submit" variant="primary">Register Organization</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
