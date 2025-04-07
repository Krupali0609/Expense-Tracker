import React, { useState } from 'react';
import './GroupForm.css'; // Import the CSS file


interface GroupFormProps {
  onAddMember: (name: string) => void;
  members: { id: string; name: string }[];
}

const GroupForm: React.FC<GroupFormProps> = ({ onAddMember, members }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddMember(name);
      setName('');
    }
  };

  return (
    <div className="group-form-container">
      <form onSubmit={handleSubmit} className="group-form">
        <h2 className="form-heading">Add Member</h2>
        <input
          type="text"
          value={name}
          placeholder="Enter the member's name"
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <button
          type="submit"
          className="submit-button"
          disabled={!name.trim()}
        >
          Add Member
        </button>

        <div className="member-list-container">
          <h3 className="members-heading">Members:</h3>
          <ul className="member-list">
            {members.map((member) => (
              <li key={member.id} className="member-item">
              
              👤{member.name}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default GroupForm;