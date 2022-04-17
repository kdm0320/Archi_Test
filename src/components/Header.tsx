import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { chosenImgAtom, dataAtom, isDetailedAtom } from "../atoms";

const TopBar = styled.nav`
  width: 100vw;
  height: 6vh;
  border-bottom: 1px solid;
  border-color: lightgray;
  position: fixed;
  padding: 0%;
  background-color: green;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Col = styled.div``;
const ExitBtn = styled.button`
  margin-right: 10%;
`;
const MainExitBtn = styled.button`
  margin-right: 10%;
`;
const DownloadBtn = styled.button``;
const DeleteBtn = styled(DownloadBtn)``;
const DeleteBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
`;
const CheckDelete = styled.div`
  width: 50%;
  height: 50%;
  background-color: red;
`;
const ChooseBtn = styled.button``;

function Header() {
  const [isDetailed, setIsDetailedAtom] = useRecoilState(isDetailedAtom);
  const chosenImg = useRecoilValue(chosenImgAtom);
  const setDatas = useSetRecoilState(dataAtom);

  const onExitClick = () => {
    setIsDetailedAtom((prev) => !prev);
    document.body.style.overflow = "unset";
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
            <ChooseBtn onClick={onClickDelete}>Delete</ChooseBtn>
            <ChooseBtn onClick={() => setOnDelete((prev) => !prev)}>
              return
            </ChooseBtn>
          </CheckDelete>
        </DeleteBack>
      ) : null}
      <TopBar>
        {isDetailed ? (
          <>
            <ExitBtn onClick={onExitClick}>❌</ExitBtn>
            <Col>
              <a href={chosenImg.url} download>
                <DownloadBtn>Download</DownloadBtn>
              </a>
              <DeleteBtn onClick={() => setOnDelete((prev) => !prev)}>
                Delete
              </DeleteBtn>
            </Col>
          </>
        ) : (
          <MainExitBtn>❌</MainExitBtn>
        )}
      </TopBar>
    </>
  );
}

export default Header;
