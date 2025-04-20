import { useState } from 'react';
import StructureForm from './StructureForm';
import DepartmentList from './DepartmentList';

type Structure = {
  department: string;
  team?: string;
};

export default function OrganizationStructure() {
  const [structures, setStructures] = useState<Structure[]>([]);

  const handleAdd = (entry: Structure) => {
    setStructures([...structures, entry]);
  };

  const handleDelete = (index: number) => {
    setStructures(structures.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Define Organization Structure</h4>
      <StructureForm onAdd={handleAdd} />
      <DepartmentList structures={structures} onDelete={handleDelete} />
    </div>
  );
}
