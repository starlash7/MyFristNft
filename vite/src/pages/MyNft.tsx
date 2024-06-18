import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";

const MyNft: FC = () => {
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [balanceOf, setBalanceOf] = useState<number>(0);

  const { mintContract, signer } = useOutletContext<OutletContext>();

  const getBalanceOf = async () => {
    try {
      const response = await mintContract?.balanceOf(signer?.address);

      setBalanceOf(Number(response));
    } catch (error) {
      console.error(error);
    }
  };

  const getNftMetadata = async () => {
    try {
      const temp: NftMetadata[] = [];

      for (let i = 0; i < balanceOf; i++) {
        const tokenOfOwnerByIndex = await mintContract?.tokenOfOwnerByIndex(
          signer?.address,
          i
        );

        const tokenURI = await mintContract?.tokenURI(tokenOfOwnerByIndex);

        const axiosResponse = await axios.get<NftMetadata>(tokenURI);

        temp.push(axiosResponse.data);
      }

      setNftMetadataArray(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mintContract || !signer) return;

    getBalanceOf();
  }, [mintContract, signer]);

  useEffect(() => {
    if (signer) return;

    setBalanceOf(0);
  }, [signer]);

  useEffect(() => {
    if (!balanceOf) return;

    getNftMetadata();
  }, [balanceOf]);

  useEffect(() => console.log(nftMetadataArray), [nftMetadataArray]);

  return (
    <Flex
      w="100%"
      alignItems="center"
      flexDir="column"
      gap={2}
      bgColor="red.100"
      mt={8}
    >
      {!signer && <Text>🦊 메타마스크 로그인이 필요합니다!</Text>}
      {balanceOf !== 0 && <Text>내 보유 NFT 갯수 : {balanceOf}</Text>}
      <Flex>
        {nftMetadataArray.map((v, i) => (
          <Flex key={i} flexDir="column">
            <Image
              alignSelf="center"
              w={60}
              h={60}
              src={v.image}
              alt={v.name}
            />
            <Text mt={4} fontSize={24} fontWeight="semibold">
              {v.name}
            </Text>
            <Text mt={4}>{v.description}</Text>
            <Flex flexWrap="wrap" mt={4} gap={2}>
              {v.attributes?.map((w, j) => (
                <Box key={j} border="2px solid olive" p={1}>
                  <Text borderBottom="2px solid olive">{w.trait_type}</Text>
                  <Text>{w.value}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default MyNft;
