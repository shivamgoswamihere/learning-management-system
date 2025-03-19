import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiBook, FiClipboard, FiDollarSign, FiBarChart } from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/admin/users" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                <FiUsers /> Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/courses" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                <FiBook /> Manage Courses
              </Link>
            </li>
            <li>
              <Link to="/admin/exams" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                <FiClipboard /> Manage Exams
              </Link>
            </li>
            <li>
              <Link to="/admin/payments" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                <FiDollarSign /> Payments
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                <FiBarChart /> Reports & Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white shadow rounded-lg flex items-center">
            <FiUsers className="text-blue-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl">1,250</p>
            </div>
          </div>

          <div className="p-5 bg-white shadow rounded-lg flex items-center">
            <FiBook className="text-green-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Total Courses</h3>
              <p className="text-2xl">230</p>
            </div>
          </div>

          <div className="p-5 bg-white shadow rounded-lg flex items-center">
            <FiClipboard className="text-red-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Total Exams</h3>
              <p className="text-2xl">150</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
