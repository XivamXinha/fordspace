import { BrowserRouter, Routes, Route } from "react-router-dom";

import Temp from "./pages/Temp";
import Signup from "./pages/SignupTemp";
import Login from "./pages/Login";
import Verify from "./pages/VerifyTemp";
import Dashboard from "./pages/Dashboard";
import CreateTeam from "./pages/CreateTeam";
import MyTeams from "./pages/MyTeams";
import LobbyPage from "./pages/LobbyPage";
import JoinTeam from "./pages/JoinTeam";
import TeamDetails from "./pages/TeamDetails";
import InviteMember from "./pages/InviteMember";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Temp />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify" element={<Verify />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createteam" element={<CreateTeam />} />

        <Route path="/myteams" element={<MyTeams />} />
        <Route path="/lobby" element={<LobbyPage />} />

        <Route path="/join" element={<JoinTeam />} />

        <Route path="/teamdetails" element={<TeamDetails />} />
        <Route path="/invite" element={<InviteMember />} />

        

      </Routes>

    </BrowserRouter>

  )

}

export default App;