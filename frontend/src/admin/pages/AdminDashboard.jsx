import AdminNavbar from '../components/AdminNavbar'
import { Users, UserCheck, UserX } from 'lucide-react'
import { useEffect, useState } from 'react'
import API from '../../services/api'
import dashboardImage from './dashboard.png' // adjust path

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  })

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get('/employees')
      const data = res.data

      setEmployees(data)

      setStats({
        total: data.length,
        active: data.filter(e => e.status === 'active').length,
        inactive: data.filter(e => e.status === 'pending').length
      })
    }

    fetchEmployees()
  }, [])

  return (
    <AdminNavbar>
      <h1 className='text-2xl font-bold mb-6'>Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className='grid md:grid-cols-3 gap-6 mb-10'>
        <StatCard
          icon={<Users className='text-indigo-600' />}
          label='Total Employees'
          value={stats.total}
        />
        <StatCard
          icon={<UserCheck className='text-green-600' />}
          label='Active'
          value={stats.active}
        />
        <StatCard
          icon={<UserX className='text-red-600' />}
          label='Inactive'
          value={stats.inactive}
        />
      </div>

      {/* ================= EMPLOYEES LIST ================= */}
      <div className='mb-16'>
        <h2 className='text-lg font-semibold mb-4'>Employees</h2>

        {employees.length === 0 ? (
          <p className='text-gray-500'>No employees found.</p>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {employees.map(emp => (
              <EmployeeCard key={emp._id} employee={emp} />
            ))}
          </div>
        )}
      </div>

      {/* ================= IMAGE SECTION ================= */}
      <div className='flex justify-center'>
        <img
          src={dashboardImage}
          alt='Dashboard Illustration'
          className='max-w-md w-full opacity-90'
        />
      </div>
    </AdminNavbar>
  )
}

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ icon, label, value }) => (
  <div className='bg-white p-5 rounded-xl border shadow-sm'>
    <div className='flex items-center gap-3'>
      {icon}
      <div>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-xl font-bold'>{value}</p>
      </div>
    </div>
  </div>
)

const EmployeeCard = ({ employee }) => (
  <div className='bg-white p-4 rounded-xl border shadow-sm'>
    <div className='flex items-center gap-4'>
      <img
        src={employee.profilePic}
        alt={employee.name}
        className='w-10 h-10 rounded-full object-cover'
      />

      <div>
        <p className='font-semibold'>{employee.name}</p>
        <p className='text-sm text-gray-500'>{employee.role}</p>
      </div>

      <span
        className={`ml-auto px-3 py-1 text-xs rounded-full ${
          employee.status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {employee.status}
      </span>
    </div>
  </div>
)

export default AdminDashboard
