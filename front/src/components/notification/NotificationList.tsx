import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import styled from "styled-components";
import { useNavigate } from "react-router";

interface Notification {
  [key: string]: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  deleteHandle: () => void;
  anchorEl: any;
  userId: number;
  notificationList: Notification[];
  noList: boolean;
}

const NotificationList = ({
  anchorEl,
  open,
  onClose,
  notificationList,
  deleteHandle,
  noList,
}: Props) => {
  const navigate = useNavigate();
  const moveStatistics = (gameid: any) => {
    onClose();
    navigate("/statistics/?gameid=1");
  };
  return (
    <>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={onClose}>
        <TitleContainer>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>알림</div>
          <ClearButton onClick={deleteHandle}>모두 지우기</ClearButton>
        </TitleContainer>

        <Divider />
        {notificationList.length === 0 || noList ? (
          <MenuItem disabled>
            <BoardBox>알림이 없어요</BoardBox>
          </MenuItem>
        ) : (
          notificationList.map((notification, index) => (
            <MenuItem
              key={index}
              onClick={() => moveStatistics(notification.game_id)}
            >
              <TemplateBox>
                <DongBang>분석완료</DongBang>

                <TypeContainer>
                  {notification.type === "cat" && "고양이 술래잡기"}
                  {notification.type === "rps" && "가위바위보"}
                  {notification.type === "road" && "길 만들기"}
                  {notification.type === "rotate" && "도형 회전하기"}
                </TypeContainer>
              </TemplateBox>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid lightgray;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0.4rem;
  width: 400px;
`;

const ClearButton = styled.div`
  font-size: 0.7rem;
  color: gray;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const TypeContainer = styled.div`
  margin-top: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DongBang = styled.div`
  margin-top: 0.3rem;
  background-color: #194702;
  border-radius: 3px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
  width: 4rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemplateBox = styled.div({
  margin: "1% auto",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  width: "90%",
});

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",

  justifyContent: "center",
  alignItems: "flex-start",

  width: "90%",
  height: "70%",
});

export default NotificationList;
