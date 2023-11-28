import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function AddModal({ visible, closeAddModal }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [game, setGame] = useState({
        opponent: '',
        winOrLose: '',
        score: '',
        gameDate: ''
    });



    const init = () => {
        setErrors({});
        setGame({
            opponent: '',
        winOrLose: '',
        score: '',
        gameDate: ''
        });
        closeAddModal();
    };

    const validateFields = () => {
        const newErrors = {};

        // Vérifier les champs requis
        if (!game.opponent) {
            newErrors.opponent = 'Opponent is required';
        }

        if (!game.winOrLose) {
            newErrors.winOrLose = 'State is required';
        }

        if (!game.score) {
            newErrors.username = 'Score is required';
        }

        if (!game.gameDate) {
            newErrors.gameDate = 'The game date is required';
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
                const response = await services.addUser(token, user);
                // Traiter la réponse si nécessaire
                console.log('Données utilisateur ajoutées avec succès :', response);
                init();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            }
        }
    };

    return (
        <Dialog open={visible} onClose={closeAddModal}>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogContent style={{ width: 600 }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                    <TextField
                        label="Prénom"
                        variant="filled"
                        fullWidth
                        name="firstName"
                        value={user.firstName}
                        error={errors.firstName}
                        helperText={errors.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                    <TextField
                        label="Nom"
                        variant="filled"
                        fullWidth
                        name="lastName"
                        value={user.lastName}
                        error={errors.lastName}
                        helperText={errors.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </div>
                <TextField
                    label="Nom d'utilisateur"
                    variant="filled"
                    fullWidth
                    name="username"
                    value={user.username}
                    error={errors.username}
                    helperText={errors.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    fullWidth
                    type="email"
                    name="email"
                    value={user.email}
                    error={errors.email}
                    helperText={errors.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Mot de passe"
                    variant="filled"
                    fullWidth
                    type="password"
                    name="password"
                    value={user.password}
                    error={errors.password}
                    helperText={errors.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    style={{ marginBottom: 20 }}
                />
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                    <TextField
                        label="Numéro de téléphone"
                        variant="filled"
                        fullWidth
                        name="phoneNumber"
                        value={user.phoneNumber}
                        error={errors.phoneNumber}
                        helperText={errors.phoneNumber || "Example: 22997979797"}
                        onChange={(e) => {
                            const input = e.target.value;
                            // Utiliser une expression régulière pour ne permettre que les chiffres
                            const regex = /^[0-9]*$/;
                            if (regex.test(input)) {
                                setUser({ ...user, phoneNumber: input });
                                // Réinitialiser l'erreur lorsque l'utilisateur tape dans le champ
                                setErrors({ ...errors, phoneNumber: false });
                            } else {
                                // Afficher une erreur si l'entrée n'est pas un nombre valide
                                setErrors({ ...errors, phoneNumber: true });
                            }
                        }}
                    />
                    <TextField
                        label="Adresse"
                        variant="filled"
                        fullWidth
                        name="address"
                        value={user.address}
                        error={errors.address}
                        helperText={errors.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                </div>
                <FormControl variant="filled" fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="role-label">Rôle</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={user.role}
                        error={errors.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                    >
                        <MenuItem value="">Sélectionner un rôle</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="OUVRIER_POULLAILLER">Ouvrier</MenuItem>
                        <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
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
