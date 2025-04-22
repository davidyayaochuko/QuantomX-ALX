import React, { useState } from 'react';
import InviteForm from './InviteForm';
import { Form as RForm, Button as RButton, ListGroup } from 'react-bootstrap';

type Invite = { email: string; role: string };

export default function TeamInvites() {
    const [list, setList] = useState<{email:string;role:string}[]>([]);
    const invite = (e:string,r:string) => setList([...list,{email:e,role:r}]);
    return (
      <>
        <InviteForm onInvite={invite} />
        <ListGroup className="mx-auto mt-4" style={{ maxWidth: 600 }}>
          {list.map((i,idx)=>(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
              <span>{i.email} <em>({i.role})</em></span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
