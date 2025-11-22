import React, { useEffect, useState } from "react";
import { Box, Image, Progress, IconButton, useColorMode, useColorModeValue, Stat, StatLabel, StatNumber, StatHelpText, Fade, ScaleFade } from '@chakra-ui/react'
import { MdCheckCircle, MdDarkMode, MdLightMode } from 'react-icons/md'
import { FiArrowUp } from 'react-icons/fi'
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Divider,
  Highlight,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  chakra,
} from "@chakra-ui/react";

import api from "./api";
import RoleSection from "./components/RoleSection";

export default function App() {
  const [team, setTeam] = useState(null);
  const [roles, setRoles] = useState({});
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    async function fetchTeam() {
      try {
        // IMPORTANT: change this to your real team name in Neon
        const res = await api.get("/team/ELDR");
        setTeam(res.data.team);
        setRoles(res.data.roles || {});
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalMembers = Object.values(roles).reduce((sum, members) => sum + members.length, 0);

  if (loading) {
    return (
      <Box minH="100vh" bgGradient={bgGradient}>
        <Container py={20} maxW="4xl" centerContent>
          <VStack spacing={4}>
            <Box className="pulse" animation="pulse 2s infinite">
              <Heading size="xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">
                Loading team data...
              </Heading>
            </Box>
            <Progress size="xs" isIndeterminate colorScheme="teal" w="300px" borderRadius="full" />
            <Text color="gray.500">Make sure your server is running.</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (!team) {
    return (
      <Container py={20} maxW="4xl" centerContent>
        <Heading size="md">Team not found</Heading>
        <Text color="gray.500">Check the team name in App.jsx and Neon.</Text>
      </Container>
    );
  }

  // roles = { Developer: [...], Designer: [...], ... }
  const roleSections = Object.entries(roles).map(([title, members]) => ({
    title,
    members,
  }));

  const aboutUsText =
    "We are creating a volunteer management portal for the admins of ELDR (Elder Law and Disability Rights Center) so they can more efficiently track, update, and maintain volunteer involvement with events. ELDR hosts workshops, cases, and clinics, and managing/assigning those volunteers was previously done through Google Forms (which can get messy).";

  const aboutUsWords = aboutUsText.split(" ").map((word, idx, arr) => (
    <chakra.span
      key={`${word}-${idx}`}
      transition="color 0.2s ease"
      _hover={{ color: "teal.500"}}
    >
      {word}
      {idx < arr.length - 1 ? " " : ""}
    </chakra.span>
  ));

  return (
    <Box minH="100vh" bgGradient={bgGradient} position="relative">
      {/* Color Mode Toggle */}
      <Box position="fixed" top={4} right={4} zIndex={10}>
        <IconButton
          icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          onClick={toggleColorMode}
          colorScheme="teal"
          variant="ghost"
          size="lg"
          aria-label="Toggle color mode"
          _hover={{ transform: 'rotate(180deg)', transition: 'transform 0.5s' }}
        />
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <ScaleFade initialScale={0.5} in={showScrollTop}>
          <IconButton
            icon={<FiArrowUp />}
            onClick={scrollToTop}
            position="fixed"
            bottom={8}
            right={8}
            colorScheme="teal"
            size="lg"
            borderRadius="full"
            shadow="lg"
            zIndex={10}
            aria-label="Scroll to top"
            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
            transition="all 0.3s"
          />
        </ScaleFade>
      )}

      <Container py={10} maxW="7xl">
        {/* ===== TEAM HEADER ===== */}
        <Fade in={true}>
          <VStack spacing={4} align="start" mb={10}>
            <Heading 
              size="2xl"
              fontWeight="extrabold"
            >
              {team.team_name}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
              {team.description}
            </Text>
            <Box 
              boxSize='80px' 
              borderRadius="lg" 
              overflow="hidden" 
              shadow="md"
              // _hover={{ transform: 'scale(1.1) rotate(5deg)', shadow: 'xl' }}
              // transition="all 0.3s ease"
            >
              <Image 
                src='src/eldr.png' 
                alt='ELDR Logo'
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </VStack>
        </Fade>

        {/* ===== TEAM STATS ===== */}
        {/* <ScaleFade initialScale={0.9} in={true}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }} transition="all 0.3s">
              <CardBody>
                <Stat>
                  <StatLabel>Total Members</StatLabel>
                  <StatNumber fontSize="4xl" color="teal.500">{totalMembers}</StatNumber>
                  <StatHelpText>Across all roles</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }} transition="all 0.3s">
              <CardBody>
                <Stat>
                  <StatLabel>Roles</StatLabel>
                  <StatNumber fontSize="4xl" color="blue.500">{Object.keys(roles).length}</StatNumber>
                  <StatHelpText>Different positions</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }} transition="all 0.3s">
              <CardBody>
                <Stat>
                  <StatLabel>Project Status</StatLabel>
                  <StatNumber fontSize="4xl" color="green.500">Active</StatNumber>
                  <StatHelpText>In development</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        </ScaleFade> */}

        {/* ===== ABOUT US SECTION ===== */}
        <Fade in={true}>
          <Card
            mb={8}
            bgGradient={useColorModeValue(
              "linear(to-r, teal.50, green.50, blue.50)",
              "linear(to-r, teal.900, green.900, blue.900)"
            )}
            backdropFilter="blur(10px)"
            shadow="xl"
            borderWidth="1px"
            borderColor={useColorModeValue('teal.200', 'teal.700')}
            _hover={{ transform: "scale(1.02) translateY(-4px)", shadow: '2xl' }}
            transition="all 0.3s ease"
          >
            <CardHeader>
              <Heading size="lg" color={useColorModeValue('teal.700', 'teal.200')}>
                About Us
              </Heading>
            </CardHeader>
            <CardBody>
              <Text 
                bgGradient="linear(to-r, teal.500, green.500, blue.500)" 
                bgClip="text" 
                fontWeight="bold"
                fontSize="lg"
              >
                We are creating a volunteer management portal for the admins of ELDR
                (Elder Law and Disability Rights Center) so they can more
                efficiently track, update, and maintain volunteer involvement with
                events. ELDR hosts workshops, cases, and clinics, and
                managing/assigning those volunteers was previously done through
                Google Forms (which can get messy).
              </Text>
            </CardBody>
          </Card>
        </Fade>

        {/* ===== PROJECT + GOALS SECTION ===== */}
        <Fade in={true}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
            <Card 
              variant="filled" 
              size="lg" 
              bgGradient={useColorModeValue(
                "linear(to-br, blue.400, blue.600)",
                "linear(to-br, blue.600, blue.900)"
              )}
              shadow="xl"
              _hover={{ transform: 'scale(1.02)', shadow: '2xl' }}
              transition="all 0.3s ease"
            >
              <CardHeader mb="-4">
                <Heading lineHeight="short" color="white">
                  <Highlight query='Project Overview' styles={{ px: '4', py: '2', rounded: 'full', bg: 'whiteAlpha.300', color: 'white' }}>
                    Project Overview
                  </Highlight>
                </Heading>
              </CardHeader>
              <CardBody>
                <Text color="white" fontSize="md">
                  We are building an admin-sided volunteer management platform for the admins of ELDR Law and Disability and Rights Center.
                  Our platform aims to streamline volunteer coordination, enhance communication, and improve overall efficiency for non-profit organizations.
                </Text>
              </CardBody>
            </Card>

            <Card 
              // bg={cardBg}
              bgGradient={useColorModeValue(
                "linear(to-br, blue.400, blue.600)",
                "linear(to-br, blue.600, blue.900)"
              )}
              variant="filled"
              size="lg"
              // rounded="lg"
              shadow="xl"
              _hover={{ transform: 'scale(1.02)', shadow: '2xl' }}
              transition="all 0.3s ease"
            >
              <CardHeader>
                <Heading size="lg" color="white">Goals</Heading>
              </CardHeader>
              <Progress size='xs' isIndeterminate colorScheme="teal" />
              <CardBody color="white">
                <List spacing={3}>
                  <ListItem 
                    _hover={{ transform: 'translateX(8px)' }} 
                    transition="transform 0.2s"
                  >
                    <ListIcon as={MdCheckCircle} color='#9BAEBC' boxSize={5} />
                    The provision of free and low-cost legal services.
                  </ListItem>
                  <ListItem 
                    _hover={{ transform: 'translateX(8px)' }} 
                    transition="transform 0.2s"
                  >
                    <ListIcon as={MdCheckCircle} color='#9BAEBC' boxSize={5} />
                    Ensure low-income seniors and people with disabilities can live with dignity and independence regardless of income.
                  </ListItem>
                  <ListItem 
                    _hover={{ transform: 'translateX(8px)' }} 
                    transition="transform 0.2s"
                  >
                    <ListIcon as={MdCheckCircle} color='#9BAEBC' boxSize={5} />
                    Serve justice for members of our communities who are elderly, living with disabilities, or experiencing homelessness.
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Fade>

        <Divider my={8} borderColor={useColorModeValue('gray.300', 'gray.600')} />

        {/* ===== ROLE SECTIONS (LOOP THROUGH ALL DATA) ===== */}
        <VStack spacing={10} align="stretch">
          {roleSections.map((section, index) => (
            <Fade in={true} key={section.title} delay={index * 0.1}>
              <RoleSection
                title={section.title}
                members={section.members}
              />
            </Fade>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
