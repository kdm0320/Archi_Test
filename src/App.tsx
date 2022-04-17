import Header from "./components/Header";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { chosenImgAtom, dataAtom, isDetailedAtom } from "./atoms";

const Img = styled.img``;
const Wrapper = styled.div`
  width: 100vw;
  padding-top: 6vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const PhotoWrapper = styled.div``;
const ImgCol = styled.div``;
const BigImgWrapper = styled.div`
  background-color: white;
  padding-top: 6vh;
  height: 110vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;
const BigImg = styled.img``;
const DetailSpace = styled.div`
  width: 10vh;
  height: 110vh;
  background-color: yellow;
  display: flex;
  align-items: center;
`;
const ArrowBtn = styled.button``;

function App() {
  const [isDetailed, setIsDetailed] = useRecoilState(isDetailedAtom);
  const [chosenImg, setChosenImg] = useRecoilState(chosenImgAtom);
  const datas = useRecoilValue(dataAtom);

  const onImgClick = ({
    e,
    index,
  }: {
    e: React.MouseEvent<HTMLImageElement>;
    index: number;
  }) => {
    setIsDetailed((prev) => !prev);
    setChosenImg({ url: e.currentTarget.currentSrc, index: index });
    // document.body.style.overflow = "hidden";
  };

  const onArrowClick = (direction: "back" | "forward") => {
    if (direction === "back") {
      setChosenImg(() => {
        return { ...chosenImg, index: chosenImg.index - 1 };
      });
    } else {
      setChosenImg(() => {
        return { ...chosenImg, index: chosenImg.index + 1 };
      });
    }
  };

  const RenderData = () => {
    return (
      <>
        {datas.map((data, index) => {
          const url = data["_id"];
          return (
            <Img
              key={url}
              src={url}
              alt="text"
              onClick={(e) => onImgClick({ e, index })}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <Header />
      {isDetailed ? (
        <BigImgWrapper>
          <DetailSpace>
            {chosenImg.index > 0 ? (
              <ArrowBtn onClick={() => onArrowClick("back")}> ← </ArrowBtn>
            ) : null}
          </DetailSpace>
          <BigImg src={datas[chosenImg.index]._id} alt="text" />
          <DetailSpace>
            {chosenImg.index < datas.length - 1 ? (
              <ArrowBtn onClick={() => onArrowClick("forward")}>→</ArrowBtn>
            ) : (
              <></>
            )}
          </DetailSpace>
        </BigImgWrapper>
      ) : (
        <RenderData />
      )}
    </>
  );
}

export default App;
