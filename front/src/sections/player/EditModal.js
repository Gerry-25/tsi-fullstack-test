import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function EditModal({ visible, closeEditModal,data }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [player, setPlayer] = useState({
            position:'', 
            size:'', 
            startContract:'', 
            endContract:'', 
            salary:0    });



    const init = () => {
        setErrors({});
        setPlayer({
            position:data.position ||"", 
            size: data.size ||"", 
            startContract: data.startContract ||"", 
            endContract: data.endContract ||"", 
            salary:data.salary || 0        });
    };

    useEffect(() => { init() }, [visible])


    const validateFields = () => {
        const newErrors = {};

        // Vérifier les champs requis
        if (!player.firstName) {
            newErrors.firstName = 'Le prénom est requis.';
        }

        if (!player.lastName) {
            newErrors.lastName = 'Le nom de famille est requis.';
        }

        if (!player.position) {
            newErrors.position = 'La position est requise.';
        }

        if (!player.size) {
            newErrors.size = 'La taille est requise.';
        }

        if (!player.startContract) {
            newErrors.password = 'La date est importante';
        }

        if (!player.endContract) {
            newErrors.phoneNumber = 'La date est importante';
        }

        if (!player.salary) {
            newErrors.address = 'Le salaire est requis.';
        }

        if (!player.birthDate) {
            newErrors.role = 'La date est requise.';
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
                const response = await services.updatePlayer(token, data._id, player);
                // Traiter la réponse si nécessaire
                console.log('Player update with success :', response);
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
                    label="Size"
                    variant="filled"
                    fullWidth
                    type="number"
                    name="size"
                    value={player.size}
                    error={errors.size}
                    helperText={errors.size}
                    onChange={(e) => setPlayer({ ...player, size: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Start contract"
                    variant="filled"
                    fullWidth
                    name="startContract"
                    value={player.startContract}
                    error={errors.startContract}
                    helperText={errors.startContract}
                    onChange={(e) => setPlayer({ ...player, startContract: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="End Contract"
                    variant="filled"
                    fullWidth
                    name="endContract"
                    value={player.endContract}
                    error={errors.endContract}
                    helperText={errors.endContract}
                    onChange={(e) => setPlayer({ ...player, endContract: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                </div>
               
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                    <TextField
                        label="Salary"
                        variant="filled"
                        fullWidth
                        type="number"
                        name="salary"
                        value={player.salary}
                        error={errors.salary}
                        helperText={errors.salary}
                        onChange={(e) => setPlayer({ ...player, salary: e.target.value })}
                    />
                </div>
                <FormControl variant="filled" fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="position-label">Position</InputLabel>
                    <Select
                        labelId="position-label"
                        id="position"
                        name="position"
                        value={player.position}
                        error={errors.position}
                        onChange={(e) => setPlayer({ ...player, position: e.target.value })}
                    >
                        <MenuItem value="">Choose a position</MenuItem>
                        <MenuItem value="Guard">Guard</MenuItem>
                        <MenuItem value="Small Guard">Small guard</MenuItem>
                        <MenuItem value="Small forward">Small forward</MenuItem>
                        <MenuItem value="Forward">Forward</MenuItem>
                        <MenuItem value="Center">Center</MenuItem>
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
