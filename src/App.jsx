import React, { useState, useEffect } from 'react';
import './App.css';

const INITIAL_SUBJECTS = [
  { id: 1, name: 'Linear Algebra & Transform Techniques', code: 'MAT-201', attended: 0, total: 0 },
  { id: 2, name: 'Digital Electronics', code: 'EC-203', attended: 0, total: 0 },
  { id: 3, name: 'Introduction to Cyber Physical Systems', code: 'CS-205', attended: 0, total: 0 },
  { id: 4, name: 'Object Oriented Programming', code: 'CS-201', attended: 0, total: 0 },
  { id: 5, name: 'Digital Electronics Lab', code: 'EC-203L', attended: 0, total: 0 },
];

function App() {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : INITIAL_SUBJECTS;
  });
  
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [activeSection, setActiveSection] = useState("dashboard");
  const [manualText, setManualText] = useState(
    "Linear Algebra and Transform Techniques, Digital Electronics, Introduction to Cyber Physical Systems, Object Oriented Programming, Digital Electronics Lab"
  );

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  // 🛠️ DIRECT CONTROL INJECTOR: Rebuilds matrix instantly with your exact input
  const handleCompileMatrix = () => {
    if (!manualText.trim()) return;
    
    const items = manualText.split(",").map(item => item.trim()).filter(Boolean);
    const updatedRegistry = items.map((subjectName, idx) => {
      const initials = subjectName.split(' ').map(w => w[0]).join('').replace(/[^A-Z]/g, '');
      let structuralCode = `${initials || 'CSB'}-${201 + idx}`;
      if (subjectName.toLowerCase().includes('lab')) structuralCode += 'L';
      
      return {
        id: Date.now() + idx,
        name: subjectName,
        code: structuralCode,
        attended: 0,
        total: 0
      };
    });

    localStorage.setItem("subjects", JSON.stringify(updatedRegistry));
    setSubjects(updatedRegistry);
    setActiveSection("dashboard");
    alert(`🎉 Interface synchronized with ${updatedRegistry.length} precise academic tracks!`);
  };

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
    localStorage.removeItem("subjects");
    setSubjects(INITIAL_SUBJECTS);
    setManualText("Linear Algebra and Transform Techniques, Digital Electronics, Introduction to Cyber Physical Systems, Object Oriented Programming, Digital Electronics Lab");
  };

  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : 0;
  const isSafe = overallPercentage >= 75;

  const totalBunksAvailable = subjects.reduce((sum, sub) => {
    const safeBunks = Math.floor((sub.attended - 0.75 * sub.total) / 0.75);
    return sum + (safeBunks > 0 ? safeBunks : 0);
  }, 0);

  const getAgentStatus = () => {
    if (!isSafe) return { color: '#ff4757', status: 'CRITICAL', text: 'Threshold breached. Freeze leaves immediately.' };
    if (totalBunksAvailable === 0) return { color: '#ffa502', status: 'WARNING', text: 'Holding at exact 75% parity. No margin remaining.' };
    return { color: '#00d2ff', status: 'OPTIMAL', text: `Ecosystem stable. Localized buffer supports ${totalBunksAvailable} planned skips.` };
  };

  const agent = getAgentStatus();

  // ================= LAYER 1: FUTURISTIC LANDING SCREEN =================
  if (currentPage === 'landing') {
    return (
      <div className="landing-screen">
        <div className="grid-overlay"></div>
        <div className="floating-glow glow-1"></div>
        <div className="floating-glow glow-2"></div>

        <div className="hero-container">
          <div className="hero-left">
            <span className="badge">
              <span className="pulse-dot"></span> Attendance Guardian Core v2.0
            </span>
            <h1>
              ATTENDANCE <br />
              <span className="gradient-text">GUARDIAN AI</span>
            </h1>
            <p className="hero-subtitle">Optimize the Art of the Bunk.</p>
            <p className="hero-description">
              An advanced tactical calculation suite designed for engineering parameters. 
              Run immediate simulation tracks, control attendance margins, 
              and verify precisely when to skip lectures safely.
            </p>
            <button className="launch-btn" onClick={() => setCurrentPage('dashboard')}>
              <span>⚡ RECORD YOUR DATA ⚡</span>
            </button>
          </div>

          <div className="hero-right">
            <div className="holo-matrix-deck">
              <div className="matrix-scanner"></div>
              <div className="hud-header">
                <span className="hud-title">SYSTEM STATUS</span>
                <span className="hud-ping">SYS_ACTIVE // 200</span>
              </div>
              <div className="radial-progress-widget">
                <div className="outer-glow-ring">
                  <div className="inner-percentage-text">{overallPercentage}%</div>
                </div>
              </div>
              <div className="terminal-log-stream">
                <div className="log-line"> Linking to CSB Sector database array...</div>
                <div className="log-line"> Analytical prediction logs: STANDBY</div>
                <div className="log-line cyan"> Current Status Buffer: [{isSafe ? 'SAFE' : 'SHORTAGE'}]</div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>📊 Predictive Tracking</h3>
            <p>Real-time matrix simulations showing down-to-the-lecture safety profiles.</p>
          </div>
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>🎯 Strategic Buffer Control</h3>
            <p>Simulate upcoming bunks safely before skipping to ensure absolute eligibility.</p>
          </div>
          <div className="feature-card">
            <div className="card-accent-line"></div>
            <h3>🤖 Self-Correcting Core</h3>
            <p>Monitors strict university constraints and triggers emergency margin notifications.</p>
          </div>
        </div>
      </div>
    );
  }

  // ================= LAYER 2: RESTORED MAIN CONSOLE INTERFACE =================
  return (
    <div className="dashboard-screen">
      <div className="minimal-dash-wrapper">
        
        <header className="dash-header">
          <div className="dash-brand" onClick={() => setCurrentPage('landing')}>
            <span className="back-arrow">←</span>
            <h2>GUARDIAN // TERMINAL</h2>
          </div>
          <div className="dash-quick-stats">
            <div className="quick-stat-item">
              <span className="stat-label">OVERALL PERCENTAGE</span>
              <span className="stat-val" style={{ color: isSafe ? '#00d2ff' : '#ff4757' }}>{overallPercentage}%</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">TOTAL MARGIN</span>
              <span className="stat-val neon-green-text">{totalBunksAvailable} Lectures</span>
            </div>
          </div>
        </header>

        <section className="agent-strip" style={{ borderColor: `${agent.color}30` }}>
          <div className="dashboard-tabs">
            <button className={activeSection === "dashboard" ? "active-tab" : ""} onClick={() => setActiveSection("dashboard")}>
              📊 Active Monitor
            </button>
            <button className={activeSection === "timetable" ? "active-tab" : ""} onClick={() => setActiveSection("timetable")}>
              ⚙️ Curriculum 
            </button>
          </div>
          
          <div className="agent-status-indicator" style={{ backgroundColor: agent.color }}></div>
          <div className="agent-body">
            <p className="agent-meta-tag"><strong style={{ color: agent.color }}>CORE_AGENT // {agent.status}</strong></p>
            <p className="agent-advice-text">"{agent.text}"</p>
          </div>
          <button className="reset-matrix-btn" onClick={handleResetMatrix}>RESET CORE DATA</button>
        </section>

        {/* TRACKING TILES VIEW */}
        {activeSection === "dashboard" && (
          <main className="subject-strip-deck">
            {subjects.map((subject) => {
              const percentage = subject.total > 0 ? ((subject.attended / subject.total) * 100).toFixed(0) : 0;
              const isDeficit = percentage < 75;
              const accent = isDeficit ? "#ff4757" : "#00d2ff";

              const allowableBunks = Math.floor((subject.attended - 0.75 * subject.total) / 0.75);
              const neededPatches = Math.ceil((0.75 * subject.total - subject.attended) / 0.25);

              return (
                <div key={subject.id} className="subject-minimal-strip">
                  <div className="strip-meta-block">
                    <span className="strip-code" style={{ borderColor: `${accent}40`, color: accent }}>{subject.code}</span>
                    <h3 className="strip-title">{subject.name}</h3>
                  </div>

                  <div className="strip-numeric-block">
                    <div className="strip-percentage" style={{ color: accent }}>{percentage}%</div>
                    <div className="strip-raw-counts">{subject.attended} / {subject.total}</div>
                  </div>

                  <div className="strip-track-block">
                    <div className="strip-bar-bg">
                      <div className="strip-bar-fill" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: accent }}></div>
                    </div>

                    <div className="strip-prediction-text">
                      {isDeficit ? (
                        <span className="deficit-alert" style={{ color: '#ff4757' }}>
                          ⚠️ Critical Margin: Attend <strong>{neededPatches}</strong> lectures continuously.
                        </span>
                      ) : (
                        <span className="margin-safe" style={{ color: '#2ed573' }}>
                          🛡️ Safe Status: You can skip <strong>{allowableBunks > 0 ? allowableBunks : 0}</strong> classes.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="strip-actions-block">
                    <button className="strip-btn log-present-btn" onClick={() => handleLogAttendance(subject.id, 1, 1)}>＋ PRESENT</button>
                    <button className="strip-btn log-bunk-btn" onClick={() => handleLogAttendance(subject.id, 0, 1)}>✕ BUNK</button>
                  </div>
                </div>
              );
            })}
          </main>
        )}

        {/* CONFIGURATION MANAGEMENT MODULE */}
        {activeSection === "timetable" && (
          <div className="timetable-panel" style={{ textAlign: 'left' }}>
            <div className="panel-header-zone">
              <h3>⚙️ Module Configuration</h3>
              <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
                Type or paste your exact  curriculum list below. Separate each course track with a comma. 
               
              </p>
            </div>

            <div className="manual-bypass-container" style={{ marginTop: '20px' }}>
              <label style={{ fontSize: '11px', color: '#00d2ff', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>
                📝 REAL-TIME SUBJECT DIRECT INJECTION MATRIX
              </label>
              
              <textarea 
                style={{
                  width: '100%',
                  height: '110px',
                  backgroundColor: '#070d19',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  padding: '14px',
                  boxSizing: 'border-box',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: '1.6'
                }}
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
              />
              
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                💡 Tip: Just add your new subjects or rename the lab entry in the field above, then click Compile below!
              </p>

              <button 
                onClick={handleCompileMatrix}
                style={{
                  marginTop: '16px',
                  padding: '12px 24px',
                  backgroundColor: '#00d2ff',
                  color: '#050b14',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  boxShadow: '0 0 15px rgba(0, 210, 255, 0.3)'
                }}
              >
                DEPLOY RESTRUCTURED CORE ⚡
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;