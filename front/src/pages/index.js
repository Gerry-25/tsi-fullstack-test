import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { OverviewTotalPlayers } from "src/sections/overview/total-players";
import { TotalGames } from "src/sections/overview/total-game";
import { TotalStat } from "src/sections/overview/total-stat";
import { TotalWin } from "src/sections/overview/total-win";
import { TotalLose } from "src/sections/overview/total-lose";
import services from "src/services";

const now = new Date();

const Page = () => {
  const token = window.sessionStorage.getItem("token");
  const [salary, setSalary] = useState({});
  const [player, setPlayer] = useState({});
  const [totalGame, setTotalGame] = useState({});
  const [totalStat, setTotalStat] = useState({});
  const [totalGameWin, setTotalGameWin] = useState({});
  const [totalGameLoose, setTotalGameLoose] = useState({});

  const [loading, setLoading] = useState(true);

  const getTeamSalary = async () => {
    try {
      // Appel à l'API pour obtenir les constantes (ajoutez votre endpoint et votre logique d'appel ici)
      const response = await services.getTotalBudget(token);

      // Mettre à jour l'état des données si la requête est réussie
      if (response.status === 200) {
        setSalary(response.data);
      }
    } catch (error) {
      // Gérer les erreurs liées à l'appel API ici
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const getPlayerNumber = async () => {
    try {
      const response = await services.totalPlayer(token);

      if (response.status === 200) {
        setPlayer(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalGame = async () => {
    try {
      const response = await services.totalGame(token);

      if (response.status === 200) {
        setTotalGame(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStat = async () => {
    try {
      const response = await services.totalStat(token);

      if (response.status === 200) {
        setTotalStat(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalGameWin = async () => {
    try {
      const response = await services.totalGameWin(token);

      if (response.status === 200) {
        setTotalGameWin(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalGameLoose = async () => {
    try {
      const response = await services.totalGameLoose(token);

      if (response.status === 200) {
        setTotalGameLoose(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamSalary(),
      getPlayerNumber(),
      getTotalGame(),
      getTotalStat(),
      getTotalGameWin(),
      getTotalGameLoose();
  }, []);

  return (
    <>
      <Head>
        <title>Dashbord | TSI</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget positive sx={{ height: "100%" }} value={salary.totalSalary} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalPlayers
                positive={false}
                sx={{ height: "100%" }}
                value={player.totalPlayer}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <TotalGames sx={{ height: "100%" }} value={totalGame.totalGame} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <TotalStat sx={{ height: "100%" }} value={totalStat.totalStat} />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <TotalWin positive sx={{ height: "100%" }} value={totalGameWin.totalGameWin} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <TotalLose positive sx={{ height: "100%" }} value={totalGameLoose.totalGameLoose} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[totalGameWin.totalGameWin, totalGameLoose.totalGameLoose]}
                labels={["Win", "Loose"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
