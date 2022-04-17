import Header from "./components/Header";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { chosenImgAtom, dataAtom, isDetailedAtom } from "./atoms";

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 2%;
`;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const ContentWrapper = styled.div`
  padding: 1% 3%;
`;
const PhotoWrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  column-gap: 1%;
  row-gap: 0.4%;
  grid-template-columns: repeat(5, 19%);
  grid-auto-rows: 6%;
  grid-auto-columns: 19%;
  justify-content: center;
`;

const BigImgWrapper = styled.div`
  background-color: white;
  height: 110vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;
const BigImg = styled.img``;
const DetailSpace = styled.div`
  width: 10vh;
  height: 110vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowBtn = styled.button`
  all: unset;
  background-color: ${(props) => props.theme.btn.bgColor};
  border-radius: ${(props) => props.theme.btn.borderRadius};
  width: 60%;
  height: 3%;
  text-align: center;
  cursor: pointer;
`;

const TitleBar = styled.div`
  height: 5vh;
  background-color: white;
  display: flex;
  justify-content: center;
`;
const CountRendering = styled.span`
  justify-self: left;
  align-self: center;
  margin-right: auto;
  margin-left: 1%;
  color: #a7a7a7;
  font-size: 90%;
`;
const Title = styled.h1`
  justify-self: center;
  margin-right: 46%;
  align-self: center;
  font-size: 150%;
  font-weight: bolder;
`;

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
      <PhotoWrapper>
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
      </PhotoWrapper>
    );
  };

  return (
    <Wrapper>
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
            ) : null}
          </DetailSpace>
        </BigImgWrapper>
      ) : (
        <>
          <TitleBar>
            <CountRendering>{datas.length} rendering(s)</CountRendering>
            <Title>Gallery</Title>
          </TitleBar>
          <ContentWrapper>
            <RenderData />
          </ContentWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default App;
