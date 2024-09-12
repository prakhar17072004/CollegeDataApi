// components/StudentList.tsx

import { useEffect, useState } from 'react';

type Student = {
  id: number;
  name: string;
  age: number;
  subject: string;
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', subject: '' });

  // Fetch students data from API
  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // Handle adding a new student
  const handleAddStudent = async () => {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newStudent, age: parseInt(newStudent.age) }),
    });
    const data = await response.json();
    setStudents([...students, data]);
    setNewStudent({ name: '', age: '', subject: '' });
  };

  // Handle deleting a student
  const handleDeleteStudent = async (id: number) => {
    await fetch(`/api/students?id=${id}`, {
      method: 'DELETE',
    });
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="flex justify-between items-center mb-1">
            <span>{student.name} - {student.age} - {student.subject}</span>
            <button
              onClick={() => handleDeleteStudent(student.id)}
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
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newStudent.subject}
          onChange={(e) => setNewStudent({ ...newStudent, subject: e.target.value })}
          className="border p-1 mr-2"
        />
        <button onClick={handleAddStudent} className="bg-blue-500 text-white p-1">
          Add Student
        </button>
      </div>
    </div>
  );
}
