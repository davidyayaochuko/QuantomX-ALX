import { useState } from 'react';
import StructureForm from './StructureForm';
import { Card, Button, ListGroup } from 'react-bootstrap';


type Structure = {
  department: string;
  team?: string;
};

export default function OrganizationStructure() {
  const [items, setItems] = useState<Structure[]>([]);
  const add = (entry: Structure) => setItems([...items, entry]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <Card className="mx-auto" style={{ maxWidth: 800 }}>
      <Card.Header>Organization Structure</Card.Header>
      <Card.Body>
        <StructureForm onAdd={add} />
        <ListGroup variant="flush">
          {items.map((it, i) => (
            <ListGroup.Item key={i} className="d-flex justify-content-between">
              <span><strong>{it.department}</strong>{it.team && ` – ${it.team}`}</span>
              <Button size="sm" variant="danger" onClick={() => remove(i)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
