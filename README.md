# 📝 Scribble Space

A beautiful, modern note-taking application with a stunning dark theme UI featuring a yellow/cream/beige color palette. Built with React, Express.js, and Tailwind CSS, Scribble Space offers a smooth, responsive experience for creating, managing, and organizing your notes.

---

## ✨ Features

- 🎨 **Beautiful Dark Theme UI** - Modern aesthetic with yellow/cream/beige accent colors
- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✍️ **Create & Manage Notes** - Easily create, edit, and delete notes
- 🔄 **Real-time Sync** - Instant synchronization with backend
- ⚡ **Smooth Animations** - Elegant transitions and animations throughout the app
- 🎯 **Intuitive Interface** - User-friendly design with smooth interactions
- 🚀 **Performance Optimized** - Fast load times and smooth operations

---

## 🚀 Live Link

**[Visit Scribble Space](https://your-live-link-here.com)**

*Replace with your deployed application URL*

---

## 📂 Project Structure

```
Scribble-Space/
├── Frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── App.jsx                   # Main React component with full UI
│   │   ├── main.jsx                  # React entry point
│   │   ├── index.css                 # Tailwind CSS + Custom animations
│   │   └── assets/
│   │       └── react.svg             # React logo asset
│   ├── public/
│   │   └── vite.svg                  # Vite logo
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   └── README.md                     # Frontend setup guide
│
├── Backend/                           # Express.js Backend API
│   ├── src/
│   │   ├── app.js                    # Express app initialization
│   │   ├── config/
│   │   │   └── database.js           # Database configuration
│   │   └── models/
│   │       └── note.model.js         # Note data model
│   ├── server.js                     # Backend server entry point
│   └── package.json                  # Backend dependencies
│
└── README.md                         # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing support
- **dotenv** - Environment variable management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **Git**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/naitik-work/Scribble-Space-.git
cd Scribble-Space
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

**Configure environment variables** (if needed):
Create a `.env` file in the `Backend` folder:
```env
PORT=5000
NODE_ENV=development
```

**Start the backend server:**
```bash
npm start
```
The backend will run on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal and navigate to the Frontend folder:

```bash
cd Frontend
npm install
```

**Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 📚 API Endpoints

### Notes API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Fetch all notes |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update a specific note |
| `DELETE` | `/api/notes/:id` | Delete a specific note |

**Request Body Example (POST/PUT):**
```json
{
  "title": "Note Title",
  "content": "Note content here",
  "color": "yellow"
}
```

---

## 🎨 Color Palette

The application uses a carefully curated dark theme with warm accents:

- **Background**: Deep slate (`#0f172a`)
- **Primary Accent**: Sunny yellow (`#fac515`)
- **Secondary**: Warm cream/beige (`#fef3c7`)
- **Text**: Light gray (`#e2e8f0`)
- **Hover States**: Golden tones with smooth transitions

---

## 🎯 Key Features Breakdown

### Dark Theme
- Reduces eye strain with a dark interface
- Modern and professional appearance
- Energy-efficient for OLED screens

### Responsive Design
- Mobile-first approach
- Adapts perfectly to all screen sizes
- Touch-friendly interface

### Smooth Animations
- Fade-in effects on load
- Slide transitions on interactions
- Scale animations for new notes
- Pulsing effects for active states

### Functional Backend Integration
- RESTful API architecture
- Real-time data synchronization
- Error handling and validation
- CORS-enabled for frontend communication

---

## 📖 Usage

1. **Create a Note**: Click the "New Note" button or use keyboard shortcut
2. **Edit a Note**: Click on any note to edit its content
3. **Save Note**: Changes are automatically saved to the backend
4. **Delete Note**: Click the delete button to remove a note
5. **Search Notes**: Use the search functionality to find notes by title or content

---

## 🔧 Development

### Frontend Development
```bash
cd Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd Backend
npm start            # Start server
npm run dev          # Start with nodemon (if installed)
```

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Naitik**
- GitHub: [@naitik-work](https://github.com/naitik-work)

---

## 🙏 Acknowledgments

- React community for amazing tools and libraries
- Tailwind CSS for the excellent utility-first CSS framework
- Lucide React for beautiful icons
- Vite for the blazing fast build tool

---

## 📞 Support

If you have any questions or issues, please:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots or error logs if applicable

---

