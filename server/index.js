import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true }));

// GET /api/team/:teamName
app.get("/api/team/:teamName", async (req, res) => {
  const { teamName } = req.params;

  try {
    // 1) Get the team row
    const teamResult = await pool.query(
      `SELECT team_id, team_name, description
       FROM "Members".teams
       WHERE team_name = $1`,
      [teamName]
    );

    if (teamResult.rows.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const team = teamResult.rows[0];

    // 2) Get people + roles for that team
    const peopleResult = await pool.query(
      `SELECT
          m.member_id,
          r.role_name,
          m.first_name,
          m.last_name,
          m.pronouns,
          m.email,
          m.year_of_study
       FROM "Members".member_team_roles mtr
       JOIN "Members".roles r ON r.role_id = mtr.role_id
       JOIN "Members".members m ON m.member_id = mtr.member_id
       WHERE mtr.team_id = $1
       ORDER BY r.role_name, m.last_name`,
      [team.team_id]
    );

    // 3) Group by role_name
    const grouped = {};
    for (const row of peopleResult.rows) {
      if (!grouped[row.role_name]) grouped[row.role_name] = [];
      grouped[row.role_name].push({
        member_id: row.member_id, 
        first_name: row.first_name,
        last_name: row.last_name,
        pronouns: row.pronouns,
        email: row.email,
        year_of_study: row.year_of_study,
        role_name: row.role_name
      });
    }

    res.json({ team, roles: grouped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on http://localhost:4000");
});
