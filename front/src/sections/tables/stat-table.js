import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  alpha,
  CircularProgress
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { lime } from '@mui/material/colors';
import moment from 'moment';
import localization from 'moment/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpSquare, faDeleteLeft, faEdit, faEraser, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EditModal from 'src/sections/stat/EditModal';
import DeleteModal from 'src/sections/stat/DeleteModal';

moment.updateLocale('fr', localization);

const PlayerStat = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    page = 0,
    fetchData = () => { },
    loading = false
  } = props;


  const token = window.sessionStorage.getItem('token');


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [current, setCurrent] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredItems = items.filter((item) =>
    item.playerId && item.playerId.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleItems = filteredItems.slice(startIndex, endIndex);

  const openEditModal = (item) => {
    setCurrent(item);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    fetchData();
  };

  const openDeleteModal = (item) => {
    setCurrent(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    fetchData();
  };

  let content;
  if (loading) {
    content = (
      <TableRow>
        <TableCell colSpan={7} align="center">
          <CircularProgress size={24} thickness={4} />
        </TableCell>
      </TableRow>
    );
  } else if (visibleItems.length === 0) {
    content = (
      <TableRow>
        <TableCell colSpan={7} align="center">
          Aucune donnée trouvée.
        </TableCell>
      </TableRow>
    );
  } else {
    content = visibleItems.map((customer, index) => (
      <TableRow
        hover
        key={customer._id}
        sx={{
          backgroundColor: index % 2 === 0 ? alpha(lime[500], 0.3) : '',
        }}
      >
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.player}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.game}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.minute}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.points}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.assists}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.rebounds}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.fouls}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.freeThrowsMade}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.freeThrowsAttempt}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.fieldGoalMade}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.fieldGoalAttempt}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.threePointMade}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.threePointAttempt}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.interception}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography variant="subtitle2">
              {customer.block}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center" style={{ display: 'flex', justifyContent: "space-around" }}>
          <Button
            color="inherit"
            onClick={() => openEditModal(customer)}
          >
            <FontAwesomeIcon icon={faEdit}
              style={{
                fontSize: '20px',
                color: '#1976D2',
              }} />
          </Button>
          <Button
            color="inherit"
            onClick={() => openDeleteModal(customer)}
          >
            <FontAwesomeIcon icon={faTrashCan}
              style={{
                fontSize: '20px',
                color: 'red',
              }} />
          </Button>
        </TableCell>
      </TableRow >
    ));
  }

  return (
    <>
      <Box mb={2}>
        <TextField
          fullWidth
          placeholder="Rechercher..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  fontSize: '20px',
                  color: 'gray',
                  marginRight: '8px',
                }}
              />
            ),
          }}
        />
      </Box>
      <Card>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Joueurs</TableCell>
                <TableCell align="center">Game opponent</TableCell>
                <TableCell align="center">Minutes</TableCell>
                <TableCell align="center">Points</TableCell>
                <TableCell align="center">Assists</TableCell>
                <TableCell align="center">Rebounds</TableCell>
                <TableCell align="center">Fouls</TableCell>
                <TableCell align="center">FreeThrows Made</TableCell>
                <TableCell align="center">freeThrows Attempt</TableCell>
                <TableCell align="center">FieldGoal Made</TableCell>
                <TableCell align="center">FieldGoal Attempt</TableCell>
                <TableCell align="center">Three Point Made</TableCell>
                <TableCell align="center">ThreePoint Attempt</TableCell>
                <TableCell align="center">Interception</TableCell>
                <TableCell align="center">Block</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            onPageChange(null, 0);
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <EditModal visible={editModalOpen} closeEditModal={closeEditModal} data={current} />
      <DeleteModal visible={deleteModalOpen} closeModal={closeDeleteModal} data={current} refresh={fetchData} />

    </>
  );
};

PlayerStat.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
};

export default PlayerStat;
