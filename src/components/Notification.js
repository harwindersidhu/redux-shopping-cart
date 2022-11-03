import React from "react";
import { Alert } from "@mui/material";

const Notification = (props) => {
  return (
    <div>
      <Alert severity={props.type}>{props.message}</Alert>
    </div>
  )
};

export default Notification;