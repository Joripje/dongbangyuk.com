import love from "assets/images/love.png";
import styled from "styled-components";

function PreapareTemplate() {
  return (
    <TemplateBox>
      <ColFlexBox>
        <VoiceCheckImg />
        <TestBoardSection>
          <StatusBarSection />
          <ColFlexBox>
            <ExampleSection />
            <PageButtonSection />
          </ColFlexBox>
        </TestBoardSection>
      </ColFlexBox>
    </TemplateBox>
  );
}

const TemplateBox = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(237, 252, 242, 1);
`;

const ColFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VoiceCheckImg = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 2rem;
  background-image: url(${love});
  background-size: cover;
`;

const TestBoardSection = styled.section`
  width: 60%;
  min-height: calc(100vh - 10rem);
  background: white;
  border-radius: 20px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
`;

const StatusBarSection = styled.section`
  width: 100%;
  height: 3rem;
  background: white;
  border-radius: 20px;
  border-bottom: 1px solid #e5e5e5;
`;

const ExampleSection = styled.section`
  width: 80%;
  min-height: calc(40vh);
  background: white;
  border: 1rem solid #e5e5e5;
  border-radius: 20px;
`;

const PageButtonSection = styled.section`
  width: 80%;
  height: 3rem;
  background: red;
`;

export default PreapareTemplate;
