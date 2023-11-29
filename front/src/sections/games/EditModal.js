import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function EditModal({ visible, closeEditModal,data }) {
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
            opponent: data.opponent ||'', 
        winOrLose: data.winOrLose || '', 
        score: data.score || '',
        gameDate:data.gameDate || ''      
        });
    };

    useEffect(() => { init() }, [visible])


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
                const response = await services.updateGame(token, data._id, player);
                // Traiter la réponse si nécessaire
                console.log('Game update with success :', response);
                closeEditModal();
            } catch (error) {
                console.error('Error when updating players :', error);
            }
        }
    };

    return (
        <Dialog open={visible} onClose={closeEditModal}>
            <DialogTitle>Update player</DialogTitle>
            <DialogContent style={{ width: 600 }}>
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
                    Modifier
                </Button>
                <Button variant="contained" color="secondary" onClick={closeEditModal}>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditModal;
