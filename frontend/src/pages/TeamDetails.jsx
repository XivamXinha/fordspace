import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function TeamDetails(){

  const location = useLocation();

  const {teamID,teamName,ownerName} = location.state;

  const [team,setTeam] = useState(null);

  useEffect(()=>{

    fetch(`http://localhost:5000/api/team/search/${teamID}`)
    .then(res=>res.json())
    .then(data=>setTeam(data));

  },[]);

  const acceptRequest = async (email)=>{

    await axios.post("http://localhost:5000/api/team/accept-request",{

      teamID,
      email

    });

    alert("Member added");

    window.location.reload();

  };

  if(!team){

    return(

      <div style={styles.loading}>
        Loading...
      </div>

    )

  }

  return(

    <div style={styles.container}>

      <div style={styles.headerCard}>

        <h1>{teamName}</h1>

        <h3 style={styles.admin}>
          Admin : {ownerName}
        </h3>

      </div>


      {/* REQUESTS */}

      <h2 style={styles.sectionTitle}>Join Requests</h2>

      {team.requests.length === 0 && <p>No requests</p>}

      <div style={styles.grid}>

      {team.requests.map((user,index)=>(

        <div key={index} style={styles.card}>

          <p>{user.name}</p>

          <button
          style={styles.acceptBtn}
          onClick={()=>acceptRequest(user.email)}
          >
          Accept
          </button>

        </div>

      ))}

      </div>


      {/* MEMBERS */}

      <h2 style={styles.sectionTitle}>Members</h2>

      {team.members.length === 0 && <p>No members yet</p>}

      <div style={styles.grid}>

      {team.members.map((user,index)=>(

        <div key={index} style={styles.memberCard}>

          {user.name}

        </div>

      ))}

      </div>

    </div>

  )

}


/* ===================== */
/* STYLES */
/* ===================== */

const styles = {

container:{
  minHeight:"100vh",
  width:"100vw",
  padding:"40px",

  background:`
  radial-gradient(circle at 70% 40%, rgba(168,85,247,0.25), transparent 40%),
  radial-gradient(circle at 20% 60%, rgba(255,0,200,0.2), transparent 40%),
  #000`,

  color:"white"
},

loading:{
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  color:"white"
},

headerCard:{
  padding:"30px",
  marginBottom:"40px",

  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(10px)",

  borderRadius:"14px",
  border:"1px solid rgba(255,255,255,0.1)"
},

admin:{
  opacity:"0.8"
},

sectionTitle:{
  marginBottom:"20px"
},

grid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px",
  marginBottom:"40px"
},

card:{
  padding:"20px",

  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(10px)",

  borderRadius:"12px",
  border:"1px solid rgba(255,255,255,0.1)",

  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
},

memberCard:{
  padding:"20px",

  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(10px)",

  borderRadius:"12px",
  border:"1px solid rgba(255,255,255,0.1)"
},

acceptBtn:{
  padding:"6px 14px",

  border:"none",
  borderRadius:"6px",

  background:"#22c55e",
  color:"white",

  cursor:"pointer",
  fontWeight:"600"
}

};

export default TeamDetails;