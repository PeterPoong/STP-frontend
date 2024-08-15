import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const AcademicTranscript = () => {
  const [selectedExam, setSelectedExam] = useState('SPM');
  const exams = ['SPM', 'O-Level', 'GCSE', 'IGCSE', 'SSCE'];
  const subjects = [
    { name: 'Bahasa Melayu', grade: 'A+' },
    { name: 'Bahasa Inggeris', grade: 'A+' },
    { name: 'Matematik', grade: 'B+' },
    { name: 'Sains', grade: 'C+' },
    { name: 'Sejarah', grade: 'A+' },
    { name: 'Pendidikan Moral', grade: 'A' },
  ];

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4">
        {exams.map((exam) => (
          <button
            key={exam}
            className={`px-3 py-1 rounded ${selectedExam === exam ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedExam(exam)}
          >
            {exam}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded shadow">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{subject.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                subject.grade.includes('A') ? 'bg-green-500 text-white' :
                subject.grade.includes('B') ? 'bg-red-500 text-white' :
                'bg-yellow-500 text-black'
              }`}>
                GRADE: {subject.grade}
              </span>
            </div>
            <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a subject:"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Upload SPM Result Slip</p>
        <input type="file" className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer text-sm text-blue-500">
          Please upload your result if SPM result not yet received
        </label>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span>Show 10 entries</span>
          <input type="text" placeholder="Search..." className="p-1 border rounded" />
        </div>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Files</th>
              <th className="border p-2">Filename</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Trial 1 Result</td>
              <td className="border p-2">example_filename3.pdf</td>
              <td className="border p-2 flex justify-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                <Edit2 className="w-4 h-4 text-blue-500 cursor-pointer" />
              </td>
            </tr>
            <tr>
              <td className="border p-2">Official Result</td>
              <td className="border p-2">example_filename4.pdf</td>
              <td className="border p-2 flex justify-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                <Edit2 className="w-4 h-4 text-blue-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">ADD NEW</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">SAVE</button>
      </div>
    </div>
  );
};

export default AcademicTranscript;