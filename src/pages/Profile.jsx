
import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Container } from "@mui/material";
import { People as PeopleIcon, Person as PersonIcon, AdminPanelSettings as AdminPanelSettingsIcon } from "@mui/icons-material";
import { useRole } from "../contexts/RoleContext";

function Profile() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleOptionClick = (role, path) => {
    setRole(role);
    navigate(path);
  };

  const options = [
    { name: "Clientes", role: "cliente", path: "/menu", icon: <PeopleIcon fontSize="large" /> },
    { name: "Mozo", role: "mozo", path: "/mozo", icon: <PersonIcon fontSize="large" /> },
    { name: "Admin", role: "admin", path: "/admin", icon: <AdminPanelSettingsIcon fontSize="large" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Panel de Perfiles
      </Typography>
      <Grid container spacing={3}>
        {options.map((option) => (
          <Grid item xs={12} md={4} key={option.name}>
            <Paper 
              onClick={() => handleOptionClick(option.role, option.path)}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                "&:hover": {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              {option.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>{option.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Profile;
