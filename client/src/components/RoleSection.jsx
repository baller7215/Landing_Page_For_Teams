import React, { useState } from "react";
import {
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Badge,
  VStack,
  Box,
  useColorModeValue,
  Icon,
  HStack
} from "@chakra-ui/react";
import { MdEmail, MdPerson } from 'react-icons/md';

// Receives title (role name) + members (array)
export default function RoleSection({ title, members }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');
  const badgeBg = useColorModeValue('teal', 'teal');
  
  return (
    <Box w="100%">
      <Heading 
        size="lg" 
        mb={4}
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
      >
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {members.map((member) => (
            <Card
              key={member.email}
              bg={cardBg}
              borderWidth="2px"
              borderColor={cardBorder}
              borderRadius="xl"
              overflow="hidden"
              h="100%"
              shadow="md"
              _hover={{ 
                transform: "translateY(-8px) scale(1.02)",
                shadow: "2xl",
                borderColor: "teal.400"
              }}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              cursor="pointer"
            >
            <CardHeader bg={useColorModeValue('teal.50', 'teal.900')} pb={4}>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Icon as={MdPerson} boxSize={5} color="teal.500" />
                  <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                    {member.first_name} {member.last_name}
                  </Heading>
                </HStack>
                <Badge 
                  colorScheme={badgeBg} 
                  fontSize="sm" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  textTransform="capitalize"
                >
                  {title}
                </Badge>
              </VStack>
            </CardHeader>

            <CardBody>
              <VStack align="start" spacing={2}>
                {member.pronouns && (
                  <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
                    <strong>Pronouns:</strong> {member.pronouns}
                  </Text>
                )}
                {member.year_of_study && (
                  <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
                    <strong>Year:</strong> {member.year_of_study}
                  </Text>
                )}
                <HStack mt={2} spacing={2}>
                  <Icon as={MdEmail} color="blue.500" />
                  <Text fontSize="sm" color="blue.500" fontWeight="medium">
                    {member.email}
                  </Text>
                </HStack>
              </VStack>
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
