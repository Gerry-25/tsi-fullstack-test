import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function AddModal({ visible, closeAddModal }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [player, setPlayer] = useState({
        firstName:'', 
            lastName:'', 
            position:'', 
            size:'', 
            startContract:'', 
            endContract:'', 
            salary:0, 
            birthDate:''
    });



    const init = () => {
        setErrors({});
        setPlayer({
            firstName:'', 
            lastName:'', 
            position:'', 
            size:'', 
            startContract:'', 
            endContract:'', 
            salary:0, 
            birthDate:''
        });
        closeAddModal();
    };

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
                const response = await services.addPlayer(token, player);
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
                    <TextField
                        label="Prénom"
                        variant="filled"
                        fullWidth
                        name="firstName"
                        value={player.firstName}
                        error={errors.firstName}
                        helperText={errors.firstName}
                        onChange={(e) => setPlayer({ ...player, firstName: e.target.value })}
                    />
                    <TextField
                        label="Nom"
                        variant="filled"
                        fullWidth
                        name="lastName"
                        value={player.lastName}
                        error={errors.lastName}
                        helperText={errors.lastName}
                        onChange={(e) => setPlayer({ ...player, lastName: e.target.value })}
                    />
                </div>
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
                    <TextField
                        label="BirthDate"
                        variant="filled"
                        fullWidth
                        name="birthDate"
                        value={player.birthDate}
                        error={errors.birthDate}
                        helperText={errors.birthDate}
                        onChange={(e) => setPlayer({ ...player, birthDate: e.target.value })}
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
