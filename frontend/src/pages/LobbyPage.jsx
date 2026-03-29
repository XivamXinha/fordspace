import { useLocation } from "react-router-dom";

function LobbyPage(){

  const location = useLocation();

  const teamName = location.state?.teamName || "Team";
  const ownerName = location.state?.ownerName || "Admin";
  const members = location.state?.members || [];

  return(

    <div style={styles.container}>

      {/* LEFT TEAM PANEL */}

      <div style={styles.sidebar}>

        <h2 style={styles.teamTitle}>{teamName}</h2>

        <p style={styles.admin}>
          Created by {ownerName}
          <span style={styles.adminBadge}> ADMIN</span>
        </p>

        <h3 style={{marginTop:"30px"}}>Members</h3>

        <div style={styles.memberList}>

          {members.length === 0 && <p>No members</p>}

          {members.map((member,index)=>(

            <div key={index} style={styles.memberCard}>

              <div style={styles.avatar}>
                {member.name.charAt(0).toUpperCase()}
              </div>

              <div>
                {member.name === ownerName ? "👑 " : "👤 "}
                {member.name}
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* DIRECTORY PANEL */}

      <div style={styles.directory}>

        <h3>DIRECTORY</h3>

        <div style={styles.file}>index.js</div>
        <div style={styles.file}>app.js</div>
        <div style={styles.file}>style.css</div>

      </div>


      {/* CODE EDITOR */}

      <div style={styles.codePanel}>

        <h3>CODE</h3>

        <textarea
        style={styles.editor}
        placeholder="Write your code here..."
        />

      </div>


      {/* RUN PANEL */}

      <div style={styles.runPanel}>

        <h3>RUN</h3>

        <div style={styles.output}>
          Output will appear here...
        </div>

      </div>

    </div>

  )

}


const styles = {

container:{
  display:"flex",
  height:"100vh",
  width:"100vw",

  background:`
  radial-gradient(circle at 70% 40%, rgba(168,85,247,0.25), transparent 40%),
  radial-gradient(circle at 20% 60%, rgba(255,0,200,0.2), transparent 40%),
  #000`,

  color:"white"
},

sidebar:{
  width:"260px",
  padding:"25px",
  borderRight:"1px solid rgba(255,255,255,0.1)"
},

teamTitle:{
  fontSize:"24px"
},

admin:{
  marginTop:"5px",
  opacity:"0.9"
},

adminBadge:{
  color:"#ef4444",
  marginLeft:"6px",
  fontWeight:"bold"
},

memberList:{
  marginTop:"15px",
  display:"flex",
  flexDirection:"column",
  gap:"10px"
},

memberCard:{
  display:"flex",
  alignItems:"center",
  gap:"10px",
  padding:"10px",
  borderRadius:"8px",
  background:"rgba(255,255,255,0.05)"
},

avatar:{
  width:"30px",
  height:"30px",
  borderRadius:"50%",
  background:"#a855f7",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontWeight:"bold"
},

directory:{
  width:"220px",
  padding:"20px",
  borderRight:"1px solid rgba(255,255,255,0.1)"
},

file:{
  marginTop:"10px",
  padding:"6px",
  background:"rgba(255,255,255,0.05)",
  borderRadius:"6px",
  cursor:"pointer"
},

codePanel:{
  flex:1,
  padding:"20px",
  borderRight:"1px solid rgba(255,255,255,0.1)"
},

editor:{
  width:"100%",
  height:"90%",
  background:"#111",
  color:"white",
  border:"none",
  outline:"none",
  fontFamily:"monospace",
  fontSize:"14px",
  padding:"10px"
},

runPanel:{
  width:"300px",
  padding:"20px"
},

output:{
  marginTop:"10px",
  background:"#000",
  height:"90%",
  padding:"10px",
  borderRadius:"8px"
}

};

export default LobbyPage;