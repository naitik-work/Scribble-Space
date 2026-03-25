import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Edit2,
  Plus,
  BookOpen,
  Sparkles,
  Loader,
  Check,
  X,
  Save,
} from "lucide-react";

const API_BASE_URL = "http://localhost:3000/api";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch all notes
  function fetchNotes() {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/notes`)
      .then((res) => {
        setNotes(res.data.notes || []);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        alert("Failed to fetch notes. Make sure backend is running on http://localhost:3000");
      })
      .finally(() => setLoading(false));
  }

  // Create new note
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    setIsCreating(true);
    axios
      .post(`${API_BASE_URL}/notes`, {
        title: title.trim(),
        description: description.trim(),
      })
      .then((res) => {
        setTitle("");
        setDescription("");
        setIsAdding(false);
        fetchNotes();
      })
      .catch((err) => {
        console.error("Error creating note:", err);
        alert("Failed to create note");
      })
      .finally(() => setIsCreating(false));
  }

  // Delete note
  function handleDelete(id) {
    axios
      .delete(`${API_BASE_URL}/notes/${id}`)
      .then(() => {
        setDeleteConfirm(null);
        fetchNotes();
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
        alert("Failed to delete note");
      });
  }

  // Start editing
  function handleEditStart(note) {
    setEditingId(note._id);
    setEditNote({ title: note.title, description: note.description });
  }

  // Update note
  function handleUpdate() {
    if (!editNote.title.trim() || !editNote.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    axios
      .patch(`${API_BASE_URL}/notes/${editingId}`, {
        title: editNote.title.trim(),
        description: editNote.description.trim(),
      })
      .then(() => {
        setEditingId(null);
        fetchNotes();
      })
      .catch((err) => {
        console.error("Error updating note:", err);
        alert("Failed to update note");
      });
  }

  // Cancel editing
  function handleEditCancel() {
    setEditingId(null);
    setEditNote({ title: "", description: "" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Scribble Space
                </h1>
                <p className="text-xs text-yellow-400/60">Your thoughts, organized beautifully</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-300 font-semibold">
                  {notes.length} {notes.length === 1 ? "note" : "notes"}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Create Note Form */}
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-12 w-full group relative overflow-hidden bg-gradient-to-r from-yellow-400/10 to-amber-500/10 hover:from-yellow-400/20 hover:to-amber-500/20 border-2 border-dashed border-yellow-500/40 hover:border-yellow-500/60 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Plus className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-semibold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                Create New Note
              </span>
            </div>
          </button>
        ) : (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-yellow-500/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-yellow-300 mb-8 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Write Your Note
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-yellow-200 mb-3">Title</label>
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-6 py-3 bg-slate-700/50 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-white font-medium hover:bg-slate-700/70"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-yellow-200 mb-3">Description</label>
                  <textarea
                    placeholder="Tell me more..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    className="w-full px-6 py-3 bg-slate-700/50 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-white resize-none hover:bg-slate-700/70"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isCreating || !title.trim() || !description.trim()}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCreating ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Note
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setTitle("");
                      setDescription("");
                    }}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600 text-slate-200 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-300 mb-10 flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            Your Notes
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading your notes...</p>
              </div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20 px-6">
              <BookOpen className="w-20 h-20 text-slate-700 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-300 mb-2">No notes yet</h3>
              <p className="text-slate-400 mb-8">Start creating beautiful notes to organize your thoughts</p>
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Create First Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                editingId === note._id ? (
                  // Edit Mode
                  <div key={note._id} className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 backdrop-blur-xl rounded-xl p-6 transition-all duration-300 shadow-xl animate-in fade-in scale-in duration-300">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-yellow-200 mb-2">Title</label>
                        <input
                          type="text"
                          value={editNote.title}
                          onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white text-sm"
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-yellow-200 mb-2">Description</label>
                        <textarea
                          value={editNote.description}
                          onChange={(e) => setEditNote({ ...editNote, description: e.target.value })}
                          rows="4"
                          className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white text-sm resize-none"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleUpdate}
                          className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="flex-1 flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : deleteConfirm === note._id ? (
                  // Delete Confirmation
                  <div key={note._id} className="group relative overflow-hidden bg-gradient-to-br from-red-900/50 to-red-950/50 border-2 border-red-500/50 backdrop-blur-xl rounded-xl p-6 transition-all duration-300 shadow-xl animate-in fade-in scale-in duration-300">
                    <div className="space-y-4 text-center">
                      <p className="text-red-200 font-semibold">Delete this note permanently?</p>
                      <p className="text-red-300/70 text-sm">{note.title}</p>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div
                    key={note._id}
                    className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-yellow-500/20 hover:border-yellow-500/50 backdrop-blur-xl rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 transform hover:scale-105 hover:-translate-y-1"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-amber-500/0 group-hover:from-yellow-500/5 group-hover:to-amber-500/5 transition-all duration-300 pointer-events-none"></div>

                    <div className="relative z-10 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-yellow-300 line-clamp-2 group-hover:text-yellow-200 transition-colors duration-200 group-hover:line-clamp-none">
                          {note.title}
                        </h3>
                      </div>
                      <p className="text-slate-300 line-clamp-4 text-sm leading-relaxed group-hover:line-clamp-none">
                        {note.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6 pt-4 border-t border-yellow-500/10">
                        <button
                          onClick={() => handleEditStart(note)}
                          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 hover:text-yellow-200 font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 border border-yellow-500/30 hover:border-yellow-500/60"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(note._id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 border border-red-500/30 hover:border-red-500/60"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-yellow-500/10 mt-20 py-10 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Scribble Space • <span className="text-yellow-400">Keep your thoughts organized</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
