import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function EditModal({ visible, closeEditModal, data }) {
    const token = window.sessionStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: ''
    });

    // Fonction init
    const init = () => {
        setErrors({});
        setUser({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            username: data.username || "",
            password: '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || null,
            address: data.address || '',
            role: data.role || ""
        });
    };

    useEffect(() => { init() }, [visible])

    const validateFields = () => {
        const newErrors = {};

        // Vérifier les champs requis
        if (!user.firstName) {
            newErrors.firstName = 'Le prénom est requis.';
        }

        if (!user.lastName) {
            newErrors.lastName = 'Le nom de famille est requis.';
        }

        if (!user.username) {
            newErrors.username = 'Le nom d\'utilisateur est requis.';
        }

        if (!user.email || !isValidEmail(user.email)) {
            newErrors.email = 'L\'adresse email est invalide.';
        }

        if (!user.password) {
            newErrors.password = 'Le mot de passe est requis.';
        }

        if (!user.phoneNumber || user.phoneNumber.length != 11) {
            newErrors.phoneNumber = 'Le numéro de téléphone est incorrect...';
        }

        if (!user.address) {
            newErrors.address = 'L\'adresse est requise.';
        }

        if (!user.role) {
            newErrors.role = 'Le rôle est requis.';
        }

        setErrors(newErrors);

        // Vérifier s'il y a des erreurs
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        // Vérifier le format de l'adresse email à l'aide d'une expression régulière
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };


    const handleSave = async () => {
        const isValid = validateFields();

        if (isValid) {
            // Appel de l'API pour ajouter l'utilisateur
            try {
                console.log(user);
                const response = await services.updateUser(token, data._id, user);
                closeEditModal();
            } catch (error) {
                console.error('Erreur lors de la modification de l\'utilisateur :', error);
            }
        }
    };

    return (
        <Dialog open={visible} onClose={closeEditModal}>
            <DialogTitle>Modifier un utilisateur</DialogTitle>
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
                <Button variant="contained" color="primary" onClick={handleSave}>
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
