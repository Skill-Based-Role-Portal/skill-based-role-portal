import {
    Box,
    Flex,
    Text,
    Card,
    CardBody,
    Heading,
    IconButton,
    Tag,
    TagLabel,
    TagLeftIcon,
    Icon,
  } from '@chakra-ui/react';
  
  import { BiBookmark, BiBriefcase, BiMap } from 'react-icons/bi';
  
  export default function RoleListing(props) {
    const { role } = props;
  
    const handleClick = () => {
      // Add your custom click logic here
      alert('Component clicked');
    };
  
    return (
      <Flex w={'full'} cursor="pointer" onClick={handleClick}>
        <Card
          w={'full'}
          variant={'outline'}
          backgroundColor={'gray.50'}
          _dark={{ backgroundColor: 'gray.800' }}
        >
          <CardBody color={'gray.700'} _dark={{ color: 'gray.400' }}>
            <Flex justifyContent={'space-between'} mb={4}>
              <Box>
                <Text
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  mb={0.5}
                  color={'gray.500'}
                >
                  Information Technology
                </Text>
                <Heading fontSize={'lg'} fontWeight={'semibold'} mb={1}>
                  Software Engineer
                </Heading>
                <Flex
                  alignItems={'center'}
                  color={'gray.600'}
                  _dark={{ color: 'gray.500' }}
                >
                  <Icon as={BiMap} mr={0.5} w={4} h={4} />
                  <Text fontSize={'sm'} fontWeight={'medium'}>
                    Singapore
                  </Text>
                </Flex>
              </Box>
              <IconButton
                variant={'outline'}
                aria-label="Bookmark role listing"
                size={'sm'}
                icon={<BiBookmark />}
                color={'gray.500'}
              />
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Tag
                size={'sm'}
                variant={'subtle'}
                px={2.5}
                py={1.5}
                colorScheme={'gray'}
                backgroundColor={'gray.200'}
                color={'gray.600'}
                _dark={{ color: 'gray.400', backgroundColor: 'gray.700' }}
              >
                <TagLeftIcon as={BiBriefcase} />
                <TagLabel fontWeight={'semibold'} fontSize={'xs'}>
                  Entry level
                </TagLabel>
              </Tag>
              <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.500'}>
                2 days ago
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    );
  }