const express = require("express");
const router = express.Router();

const Team = require("../models/Team");
const nodemailer = require("nodemailer");

// ================= EMAIL TRANSPORTER =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ================= CREATE TEAM =================

router.post("/create", async (req, res) => {
  try {

    const { teamName, ownerEmail, ownerName } = req.body;

    const teamID = "TEAM-" + Math.floor(100000 + Math.random() * 900000);

    const newTeam = new Team({
      teamName,
      teamID,
      ownerEmail,
      ownerName,
      members: [
        {
          email: ownerEmail,
          name: ownerName
        }
      ],
      requests: []
    });

    await newTeam.save();

    res.json({
      message: "Team created successfully",
      team: newTeam
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Team creation failed"
    });

  }
});

// ================= SEARCH TEAM =================

router.get("/search/:teamID", async (req, res) => {

  try {

    const team = await Team.findOne({
      teamID: req.params.teamID
    });

    if (!team) {
      return res.json({
        message: "Team not exist"
      });
    }

    res.json(team);

  } catch (err) {

    res.status(500).json({
      message: "Search failed"
    });

  }

});

// ================= SEND JOIN REQUEST =================

router.post("/join-request", async (req, res) => {

  try {

    const { teamID, email, name } = req.body;

    const team = await Team.findOne({ teamID });

    if (!team) {
      return res.json({ message: "Team not exist" });
    }

    const alreadyRequested = team.requests.find(r => r.email === email);
    const alreadyMember = team.members.find(m => m.email === email);

    if (alreadyRequested || alreadyMember) {
      return res.json({
        message: "Already requested or already a member"
      });
    }

    team.requests.push({
      email,
      name
    });

    await team.save();

    res.json({
      message: "Join request sent"
    });

  } catch (err) {

    res.status(500).json({
      message: "Request failed"
    });

  }

});

// ================= ACCEPT REQUEST =================

router.post("/accept-request", async (req, res) => {

  try {

    const { teamID, email } = req.body;

    const team = await Team.findOne({ teamID });

    if (!team) {
      return res.json({ message: "Team not found" });
    }

    const user = team.requests.find(r => r.email === email);

    if (!user) {
      return res.json({ message: "Request not found" });
    }

    team.members.push(user);

    team.requests = team.requests.filter(r => r.email !== email);

    await team.save();

    res.json({
      message: "Member added successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: "Accept request failed"
    });

  }

});

// ================= INVITE MEMBER =================

router.post("/invite", async (req, res) => {

  try {

    const { teamID, email } = req.body;

    const team = await Team.findOne({ teamID });

    if (!team) {
      return res.json({ message: "Team not found" });
    }

    const alreadyMember = team.members.find(m => m.email === email);
    const alreadyRequested = team.requests.find(r => r.email === email);

    if (alreadyMember || alreadyRequested) {
      return res.json({
        message: "User already member or already requested"
      });
    }

    team.requests.push({
      email,
      name: "Invited User"
    });

    await team.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "FordSpace Team Invitation",
      text: `You have been invited to join team "${team.teamName}"

Team ID: ${team.teamID}

Login to FordSpace and join using this Team ID.`
    });

    res.json({
      message: "Invite sent and email delivered"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Invite failed"
    });

  }

});

// ================= MY TEAMS =================

router.get("/my-teams/:email", async (req, res) => {

  try {

    const email = req.params.email;

    const createdTeams = await Team.find({
      ownerEmail: email
    });

    const joinedTeams = await Team.find({
      "members.email": email
    });

    res.json({
      createdTeams,
      joinedTeams
    });

  } catch (err) {

    res.status(500).json({
      message: "Fetching teams failed"
    });

  }

});

module.exports = router;