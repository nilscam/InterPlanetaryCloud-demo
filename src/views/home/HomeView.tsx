import { Button, Link, Text, VStack } from '@chakra-ui/react';

const HomeView = (): JSX.Element => (
	<VStack spacing="56px" mt="120px">
		<VStack>
			<Text color="blue.500" fontSize="24px">
				Welcome to
			</Text>
			<Text color="blue.500" fontSize="64px" fontWeight="extrabold">
				Inter Planetary Cloud
			</Text>
			<Text color="blue.500">The first cloud unsealing your data</Text>
		</VStack>
		<VStack mt="3000px" w="496px">
			<Link to="/signup" w="100%">
				<Button color="blue.100" size="md" w="100%">
					Create an account
				</Button>
			</Link>
			<Link to="/login" w="100%">
				<Button color="blue.700" bg="blue.100" size="sm" w="100%">
					Login
				</Button>
			</Link>
		</VStack>
	</VStack>
);

export default HomeView;
