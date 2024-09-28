// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Input, Text, useToast, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const workshops = [
  { name: 'Pureza', author: 'Clara Mendes', workshop: 'Pureza' },
  { name: 'Evangelismo', author: 'João Paulo', workshop: 'Evangelismo' },
];
  

const Home = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>(null);
  const [workshopLimits, setWorkshopLimits] = useState<Record<string, boolean>>({});
  const toast = useToast();

  useEffect(() => {
    const fetchWorkshopCounts = async () => {
      const responses = await Promise.all(workshops.map(async (workshop) => {
        const response = await fetch(`/api/workshop-count?workshop=${workshop.workshop}`);
        const result = await response.json();
        return { workshop: workshop.workshop, count: result.count };
      }));

      const limits = responses.reduce((acc, { workshop, count }) => {
        const limit = workshop === 'Pureza' ? 35 : 40;
        acc[workshop] = count >= limit;
        return acc;
      }, {} as Record<string, boolean>);

      setWorkshopLimits(limits);
    };

    fetchWorkshopCounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, workshop: string) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, workshop }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Inscrição confirmada, obrigado por se inscrever!');
        setName('');
        setPhone('');
        toast({
          title: 'Success',
          description: 'Subscription confirmed!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setMessage(result.error || 'Failed to confirm subscription.');
        toast({
          title: 'Error',
          description: result.error || 'Failed to confirm subscription.',
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

  const toggleWorkshop = (workshop: string) => {
    setExpandedWorkshop(expandedWorkshop === workshop ? null : workshop);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={[4, 8]} bgImage="url('/bg.png')" bgSize="cover" bgPosition="center" bgRepeat="no-repeat" direction="column">
      <Box p={[4, 8]} w="full" maxW="md" bg="transparent">
        <Text 
          fontSize={["5xl"]}
          mt={6}
          mb={-1}
          fontFamily="'Anton'"
          textAlign="center"
          color="white"
          sx={{
            WebkitTextStroke: '1px black', 
          }}
        >
          WORKSHOPS
        </Text>
        <Text fontSize={["md"]} mb={10} textAlign="center" color="#380c86" fontFamily="'Antonio', sans-serif">
          SÁBADO 18:30h
        </Text>

        {workshops.map((workshop) => (
          <Box border="1px solid" color="#ffffff59" borderRadius="15px" padding="10px" key={workshop.name} mb={8}>
            <Flex align="center" justify="space-between" onClick={() => toggleWorkshop(workshop.name)} cursor="pointer">
              <Text fontSize={["2xl"]} letterSpacing="1.3px" textTransform="uppercase" color="white" fontFamily="Anton" sx={{
            WebkitTextStroke: '0.5px black',
          }}>
                {workshop.name}
              </Text>
              <IconButton
                icon={expandedWorkshop === workshop.name ? <ChevronUpIcon /> : <ChevronDownIcon />}
                aria-label="Toggle workshop"
                variant="ghost"
                onClick={() => toggleWorkshop(workshop.name)}
              />
            </Flex>
            <Text fontSize={["xs", "sm"]} mb={0} textAlign="start" color="#5818c8" fontWeight="light" fontFamily="Antonio">
              com {workshop.author}
            </Text>
            <Collapse in={expandedWorkshop === workshop.name} animateOpacity>
              {workshopLimits[workshop.workshop] ? (
                <Text mt={4} textAlign="center" fontFamily="Anton" color="white">
                  As vagas para esse workshop acabaram.
                </Text>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, workshop.workshop)}>
                  <Box mb={4} mt={4}>
                    <Input
                      type="text"
                      placeholder="nome do participante"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      focusBorderColor="black"
                      _placeholder={{ color: '#5818c8' }}
                      border="1px solid"
                      borderRadius="15px"
                      borderColor="#5818c8"
                      fontFamily="Antonio"
                      color="#5818c8"
                    />
                  </Box>
                  <Box mb={4} mt={4}>
                    <Input
                      type="tel"
                      placeholder="(00) 0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      focusBorderColor="black"
                      _placeholder={{ color: '#5818c8' }}
                      border="1px solid"
                      borderColor="#5818c8"
                      borderRadius="15px"
                      fontFamily="Antonio"
                      color="#5818c8"
                    />
                  </Box>
                  <Button
                    type="submit"
                    bg="#5818c8"
                    color="white"
                    width="full"
                    _hover={{ bg: '#5818c8', transform: 'translateY(-1px)', boxShadow: 'lg' }}
                    transition="all 0.3s ease-in-out"
                    border="1px solid"
                    borderColor="#5818c8"
                    borderRadius="15px"
                    fontFamily="Antonio"
                  >
                    Inscrever-se
                  </Button>
                </form>
              )}
            </Collapse>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Home;