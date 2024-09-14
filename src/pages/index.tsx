import React, { useState } from 'react';
import"../app/globals.css";
interface Student {
  id: number;
  name: string;
  age: number;
  subject: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

const StudentsAndTeachers = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [view, setView] = useState<'students' | 'teachers' | null>(null); // View state

  // Function to fetch students data
  const fetchStudents = () => {
    fetch('/api/student')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setView('students');
      })
      .catch((err) => console.error('Error fetching students:', err));
  };

  // Function to fetch teachers data
  const fetchTeachers = () => {
    fetch('/api/teacher')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setView('teachers');
      })
      .catch((err) => console.error('Error fetching teachers:', err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Fetch Students or Teachers</h2>

      {/* Buttons to fetch data */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={fetchStudents}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Fetch Students
        </button>
        <button
          onClick={fetchTeachers}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Fetch Teachers
        </button>
      </div>

      {/* Conditionally render the students list */}
      {view === 'students' && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Students List</h2>
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900">{student.name}</span>
                <span className="text-gray-600 text-center w-24">Age: {student.age}</span>
                <span className="text-blue-500">{student.subject}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the teachers list */}
      {view === 'teachers' && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Teachers List</h2>
          <ul className="space-y-4">
            {teachers.map((teacher) => (
              <li
                key={teacher.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900">{teacher.name}</span>
                <span className="text-green-500">{teacher.subject}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentsAndTeachers;
