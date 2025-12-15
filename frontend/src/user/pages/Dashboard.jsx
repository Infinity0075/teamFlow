import { useEffect, useState } from 'react'
import API from '../../services/api'
import AppNavbar from '../components/AppNavbar'

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    active: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/employees')
        const employees = res.data

        setStats({
          total: employees.length,
          pending: employees.filter(e => e.status === 'pending').length,
          active: employees.filter(e => e.status === 'active').length
        })
      } catch {
        alert('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <AppNavbar>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

      {loading && <p className='text-gray-500'>Loading dashboard...</p>}

      {!loading && (
        <div className='grid md:grid-cols-3 gap-6'>
          {/* TOTAL */}
          <div className='bg-white p-6 rounded-xl border shadow-sm'>
            <p className='text-gray-500 text-sm'>Total Employees</p>
            <h2 className='text-3xl font-bold mt-2'>{stats.total}</h2>
          </div>

          {/* PENDING */}
          <div className='bg-white p-6 rounded-xl border shadow-sm'>
            <p className='text-gray-500 text-sm'>Pending</p>
            <h2 className='text-3xl font-bold mt-2 text-yellow-600'>
              {stats.pending}
            </h2>
          </div>

          {/* ACTIVE */}
          <div className='bg-white p-6 rounded-xl border shadow-sm'>
            <p className='text-gray-500 text-sm'>Active</p>
            <h2 className='text-3xl font-bold mt-2 text-green-600'>
              {stats.active}
            </h2>
          </div>
        </div>
      )}

      {/* IMAGE SECTION (YOU ADD IMAGE HERE) */}
      {/* 
      <div className="mt-16 flex justify-center">
        <img src={yourImage} className="max-w-md w-full opacity-90" />
      </div> 
      */}
    </AppNavbar>
  )
}

export default Dashboard
