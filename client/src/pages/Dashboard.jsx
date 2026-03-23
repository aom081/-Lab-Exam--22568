import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";
import { FiTrash2, FiEdit2, FiCheckCircle } from "react-icons/fi";

export default function Dashboard() {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();
  const { user, logout } = useAuthStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateTask(editId, { title, description });
      setEditId(null);
    } else {
      createTask({ title, description });
    }
    setTitle("");
    setDescription("");
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const toggleStatus = (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    updateTask(task._id, { status: newStatus });
  };

  return (
    <div className="min-h-screen bg-base-200 pb-10">
      <div className="navbar bg-base-100 shadow-md px-4 sm:px-8 mb-8">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl font-bold">TaskFlow Mini</a>
        </div>
        <div className="flex-none gap-4">
          <span className="font-semibold hidden sm:inline-block">Welcome, {user?.username}</span>
          <button onClick={logout} className="btn btn-outline btn-error btn-sm">Logout</button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        {error && <div className="alert alert-error shadow-lg mb-4"><span>{error}</span></div>}

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h3 className="card-title">{editId ? "Edit Task" : "Create New Task"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-4">
              <input 
                type="text" 
                placeholder="Task Title" 
                className="input input-bordered flex-1" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
              />
              <input 
                type="text" 
                placeholder="Description (optional)" 
                className="input input-bordered flex-1" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">{editId ? "Update" : "Add Task"}</button>
                {editId && <button type="button" className="btn btn-ghost" onClick={() => { setEditId(null); setTitle(""); setDescription(""); }}>Cancel</button>}
              </div>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 && !loading && (
              <div className="text-center text-base-content/50 py-10 italic">No tasks found. Create one above!</div>
            )}
            {tasks.map(task => (
              <div key={task._id} className={`card bg-base-100 shadow-sm border-l-4 ${task.status === 'completed' ? 'border-success' : 'border-warning'}`}>
                <div className="card-body flex-row justify-between items-center py-4">
                  <div className="flex-1">
                    <h4 className={`text-lg font-bold ${task.status === "completed" ? "line-through text-base-content/50" : ""}`}>
                      {task.title}
                    </h4>
                    {task.description && <p className="text-sm text-base-content/70 mt-1">{task.description}</p>}
                    <div className="flex gap-2 mt-3">
                      <div className={`badge ${task.status === "completed" ? "badge-success" : "badge-warning"} badge-sm`}>{task.status}</div>
                      <div className="badge badge-outline badge-sm">Priority: {task.priority}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleStatus(task)} className="btn btn-circle btn-sm btn-success btn-outline" title="Toggle Status">
                      <FiCheckCircle size={16} />
                    </button>
                    <button onClick={() => handleEdit(task)} className="btn btn-circle btn-sm btn-info btn-outline" title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => deleteTask(task._id)} className="btn btn-circle btn-sm btn-error btn-outline" title="Delete">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}