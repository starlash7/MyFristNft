import { Button, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
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

  return (
    <Flex bgColor="black" h={24} justifyContent="space-between">
      <Flex
        w={40}
        fontSize={20}
        fontWeight="semibold"
        alignItems="center"
        textColor="white"
        fontFamily="cursive"
      >
        BCS5mon
      </Flex>
      <Flex bgColor="black" alignItems="center" gap={4}>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/")}
          w={20}
          fontFamily="initial"
        >
          Home
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/mint-nft")}
          w={20}
          fontFamily="initial"
        >
          Minting
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/my-nft")}
          w={20}
          fontFamily="initial"
        >
          My NFT
        </Button>
        <Button
          variant="link"
          textColor="white"
          onClick={() => navigate("/sale-nft")}
          w={20}
          fontFamily="initial"
        >
          Market
        </Button>
      </Flex>
      <Flex bgColor="black" w={40} justifyContent="end" alignItems="center">
        {signer ? (
          <Button>{signer.address}</Button>
        ) : (
          <Button onClick={onClickMetamask} bgColor="black" textColor="white">
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
