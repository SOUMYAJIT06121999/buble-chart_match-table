import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import teams from "../data/teams.json";
import matches from "../data/matches.json";

const ChartRepresentation = () => {
  const [dataset, setDataset] = useState({
    datasets: [{
      label: '',
      data: [{
        x: 0,
        y: 0,
        r: 0
      }],
      backgroundColor: 'rgb(0, 0, 0)'
    }]
  })
  useEffect(() => {

    let teamData = {};
    teams?.clubs?.forEach((team) => {
      let totalGoalPerTeam = 0,
        totalmatchWonPerTeam = 0,
        totalmatchLossPerTeam = 0,
        totalmatchTiesPerTeam = 0;
      matches?.rounds?.forEach((round) => {
        round?.matches.forEach((match) => {
          if (match?.team1?.code == team?.code) {
            totalGoalPerTeam = totalGoalPerTeam + match?.score1;

            if (match?.score1 > match?.score2) {
              totalmatchWonPerTeam++;
            }else if (match?.score1 < match?.score2) {
              totalmatchLossPerTeam++;
            }else {
              totalmatchTiesPerTeam++;
            }
          } else if (match?.team2?.code == team?.code) {
            totalGoalPerTeam = totalGoalPerTeam + match?.score2;

            if (match?.score1 < match?.score2) {
              totalmatchWonPerTeam++;
            }else if (match?.score1 > match?.score2) {
              totalmatchLossPerTeam++;
            }else {
              totalmatchTiesPerTeam++;
            }
          }
        });
      });

      if (team?.code) {
        teamData = {
         ...teamData,
          [team?.code]: {
            totalGoal: totalGoalPerTeam,
            totalWon: totalmatchWonPerTeam,
            totalLoss: totalmatchLossPerTeam,
            totalTies: totalmatchTiesPerTeam,
          },
        };
      }
    });

    const data = {
      datasets: teams?.clubs?.filter(teams => teams?.code).map((team, index) => {
        if(team?.code){
          return(
            {
              label: team.name,
              data: [{
                x: teamData[team.code].totalLoss,
                y: teamData[team.code].totalWon,
                r: teamData[team.code].totalGoal
              }],
              backgroundColor: `rgb( ${Math.floor(Math.random() * 255)},  ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            }
          )
        }
      }) 

    };

    
   

    
   setDataset(data);
  }, []);
  // const data = {
  //   datasets: [{
  //     label: 'First Dataset',
  //     data: [{
  //       x: 20,
  //       y: 30,
  //       r: 15
  //     }, {
  //       x: 40,
  //       y: 10,
  //       r: 10
  //     }],
  //     backgroundColor: 'rgb(255, 99, 132)'
  //   }]
  // }
  return (
    <div>
      <Chart type="bubble" data= {dataset} />
    </div>
  );
};

export default ChartRepresentation;