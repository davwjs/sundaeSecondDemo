import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import logo from "../../images/whitelogo.png";

const FooterContainer = styled.footer`
  background-color: transparent;
`;

const FooterWrap = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 1100px;
  margin: 0 auto;
`;

const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const SocialLogo = styled.img`
  height: 40px;
  width: 40px;
  margin-bottom: 20px;
`;

const WebsiteRights = styled.small`
  color: #ffffff;
  margin-bottom: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  margin-bottom: 20px;

`;

const SocialIconLink = styled.a`
  color: #ffffff;
  font-size: 30px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo src={logo} />
            <WebsiteRights>
             Sundae.School © {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://discord.gg/92EqRXrW"
                target="_blank"
                aria-label="Discord"
              >
                <FaDiscord />
              </SocialIconLink>
              <SocialIconLink
                href="https://twitter.com/ToadleToadle"
                target="_blank"
                aria-label="Twitter"
              >
                <FaTwitter />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
