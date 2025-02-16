import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

// Static data
const initialTasks = [
  { id: 1, title: 'Complete project documentation', priority: 'high', status: 'pending', description: 'Write detailed documentation for the new feature' },
  { id: 2, title: 'Review pull requests', priority: 'medium', status: 'completed', description: 'Review team PRs for the sprint' },
  { id: 3, title: 'Setup development environment', priority: 'low', status: 'pending', description: 'Configure local development setup' },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('priority');
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending'
  });

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task = {
      id: tasks.length + 1,
      ...newTask
    };
    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({ title: '', description: '', priority: 'medium', status: 'pending' });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusToggle = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? 
        { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  const handleEditTask = (task) => {
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...task } : t
    ));
    setEditingTask(null);
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .sort((a, b) => {
      if (sort === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus size={20} /> Add Task
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <select
              className="border rounded-md px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              className="border rounded-md px-3 py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="priority">Sort by Priority</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredTasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {editingTask?.id === task.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <textarea
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <select
                      value={editingTask.priority}
                      onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(editingTask)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-md text-sm ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-sm ${
                          task.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusToggle(task.id)}
                        className={`p-2 rounded-md ${
                          task.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 text-blue-600 rounded-md"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 rounded-md"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              />
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;