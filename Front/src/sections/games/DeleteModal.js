import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function DeleteModal({ visible, closeModal, data, refresh }) {
    const token = window.sessionStorage.getItem('token');
    useEffect(() => { }, [visible])

    return (
        <Dialog open={visible} onClose={closeModal}>
            <DialogTitle>{'Etes-vous sûre ?'}</DialogTitle>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={() => {
                    services.deleteGame(token, data._id)
                    closeModal()
                    refresh()
                }}>
                    Supprimer
                </Button>
                <Button variant="contained" color="secondary" onClick={closeModal}>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default DeleteModal;
