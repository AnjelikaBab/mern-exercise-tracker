import React, { Component } from 'react';

export default class Navbar extends Component {

  render() {
    return (
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem 0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            onClick={() => this.props.onNavigate('home')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              outline: 'none',
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Active Diary
          </button>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button 
              onClick={() => this.props.onNavigate('home')} 
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                outline: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📊 Log History
            </button>
            
            <button 
              onClick={() => this.props.onNavigate('create')} 
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                outline: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ➕ Create Log
            </button>
            
            <button 
              onClick={() => this.props.onNavigate('name')} 
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                outline: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🏋️ Add Workout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}