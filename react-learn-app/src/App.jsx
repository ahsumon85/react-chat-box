import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Content from './components/Content'
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <Content />
      </div>
    </div>
  )
}

export default App
