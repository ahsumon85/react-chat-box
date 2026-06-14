import { Show, SignInButton, SignUpButton } from '@clerk/react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Content from './components/Content'
import './App.css'

function App() {
  return (
    <>
      <Show when="signed-out">
        <div className="auth">
          <div className="auth__card">
            <h1 className="auth__title">Learn React</h1>
            <p className="auth__subtitle">Sign in to access your dashboard</p>
            <div className="auth__actions">
              <SignInButton mode="modal">
                <button type="button" className="auth__btn auth__btn--primary">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="auth__btn auth__btn--secondary">
                  Create account
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="app">
          <Sidebar />
          <div className="main">
            <Topbar />
            <Content />
          </div>
        </div>
      </Show>
    </>
  )
}

export default App
