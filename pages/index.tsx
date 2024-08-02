// pages/index.tsx
import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text, useToast, Image, Link, List, ListItem } from '@chakra-ui/react';

const Home = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, endpoint: string) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage('Inscrição confirmada, obrigado por se inscrever!');
        setName('');
        toast({
          title: 'Success',
          description: 'Subscription confirmed!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setMessage('Failed to confirm subscription.');
        toast({
          title: 'Error',
          description: 'Failed to confirm subscription.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={[4, 8]} bg="brand.100" direction="column">
      <Box p={[4, 8]} w="full" maxW="md" bg="transparent">
        <Text fontSize={["2xl", "4xl"]} mt={6} mb={-1} textAlign="center" fontWeight="bold" color="brand.200" fontFamily="'Black Mango', sans-serif">
          Workshops
        </Text>
        <Text fontSize={["xs", "sm"]} mb={10} textAlign="center" color="#414141" fontWeight="light">
          - Sábado 10hrs -
        </Text>

        <form onSubmit={(e) => handleSubmit(e, '/api/bel')}>
          <Text fontSize={["md", "lg"]} mb={4} textAlign="center" color="brand.200" fontFamily="'Pages Grotesque', sans-serif">
            Bel: Criando um Altar de Adoração na Família
          </Text>
          <Box mb={4}>
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

        <form onSubmit={(e) => handleSubmit(e, '/api/joao')}>
          <Text fontSize={["md", "lg"]} mt={8} mb={4} textAlign="center" color="brand.200" fontFamily="'Pages Grotesque', sans-serif">
            João: Emoções Transformadas pela Adoração
          </Text>
          <Box mb={4}>
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

        <form onSubmit={(e) => handleSubmit(e, '/api/leticia')}>
          <Text fontSize={["md", "lg"]} mt={8} mb={4} textAlign="center" color="brand.200" fontFamily="'Pages Grotesque', sans-serif">
            Leticia: Sobrenatural Através da Adoração
          </Text>
          <Box mb={4}>
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