import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, SvgIcon, Typography, Stack } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import services from "src/services";
import AddModal from "src/sections/games/AddModal";
import GameTable from "src/sections/tables/game-table";

const Page = () => {
  const token = window.sessionStorage.getItem("token");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0); // État pour le numéro de page actuel
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const fetchData = async () => {
    try {
      const response = await services.getAllGame(token);

      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (error) {
      // Gérer les erreurs liées à l'appel API ici
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toggleAddModal]);
  return (
    <>
      {/* Balise head pour définir le titre de la page */}
      <Head>
        <title>Games | TSI</title>
      </Head>

      {/* Contenu de la page */}
      <Box component="main" sx={{ flexGrow: 1, py: 4, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>
            {/* En-tête de la page */}
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={4}
              >
                {/* Titre de la page */}
                <Typography variant="h5" color="#79D302" gutterBottom>
                  Games Listes
                </Typography>
                {/* Bouton pour ouvrir la modal */}
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  style={{ backgroundColor: "#79D302" }}
                  onClick={toggleAddModal}
                >
                  Add new game
                </Button>
              </Stack>
            </Stack>

            {/* Tableau de données */}
            <GameTable
              count={data.length}
              items={data}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              fetchData={fetchData}
              loading={loading}
            />

            {/* Modal pour ajouter une constante */}
            <AddModal visible={addModalOpen} closeAddModal={toggleAddModal} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

// Fonction pour définir la mise en page du composant
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
