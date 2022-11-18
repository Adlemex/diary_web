import logo from './logo.svg';
import './App.css';
import './index.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Avatar, Card, createTheme, Grid, ListItem, Paper, Skeleton, Stack, Tab, Tabs, TextField} from "@mui/material";
import {useState} from "react";
import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import {getDiaryDay} from "./api"
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "@date-io/moment";
import {ruRU} from "@mui/material/locale";
import { styled } from '@mui/material/styles';
import {Locale} from "moment/moment";
import { getDay } from 'date-fns/esm';
import { PlayLessonOutlined } from '@mui/icons-material';



function App() {
    const theme = createTheme()
    const [date, setDate] = useState(dayjs.date);
    const [day, setDay] = useState(null);
    const [markTab, setMarkTab] = useState(0);
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    if(!day){
        getDiaryDay(setDay, "DDFED2B991D7AEE62D9A8136AD98B737")
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    const Lesson = (props) => {
        //num: Number, time: String, name: String, homework: String, teacher: String, marks: Number[]
        return (
            <a>
            <Typography style={{background: "#9400ad",
                borderTopLeftRadius: "20px",
                display: "flex",
                color: "white",
                fontSize: "80%",
                justifyContent: "space-between",
                borderTopRightRadius: "20px",
                paddingLeft: "15px",
                paddingRight: "15px"}}><a>{props.num}</a> <a>{props.time}</a></Typography>

        <Typography style={{background: "rgba(85,54,91,0.52)",
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            color: "white",
            paddingRight: "15px"}}>{props.name}</Typography>

        <Typography style={{background: "rgba(85,54,91,0.52)",
            display: "flex",
            paddingLeft: "15px",
            textAlign: "left",
            fontSize: "80%",
            color: "white",
            paddingRight: "15px"}}>{props.teacher}</Typography>

        <Typography style={{background: "rgba(85,54,91,0.52)",
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            fontSize: "70%",
            color: "white",
            paddingRight: "15px"}}>{props.homework}</Typography>

        <Typography style={{background: "rgba(85,54,91,0.52)",
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            fontSize: "90%",
            color: "white",
            paddingRight: "15px"}}>{props.marks.join(", ")}</Typography>
            </a>
        )
    }
    const Marks = (props) => {
        //num: Number, time: String, name: String, homework: String, teacher: String, marks: Number[]
        return (
            <a >
        <Typography style={{background: "rgba(85,54,91,0.52)",
            display: "flex",
            textAlign: "left",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingLeft: "15px",
            color: "white",
            paddingRight: "15px"}}>{props.lesson}</Typography>
            <div className={"marks"} style={{display: "flex", maxWidth: 1024, flexDirection: "row", overflowX: "auto"}}>
                {props.marks.map((mark) =>
                    <div>
                        <Card style={{width: 50, margin: 2}}>{mark.date} <br /> {mark.mark}</Card>
                    </div>
                )}
            </div>
            </a>
        )
    }
    //getDay()
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Дневник Pskovedu
            </Typography>
            <Button color="inherit">Сергеев Алексей</Button>
              <IconButton sx={{ p: 0 }}>
                  <Avatar src="https://pskovedu.ml/api/images/1B120E187EA450E1E1C2877F679EE1EB" />
              </IconButton>
          </Toolbar>
        </AppBar>
          <Grid container spacing={2}>
          <Box  sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
              '& > :not(style)': {
                  m: 3,
                  width: 512,
                  height: "100%",
              },
          }}>
              <Paper>
                  <LocalizationProvider dateAdapter={AdapterMoment} style={{width: 50}}>
                      <DesktopDatePicker
                          label="Дата"
                          value={date}

                          minDate={dayjs.date}
                          inputFormat="DD.MM"
                          onChange={(date) => {
                              setDate(date);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                  <Stack spacing={2} style={{margin: "5px"}}>
                    {day != null && day.data.map((lesson) =>
                    <Lesson key={lesson.LESSON_NUMBER} num={lesson.LESSON_NUMBER} teacher={lesson.TEACHER_NAME} 
                    homework={lesson.HOMEWORK_PREVIOUS.HOMEWORK} marks={lesson.MARKS}
                    time={lesson.LESSON_TIME_BEGIN} name={lesson.SUBJECT_NAME} />)}
                  </Stack>
              </Paper>
          </Box>
          <Box  sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
              '& > :not(style)': {
                  m: 5,
                  width: "100%",
                  height: "100%",
              },
          }}>
              <Paper>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={markTab} onChange={(event, value) => setMarkTab(value)} aria-label="basic tabs example">
                          <Tab label="Четвертные оценки" {...a11yProps(0)} />
                          <Tab label="Все оценки" {...a11yProps(1)} />
                          <Tab label="Итоговые оценки" {...a11yProps(2)} />
                      </Tabs>
                  </Box>
                  <TabPanel value={markTab} index={0}>
                      <Stack spacing={2} style={{margin: "5px"}}>
                      <Marks lesson={"География"} marks={[{date: "12.22", mark: 1},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5}]} />
                      <Marks lesson={"География"} marks={[{date: "12.22", mark: 1},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5}]} />
                      <Marks lesson={"География"} marks={[{date: "12.22", mark: 1},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5},{date: "12.22", mark: 2},
                          {date: "12.22", mark: 3},{date: "12.22", mark: 4},{date: "12.22", mark: 5}]} />
                      </Stack>
                  </TabPanel>
                  <TabPanel value={markTab} index={1}>
                      Item Twodfsg
                  </TabPanel>
                  <TabPanel value={markTab} index={2}>
                      Item Thredsfg
                  </TabPanel>
              </Paper>
          </Box>
          </Grid>
      </Box>
  );
}

export default App;
