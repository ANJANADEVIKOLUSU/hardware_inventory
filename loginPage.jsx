import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && (!mobile.match(/^[0-9]{10}$/))) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    console.log({ email, password, name, studentId, year, branch, collegeEmail, mobile, role });
    // Add API call or authentication logic here
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="login-container">
      <Particles
        className="particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.2, sync: false } },
            size: { value: 4, random: true, anim: { enable: true, speed: 3, size_min: 0.2, sync: false } },
            line_linked: { enable: true, distance: 120, color: '#ffffff', opacity: 0.5, width: 1.2 },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: { enable: true, rotateX: 800, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 160, line_linked: { opacity: 1 } }, push: { particles_nb: 3 } },
          },
          retina_detect: true,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'register'}
          className="glass-form"
          initial={{ x: isLogin ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isLogin ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <h2 className="library-title">{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Name</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                  </select>
                  <label htmlFor="role">Role</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                  <label htmlFor="studentId">Reg No</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  <label htmlFor="year">Year</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                  />
                  <label htmlFor="branch">Branch</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="collegeEmail"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="collegeEmail">College Email</label>
                  <span className="focus-border"></span>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                  />
                  <label htmlFor="mobile">Mobile Number</label>
                  <span className="focus-border"></span>
                </div>
              </>
            )}
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <span className="focus-border"></span>
            </div>
            <button className="submit-btn" type="submit">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <div className="form-footer">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span className="toggle-form" onClick={() => setIsLogin(false)}>
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="toggle-form" onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;