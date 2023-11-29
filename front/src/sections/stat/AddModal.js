import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function AddModal({ visible, closeAddModal }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [gamesList, setGamesList] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    
    const [stat, setStat] = useState({
        playerId: '',
        
            gameId: '',
        
            minute: 0,
        
            points: 0,
        
            assists: 0,
        
            rebounds: 0,
        
            fouls: 0,
        
            freeThrowsMade: 0,
        
            freeThrowsAttempt: 0,
        
            fieldGoalMade: 0,
        
            fieldGoalAttempt: 0,
        
            threePointMade: 0,
        
            threePointAttempt: 0,
        
            interception: 0,
        
            block: 0
    });

    const getAllGame = async () => {
        try {
          const response = await services.getAllGame(token);
    
          if (response.status === 200) {
            setGamesList(response.data.result);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
      };
    };

    const getPlayerList = async () => {
        try {
          const response = await services.getAllPlayer(token);
    
          if (response.status === 200) {
            setPlayerList(response.data.result);
          }
        } catch (error) {
          // Gérer les erreurs liées à l'appel API ici
          console.error("Erreur lors de la récupération des données :", error);
        }
      };

      useEffect(() => {
        getAllGame();
        getPlayerList();
      }, []);



    const init = () => {
        setErrors({});
        setStat({
            playerId: '',
        
            gameId: '',
        
            minute: 0,
        
            points: 0,
        
            assists: 0,
        
            rebounds: 0,
        
            fouls: 0,
        
            freeThrowsMade: 0,
        
            freeThrowsAttempt: 0,
        
            fieldGoalMade: 0,
        
            fieldGoalAttempt: 0,
        
            threePointMade: 0,
        
            threePointAttempt: 0,
        
            interception: 0,
        
            block: 0
        });
        closeAddModal();
    };

    const validateFields = () => {
        const newErrors = {};

        // Vérifier les champs requis
        if (!stat.playerId) {
            newErrors.playerId = 'Le joueur est requis.';
        }

        if (!stat.gameId) {
            newErrors.gameId = 'Le match est requis.';
        }

        setErrors(newErrors);

        // Vérifier s'il y a des erreurs
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveAdd = async () => {
        const isValid = validateFields();

        if (isValid) {
            // Appel de l'API pour ajouter l'utilisateur
            try {
                const response = await services.addStat(token, stat);
                // Traiter la réponse si nécessaire
                console.log('Player add with success :', response);
                init();
            } catch (error) {
                console.error('Error when adding players :', error);
            }
        }
    };

    return (
        <Dialog open={visible} onClose={closeAddModal}>
            <DialogTitle>Add player</DialogTitle>
            <DialogContent style={{ width: 600 }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>

                <FormControl variant="filled" fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="playerId-label">Player</InputLabel>
                    <Select
                        labelId="playerId-label"
                        id="playerId"
                        name="playerId"
                        value={stat.playerId}
                        onChange={(e) => setStat({ ...stat, playerId: e.target.value })}
                    >
                        <MenuItem value="">Select a player</MenuItem>
                        {playerList.map((player) => (
                        <MenuItem key={player._id} value={player._id}>
                            {player.firstName + player.lastName}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="gameId-label">Game</InputLabel>
                    <Select
                        labelId="gameId-label"
                        id="gameId"
                        name="gameId"
                        value={stat.gameId}
                        onChange={(e) => setStat({ ...stat, gameId: e.target.value })}
                    >
                        <MenuItem value="">Select a game</MenuItem>
                        {gamesList.map((game) => (
                        <MenuItem key={game._id} value={game._id}>
                            {game.opponent}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>                
                </div>
                <TextField
                    label="Minute"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="minute"
                    value={stat.minute}
                    onChange={(e) => setStat({ ...stat, minute: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Points"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="points"
                    value={stat.points}
                    onChange={(e) => setStat({ ...stat, points: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Assists"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="assists"
                    value={stat.assists}
                    onChange={(e) => setStat({ ...stat, assists: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Rebounds"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="rebounds"
                    value={stat.rebounds}
                    onChange={(e) => setStat({ ...stat, rebounds: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Fouls"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="fouls"
                    value={stat.fouls}
                    onChange={(e) => setStat({ ...stat, fouls: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="FreeThrowsMade"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="freeThrowsMade"
                    value={stat.freeThrowsMade}
                    onChange={(e) => setStat({ ...stat, freeThrowsMade: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="FeeThrowsAttempt"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="freeThrowsAttempt"
                    value={stat.freeThrowsAttempt}
                    onChange={(e) => setStat({ ...stat, freeThrowsAttempt: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="FieldGoalMade"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="fieldGoalMade"
                    value={stat.fieldGoalMade}
                    onChange={(e) => setStat({ ...stat, fieldGoalMade: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="FieldGoalAttempt"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="fieldGoalAttempt"
                    value={stat.fieldGoalAttempt}
                    onChange={(e) => setStat({ ...stat, fieldGoalAttempt: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="ThreePointMade"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="threePointMade"
                    value={stat.threePointMade}
                    onChange={(e) => setStat({ ...stat, threePointMade: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="ThreePointAttempt"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="threePointAttempt"
                    value={stat.threePointAttempt}
                    onChange={(e) => setStat({ ...stat, threePointAttempt: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Interception"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="interception"
                    value={stat.interception}
                    onChange={(e) => setStat({ ...stat, interception: e.target.value })}
                    style={{ marginBottom: 20 }}
                />

                <TextField
                    label="Block"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="block"
                    value={stat.block}
                    onChange={(e) => setStat({ ...stat, block: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSaveAdd}>
                    Ajouter
                </Button>
                <Button variant="contained" color="secondary" onClick={init}>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddModal;