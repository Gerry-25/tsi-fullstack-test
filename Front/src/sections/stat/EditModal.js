import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import services from 'src/services';

function EditModal({ visible, closeEditModal,data }) {
    const token = window.sessionStorage.getItem('token');
    
    const [stat, setStat] = useState({ 
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
    const init = () => {
        setStat({        
            minute: data.minute || 0,
        
            points: data.points || 0,
        
            assists: data.assists || 0,
        
            rebounds: data.rebounds || 0,
        
            fouls: data.fouls || 0,
        
            freeThrowsMade: data.freeThrowsMade || 0,
        
            freeThrowsAttempt: data.freeThrowsAttempt || 0,
        
            fieldGoalMade: data.fieldGoalMade || 0,
        
            fieldGoalAttempt: data.fieldGoalAttempt || 0,
        
            threePointMade: data.threePointMade || 0,
        
            threePointAttempt: data.threePointAttempt || 0,
        
            interception: data.interception || 0,
        
            block: data.block || 0
        });
    };
    useEffect(() => { init() }, [visible])

    const handleSaveAdd = async () => {
            // Appel de l'API pour ajouter l'utilisateur
            try {
                const response = await services.updateStat(token,data._id, stat);
                // Traiter la réponse si nécessaire
                console.log('Player add with success :', response);
                closeEditModal();
            } catch (error) {
                console.error('Error when adding players :', error);
            }
    };

    return (
        <Dialog open={visible} onClose={closeEditModal}>
            <DialogTitle>Add player</DialogTitle>
            <DialogContent style={{ width: 600 }}>
                
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
                    name="freeThrowsMade"
                    value={stat.freeThrowsMade}
                    onChange={(e) => setStat({ ...stat, freeThrowsMade: e.target.value })}
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
