import React from "react";
// eslint-disable-next-line no-unused-vars
import UserService from "../../services/UserService";
import {
  useState,
  useEffect
} from "react";
import {
  Container, Typography, TableContainer,
  Paper, Table, TableHead,
  TableRow, TableCell, IconButton,
  TableBody, Dialog, DialogActions,
  DialogContent, DialogTitle, Button, TextField,
  Snackbar, Alert
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";
import api, { user_endpoints } from "../../api/index";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
  });
  const [notification, setNotification] = useState({ open: false, message: "" });

  useEffect(() => {
    // API call to fetch users
    api
      .get(user_endpoints.get_users)
      .then(({ data }) => {
        if (data && data.users) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.log("error", error)
        if (error.response) {
          setNotification({
            open: true,
            message: error.response.data.message
          })
        }
      });
  }, []);

  const handleDelete = async (id) => {
    await api
      .delete(user_endpoints.delete_user(id))
      .catch((error) => {
        console.log("error", error)
        if (error.response) {
          setNotification({
            open: true,
            message: error.response.data.message
          })
        }
      });
    setUsers(users.filter(user => user.id !== id));
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const openUserModal = (userId = null) => {
    if (userId) {
      // Fetch user details by ID if editing
      const userToEdit = users.find(user => user.id === userId);
      if (userToEdit) {
        setCurrentUser(userToEdit);
      }
    } else {
      // Reset for creating new user
      setCurrentUser({ id: null, name: "", email: "" });
    }
    setOpenModal(true);
  };

  const handleSave = () => {
    if (currentUser.id) {
      // Update user logic
      api
        .put(user_endpoints.update_user(currentUser.id), currentUser)
        .then(() => {
          setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
          setOpenModal(false);
        })
        .catch((error) => {
          console.log("error", error)
          if (error.response) {
            setNotification({
              open: true,
              message: error.response.data.message
            })
          }
        });;
    } else {
      // Create new user logic
      api
        .post(user_endpoints.create_user, currentUser)
        .then(({ data }) => {
          setUsers([...users, data.user]);
          setOpenModal(false);
        })
        .catch((error) => {
          console.log("error", error)
          if (error.response) {
            setNotification({
              open: true,
              message: error.response.data.message
            })
          }
        });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Gerenciador de Usuarios</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => openUserModal()}
        style={{ marginBottom: "20px" }}
      >
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.map((user) => (
              <TableRow key={user.id ?? 0}>
                <TableCell>{user.id ?? 0}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => openUserModal(user.id)}>
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
      >
        <Alert onClose={handleCloseNotification} severity={"error"}>
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{currentUser.id ? "Editar Usuario" : "Criar Usuario"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Email"
            fullWidth
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>

  );
};

export default Users;
