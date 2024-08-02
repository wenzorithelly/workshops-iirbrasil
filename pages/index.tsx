// pages/index.tsx
import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text, useToast, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const workshops = [
  { name: 'Criando um Altar de Adoração na Família', author: "Izabel Arrais", workshop: 'Criando um Altar de Adoração na Família' },
  { name: 'Emoções Transformadas pela Adoração', author: "João Marcos", workshop: 'Emoções Transformadas pela Adoração' },
  { name: 'Sobrenatural Através da Adoração', author: "Letícia Bourdon", workshop: 'Sobrenatural Através da Adoração' },
];

const Home = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, workshop: string) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, workshop }),
      });

      if (response.ok) {
        setMessage('Inscrição confirmada, obrigado por se inscrever!');
        setName('');
        toast({
          title: 'Success',
          description: 'Inscrição confirmada!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setMessage('Failed to confirm subscription.');
        toast({
          title: 'Error',
          description: 'Falha ao tentar se inscrever.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      toast({
        title: 'Error',
        description: 'Um erro ocorreu. Por favor, tente de novo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleWorkshop = (workshop: string) => {
    setExpandedWorkshop(expandedWorkshop === workshop ? null : workshop);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={[4, 8]} bg="brand.100" direction="column">
      <Box p={[4, 8]} w="full" maxW="md" bg="transparent">
        <Text fontSize={["2xl", "4xl"]} mt={6} mb={-1} textAlign="center" fontWeight="bold" color="brand.200" fontFamily="'Black Mango', sans-serif">
          Workshops
        </Text>
        <Text fontSize={["sm", "md"]} mb={10} textAlign="center" color="#414141" fontFamily="'Pages Grotesque', sans-serif">
          - Sábado às 10hrs -
        </Text>

        {workshops.map((workshop) => (
          <Box key={workshop.name} mb={8}>
            <Flex align="center" justify="space-between" onClick={() => toggleWorkshop(workshop.name)} cursor="pointer">
              <Text fontSize={["md", "lg"]} fontWeight="bold" color="brand.200" fontFamily="'Pages Grotesque', sans-serif">
                {workshop.name}
              </Text>
              <IconButton
                icon={expandedWorkshop === workshop.name ? <ChevronUpIcon /> : <ChevronDownIcon />}
                aria-label="Toggle workshop"
                variant="ghost"
                onClick={() => toggleWorkshop(workshop.name)}
              />
            </Flex>
            <Text fontSize={["xs", "sm"]} mt={-1} color="#414141" fontWeight="light" fontFamily="'Pages Grotesque', sans-serif">
                com {workshop.author}
            </Text>
            <Collapse in={expandedWorkshop === workshop.name} animateOpacity>
              <form onSubmit={(e) => handleSubmit(e, workshop.workshop)}>
                <Box mb={4} mt={4}>
                  <Input
                    type="text"
                    placeholder="nome do participante"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    focusBorderColor="black"
                    _placeholder={{ color: '#414141' }}
                    border="1px solid"
                    borderColor="#414141"
                    fontFamily="'Pages Grotesque', sans-serif"
                    borderRadius="0"
                    color="#414141"
                  />
                </Box>
                <Button
                  type="submit"
                  bg="brand.200"
                  color="#414141"
                  width="full"
                  _hover={{ bg: 'white', transform: 'translateY(-1px)', boxShadow: 'lg' }}
                  transition="all 0.3s ease-in-out"
                  border="1px solid"
                  borderColor="brand.200"
                  borderRadius="0"
                  fontFamily="'Pages Grotesque', sans-serif"
                >
                  Inscrever-se
                </Button>
              </form>
            </Collapse>
          </Box>
        ))}

        {message && (
          <Text mt={4} textAlign="center" color={message.includes('confirmada') ? 'brand.300' : 'brand.400'}>
            {message}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Home;