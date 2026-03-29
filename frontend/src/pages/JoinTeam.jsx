import { useState } from "react";
import axios from "axios";

function JoinTeam(){

  const [teamID,setTeamID] = useState("");
  const [team,setTeam] = useState(null);

  const searchTeam = async ()=>{

    if(!teamID){
      alert("Enter Team ID");
      return;
    }

    try{

      const res = await axios.get(`http://localhost:5000/api/team/search/${teamID}`);

      if(res.data.message){
        alert(res.data.message);
        return;
      }

      setTeam(res.data);

    }catch(err){
      alert("Team not found");
    }

  };

  const sendRequest = async ()=>{

    try{

      await axios.post("http://localhost:5000/api/team/join-request",{

        teamID,
        email:localStorage.getItem("userEmail"),
        name:localStorage.getItem("userName")

      });

      alert("Request sent");

    }catch(err){
      alert("Request failed");
    }

  };

  return(

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Join Team</h2>

        <input
          placeholder="Enter Team ID"
          onChange={(e)=>setTeamID(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={searchTeam}
          style={styles.button}
        >
          Search
        </button>

        {team && (

          <div style={styles.teamBox}>

            <h3>{team.teamName}</h3>

            <button
              onClick={sendRequest}
              style={styles.joinBtn}
            >
              Send Join Request
            </button>

          </div>

        )}

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
  backdropFilter:"blur(10px)",

  borderRadius:"14px",
  border:"1px solid rgba(255,255,255,0.1)",

  display:"flex",
  flexDirection:"column",
  gap:"18px"
},

title:{
  color:"white",
  fontSize:"26px",
  textAlign:"center"
},

input:{
  padding:"12px",

  borderRadius:"8px",
  border:"1px solid rgba(255,255,255,0.15)",

  background:"rgba(255,255,255,0.05)",
  color:"white",

  outline:"none"
},

button:{
  padding:"12px",

  border:"none",
  borderRadius:"8px",

  background:"#6366f1",
  color:"white",

  fontWeight:"600",
  cursor:"pointer"
},

teamBox:{
  marginTop:"10px",
  padding:"15px",

  background:"rgba(255,255,255,0.05)",
  borderRadius:"10px",

  textAlign:"center"
},

joinBtn:{
  marginTop:"10px",
  padding:"10px",

  border:"none",
  borderRadius:"6px",

  background:"#22c55e",
  color:"white",

  fontWeight:"600",
  cursor:"pointer"
}

};

export default JoinTeam;