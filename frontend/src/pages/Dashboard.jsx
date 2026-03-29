import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const name = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail");

  const allTeams = JSON.parse(localStorage.getItem("teams")) || [];
  const myTeams = allTeams.filter(team => team.owner === userEmail);

  const handleLogout = () => {

    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");

  };

  return (

    <div style={container}>

      {/* Navbar */}

      <div style={navbar}>

        <h2 style={logo}>FordSpace</h2>

        <div style={navRight}>

          <span style={welcome}>Welcome, {name}</span>

          <button
            onClick={handleLogout}
            style={logoutBtn}
          >
            Logout
          </button>

        </div>

      </div>


      {/* Hero */}

      <div style={hero}>

        <h1 style={heroTitle}>
          Build. Code. Collaborate.
        </h1>

        <p style={heroText}>
          The platform where developers create teams and work together.
        </p>

      </div>


      {/* Cards */}

      <div style={grid}>

        <div
          style={card}
          onClick={() => navigate("/createteam")}
        >
          <h2>Create Team</h2>
          <p>Create a workspace and become admin.</p>
        </div>

        <div
          style={card}
          onClick={() => navigate("/invite")}
        >
          <h2>Invite Member</h2>
          <p>Invite developers to your workspace.</p>
        </div>

        <div
          style={card}
          onClick={() => navigate("/join")}
        >
          <h2>Join Team</h2>
          <p>Join an existing team using a Team ID.</p>
        </div>

        <div
          style={card}
          onClick={() => navigate("/myteams")}
        >
          <h2>My Teams</h2>
          <p>You created {myTeams.length} team(s).</p>
        </div>

      </div>

    </div>

  );

}




const container = {

  minHeight: "100vh",
  width: "100vw",
  padding: "40px",

  background: `
  radial-gradient(circle at 70% 40%, rgba(168,85,247,0.25), transparent 40%),
  radial-gradient(circle at 20% 60%, rgba(255,0,200,0.2), transparent 40%),
  #000
  `,

  color: "white",
  boxSizing: "border-box"

};


const navbar = {

  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  marginBottom: "60px",

  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",

  padding: "15px 25px",
  borderRadius: "12px",

  border: "1px solid rgba(255,255,255,0.1)"

};


const logo = {

  fontSize: "24px",
  fontWeight: "bold"

};


const navRight = {

  display: "flex",
  alignItems: "center",
  gap: "20px"

};


const welcome = {

  fontSize: "15px",
  opacity: "0.9"

};


const logoutBtn = {

  padding: "8px 18px",
  border: "none",
  borderRadius: "8px",

  background: "#ef4444",
  color: "white",

  cursor: "pointer",
  fontWeight: "bold"

};


const hero = {

  marginBottom: "50px"

};


const heroTitle = {

  fontSize: "42px",
  marginBottom: "10px"

};


const heroText = {

  fontSize: "18px",
  opacity: "0.8"

};


const grid = {

  width: "100%",
  display: "grid",

  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "25px"

};


const card = {

  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",

  padding: "30px",
  borderRadius: "16px",

  cursor: "pointer",
  transition: "0.25s",

  border: "1px solid rgba(255,255,255,0.1)"

};


export default Dashboard;