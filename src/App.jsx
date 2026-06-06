import React, { useState } from 'react';
import './App.css';

const INITIAL_SUBJECTS = [
  { id: 1, name: 'Data Structures & Algorithms', code: 'CS-301', attended: 22, total: 25 },
  { id: 2, name: 'Database Management Systems', code: 'CS-302', attended: 18, total: 24 },
  { id: 3, name: 'Web Application Development', code: 'CS-303', attended: 15, total: 20 },
  { id: 4, name: 'Analog & Digital Circuits', code: 'EC-305', attended: 12, total: 18 },
  { id: 5, name: 'Compiler Design', code: 'CS-304', attended: 19, total: 22 },
];

function App() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState("landing");

  // Attendance updating logic
  const handleLogAttendance = (id, attendedIncrement, totalIncrement) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(sub =>
        sub.id === id
          ? { ...sub, attended: sub.attended + attendedIncrement, total: sub.total + totalIncrement }
          : sub
      )
    );
  };

  // Overall analytics calculation
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : 0;

  // Criteria warning setup (75% standard college rule)
  const criteriaStatus = overallPercentage >= 75 ? 'Safe' : 'Shortage';
  if (currentPage === "landing") {
  return (
    <div className="landing-page">
      <div className="hero-card">

        <h1>🎓 Attendance Guardian AI</h1>

        <p className="hero-tagline">
          Never worry about the 75% attendance rule again.
        </p>

        <div className="feature-list">
          <p>✅ Live Attendance Tracking</p>
          <p>✅ Smart Bunk Planner</p>
          <p>✅ Attendance Prediction</p>
          <p>✅ AI Attendance Assistant</p>
        </div>

        <button
          className="launch-btn"
          onClick={() => setCurrentPage("dashboard")}
        >
          Launch Dashboard 🚀
        </button>

      </div>
    </div>
  );
}

  return (
    <div className="app-layout">
      {/* Sidebar Section */}
      <aside className="app-sidebar">
        <div className="brand-header">
          <div className="brand-logo">🎓</div>
          <div className="brand-details">
            <h2>B.Tech Portal</h2>
            <span>Semester V</span>
          </div>
        </div>
        
        <nav className="sidebar-navigation">
          <button 
            className={`menu-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Internal Analytics
          </button>
          <button 
            className={`menu-link ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
          >
            📅 Class Timetable
          </button>
        </nav>

        <div className="profile-widget">
          <div className="avatar">🧑‍💻</div>
          <div className="profile-info">
            <h4>Student Account</h4>
            <p>Connected to Database</p>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-viewport">
        <header className="viewport-header">
          <div>
            <h1>Academic Attendance Terminal</h1>
            <p className="subtitle">Real-time percentage monitor & class tracker</p>
          </div>
          <div className="live-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="view-wrapper">
            {/* College Specific Stats Summary */}
            <section className="analytics-banner">
              <div className="metric-panel primary-metric">
                <div className="metric-text">
                  <h3>Overall Attendance</h3>
                  <p className="huge-number">{overallPercentage}%</p>
                  <span className="metric-subtext">{totalAttended} / {totalClasses} Total Lectures</span>
                </div>
                <div className="percentage-bar-wrapper">
                  <div className="percentage-fill" style={{ width: `${overallPercentage}%` }}></div>
                </div>
              </div>

              <div className={`metric-panel status-metric ${criteriaStatus.toLowerCase()}`}>
                <h3>75% Eligibility Rule</h3>
                <p className="status-text">{criteriaStatus}</p>
                <span className="metric-subtext">
                  {criteriaStatus === 'Safe' 
                    ? 'You are clear for internal exams.' 
                    : 'Action required! Attend next classes.'}
                </span>
              </div>
            </section>

            {/* Course List & Simulation Deck */}
            <div className="grid-workspace">
              <div className="course-card-list">
                <h2>Subject Wise Breakdown</h2>
                
                <div className="subject-stack">
                  {subjects.map((subject) => {
                    const subPercent = subject.total > 0 ? ((subject.attended / subject.total) * 100).toFixed(0) : 0;
                    const isShortage = subPercent < 75;

                    return (
                      <div key={subject.id} className="subject-row">
                        <div className="subject-meta">
                          <span className="course-code">{subject.code}</span>
                          <h4>{subject.name}</h4>
                        </div>

                        <div className="subject-progress">
                          <span className="lecture-count">{subject.attended}/{subject.total} Classes</span>
                          <div className="mini-progress-track">
                            <div 
                              className={`mini-progress-fill ${isShortage ? 'low' : 'good'}`} 
                              style={{ width: `${subPercent}%` }}
                            ></div>
                          </div>
                          <span className={`percentage-badge ${isShortage ? 'danger' : 'success'}`}>
                            {subPercent}%
                          </span>
                        </div>

                        {/* Interactive testing clickers for simulator use */}
                        <div className="quick-actions-cell">
                          <button 
                            className="btn-mark present" 
                            title="Log Attended Class"
                            onClick={() => handleLogAttendance(subject.id, 1, 1)}
                          >
                            ✓ Present
                          </button>
                          <button 
                            className="btn-mark absent" 
                            title="Log Bunked Class"
                            onClick={() => handleLogAttendance(subject.id, 0, 1)}
                          >
                            ✗ Bunk
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attendance Planner Tool */}
              <div className="planner-deck">
                <h3>Attendance AI Agent</h3>
                <p className="planner-desc">
                  This interface communicates with the agent framework to parse automated logs and keep track of your internal evaluation eligibility criteria.
                </p>
                
                <div className="guidance-box">
                  <h4>💡 Quick Operations Box</h4>
                  <p>Click on the <strong>✓ Present</strong> or <strong>✗ Bunk</strong> actions inside any course row to simulate upcoming lectures and preview your eligibility instantly.</p>
                  <button 
                    className="reset-btn"
                    onClick={() => setSubjects(INITIAL_SUBJECTS)}
                  >
                    Reset to Default Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="blank-state">
            <h3>Class Timetable Module</h3>
            <p>Integrating daily batch schedules and lecture calendar timings.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;