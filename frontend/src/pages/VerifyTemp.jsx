import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Verify(){

  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [otp,setOtp] = useState(["","","","","",""]);
  const [verified,setVerified] = useState(false);

  const handleChange = (element,index)=>{

    if(isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);

    if(element.nextSibling){
      element.nextSibling.focus();
    }

  };

  const handleSubmit = async()=>{

    const code = otp.join("");

    if(code.length !== 6){
      alert("Enter full OTP");
      return;
    }

    try{

      const res = await axios.post("http://localhost:5000/api/verify",{
        email,
        otp:code
      });

      alert(res.data.message);
      setVerified(true);

    }catch(error){

      alert(error.response?.data?.message || "Verification failed");

    }

  };

  if(verified){

    return(

      <div style={styles.container}>

        <div style={styles.card}>

          <h2>🎉 Email Verified</h2>

          <button
            style={styles.button}
            onClick={()=>navigate("/login")}
          >
            Go to Login
          </button>

        </div>

      </div>

    )

  }

  return(

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Enter OTP</h2>

        <div style={styles.otpContainer}>

          {otp.map((data,index)=>(

            <input
              key={index}
              maxLength="1"
              value={data}
              onChange={e=>handleChange(e.target,index)}
              style={styles.otpInput}
            />

          ))}

        </div>

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          Verify
        </button>

      </div>

    </div>

  )

}


/* ===================== */
/* STYLES */
/* ===================== */

const styles = {

container:{
  height:"100vh",
  width:"100vw",

  display:"flex",
  justifyContent:"center",
  alignItems:"center",

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

  textAlign:"center"
},

title:{
  marginBottom:"25px",
  color:"white"
},

otpContainer:{
  display:"flex",
  justifyContent:"center",
  gap:"12px",
  marginBottom:"25px"
},

otpInput:{
  width:"45px",
  height:"50px",

  borderRadius:"8px",

  border:"1px solid rgba(255,255,255,0.2)",

  background:"rgba(255,255,255,0.05)",
  color:"white",

  textAlign:"center",
  fontSize:"20px",

  outline:"none"
},

button:{
  width:"100%",
  padding:"12px",

  border:"none",
  borderRadius:"8px",

  background:"#fff",
  color:"#000",

  fontWeight:"600",
  cursor:"pointer"
}

};

export default Verify;