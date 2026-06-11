import { UserButton, useUser } from '@clerk/react'

function Topbar() {
  const { user } = useUser()
  const name = user?.firstName || user?.username || 'there'

  return (
    <header className="topbar">
      <h1 className="topbar__title">Dashboard</h1>
      <div className="topbar__actions">
        <span className="topbar__user">Hello, {name}</span>
        <UserButton />
      </div>
    </header>
  )
}

export default Topbar
