import hero from "../assets/first.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Temp() {

  const navigate = useNavigate();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const text = "WORKSPACE";

  return (

    <div
      style={styles.container}
      onMouseMove={(e) => {

        const x = (e.clientY - window.innerHeight / 2) / 25;
        const y = (e.clientX - window.innerWidth / 2) / 25;

        setRotate({ x, y });

      }}
    >

      {/* Logo */}
      <div style={styles.logoContainer}>
        <div style={{ ...styles.dot, background: "#a855f7", left: 0 }}></div>
        <div style={{ ...styles.dot, background: "#ef4444", left: 15 }}></div>
        <div style={{ ...styles.dot, background: "#facc15", left: 7, top: 12 }}></div>
      </div>

      {/* Content */}
      <div style={styles.content}>

        <h1
          style={{
            ...styles.title,
            transform: `rotateX(${-rotate.x}deg) rotateY(${rotate.y}deg)`
          }}
        >

          {text.split("").map((letter, i) => (

            <span
              key={i}
              style={{
                display: "inline-block",
                animation: `letterFloat 3s ease-in-out ${i * 0.15}s infinite`
              }}
            >
              {letter}
            </span>

          ))}

        </h1>

        <p style={styles.subtitle}>
          A powerful digital workspace where ideas turn into reality through
          collaboration, innovation, and technology.
        </p>

        <div style={styles.buttonBox}>

          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/Signup")}
          >
            Join
          </button>

        </div>

      </div>

      {/* Hero Image */}
      <div style={styles.imageWrapper}>

        <img
          src={hero}
          alt="Workspace Graphic"
          style={styles.heroImage}
        />

      </div>

    </div>

  );
}

const styles = {

  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    color: "white",
    overflow: "hidden",
    position: "relative",
    perspective: "1000px",

    background: `
      radial-gradient(circle at 70% 40%, rgba(168,85,247,0.25), transparent 40%),
      radial-gradient(circle at 20% 60%, rgba(255,0,200,0.2), transparent 40%),
      #000
    `
  },

  logoContainer: {
    position: "absolute",
    top: "40px",
    left: "40px",
    width: "40px",
    height: "40px",
  },

  dot: {
    position: "absolute",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    filter: "brightness(1.2)",
  },

  content: {
    paddingLeft: "8%",
    maxWidth: "700px",
    zIndex: 10,
  },

  title: {
    fontSize: "clamp(4rem, 7vw, 8rem)",
    fontWeight: "900",
    margin: "0 0 20px 0",
    letterSpacing: "-2px",
    lineHeight: "0.9",
    transformStyle: "preserve-3d",
    transition: "transform 0.15s ease-out",

    textShadow: `
      0px 3px 0px #aaa,
      0px 10px 25px rgba(0,0,0,0.8),
      0px 25px 60px rgba(0,0,0,1)
    `
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#cccccc",
    marginBottom: "40px",
    maxWidth: "500px",
  },

  buttonBox: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    background: "#ffffff",
    color: "#000000",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "10px 35px",
    borderRadius: "50px",
    border: "1px solid #ffffff",
    background: "transparent",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  imageWrapper: {
    position: "absolute",
    right: "-20%",
    top: "50%",
    transform: "translateY(10%)",
    width: "60%",
    pointerEvents: "none",
  },

  heroImage: {
    width: "100%",
    height: "auto",
    display: "block",
    animation: "float 6s ease-in-out infinite",
    filter: "drop-shadow(0px 0px 120px rgba(255,0,200,0.4))"
  },

};

export default Temp;