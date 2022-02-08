import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CalendarIcon } from "@heroicons/react/solid";
import { IPropsCalendar } from "./IPropsCalendar";

const Calendar: FC<IPropsCalendar> = ({ valueDate, setValueDate }) => {
  const styles = {
    "& .MuiInputBase-root": {
      borderRadius: "8px 0 0 8px",
      fontFamily: "Inter",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#111827",
    },
    "& .MuiInputBase-input": {
      padding: "9px 0",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderStyle: "none",
      border: "none",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        disablePast
        inputFormat="dd/MM/yyyy"
        value={valueDate}
        onChange={(newValue) => {
          setValueDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="check_in"
                className="text-xs font-body text-gray-700"
              >
                Check in
              </label>
              <div className="border border-gray-300 rounded-l-md flex items-center justify-center">
                <span className="mx-2">
                  <CalendarIcon className="text-gray-500 w-4 h-4" />
                </span>
                <TextField
                  {...startProps}
                  label=""
                  id="check_in"
                  autoComplete="off"
                  name="check_in"
                  required
                  placeholder="Check_in"
                  sx={styles}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="check_out"
                className="text-xs font-body text-gray-700"
              >
                Check out
              </label>
              <div className="border border-gray-300 rounded-r-md flex items-center justify-center">
                <span className="mx-2">
                  <CalendarIcon className="text-gray-500 w-4 h-4" />
                </span>
                <TextField
                  {...endProps}
                  label=""
                  id="check_out"
                  name="check_date"
                  autoComplete="off"
                  required
                  placeholder="Check_out"
                  sx={styles}
                />
              </div>
            </div>
          </>
        )}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
