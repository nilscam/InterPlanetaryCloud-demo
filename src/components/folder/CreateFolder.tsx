import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { FcFolder } from 'react-icons/fc';

import Modal from 'components/Modal';
import type { IPCFolder } from 'types/types';

import { useConfigContext } from 'contexts/config';
import { useDriveContext } from 'contexts/drive';
import { useUserContext } from 'contexts/user';

const CreateFolder = (): JSX.Element => {
	const { user } = useUserContext();
	const { config } = useConfigContext();
	const { folders, setFolders, path } = useDriveContext();
	const toast = useToast({ duration: 2000, isClosable: true });

	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const colorText = useColorModeValue('gray.800', 'white');

	const createFolder = async () => {
		if (!name || name.includes('/')) {
			toast({ title: 'Invalid folder name', status: 'error' });
			return;
		}
		setIsLoading(true);

		const folder: IPCFolder = {
			name,
			path,
			createdAt: Date.now(),
		};

		const created = await user.contact.createFolder(folder);
		toast({ title: created.message, status: created.success ? 'success' : 'error' });
		if (created.success) {
			setFolders([...folders, folder]);
		}

		setIsLoading(false);
		setName('');
		onClose();
	};

	return (
		<HStack>
			<FcFolder display="flex" size="40"></FcFolder>
			<Button
				w="100%"
				backgroundColor={config?.theme}
				textColor={colorText}
				justifyContent="flex-start"
				onClick={onOpen}
				isLoading={isLoading}
				id="ipc-create-folder-button"
			>
				Create a folder
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				title="Create a folder"
				CTA={
					<Button
						variant="inline"
						w="100%"
						mb="16px"
						onClick={createFolder}
						isLoading={isLoading}
						id="ipc-dashboard-create-folder-modal-button"
					>
						Create Folder
					</Button>
				}
			>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						type="text"
						w="100%"
						p="10px"
						my="4px"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
						id="ipc-dashboard-input-folder-name"
					/>
				</FormControl>
			</Modal>
		</HStack>
	);
};

export default CreateFolder;