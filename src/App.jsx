import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';
import { AnimatePresence } from 'framer-motion';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import Sponsor from './Pages/Sponsor';
import Team from './Pages/Team';
import Event from './Pages/Event';
import Schedule from './Pages/Schedule';
import CampusEmbassador from './Pages/CampusEmbassador';
import Pronite from './Pages/Pronite';
import Pass from './Pages/Pass';
import LandingPage from './Pages/LandingPage';
import Error from './Pages/Error';
import SignUp from './Pages/SignUp';
import Model3D from './Pages/Model3D';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';
import SplashScreen from './Pages/SplashScreen';
import LeaderBoard from './Pages/LeaderBoard';
import UpdateLeaderboard from './Pages/UpdateLeaderboard';
import ResetLeaderboard from './Pages/ResetLeaderboard';
import PaymentPage from './Components/PaymentPage';
function App() {
  const updateUrl = import.meta.env.VITE_UPDATE_URL; // Get the update URL from .env
  const resetUrl = import.meta.env.VITE_RESET_URL; 
  
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

 // Run only once on initial load

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMoving = false;
    const particles = [];

    const handleMouseMove = (e) => {
      const scrollY = window.scrollY;
      mouseX = e.clientX;
      mouseY = e.clientY + scrollY;
      isMoving = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMoving) {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        for (let i = 0; i < distance; i += 5) {
          const x = lastMouseX + Math.cos(angle) * i;
          const y = lastMouseY + Math.sin(angle) * i;
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            size: Math.random() * 2 + 2,
          });
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        isMoving = false;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2
        );

        gradient.addColorStop(0, `rgba(255, 204, 50, ${p.life})`);
        gradient.addColorStop(0.4, `rgba(255, 153, 0, ${p.life * 0.3})`);
        gradient.addColorStop(1, `rgba(128, 80, 0, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + (1 - p.life) * 2), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const handleVerifyPayment = async (transactionId) => {
    // Simulate API call for verification
    console.log("Verifying transaction ID:", transactionId);
    return new Promise<boolean>((resolve) => setTimeout(() => resolve(transactionId === "12345"), 2000));
  };
  return (
    <>
      <Tooltip id="global-tooltip" />
      <div className="w-screen h-screen text-white relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1000 }}
        />
        {/* <SplashScreen /> */}
        <div className="relative z-10 w-screen h-screen text-white">
          {location.pathname !== '/model3d' && <Navbar />}
          <div>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/event" element={<Event />} />
                <Route path="/sponsor" element={<Sponsor />} />
                <Route path="/our_team" element={<Team />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/campus_embassador" element={<CampusEmbassador />} />
                <Route path="/pronites" element={<Pronite />} />
                <Route path="/model3d" element={<Model3D />} />
                <Route path="/pass" element={<Pass />} />
                <Route path="*" element={<Error />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/pay" element={<PaymentPage amount={50.0} onVerifyPayment={handleVerifyPayment} />} />
                <Route path={updateUrl} element={<UpdateLeaderboard />} />
                <Route path={resetUrl} element={<ResetLeaderboard />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
