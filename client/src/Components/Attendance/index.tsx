import React, { useState } from "react";
import {
  List,
  Button,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Grid,
  ListSubheader,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Stack,
  Chip,
} from "@mui/material";
import { VariantType, useSnackbar } from "notistack";
import { DataStudent, fakeData } from "../../Others/fakeData";
export const Attendance = () => {
  // Logic
  const hanleSendMail = () => {
    console.log(subject, content, checked);

    setSubject("");
    setContent("");
    setChecked([]);
    setStudents([]);
    handleClose();
    handleClickOpenAlert("Gửi mail thành công", "success");
  };
  //state ui
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [students, setStudents] = useState<DataStudent[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenAlert = (noidung: string, variant: VariantType) => {
    enqueueSnackbar(noidung, { variant });
  };
  // console.log(fakeData);
  const handleClickOpen = () => {
    if (checked.length) {
      const state = checked
          .map((y) => fakeData.filter(({ id }) => id === y)[0])
      setStudents(
        state
      );
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    // setChecked(checked.filter((item: string) => item !== event.target.value));
    console.info("You clicked the delete icon.");
  };
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const student = event.target.value;
    // console.log(student);

    const index = checked.find((id) => id === event.target.value);
    if (index === "undefined") {
      setChecked([...checked, event.target.value]);
    } else {
      setChecked(checked.filter((id) => id === event.target.value));
    }
  };

  return (
    <>
      <ListSubheader sx={{ p: 2, zIndex: "999" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography>Danh sach lop</Typography>
          </Grid>
          <Grid item>
            {checked.length ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="primary" disabled>
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </ListSubheader>
      <List sx={{ mt: 3 }}>
        {fakeData.map((value: DataStudent, key: number) => {
          return (
            <ListItemButton key={key}>
              <ListItemText>{value.hoten}</ListItemText>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value.id)}
                  value={value.id}
                  onChange={handleToggle}
                  edge="end"
                  inputProps={{ "aria-label": "controlled" }}
                ></Checkbox>
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
      <Dialog open={open}>
        <DialogTitle>Viết nội dung bạn cần gửi ở đây</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Email sẽ được gửi cho những học sinh sau:
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {students.map((value, index) => {
                return (
                  <Chip
                    key={index}
                    variant="outlined"
                    color="primary"
                    label={value.hoten}
                    onClick={handleClick}
                    onDelete={handleDelete}
                  />
                );
              })}
            </Stack>
          </DialogContentText>
          <TextField
            autoFocus
            id="subjec"
            label="Tiêu đề"
            margin="dense"
            fullWidth
            onChange={(e) => setSubject(e.target.value)}
          ></TextField>
          <TextField
            id="content"
            label="Nội dung"
            margin="dense"
            fullWidth
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Trở lại</Button>
          <Button onClick={hanleSendMail} variant="contained" color="primary">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
