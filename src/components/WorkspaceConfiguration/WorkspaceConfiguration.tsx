import { useState } from 'react';
import { Card } from 'react-bootstrap';

import TypeForm from './TypeForm';
import AttributeForm from './AttributeForm';
import ScheduleForm from './ScheduleForm';
import LayoutUploader from './LayoutUploader';

export default function WorkspaceConfiguration() {
  const [types, setTypes] = useState<string[]>([]);

  const addType = (type: string) => setTypes([...types, type]);
  const updateAttr = (name: string, attrs: any) => console.log('Attrs', name, attrs);
  const updateSched = (name: string, schedule: any) => console.log('Sched', name, schedule);
  const uploadLayout = (name: string, files: File[]) => console.log('Layouts', name, files);

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <TypeForm onAdd={addType} />
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <AttributeForm types={types} onUpdate={updateAttr} />
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <ScheduleForm types={types} onUpdate={updateSched} />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <LayoutUploader types={types} onUpload={uploadLayout} />
        </Card.Body>
      </Card>
    </>
  );
}
