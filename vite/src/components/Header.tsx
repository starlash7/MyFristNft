import { Button, Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex bgColor="blue.100" h={24} justifyContent="space-between">
      <Flex
        bgColor="red.100"
        w={40}
        fontSize={20}
        fontWeight="semibold"
        alignItems="center"
      >
        My First NFT
      </Flex>
      <Flex bgColor="red.100" alignItems="center" gap={4}>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/")}
          w={20}
        >
          Home
        </Button>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/mint-nft")}
          w={20}
        >
          Minting
        </Button>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/my-nft")}
          w={20}
        >
          My NFT
        </Button>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/sale-nft")}
          w={20}
        >
          Market
        </Button>
      </Flex>
      <Flex bgColor="red.100" w={40} justifyContent="end" alignItems="center">
        <Button>Connect Wallet</Button>
      </Flex>
    </Flex>
  );
};

export default Header;
