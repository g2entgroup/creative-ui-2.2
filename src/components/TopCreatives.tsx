import React from "react";
import { 
    SimpleGrid, 
    Box, 
    OrderedList, 
    ListItem, 
    Avatar, 
    AvatarBadge, 
    Link, 
    Image,
    useToken 
} from "@chakra-ui/react";

export default function TopCreatives() {
    return (
        <SimpleGrid columns={5} spacing="2rem">
        <Box height="80px">
            <OrderedList>
            <ListItem color="whiteAlpha.700" value="1">
                <Link>
                <Avatar size="xs" name="plantarcowboy" src="https://bit.ly/dan-abramov">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;plantarcowboy
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="2">
              <Link>
                <Avatar size="xs" name="maliciousnorth" src="https://bit.ly/tioluwani-kolawole">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;maliciousnorth
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="3">
              <Link>
                <Avatar size="xs" name="thingmanager" src="https://bit.ly/kent-c-dodds">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;thingmanager
              </Link>
            </ListItem>
            </OrderedList>
          </Box>
          <Box height="80px">
          <OrderedList>
            <ListItem color="whiteAlpha.700" value="4">
                <Link>
                <Avatar size="xs" name="feastpizza" src="https://bit.ly/ryan-florence">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;feastpizza
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="5">
              <Link>
                <Avatar size="xs" name="fennelidentical" src="https://bit.ly/prosper-baba">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;fennelidentical
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="6">
              <Link>
                <Avatar size="xs" name="hutdaily" src="https://bit.ly/code-beast">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;hutdaily
              </Link>
            </ListItem>
          </OrderedList>
          </Box>
          <Box height="80px">
          <OrderedList>
          <ListItem color="whiteAlpha.700" value="7">
                <Link>
                <Avatar size="xs" name="lanyardfink" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;lanyardfink
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="8">
              <Link>
                <Avatar size="xs" name="decimalgingery" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Dizzy&eyebrowType=Angry&mouthType=Grimace&skinColor=Black">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;decimalgingery
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="9">
              <Link>
                <Avatar size="xs" name="notionmoan" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=CollarSweater&clotheColor=PastelBlue&eyeType=WinkWacky&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=DarkBrown">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;notionmoan
              </Link>
            </ListItem>
          </OrderedList>
          </Box>
          <Box height="80px">
          <OrderedList>
          <ListItem color="whiteAlpha.700" value="10">
                <Link>
                <Avatar size="xs" name="tatteredvast" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=GraphicShirt&clotheColor=Red&graphicType=Skull&eyeType=WinkWacky&eyebrowType=SadConcernedNatural&mouthType=Sad&skinColor=DarkBrown">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;tatteredvast
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="11">
              <Link>
                <Avatar size="xs" name="spanbesides" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=PastelOrange&graphicType=Diamond&eyeType=Surprised&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=DarkBrown">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;spanbesides
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="12">
              <Link>
                <Avatar size="xs" name="userkooky" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription01&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=PastelGreen&eyeType=Default&eyebrowType=SadConcerned&mouthType=Concerned&skinColor=Black">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;userkooky
              </Link>
            </ListItem>
          </OrderedList>
          </Box>
          <Box height="80px">
          <OrderedList>
            <ListItem color="whiteAlpha.700" value="13">
              <Link>
                <Avatar size="xs" name="arrangesquawk" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Round&hairColor=Brown&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=ShirtScoopNeck&clotheColor=Gray02&eyeType=Cry&eyebrowType=UpDown&mouthType=Eating&skinColor=Tanned">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;arrangesquawk
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="14">
              <Link>
                <Avatar size="xs" name="beaverumpire" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=BlazerShirt&clotheColor=White&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=DarkBrown">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;beaverumpire
              </Link>
            </ListItem>
            <ListItem color="whiteAlpha.700" value="15">
              <Link>
                <Avatar size="xs" name="fifthmainstay" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=WinkWacky&eyebrowType=Default&mouthType=Twinkle&skinColor=DarkBrown">
                  <AvatarBadge boxSize="1.25em" borderColor="transparent">
                    <Image src="/verifyAsset.svg"/>
                  </AvatarBadge>
                </Avatar>
                &nbsp;fifthmainstay
              </Link>
            </ListItem>
          </OrderedList>
          </Box>
          </SimpleGrid>
    );
}
