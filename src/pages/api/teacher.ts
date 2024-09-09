// pages/api/teachers.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for teachers
let teachers = [
  
    { id: 1, name: 'Amit Singh', subject: 'Math' },
    { id: 2, name: 'Nikil Singh', subject: 'SQL' },
    { id: 3, name: 'Shambhu Kumar', subject: 'Java' },
    { id: 4, name: 'Ram Singh', subject: 'Web Tech' },
    { id: 5, name: 'Anmol Pandey', subject: 'OS' },
    { id: 6, name: 'Anurag Mishra', subject: 'BEE' },
    { id: 7, name: 'Rahul Kumar', subject: 'Computer Networks' },
    { id: 8, name: 'Vineet Mishra', subject: 'DBMS' },
    { id: 9, name: 'Vinay Mishra', subject: 'RTS' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all teachers
      return res.status(200).json(teachers);

    case 'POST':
      // Add a new teacher
      const newTeacher = { id: Date.now(), ...req.body };
      teachers.push(newTeacher);
      return res.status(201).json(newTeacher);

    case 'PUT':
      // Update an existing teacher
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'ID is required for update.' });
      }

      const updateIndex = teachers.findIndex((teacher) => teacher.id === id);
      if (updateIndex === -1) {
        return res.status(404).json({ error: 'Teacher not found.' });
      }

      teachers[updateIndex] = { ...teachers[updateIndex], ...req.body };
      return res.status(200).json(teachers[updateIndex]);

    case 'DELETE':
      // Delete a teacher
      const deleteId = parseInt(req.query.id as string, 10);
      if (!deleteId) {
        return res.status(400).json({ error: 'ID is required for deletion.' });
      }

      teachers = teachers.filter((teacher) => teacher.id !== deleteId);
      return res.status(200).json({ message: 'Teacher deleted successfully.' });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
