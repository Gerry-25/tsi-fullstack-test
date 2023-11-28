import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
    Box,
    Button,
    Container,
    SvgIcon,
    Typography,
    Stack,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import services from 'src/services';
import PlayerTable from 'src/sections/tables/player-table';
import AddModal from 'src/sections/player/AddModal';

const Page = () => {
    // Récupérer le token depuis la session storage
    const token = window.sessionStorage.getItem('token');
    // État pour gérer l'ouverture/fermeture de add modal
    const [addModalOpen, setAddModalOpen] = useState(false);
    // État pour stocker les données de la table
    const [data, setData] = useState([]);

    // Chargement des données
    const [loading, setLoading] = useState(true);

    // États pour gérer la sélection, la pagination et le nombre de lignes par page
    const [page, setPage] = useState(0); // État pour le numéro de page actuel
    const [rowsPerPage, setRowsPerPage] = useState(5); // État pour le nombre de lignes par page

    // Fonction pour gérer le changement de page
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // Fonction pour gérer le changement du nombre de lignes par page
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Fonction pour ouvrir et fermer le add modal
    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    };


    // Récupérer les données
    const fetchData = async () => {
        try {
            // Appel à l'API pour obtenir les constantes (ajoutez votre endpoint et votre logique d'appel ici)
            const response = await services.getAllPlayer(token);

            // Mettre à jour l'état des données si la requête est réussie
            if (response.status === 200) {
                setData(response.data.result);
            }
        } catch (error) {
            // Gérer les erreurs liées à l'appel API ici
            console.error('Erreur lors de la récupération des données :', error);
        }
        finally {
            setLoading(false)
        }
    };

    // Utiliser useEffect pour effectuer l'appel API au chargement de la page
    useEffect(() => {
        fetchData()
    }, [toggleAddModal]); // Le tableau vide indique que cela doit être exécuté seulement après le premier rendu

    return (
        <>
            {/* Balise head pour définir le titre de la page */}
            <Head>
                <title>Players | TSI</title>
            </Head>

            {/* Contenu de la page */}
            <Box component="main" sx={{ flexGrow: 1, py: 4, bgcolor: 'white' }}>
                <Container maxWidth="xl">
                    <Stack spacing={2}>
                        {/* En-tête de la page */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack
                                width="100%"
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={4}
                            >
                                {/* Titre de la page */}
                                <Typography variant="h5" color="#79D302" gutterBottom>
                                    Listes des joueurs
                                </Typography>
                                {/* Bouton pour ouvrir la modal */}
                                <Button
                                    startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}
                                    variant="contained"
                                    style={{ backgroundColor: '#79D302' }}
                                    onClick={toggleAddModal}
                                >
                                    Ajouter un joueur
                                </Button>
                            </Stack>
                        </Stack>

                        {/* Tableau de données */}
                        <PlayerTable
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
Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
