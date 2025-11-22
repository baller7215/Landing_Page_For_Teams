import React, { useEffect, useState } from "react";
import { Progress } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Divider,
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

  if (loading) {
    return (
      <Container py={20} maxW="4xl" centerContent>
        <Heading size="md">Loading team data...</Heading>
        <Text color="gray.500">Make sure your server is running.</Text>
      </Container>
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
    <Container py={10} maxW="7xl">
      {/* ===== TEAM HEADER ===== */}
      <VStack spacing={4} align="start" mb={10}>
        <Heading size="2xl">{team.team_name}</Heading>
        <Text fontSize="lg" color="gray.600">
          {team.description}
        </Text>
      </VStack>

      {/* ===== ABOUT US SECTION ===== */}
      {/* add a transition on size */}
      <Card
        mb={8}
        bgGradient="linear(to-r, #B2F5EA, green.100)"
        _hover={{ transform: "scale(1.01) rotate(-.5deg)" }}
        transition="transform 0.3s ease"
      >
        <CardHeader>
          <Heading size="lg">About Us</Heading>
        </CardHeader>
        <CardBody>
          <Text fontWeight="semibold" color="gray.700">
            {aboutUsWords}
          </Text>
        </CardBody>
      </Card>

      {/* ===== PROJECT + GOALS SECTION ===== */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
        <Card>
          <CardHeader>
            <Heading size="lg">Project Overview</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {/* TODO: Students replace */}
              Write 2–3 sentences describing your project and what problem it
              solves.
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="lg">Goals</Heading>
          </CardHeader>
          <Progress size='xs' isIndeterminate />
          <CardBody>
            <List spacing={2}>
              {/* TODO: Students replace */}
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                The provision of free and low-cost legal services.
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Ensure low-income seniors and people with disabilities can live with dignity and independance regardless of income.
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Serve justice for members of our communities who are elderly, living with disabilities, or experiencing homelessness.
              </ListItem>
            </List>
            
          </CardBody>
        </Card>
      </SimpleGrid>

      <Divider my={8} />

      {/* ===== ROLE SECTIONS (LOOP THROUGH ALL DATA) ===== */}
      <VStack spacing={10} align="stretch">
        {roleSections.map((section) => (
          <RoleSection
            key={section.title} // unique per role section
            title={section.title} // e.g. "Developer"
            members={section.members} // array of members
          />
        ))}
      </VStack>
    </Container>
  );
}
