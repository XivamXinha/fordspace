import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTeam(){

  const navigate = useNavigate();

  const [teamName,setTeamName] = useState("");

  const handleCreate = async () => {

    if(!teamName){
      alert("Enter team name");
      return;
    }

    try{

      const res = await fetch("http://localhost:5000/api/team/create",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          teamName,
          ownerEmail:localStorage.getItem("userEmail"),
          ownerName:localStorage.getItem("userName")

        })

      });

      const data = await res.json();

      alert(data.message);

      navigate("/myteams");

    }catch(err){

      alert("Team creation failed");

    }

  };

  return(

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Create Team</h2>

        <input
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e)=>setTeamName(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleCreate}
          style={styles.button}
        >
          Create Team
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

  display:"flex",
  flexDirection:"column",
  gap:"20px"
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

  background:"#fff",
  color:"#000",

  fontWeight:"600",
  cursor:"pointer"
}

};

export default CreateTeam;