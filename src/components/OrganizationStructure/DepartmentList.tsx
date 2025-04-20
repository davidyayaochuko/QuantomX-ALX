type Structure = {
    department: string;
    team?: string;
  };
  
  type Props = {
    structures: Structure[];
    onDelete: (index: number) => void;
  };
  
  export default function DepartmentList({ structures, onDelete }: Props) {
    return (
      <div>
        <h5>Organization Structure</h5>
        {structures.length === 0 && <p className="text-muted">No departments added yet.</p>}
        <ul className="list-group">
          {structures.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.department}</strong>
                {item.team && <span> – {item.team}</span>}
              </div>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  