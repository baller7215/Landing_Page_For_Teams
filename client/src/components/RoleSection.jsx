import React from "react";
import {
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Badge,
  VStack,
  Box
} from "@chakra-ui/react";

// Receives title (role name) + members (array)
export default function RoleSection({ title, members }) {
  return (
    <Box w="100%">
      <Heading size="lg" mb={4}>
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {members.map((member) => (
            <Card
              key={member.email}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              h="100%"
              _hover={{ transform: "scale(1.03)", bg: "gray.50" }}
              transition="transform 0.3s ease, background-color 0.3s ease"
            >
            <CardHeader>
              <VStack align="start" spacing={1}>
                <Heading size="md">
                  {member.first_name} {member.last_name}
                </Heading>
                <Badge colorScheme="teal">{title}</Badge>
              </VStack>
            </CardHeader>

            <CardBody>
              {member.pronouns && (
                <Text color="gray.600">Pronouns: {member.pronouns}</Text>
              )}
              {member.year_of_study && (
                <Text color="gray.600">Year: {member.year_of_study}</Text>
              )}
              <Text mt={2} fontSize="sm" color="blue.600">
                {member.email}
              </Text>
            </CardBody>
          </Card>
        ))}

        {members.length === 0 && (
          <Text color="gray.500">No members listed yet.</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}
