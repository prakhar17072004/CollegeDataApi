// pages/index.tsx
import"../app/globals.css";

export default function Home() {
  return (
    <div className="bg-cyan-400 h-[100vh]">
    <div className="container  p-4 ">
      <h1 className="text-4xl font-bold mb-4 text-center ">STUDENTS AND TEACHER'S API DETAILS</h1>
      <div className="grid grid-cols-2 gap-4">
     
      <div className=" pt-[200px] w-[300px] ml-[500px] gap-14">
        <h2 className="text-center text-4xl text-blue-600 mb-5 underline">
      <a href="/api/student" target="_blank">Student's Api</a>
     </h2>
     <h2 className="text-center text-4xl text-blue-600 underline">
      <a href="/api/teacher" target="_blank">Teacher's Api</a>
     </h2>
      </div>
      
      </div>
    </div>
    </div>
  )
}
