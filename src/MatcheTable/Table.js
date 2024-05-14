
import React from "react";
import teams from "../data/teams.json";
import matches from "../data/matches.json";
import "./Table.css"

const MatchesTable = () => {
  const teamData = {};

  teams?.clubs?.forEach((team) => {
    let totalMatches = 0,
      totalWon = 0,
      totalLost = 0,
      totalTies = 0,
      totalGoalsScoredFor = 0,
      totalGoalsScoredAgainst = 0;

    matches?.rounds?.forEach((round) => {
      round?.matches.forEach((match) => {
        if (match?.team1?.code == team?.code) {
          totalMatches++;
          totalGoalsScoredFor += match?.score1;
          totalGoalsScoredAgainst += match?.score2;

          if (match?.score1 > match?.score2) {
            totalWon++;
          } else if (match?.score1 < match?.score2) {
            totalLost++;
          } else {
            totalTies++;
          }
        } else if (match?.team2?.code == team?.code) {
          totalMatches++;
          totalGoalsScoredFor += match?.score2;
          totalGoalsScoredAgainst += match?.score1;

          if (match?.score1 < match?.score2) {
            totalWon++;
          } else if (match?.score1 > match?.score2) {
            totalLost++;
          } else {
            totalTies++;
          }
        }
      });
    });

    teamData[team?.code] = {
      totalMatches,
      totalWon,
      totalLost,
      totalTies,
      totalGoalsScoredFor,
      totalGoalsScoredAgainst,
    };
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Teams</th>
          <th>Total Matches</th>
          <th>Won</th>
          <th>Lost</th>
          <th>Ties</th>
          <th>Total Goals Scored For</th>
          <th>Total Goals Scored Against</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(teamData).map(([teamCode, team]) => (
          <tr key={teamCode}>
            <td>{teamCode}</td>
            <td>{team.totalMatches}</td>
            <td>{team.totalWon}</td>
            <td>{team.totalLost}</td>
            <td>{team.totalTies}</td>
            <td>{team.totalGoalsScoredFor}</td>
            <td>{team.totalGoalsScoredAgainst}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchesTable;