import { useEffect, useState } from "react";

function InviteMember(){

  const [email,setEmail] = useState("");
  const [teams,setTeams] = useState([]);
  const [selectedTeam,setSelectedTeam] = useState("");

  const userEmail = localStorage.getItem("userEmail");

  useEffect(()=>{

    fetch(`http://localhost:5000/api/team/my-teams/${userEmail}`)
    .then(res=>res.json())
    .then(data=>{
      setTeams(data.createdTeams || []);
    });

  },[]);

  const sendInvite = ()=>{

    if(!email || !selectedTeam){
      alert("Enter email and select team");
      return;
    }

    fetch("http://localhost:5000/api/team/invite",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        teamID:selectedTeam,
        email:email
      })

    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.message);
    });

  };

  return(

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Invite Member</h2>

        <input
          type="email"
          placeholder="Enter member email"
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />

        <select
          onChange={(e)=>setSelectedTeam(e.target.value)}
          style={styles.input}
        >

          <option value="">Select Team</option>

          {teams.map(team=>(

            <option key={team._id} value={team.teamID}>
              {team.teamName}
            </option>

          ))}

        </select>

        <button
          onClick={sendInvite}
          style={styles.button}
        >
          Send Invite
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
  backdropFilter:"blur(10px)",

  borderRadius:"14px",
  border:"1px solid rgba(255,255,255,0.1)",

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

  background:"#6366f1",
  color:"white",

  fontWeight:"600",
  cursor:"pointer"
}

};

export default InviteMember;