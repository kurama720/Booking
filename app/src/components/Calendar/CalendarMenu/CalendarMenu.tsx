import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import {CalendarMenuProps} from "./utils/CalendarMenuInterface";

const CalendarMenu = ({date, setDate}: CalendarMenuProps) => (
    <div
        className='rounded-md shadow-sm w-[39.5rem] absolute top-12 1.5xl:left-[27.3%] lg:left-[11.2%] 3xl:left-[27.5%] 4xl:left-[31.5%] 5xl:left-[36%] xlg:left-[22.5%] mlg:left-[15%] 3.5xl:left-[29%] 1xl:left-[25%] 3.75xl:left-[85%] 6xl:left-[38%]'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{mx: 2}}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
            )}
        />
      </LocalizationProvider>
    </div>
);

export default CalendarMenu;
