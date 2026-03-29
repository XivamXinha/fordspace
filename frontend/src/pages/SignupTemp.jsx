import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../assets/first.png";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await axios.post("http://localhost:5000/api/signup", {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        password: formData.password
      });

      if (res.status === 200) {

        alert(res.data.message);
        localStorage.setItem("userEmail", formData.email);
        navigate("/verify");

      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not responding");
      }

    }

  };

  return (

    <div style={styles.container}>

      {/* Signup Glass Card */}

      <div style={styles.card}>

        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Enter Gmail"
            onChange={handleChange}
            required
          />

          {/* Gender Radio Buttons */}

          <div style={styles.radioGroup}>

            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />
              Female
            </label>

          </div>

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            Sign Up
          </button>

        </form>

        <p style={styles.text}>
          Already Registered?
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login here
          </span>
        </p>

      </div>

      {/* Floating Image */}

      <div style={styles.imageWrapper}>

        <img
          src={hero}
          alt="graphic"
          style={styles.heroImage}
        />

      </div>

    </div>

  );

}

const styles = {

container:{
  height:"100vh",
  width:"100vw",
  display:"flex",
  alignItems:"center",
  paddingLeft:"8%",
  position:"relative",

  background:`
  radial-gradient(circle at 70% 40%, rgba(168,85,247,0.25), transparent 40%),
  radial-gradient(circle at 20% 60%, rgba(255,0,200,0.2), transparent 40%),
  #000`
},

card:{
  width:"380px",
  padding:"40px",

  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(12px)",

  border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:"14px",

  display:"flex",
  flexDirection:"column"
},

title:{
  marginBottom:"20px",
  fontSize:"28px"
},

form:{
  display:"flex",
  flexDirection:"column",
  gap:"15px"
},

input:{
  padding:"12px",
  borderRadius:"8px",
  border:"1px solid rgba(255,255,255,0.15)",
  background:"rgba(255,255,255,0.05)",
  color:"white",
  outline:"none"
},

radioGroup:{
  display:"flex",
  gap:"20px",
  color:"white",
  fontSize:"14px"
},

radioLabel:{
  display:"flex",
  alignItems:"center",
  gap:"6px",
  cursor:"pointer"
},

button:{
  marginTop:"10px",
  padding:"12px",
  background:"#fff",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer",
  fontWeight:"600"
},

text:{
  marginTop:"15px",
  fontSize:"14px",
  opacity:"0.8"
},

link:{
  color:"#a855f7",
  cursor:"pointer",
  marginLeft:"5px"
},

imageWrapper:{
  position:"absolute",
  right:"-20%",
  top:"50%",
  transform:"translateY(10%)",
  width:"60%",
  pointerEvents:"none"
},

heroImage:{
  width:"100%",
  animation:"float 6s ease-in-out infinite",
  filter:"drop-shadow(0px 0px 120px rgba(255,0,200,0.4))"
}

};

export default Signup;