import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#03060F', color: '#F1F5F9', fontFamily: 'monospace',
          padding: '2rem', textAlign: 'center', gap: '1rem'
        }}>
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ color: '#F43F5E', fontSize: '1.5rem' }}>Runtime Error</h2>
          <pre style={{
            background: '#111828', padding: '1.5rem', borderRadius: '12px',
            color: '#94A3B8', fontSize: '0.8rem', maxWidth: '700px',
            overflow: 'auto', textAlign: 'left', whiteSpace: 'pre-wrap',
            border: '1px solid rgba(244,63,94,0.3)'
          }}>
            {this.state.error?.toString()}{'\n\n'}{this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#4F46E5', color: '#FFF', border: 'none',
              padding: '0.75rem 2rem', borderRadius: '999px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: 700
            }}
          >Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
