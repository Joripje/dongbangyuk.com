import { getNewNotificationCount } from "api/notification";
import { useState, useEffect } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { getNotificationData, deleteAllNotification } from "api/notification";
import * as React from "react";
import NotificationList from "./NotificationList";

const NotificationButton = () => {
  const [newNotificationCount, setNewNotificationCount] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState(1);
  const [noList, setNoList] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const fetchData = async () => {
      try {
        const response = await getNotificationData({
          userid: userId,
        });
        setNotificationList(response);
        setNewNotificationCount(0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  };
  const handleClose = () => {
    setAnchorEl(null);
    setTimeout(() => {
      setNotificationList([]);
    }, 500);
  };

  const deleteHandle = () => {
    const fetchData = async () => {
      try {
        const response = await deleteAllNotification({
          userid: userId,
          gameid: 1,
        });
        setNotificationList(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    setNoList(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewNotificationCount({
          userid: 1,
        });
        setNewNotificationCount(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // disableRipple={true}
        size="large"
        color="inherit"
      >
        <Badge badgeContent={newNotificationCount} color="warning">
          <NotificationsNoneIcon fontSize="inherit" />
        </Badge>
      </IconButton>
      <NotificationList
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        userId={userId}
        notificationList={notificationList}
        deleteHandle={deleteHandle}
        noList={noList}
      />
    </div>
  );
};
export default NotificationButton;
