import React, { useEffect, useState } from "react";
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
  ListItem
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
        <Text color="gray.500">
          Check the team name in App.jsx and Neon.
        </Text>
      </Container>
    );
  }

  // roles = { Developer: [...], Designer: [...], ... }
  const roleSections = Object.entries(roles).map(([title, members]) => ({
    title,
    members
  }));

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
      <Card mb={8}>
        <CardHeader>
          <Heading size="lg">About Us</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {/* TODO: Students replace */}
            We are a team of builders and designers working together to create a
            meaningful product. Replace this with your team’s mission.
          </Text>
        </CardBody>
      </Card>

      {/* ===== PROJECT + GOALS SECTION ===== */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
        <Card variant="filled" size="lg" bgGradient="linear(to-t, #7dbfe8, #093f75)">
          <CardHeader mb="-4">
            <Heading lineHeight="short">
              <Highlight query='Project Overview' styles={{ px: '4', py: '2', rounded: 'full', bg: 'teal.100' }}>
                Project Overview
              </Highlight>
            </Heading>
          </CardHeader>
          <CardBody >
            <Text color="white">
              {/* TODO: Students replace */}
              <Highlight query='EDLR Law' styles={{ px: '4', py: '2', rounded: 'full', bg: 'teal.100' }}>
                We are building an admin-sided volunteer management platform for the admins of ELDR Law and Disability and Rights Center.
                Our platform aims to streamline volunteer coordination, enhance communication, and improve overall efficiency for non-profit organizations.
              </Highlight>
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="lg">Goals</Heading>
          </CardHeader>
          <CardBody>
            <List spacing={2}>
              {/* TODO: Students replace */}
              <ListItem>Goal 1</ListItem>
              <ListItem>Goal 2</ListItem>
              <ListItem>Goal 3</ListItem>
            </List>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Divider my={8} />

      {/* ===== ROLE SECTIONS (LOOP THROUGH ALL DATA) ===== */}
      <VStack spacing={10} align="stretch">
        {roleSections.map((section) => (
          <RoleSection
            key={section.title}       // unique per role section
            title={section.title}     // e.g. "Developer"
            members={section.members} // array of members
          />
        ))}
      </VStack>
    </Container>
  );
}
