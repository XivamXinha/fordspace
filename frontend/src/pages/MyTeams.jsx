import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyTeams(){

  const navigate = useNavigate();

  const [createdTeams,setCreatedTeams] = useState([]);
  const [joinedTeams,setJoinedTeams] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(()=>{

    fetch(`http://localhost:5000/api/team/my-teams/${userEmail}`)
    .then(res => res.json())
    .then(data => {

      setCreatedTeams(data.createdTeams || []);
      setJoinedTeams(data.joinedTeams || []);

    });

  },[]);

  const openWorkspace = (team)=>{

    navigate("/lobby",{
      state:{
        teamName:team.teamName,
        ownerName:team.ownerName,
        members:team.members
      }
    });

  };

  return(

    <div style={styles.container}>

      <h2 style={styles.title}>My Teams</h2>


      {/* CREATED TEAMS */}

      <h3 style={styles.section}>Created By You</h3>

      {createdTeams.length === 0 && <p>No team created</p>}

      <div style={styles.grid}>

      {createdTeams.map((team,index)=>(

        <div key={index} style={styles.card}>

          <h3>{team.teamName}</h3>

          <p style={styles.teamID}>Team ID : {team.teamID}</p>

          <div style={styles.btnRow}>

          <button
          onClick={()=>openWorkspace(team)}
          style={styles.primaryBtn}
          >
          Work
          </button>

          <button
            onClick={()=>navigate("/teamdetails",{
              state:{
                teamID:team.teamID,
                teamName:team.teamName,
                ownerName:team.ownerName
              }
            })}
            style={styles.secondaryBtn}
          >
          Details
          </button>

          </div>

        </div>

      ))}

      </div>


      <hr style={styles.divider}/>


      {/* JOINED TEAMS */}

      <h3 style={styles.section}>Joined Teams</h3>

      {joinedTeams.length === 0 && <p>No joined teams</p>}

      <div style={styles.grid}>

      {joinedTeams.map((team,index)=>(

        <div key={index} style={styles.card}>

          <h3>{team.teamName}</h3>

          <p style={styles.teamID}>Team ID : {team.teamID}</p>

          <button
            onClick={()=>openWorkspace(team)}
            style={styles.primaryBtn}
          >
            Work
          </button>

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

title:{
  fontSize:"36px",
  marginBottom:"30px"
},

section:{
  marginTop:"20px",
  marginBottom:"20px"
},

grid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:"20px"
},

card:{
  padding:"25px",

  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(10px)",

  borderRadius:"14px",
  border:"1px solid rgba(255,255,255,0.1)"
},

teamID:{
  opacity:"0.7",
  margin:"10px 0"
},

btnRow:{
  display:"flex",
  gap:"10px",
  marginTop:"10px"
},

primaryBtn:{
  padding:"8px 16px",
  border:"none",
  borderRadius:"6px",

  background:"#6366f1",
  color:"white",

  cursor:"pointer"
},

secondaryBtn:{
  padding:"8px 16px",
  border:"1px solid rgba(255,255,255,0.2)",
  borderRadius:"6px",

  background:"transparent",
  color:"white",

  cursor:"pointer"
},

divider:{
  margin:"40px 0",
  border:"1px solid rgba(255,255,255,0.1)"
}

};

export default MyTeams;