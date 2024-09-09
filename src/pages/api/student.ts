// pages/api/students.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for students
let students = [
  { id: 1, name: 'Prakhar mishra', age: 20,subject:'Math' },
  { id: 2, name: 'Alok Singh', age: 21,subject: 'Java'},
  { id: 3, name: 'Suryansh Pandey', age: 21 ,subject:'Java'},
  { id: 4, name: 'Nikil Singh', age: 23,subject:'Web Tech ' },
  { id: 5, name: 'Anuj Yadav', age: 28,subject:'SQL' },
  { id: 6, name: 'Anupam Singh', age: 27,subject:'OS' },
  { id: 7, name: 'Akhil Singh', age: 19 ,subject:'DBMS'},
  { id: 8, name: 'Hemant Singh', age: 18,subject:'Computer Networks'},
  { id: 9, name: 'Priyanka Tiwari', age: 20,subject:'RTS' },
  { id: 10, name: 'Pragya Dubey', age: 21 ,subject:'BEE'},
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all students
      return res.status(200).json(students);

    case 'POST':
      // Add a new student
      const newStudent = { id: Date.now(), ...req.body };
      students.push(newStudent);
      return res.status(201).json(newStudent);

    case 'PUT':
      // Update an existing student
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'ID is required for update.' });
      }

      const updateIndex = students.findIndex((student) => student.id === id);
      if (updateIndex === -1) {
        return res.status(404).json({ error: 'Student not found.' });
      }

      students[updateIndex] = { ...students[updateIndex], ...req.body };
      return res.status(200).json(students[updateIndex]);

    case 'DELETE':
      // Delete a student
      const deleteId = parseInt(req.query.id as string, 10);
      if (!deleteId) {
        return res.status(400).json({ error: 'ID is required for deletion.' });
      }

      students = students.filter((student) => student.id !== deleteId);
      return res.status(200).json({ message: 'Student deleted successfully.' });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
