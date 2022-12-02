import { Box, Button, HStack, Input, Text, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { BsCode, BsCodeSlash } from 'react-icons/bs';

import { useConfigContext } from 'contexts/config';
import { useUserContext } from 'contexts/user';

const ConfigPage = (): JSX.Element => {
	const { user } = useUserContext();
	const { setConfig } = useConfigContext();
	const toast = useToast({ duration: 2000, isClosable: true });
	const [ColorTheme, setColorTheme] = useState('');
	const { toggleColorMode } = useColorMode();
	const color = useColorModeValue('white', 'gray.800');
	const colorText = useColorModeValue('gray.800', 'white');
	const [isLoading, setIsLoading] = useState(false);

	const Theme = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.toLowerCase() === 'dark') setColorTheme('gray.800');
		else if (e.target.value.toLowerCase() === 'light') setColorTheme('white');
		else setColorTheme('undefined');
	};

	const configUser = async () => {
		setIsLoading(true);
		try {
			if (ColorTheme === 'undefined') {
				toast({ title: "This color doesn't exist", status: 'error' });
				return;
			}
			const config1 = await user.contact.configFile(ColorTheme);
			setConfig({ ...user.config!, theme: ColorTheme });
			toggleColorMode();
			toast({ title: config1.message, status: config1.success ? 'success' : 'error' });
		} catch (error) {
			toast({ title: 'Fail change theme', status: 'error' });
			console.error(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Text fontSize="3xl" color={colorText}>
				InterPlanetaryCloud Configuration
			</Text>
			<Box borderWidth="2px" w="90%" h="750px">
				<BsCode size="25" color={colorText}></BsCode>
				<HStack>
					<Text marginLeft="30" textColor={colorText}>
						Theme (Dark or Light)
					</Text>
					<Input onChange={Theme} w="60%"></Input>
				</HStack>
				<BsCodeSlash size="25" color={colorText}></BsCodeSlash>
			</Box>
			<Button
				onClick={configUser}
				w="90%"
				backgroundColor={color}
				textColor={colorText}
				justifyContent="center"
				isLoading={isLoading}
			>
				Save
			</Button>
		</>
	);
};

export default ConfigPage;
