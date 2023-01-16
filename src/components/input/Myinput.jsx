import React from "react";
import TextField from "@mui/material/TextField";

export const Myinput = ({ value, onChange, label, onFocus, onBlur, type }) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderBottomColor: "#D69967",
          },
          "&:hover fieldset": {
            borderBottomColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderBottomColor: "#D69967",
          },
        },
        my: 1,
        width: "20ch",
      }}
      label={label}
      value={value}
      autoComplete="off"
      type={type}
      onChange={onChange}
      variant="standard"
      onFocus={onFocus}
      onBlur={onBlur}
      InputLabelProps={{ style: { fontFamily: "Arima Madurai, sans-serif" } }}
    />
  );
};

export const MyinputPassword = ({
  value,
  onChange,
  label,
  onFocus,
  onBlur,
}) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#D69967",
          },
          "&:hover fieldset": {
            borderColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D69967",
          },
        },
        m: 1,
        width: "20ch",
      }}
      value={value}
      label={label}
      variant="standard"
      onChange={onChange}
      type="password"
      onFocus={onFocus}
      onBlur={onBlur}
      InputLabelProps={{ sx: { fontFamily: "Arima Madurai, sans-serif" } }}
      autoComplete="off"
    />
  );
};

export const MyTextArea = ({ value, onChange, label, onFocus, onBlur }) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderBottomColor: "#D69967",
          },
          "&:hover fieldset": {
            borderBottomColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderBottomColor: "#D69967",
          },
        },
        mx: 1,
        width: "20ch",
      }}
      label={label}
      value={value}
      rows={2}
      type="text"
      onChange={onChange}
      variant="standard"
      onFocus={onFocus}
      onBlur={onBlur}
      multiline
      InputLabelProps={{ sx: { fontFamily: "Arima Madurai, sans-serif" } }}
      autoComplete="off"
    />
  );
};

export const MyinputField = ({ value, onChange, label, type }) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderBottomColor: "#D69967",
          },
          "&:hover fieldset": {
            borderBottomColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderBottomColor: "#D69967",
          },
        },
        m: 1,
        width: "20ch",
      }}
      label={label}
      value={value}
      type={type}
      onChange={onChange}
      variant="standard"
      InputLabelProps={{ sx: { fontFamily: "Arima Madurai, sans-serif" } }}
      autoComplete="off"
    />
  );
};

export const MyinputFieldArea = ({ value, onChange, label, type }) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderBottomColor: "#D69967",
          },
          "&:hover fieldset": {
            borderBottomColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderBottomColor: "#D69967",
          },
        },
        my: 1,
        width: "20ch",
      }}
      label={label}
      value={value}
      type={type}
      rows={4}
      onChange={onChange}
      variant="standard"
      multiline
      InputLabelProps={{ sx: { fontFamily: "Arima Madurai, sans-serif" } }}
      autoComplete="off"
    />
  );
};

export const MyinputPasswordLogin = ({
  value,
  onChange,
  label,
  onFocus,
  onBlur,
}) => {
  return (
    <TextField
      className="input"
      sx={{
        "& label.Mui-focused": {
          color: "black",
          fontFamily: "Arima Madurai, sans-serif",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#D69967",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#D69967",
          },
          "&:hover fieldset": {
            borderColor: "#D69967",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D69967",
          },
        },
        my: 1,
        width: "20ch",
        fontFamily: "Arima Madurai, sans-serif",
      }}
      InputLabelProps={{ sx: { fontFamily: "Arima Madurai, sans-serif" } }}
      autoComplete="off"
      value={value}
      label={label}
      variant="standard"
      onChange={onChange}
      type="password"
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
