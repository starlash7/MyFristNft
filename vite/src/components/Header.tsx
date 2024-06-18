import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";

import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mintAbi from "../abis/mintAbi.json";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}
setMintContract: Dispatch<SetStateAction<Contract | null>>;

const Header: FC<HeaderProps> = ({ signer, setSigner, setMintContract }) => {
  const navigate = useNavigate();
  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!signer) {
      setMintContract(null);

      return;
    }

    setMintContract(
      new Contract(
        "0x417Fb110656950505cd41D817EdE0a5A8c421f86",
        mintAbi,
        signer
      )
    );
  }, [signer]);

  return (
    <Flex bgColor="black" h={24} justifyContent="space-between">
      <Flex
        w={40}
        fontSize={[16, 16, 20]}
        fontWeight="semibold"
        flexDir={["column", "column", "row"]}
        alignItems="center"
        textColor="white"
        fontFamily="cursive"
      >
        BCS5mon
      </Flex>
      <Flex bgColor="black" alignItems="center" gap={[2, 2, 4]}>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/")}
          size={["xs", "xs", "md"]}
          fontFamily="initial"
        >
          Home
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/mint-nft")}
          size={["xs", "xs", "md"]}
          fontFamily="initial"
        >
          Minting
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/my-nft")}
          size={["xs", "xs", "md"]}
          fontFamily="initial"
        >
          My NFT
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/sale-nft")}
          size={["xs", "xs", "md"]}
          fontFamily="initial"
        >
          Market
        </Button>
      </Flex>
      <Flex bgColor="black" w={40} justifyContent="end" alignItems="center">
        {signer ? (
          <Menu>
            <MenuButton size={["xs", "xs", "md"]} as={Button}>
              {signer.address.substring(0, 5)}...
              {signer.address.substring(signer.address.length - 5)}
            </MenuButton>
            <MenuList minW={[20, 20, 40]}>
              <MenuItem fontSize={[8, 8, 12]} onClick={() => setSigner(null)}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={onClickMetamask} size={["xs", "xs", "md"]}>
            🦊 메마로그인
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
