function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Learn React</h2>
      <nav className="sidebar__nav">
        <a href="#" className="sidebar__link sidebar__link--active">
          Home
        </a>
        <a href="#" className="sidebar__link">
          Lessons
        </a>
        <a href="#" className="sidebar__link">
          Practice
        </a>
        <a href="#" className="sidebar__link">
          About
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
