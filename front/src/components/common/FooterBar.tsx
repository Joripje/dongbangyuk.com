import styled from "styled-components";

function FooterBar() {
    return     <StyledFooter>
    <FooterTypo>
      <p>© 2023 Copyright DBXQ</p>
      <p>SSAFY 8기 자율 프로젝트 "동방역검"</p>
      <p>임소정 | 김민찬 | 김서정 | 배연주 | 조재경 | 지혁주</p>
    </FooterTypo>
  </StyledFooter>
}

const StyledFooter = styled.footer({
    position: 'absolute',
    width: "100%",
    height: '20vh',
    bottom: '-30vh',
    background: '#25282b',
  })
  
  const FooterTypo = styled.p`
    font-size: 1rem;
    color: white;
    margin: 2rem;
    text-decoration: none;
  `;

export default FooterBar;