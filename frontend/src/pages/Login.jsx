import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", loginData);
      alert(res.data.message);

      // ✅ USER DATA SAVE KARO
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="jungle-wrapper">
      {/* Background Video for Jungle & Animals effect */}
      <video autoPlay loop muted className="background-video">
        {/* Yahan aap apne forest/animal wale video ka direct link daal sakte ho */}
        <source
          src="https://cdn.pixabay.com/video/2020/04/18/36531-411478144_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay to make it a deep night scene */}
      <div className="dark-overlay"></div>

      {/* Shooting Stars Container */}
      <div className="star-container">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Floating Glassmorphism Login Box */}
      <div className="glass-login-box">
        <h2>Welcome to the Wild</h2>
        <p className="subtitle">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Gmail"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      {/* Pura CSS yahan ek hi file mein inject kar diya hai */}
      <style>{`
        /* Reset basic styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

        /* Full screen wrapper */
        .jungle-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #050505;
        }

        /* Background video styling */
        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%);
          z-index: 1;
          object-fit: cover;
        }

        /* Dark night filter over the video */
        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 15, 5, 0.75); 
          z-index: 2;
        }

        /* ====== SHOOTING STARS ANIMATION ====== */
        .star-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          transform: rotate(-45deg);
        }

        .shooting-star {
          position: absolute;
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,1), transparent);
          animation: shooting 3s linear infinite;
          opacity: 0;
        }

        .shooting-star:nth-child(1) { top: 10%; left: 80%; animation-delay: 0s; }
        .shooting-star:nth-child(2) { top: 40%; left: 60%; animation-delay: 1.5s; }
        .shooting-star:nth-child(3) { top: 70%; left: 90%; animation-delay: 0.8s; }

        @keyframes shooting {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100vw); opacity: 0; }
        }

        /* ====== FLOATING GLASSMORPHISM BOX ====== */
        .glass-login-box {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
          color: #fff;
          text-align: center;
          animation: floatBox 6s ease-in-out infinite;
        }

        @keyframes floatBox {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); box-shadow: 0 15px 40px 0 rgba(0, 20, 10, 0.6); }
          100% { transform: translateY(0px); }
        }

        .glass-login-box h2 {
          font-size: 28px;
          margin-bottom: 5px;
          letter-spacing: 1px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
        }

        /* Form Styles */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group input {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-group input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .input-group input:focus {
          border-color: #4CAF50; 
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
        }

        .login-btn {
          padding: 15px;
          background: linear-gradient(45deg, #2E7D32, #1B5E20);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
        }

        .login-btn:hover {
          background: linear-gradient(45deg, #388E3C, #2E7D32);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(46, 125, 50, 0.6);
        }
      `}</style>
    </div>
  );
}

export default Login;