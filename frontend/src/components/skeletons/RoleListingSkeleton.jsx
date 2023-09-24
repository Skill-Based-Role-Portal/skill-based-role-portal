import { Box, Flex, Card, CardBody, Skeleton } from '@chakra-ui/react';

export default function RoleListingSkeleton() {
  return (
    <Flex w={'full'}>
      <Card
        w={'full'}
        variant={'outline'}
        backgroundColor={'gray.50'}
        _dark={{ backgroundColor: 'gray.800' }}
      >
        <CardBody color={'gray.700'} _dark={{ color: 'gray.400' }}>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Skeleton h={'18px'} w={'150px'} mb={2} />
              <Skeleton h={'22px'} w={'220px'} mb={2} />
              <Skeleton h={'18px'} w={'100px'} mb={4} />
            </Box>
            <Skeleton h={'30px'} w={'30px'} />
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex>
              <Skeleton h={'22px'} w={'100px'} mr={2} />
              <Skeleton h={'22px'} w={'100px'} />
            </Flex>
            <Flex>
              <Skeleton h={'16px'} w={'60px'} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
