import React, { useState, useContext } from 'react';
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
} from '@mui/material';
import { VariantType, useSnackbar } from 'notistack';
import { AppContext } from '../../Context/AppProvider';
import { DataStudent } from '../../Context/reducer';
import axios from 'axios';
import { apiUrl } from '../../Context/reducer/constant';

interface MailResponse {
  success: boolean;
  message: string;
}

export const Attendance = () => {
  // Logic
  const hanleSendMail = () => {
    console.log(subject, content, checked);
    const subjectCopy = subject;
    const contentCopy = content;
    const checkedCopy = [...checked];
    setSubject('');
    setContent('');
    setChecked([]);
    setStudents([]);
    handleClose();
    (async () => {
      try {
        const response = await axios.post<MailResponse>(`${apiUrl}/mail`, {
          subject: subjectCopy,
          text: contentCopy,
          listId: checkedCopy,
          html: ''
        });
        const isSuccess = response.data.success;
        handleClickOpenAlert(
          response.data.message,
          isSuccess ? 'success' : 'error'
        );
      } catch (e) {
        handleClickOpenAlert('Có lỗi xảy ra khi gửi mail', 'error');
      }
    })();
  };
  //state ui
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [checked, setChecked] = useState<string[]>([]);
  const [students, setStudents] = useState<DataStudent[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const studentList = useContext(AppContext);

  if (!studentList) {
    return <div>Loading...</div>;
  }

  const handleClickOpenAlert = (noidung: string, variant: VariantType) => {
    enqueueSnackbar(noidung, { variant });
  };
  const handleClickOpen = () => {
    if (checked.length) {
      const state = checked.map(
        (y) => studentList.filter(({ id }) => id === y)[0]
      );
      setStudents(state);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    // setChecked(checked.filter((item: string) => item !== event.target.value));
    console.info('You clicked the delete icon.');
  };
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const student = event.target.value;
    // console.log(student);

    const index = checked.indexOf(event.target.value);
    if (index === -1) {
      setChecked([...checked, event.target.value]);
    } else {
      setChecked(checked.filter((id) => id !== event.target.value));
    }
  };

  return (
    <>
      <ListSubheader sx={{ p: 2, zIndex: '999' }}>
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
        {studentList.map((value: DataStudent, key: number) => {
          return (
            <ListItemButton key={key}>
              <ListItemText>{value.hoten}</ListItemText>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value.id)}
                  value={value.id}
                  onChange={handleToggle}
                  edge="end"
                  inputProps={{ 'aria-label': 'controlled' }}
                ></Checkbox>
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
      <Dialog open={open}>
        <DialogTitle>Viết nội dung bạn cần gửi ở đây</DialogTitle>

        <DialogContent>
          <DialogContentText component={'div'}>
            Email sẽ được gửi cho những học sinh sau:
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
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
