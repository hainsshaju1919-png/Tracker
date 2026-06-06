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
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'dashboard'

  const handleLogAttendance = (id, attendedIncrement, totalIncrement) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(sub =>
        sub.id === id
          ? { ...sub, attended: Math.max(0, sub.attended + attendedIncrement), total: Math.max(0, sub.total + totalIncrement) }
          : sub
      )
    );
  };

  const handleResetMatrix = () => {
    setSubjects(INITIAL_SUBJECTS);
  };

  // Matrix Aggregate Calculations
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : 0;
  const isSafe = overallPercentage >= 75;

  const totalBunksAvailable = subjects.reduce((sum, sub) => {
    const safeBunks = Math.floor((sub.attended - (0.75 * sub.total)) / 0.75);
    return sum + (safeBunks > 0 ? safeBunks : 0);
  }, 0);

  // Dynamic Agent Advice Stream
  const getAgentStatus = () => {
    if (!isSafe) return { color: '#ff4757', status: 'CRITICAL', text: 'Threshold breached. Freeze absences immediately.' };
    if (totalBunksAvailable === 0) return { color: '#ffa502', status: 'WARNING', text: 'Holding at exact 75% parity. No margin remaining.' };
    return { color: '#00d2ff', status: 'OPTIMAL', text: `Ecosystem stable. Localized buffer supports ${totalBunksAvailable} planned leaves.` };
  };

  const agent = getAgentStatus();

  // ================= SCREEN 1: PRESERVED LANDING UI =================
  if (currentPage === 'landing') {
    return (
      <div className="landing-screen">
        <div className="grid-overlay"></div>
        <div className="floating-glow glow-1"></div>
        <div className="floating-glow glow-2"></div>

        <div className="hero-container">
          <div className="hero-left">
            <span className="badge">
              <span className="pulse-dot"></span> AI-Powered Attendance Core v2.0
            </span>
            <h1>
              ATTENDANCE <br />
              <span className="gradient-text">GUARDIAN AI</span>
            </h1>
            <p className="hero-subtitle">Optimize the Art of the Bunk.</p>
            <p className="hero-description">
              An advanced technical tracking core designed for engineering students. 
              Run computational simulations on your schedule, manage your threshold margins, 
              and calculate precisely when to skip lectures without dropping under 75%.
            </p>
            <button className="launch-btn" onClick={() => setCurrentPage('dashboard')}>
              <span>Initialize Terminal Console ⚡</span>
            </button>
          </div>

          <div className="hero-right">
            <div className="holo-matrix-deck">
              <div className="matrix-scanner"></div>
              <div className="hud-header">
                <span className="hud-title">SYSTEM STATUS</span>
                <span className="hud-ping">SYS_OK // 200</span>
              </div>
              <div className="radial-progress-widget">
                <div className="outer-glow-ring">
                  <div className="inner-percentage-text">{overallPercentage}%</div>
                </div>
              </div>
              <div className="terminal-log-stream">
                <div className="log-line"> Connecting to B.Tech V-Sem database...</div>
                <div className="log-line"> Analytical calculation models: ACTIVE</div>
                <div className="log-line cyan"> Current Target Status: [{isSafe ? 'SAFE' : 'SHORTAGE'}]</div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>📊 Predictive Metrics</h3>
            <p>Real-time threshold calculations showing you down-to-the-lecture safety statuses.</p>
          </div>
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>🎯 Strategic Bunk Planner</h3>
            <p>Simulate future skips before they happen to preview your exam eligibility margin.</p>
          </div>
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>🤖 Self-Correcting Core</h3>
            <p>Monitors standard 75% regulations and instantly triggers safety status warnings.</p>
          </div>
        </div>
      </div>
    );
  }

  // ================= SCREEN 2: HIGHLY CLEAN & SIMPLE DASHBOARD =================
  return (
    <div className="dashboard-screen">
      <div className="minimal-dash-wrapper">
        
        {/* Compact Navigation Header */}
        <header className="dash-header">
          <div className="dash-brand" onClick={() => setCurrentPage('landing')}>
            <span className="back-arrow">←</span>
            <h2>GUARDIAN // CORE</h2>
          </div>
          <div className="dash-quick-stats">
            <div className="quick-stat-item">
              <span className="stat-label">TOTAL RATIO</span>
              <span className="stat-val" style={{ color: isSafe ? '#00d2ff' : '#ff4757' }}>{overallPercentage}%</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">GLOBAL BUFFER</span>
              <span className="stat-val neon-green-text">{totalBunksAvailable} Classes</span>
            </div>
          </div>
        </header>

        {/* Simplified AI Agent Top Control Header */}
        <section className="agent-strip" style={{ borderColor: `${agent.color}30` }}>
          <div className="agent-status-indicator" style={{ backgroundColor: agent.color }}></div>
          <div className="agent-body">
            <p className="agent-meta-tag"><strong style={{ color: agent.color }}>AGENT // {agent.status}</strong></p>
            <p className="agent-advice-text">"{agent.text}"</p>
          </div>
          <button className="reset-matrix-btn" onClick={handleResetMatrix}>
            RESET DATALINK
          </button>
        </section>

        {/* Streamlined Horizontal Tracking Lists */}
        <main className="subject-strip-deck">
          {subjects.map((subject) => {
            const percentage = subject.total > 0 ? ((subject.attended / subject.total) * 100).toFixed(0) : 0;
            const isDeficit = percentage < 75;
            const accent = isDeficit ? '#ff4757' : '#2ed573';

            const allowableBunks = Math.floor((subject.attended - (0.75 * subject.total)) / 0.75);
            const neededPatches = Math.ceil(((0.75 * subject.total) - subject.attended) / 0.25);

            return (
              <div key={subject.id} className="subject-minimal-strip">
                
                {/* 1. Core Meta Identifier */}
                <div className="strip-meta-block">
                  <span className="strip-code">{subject.code}</span>
                  <h3 className="strip-title">{subject.name}</h3>
                </div>

                {/* 2. Numeric Readouts */}
                <div className="strip-numeric-block">
                  <div className="strip-percentage" style={{ color: accent }}>{percentage}%</div>
                  <div className="strip-raw-counts">{subject.attended} / {subject.total}</div>
                </div>

                {/* 3. Horizontal Metric Slider Track */}
                <div className="strip-track-block">
                  <div className="strip-bar-bg">
                    <div className="strip-bar-fill" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: accent }}></div>
                    <div className="strip-bar-target" title="75% Regulatory Threshold"></div>
                  </div>
                  <div className="strip-prediction-text">
                    {isDeficit ? (
                      <span className="deficit-alert">Need <strong>{neededPatches}</strong> upcoming sessions</span>
                    ) : (
                      <span className="margin-safe">Can skip <strong>{allowableBunks > 0 ? allowableBunks : 0}</strong> classes safely</span>
                    )}
                  </div>
                </div>

                {/* 4. Instant Calculation Buttons */}
                <div className="strip-actions-block">
                  <button className="strip-btn log-present-btn" onClick={() => handleLogAttendance(subject.id, 1, 1)}>
                    ＋ PRESENT
                  </button>
                  <button className="strip-btn log-bunk-btn" onClick={() => handleLogAttendance(subject.id, 0, 1)}>
                    ✕ BUNK
                  </button>
                </div>

              </div>
            );
          })}
        </main>

      </div>
    </div>
  );
}

export default App;