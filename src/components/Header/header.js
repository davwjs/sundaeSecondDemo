import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import Bars from "../../images/bars.svg";
import { animateScroll as scroll, Link as LinkS } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import { Button } from "../Button/Button";
import logo from "../../images/whitelogo.png";

const Nav = styled.nav`
  background-color: "transparent";
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
`;

const NavLink = css`
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
`;

const MenuBars = styled.i`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    background-image: url(${Bars});
    background-size: contain;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLinks = styled(LinkS)`
  ${NavLink}
`;

const NavMenuLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  margin-left: 20px;
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// const Button = styled.button`
//   background: transparent;
//   white-space: nowrap;
//   outline: none;
//   border: none;
//   min-width: 100px;
//   max-width: 200px;
//   cursor: pointer;
//   text-decoration: none;
//   transition: 0.3s;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: ${({ big }) => (big ? "16px 40px" : "14px 24px")};
//   color: #ffffff;
//   font-size: ${({ big }) => (big ? "20px" : "14px")};
//   &:hover {
//     transform: translateY(-3px);
//   }
// `;

const Header = ({ toggle }) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    OWNER_ADDRESS: "",

    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let WalletAddress = blockchain.account;
    WalletAddress = WalletAddress.toUpperCase();

    let TheOwnerAddress = CONFIG.OWNER_ADDRESS;
    TheOwnerAddress = TheOwnerAddress.toUpperCase();

    if (WalletAddress == TheOwnerAddress) {
      CONFIG.WEI_COST = 0;
    } else if (data.totalSupply > 1 && data.totalSupply < 10000)
      CONFIG.WEI_COST = CONFIG.WEI_COST;

    let cost = CONFIG.WEI_COST;

    let cost1 = CONFIG.COST1;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, Try  to mint again Something is wrong.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Your a Proud Owner Of ${CONFIG.NFT_NAME}  go Check it On Opensea.io .`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [blockchain.account]);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Nav>
      <Logo src={logo}/>
      <MenuBars onClick={toggle} />
      {/* <NavMenu>
        <NavMenuLinks
          to="about"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          ABOUT
        </NavMenuLinks>
        <NavMenuLinks
          to="roadmap"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          ROADMAP
        </NavMenuLinks>
        <NavMenuLinks
          to="attributes"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          ATTRIBUTES
        </NavMenuLinks>
        <NavMenuLinks
          to="team"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          TEAM
        </NavMenuLinks>
        <NavMenuLink
          to="/mint"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          MINT
        </NavMenuLink>
      </NavMenu> */}
      <NavBtn>
        <Button primary="true" round="true" big="true" to="/mint">
          MINT
        </Button>
      </NavBtn>
    </Nav>
  );
};

export default Header;
