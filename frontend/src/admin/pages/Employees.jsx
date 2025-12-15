import { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Modal from '../../shared/components/Modal'
import AddEmployeeForm from '../components/AddEmployeeForm'
import EditEmployeeForm from '../components/EditEmployeeForm'
import API from '../../services/api'

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  // modal states
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // ============================
  // FETCH EMPLOYEES (ADMIN ONLY)
  // ============================
  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const res = await API.get('/employees') // 🔐 backend already protected
      setEmployees(res.data)
    } catch (err) {
      alert('Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  // ============================
  // TOGGLE ACTIVE STATUS
  // ============================
  const toggleStatus = async emp => {
    try {
      await API.put(`/employees/${emp._id}`, {
        status: emp.status === 'active' ? 'pending' : 'active' // ✅ FIX
      })
      fetchEmployees()
    } catch {
      alert('Failed to update status')
    }
  }

  // ============================
  // DELETE EMPLOYEE
  // ============================
  const deleteEmployee = async id => {
    if (!window.confirm('Delete this employee?')) return

    try {
      await API.delete(`/employees/${id}`)
      fetchEmployees()
    } catch {
      alert('Delete failed')
    }
  }

  // ============================
  // FILTERED LIST
  // ============================
  const filteredEmployees = employees
    .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
    .filter(emp =>
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? emp.status === 'active'
        : emp.status === 'pending'
    )

  return (
    <>
      {/* ✅ ADMIN NAVBAR (not AppNavbar) */}
      <AdminNavbar />

      <div className='max-w-7xl mx-auto p-6'>
        {/* HEADER */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Employees</h1>

          {/* ✅ ADMIN ONLY ADD */}
          <button
            onClick={() => setOpenAdd(true)}
            className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
          >
            + Add Employee
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className='flex gap-4 mb-6'>
          <input
            className='border p-2 rounded w-64'
            placeholder='Search by name'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className='border p-2 rounded'
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>

        {/* CONTENT */}
        {loading && <p className='text-gray-500'>Loading...</p>}

        {!loading && filteredEmployees.length === 0 && (
          <p className='text-gray-500'>No employees found</p>
        )}

        <div className='space-y-4'>
          {filteredEmployees.map(emp => (
            <div
              key={emp._id}
              className='bg-white p-4 rounded-xl shadow border flex justify-between items-center'
            >
              <div>
                <h3 className='font-semibold'>{emp.name}</h3>
                <p className='text-sm text-gray-500'>
                  {emp.role} • {emp.department}
                </p>
                <p className='text-xs'>
                  Status:{' '}
                  <span
                    className={
                      emp.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {emp.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </p>
              </div>

              {/* ✅ ADMIN ACTIONS */}
              <div className='flex gap-4 text-sm'>
                <button
                  onClick={() => toggleStatus(emp)}
                  className='text-blue-600'
                >
                  {emp.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>

                <button
                  onClick={() => {
                    setSelectedEmployee(emp)
                    setOpenEdit(true)
                  }}
                  className='text-green-600'
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEmployee(emp._id)}
                  className='text-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
        <AddEmployeeForm
          onSuccess={() => {
            setOpenAdd(false)
            fetchEmployees()
          }}
        />
      </Modal>

      {/* EDIT MODAL */}
      <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)}>
        {selectedEmployee && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSave={() => {
              setOpenEdit(false)
              fetchEmployees()
            }}
          />
        )}
      </Modal>
    </>
  )
}

export default Employees
