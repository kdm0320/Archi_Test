import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { chosenImgAtom, dataAtom, isDetailedAtom } from "../atoms";

const TopBar = styled.nav`
  width: 100vw;
  height: 6vh;
  border-bottom: 1px solid;
  border-color: lightgray;
  padding: 0%;
  background-color: white;
  display: flex;

  align-items: center;
`;
const Col = styled.div`
  width: 20%;
  height: 100%;
`;
const ExitBtn = styled.button`
  all: unset;
  width: 4%;
  height: 60%;
  text-align: center;
  font-size: 70%;
  margin-left: 1%;
  background-color: ${(props) => props.theme.btn.bgColor};
  border-radius: ${(props) => props.theme.btn.borderRadius};
  transition-duration: 0.25s;
  margin-right: auto;

  :hover {
    background-color: #e0e0e0;
  }
  cursor: pointer;
`;
const MainExitBtn = styled.button`
  all: unset;
  width: 5%;
  height: 67%;
  text-align: center;
  font-size: 70%;
  margin-left: 1%;
  background-color: ${(props) => props.theme.btn.bgColor};
  border-radius: ${(props) => props.theme.btn.borderRadius};
  transition-duration: 0.25s;
  :hover {
    background-color: #e0e0e0;
  }
  cursor: pointer;
`;
const DownLink = styled.a`
  margin-top: 2%;
  height: 100%;
  width: 4%;
`;
const DownloadBtn = styled.button`
  all: unset;
  background-color: ${(props) => props.theme.btn.bgColor};
  border-radius: ${(props) => props.theme.btn.borderRadius};
  height: 50%;
  font-size: 80%;
  color: black;
  text-align: center;
  margin-top: 10%;
  transition-duration: 0.25s;
  :hover {
    background-color: #e0e0e0;
  }
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  all: unset;
  background-color: ${(props) => props.theme.btn.bgColor};
  border-radius: ${(props) => props.theme.btn.borderRadius};
  font-size: 80%;
  width: 5%;
  height: 45%;
  text-align: center;
  margin-right: 7%;
  margin-left: 4%;
  cursor: pointer;
`;
const DeleteBack = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  padding-bottom: 1%;

  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  align-items: center;
  justify-content: center;
`;
const CheckDelete = styled.div`
  width: 33%;
  height: 55%;
  border-radius: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  h1 {
    margin-top: 10%;
    font-weight: bolder;
    font-size: 200%;
  }
  h3 {
    margin-top: 25%;
    font-size: 120%;
    color: darkgray;
    margin-bottom: 25%;
  }
`;
const ChooseBtn = styled.button`
  all: unset;
  margin-top: 5%;
  width: 50%;
  height: 10%;
  border-radius: 4%;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

function Header() {
  const [isDetailed, setIsDetailedAtom] = useRecoilState(isDetailedAtom);
  const chosenImg = useRecoilValue(chosenImgAtom);
  const setDatas = useSetRecoilState(dataAtom);

  const onExitClick = () => {
    setIsDetailedAtom((prev) => !prev);
  };
  const [onDelete, setOnDelete] = useState(false);

  const onClickDelete = () => {
    setOnDelete((prev) => !prev);
    setDatas((prev) => prev.filter((data, index) => index !== chosenImg.index));
  };
  return (
    <>
      {onDelete ? (
        <DeleteBack>
          <CheckDelete>
            <h1>Confirm To Delete</h1>
            <h3>Are you sure you want to delete this image?</h3>
            <ChooseBtn
              color="#6db2c5"
              style={{ color: "white" }}
              onClick={onClickDelete}
            >
              Delete
            </ChooseBtn>
            <ChooseBtn
              color="white"
              style={{ color: "#6db2c5" }}
              onClick={() => setOnDelete((prev) => !prev)}
            >
              return
            </ChooseBtn>
          </CheckDelete>
        </DeleteBack>
      ) : null}
      <TopBar>
        {isDetailed ? (
          <>
            <ExitBtn onClick={onExitClick}>❌</ExitBtn>
            <DownLink
              href={chosenImg.url}
              style={{ textDecoration: "none" }}
              download
            >
              <DownloadBtn>Download</DownloadBtn>
            </DownLink>
            <DeleteBtn
              onClick={() => {
                setOnDelete((prev) => !prev);
                document.body.style.overflow = "hidden";
              }}
            >
              Delete
            </DeleteBtn>
          </>
        ) : (
          <MainExitBtn>❌</MainExitBtn>
        )}
      </TopBar>
    </>
  );
}

export default Header;
