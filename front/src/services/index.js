import { GamepadOutlined } from '@mui/icons-material';
import axios from 'axios';
import { formatNumber } from 'src/utils/formatNumber ';

// API URL
const API_URL = "http://localhost:3005";


const getTotalBudget = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/teams/teamSalary`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const totalPlayer = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/players/totalPlayer`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const totalGame = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/game/totalGame`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const totalGameWin = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/game/totalGameWin`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const totalGameLoose = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/game/totalGameLoose`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const totalStat = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/stat/totalStat`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const addPlayer = async (token,fields) => {
    try {
        const response = await axios.post(`${API_URL}/players/createPlayer`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const deletePlayer = async (token, playerId) => {
    try {
        const response = await axios.delete(`${API_URL}/players/deletePlayer/${playerId}`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la supression d\'un Drug: ', error);
        return { status: 500, data: null, error: error };
    }
};

const updatePlayer = async (token, playerId, fields) => {
    try {
        const response = await axios.put(`${API_URL}/players/updatePlayerInfo/${playerId}`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la modification: ', error);
        return { status: 500, data: null, error: error };
    }
};

const getAllPlayer = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/players/allPlayer`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const addGame = async (token,fields) => {
    try {
        const response = await axios.post(`${API_URL}/game/createGame`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const deleteGame = async (token, gameId) => {
    try {
        const response = await axios.delete(`${API_URL}/game/deleteGame/${gameId}`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la supression d\'un Drug: ', error);
        return { status: 500, data: null, error: error };
    }
};

const updateGame = async (token, gameId, fields) => {
    try {
        const response = await axios.put(`${API_URL}/game/updateGame/${gameId}`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la modification: ', error);
        return { status: 500, data: null, error: error };
    }
};

const getAllGame = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/game/allGame`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const addStat = async (token,fields) => {
    try {
        const response = await axios.post(`${API_URL}/stat/addStat`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const deleteStat = async (token, statId) => {
    try {
        const response = await axios.delete(`${API_URL}/stat/deleteStat/${statId}`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la supression d\'un Drug: ', error);
        return { status: 500, data: null, error: error };
    }
};

const updateStat = async (token, statId, fields) => {
    try {
        const response = await axios.put(`${API_URL}/stat/updateStat/${statId}`, fields, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la modification: ', error);
        return { status: 500, data: null, error: error };
    }
};

const getAllStatAverage = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/stat/getPlayerAverage`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

const getAllStat = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/stat/allStat`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { status: 500, data: null, error: error };
    }
};

export default {
    getTotalBudget,
    totalPlayer,
    totalGame,
    totalStat,
    totalGameLoose,
    totalGameWin,
    addPlayer,
    getAllPlayer,
    updatePlayer,
    deletePlayer,
    addGame,
    getAllGame,
    updateGame,
    deleteGame,
    getAllStatAverage,
    addStat,
    updateStat,
    deleteStat,
    getAllStat
};