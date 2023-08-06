import * as React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import userService from "../_services/userService";

export default function AdminPage() {
  const [usersPage, setUsersPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [usersPage]);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAll(token, usersPage + 1);
      setUsers(data.results);
      setTotalUsers(data.info.count);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      valueGetter: (params) => params.value.role,
      valueFormatter: (params) => params.value.role,
    },
    { field: "user_name", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "editIcon",
      headerName: "Edit",
      width: 90,
      renderCell: (params) => (
        <Box>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleEditRow(params.row.id)}
          />
        </Box>
      ),
    },
    {
      field: "deleteIcon",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => (
        <Box>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteRow(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  );
}
