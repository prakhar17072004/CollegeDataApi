// components/TeacherList.tsx

import { useEffect, useState } from 'react';

type Teacher = {
  id: number;
  name: string;
  subject: string;
};

export default function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

  // Fetch teachers data from API
  useEffect(() => {
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  // Handle adding a new teacher
  const handleAddTeacher = async () => {
    const response = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher),
    });
    const data = await response.json();
    setTeachers([...teachers, data]);
    setNewTeacher({ name: '', subject: '' });
  };

  // Handle deleting a teacher
  const handleDeleteTeacher = async (id: number) => {
    await fetch(`/api/teachers?id=${id}`, {
      method: 'DELETE',
    });
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id} className="flex justify-between items-center mb-1">
            <span>{teacher.name} - {teacher.subject}</span>
            <button
              onClick={() => handleDeleteTeacher(teacher.id)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          className="border p-1 mr-2"
        />
        <button onClick={handleAddTeacher} className="bg-blue-500 text-white p-1">
          Add Teacher
        </button>
      </div>
    </div>
  );
}
