import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function AddModal({ visible, closeAddModal }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [game, setGame] = useState({
        opponent:'', 
        winOrLose:'', 
        score:'', 
        gameDate:''
    });



    const init = () => {
        setErrors({});
        setGame({
        opponent:'', 
        winOrLose:'', 
        score:'', 
        gameDate:''
        });
        closeAddModal();
    };

    const validateFields = () => {
        const newErrors = {};

        // Vérifier les champs requis
        if (!game.opponent) {
            newErrors.opponent = 'Requis.';
        }

        if (!game.winOrLose) {
            newErrors.winOrLose = 'Requis.';
        }

        if (!game.score) {
            newErrors.score = 'Requis.';
        }

        if (!game.gameDate) {
            newErrors.gameDate = 'Requis.';
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
                const response = await services.addGame(token, game);
                // Traiter la réponse si nécessaire
                console.log('Game add with success :', response);
                init();
            } catch (error) {
                console.error('Error when adding players :', error);
            }
        }
    };

    return (
        <Dialog open={visible} onClose={closeAddModal}>
            <DialogTitle>Add game</DialogTitle>
            <DialogContent style={{ width: 600 }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                    <TextField
                        label="Opponent"
                        variant="filled"
                        fullWidth
                        name="opponent"
                        value={game.opponent}
                        error={errors.opponent}
                        helperText={errors.opponent}
                        onChange={(e) => setGame({ ...game, opponent: e.target.value })}
                    />
                    <TextField
                        label="Date"
                        variant="filled"
                        fullWidth
                        name="gameDate"
                        value={game.gameDate}
                        error={errors.gameDate}
                        helperText={errors.gameDate}
                        onChange={(e) => setGame({ ...game, gameDate: e.target.value })}
                    />
                </div>
               
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                    
                    <TextField
                        label="Score"
                        variant="filled"
                        fullWidth
                        name="score"
                        value={game.score}
                        error={errors.score}
                        helperText={errors.birthDate}
                        onChange={(e) => setGame({ ...game, score: e.target.value })}
                    />
                </div>
                <FormControl variant="filled" fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="winOrLose-label">Win or Loose</InputLabel>
                    <Select
                        labelId="winOrLoose-label"
                        id="winOrLose"
                        name="winOrLose"
                        value={game.winOrLose}
                        error={errors.winOrLose}
                        onChange={(e) => setGame({ ...game, winOrLose: e.target.value })}
                    >
                        <MenuItem value="">Choose a position</MenuItem>
                        <MenuItem value="true">Win</MenuItem>
                        <MenuItem value="false">Loose</MenuItem>
                    </Select>
                </FormControl>
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
