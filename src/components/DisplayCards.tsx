import { VStack, HStack, Box, Text, Spacer } from '@chakra-ui/react';

import type { IPCFile, IPCProgram } from 'types/types';

import DriveCards from 'components/DriveCards';
import ProgramCards from 'components/ProgramCards';
import ContactCards from 'components/ContactCards';
import ProfileCard from 'components/ProfileCard';

import { useDriveContext } from 'contexts/drive';
import { useUserContext } from 'contexts/user';

type CardsProps = {
	myPrograms: IPCProgram[];
	sharedFiles: IPCFile[];
	index: number;
	path: string;
	setPath: (path: string) => void;
	onOpenRedeployProgram: () => void;
	isRedeployLoading: boolean;
	setSelectedProgram: (program: IPCProgram) => void;
};

export const DisplayCards = ({
	myPrograms,
	sharedFiles,
	index,
	path,
	setPath,
	onOpenRedeployProgram,
	isRedeployLoading,
	setSelectedProgram,
}: CardsProps): JSX.Element => {
	const { user } = useUserContext();
	const { files, folders } = useDriveContext();

	if (index === 0)
		return (
			<VStack w="100%" id="test" spacing="16px" mt={{ base: '64px', lg: '0px' }}>
				<Box w="100%">
					<Text fontSize="35">My Files</Text>
				</Box>
				<HStack w="100%">
					<Box>
						<Text marginLeft="10">Name</Text>
					</Box>
					<Spacer />
					<Box>
						<Text align="center">Latest upload on Aleph</Text>
					</Box>
					<Spacer />
					<Box>
						<Text align="center">File Size</Text>
					</Box>
				</HStack>
				<DriveCards
					files={files.filter((elem) => elem.path === path)}
					folders={folders.filter((elem) => elem.path === path)}
					path={path}
					setPath={setPath}
				/>
			</VStack>
		);
	if (index === 1)
		return (
			<VStack w="100%" id="test" spacing="16px" mt={{ base: '64px', lg: '0px' }}>
				<Box w="100%">
					<Text fontSize="35">Shared with me</Text>
				</Box>
				<DriveCards files={sharedFiles} folders={[]} path={path} setPath={setPath} />
			</VStack>
		);
	if (index === 2) return <ContactCards contacts={user.contact.contacts} />;
	if (index === 3)
		return (
			<ProgramCards
				programs={myPrograms}
				onOpenRedeployProgram={onOpenRedeployProgram}
				isRedeployLoading={isRedeployLoading}
				setSelectedProgram={setSelectedProgram}
			/>
		);
	return <ProfileCard profile={user.contact.contacts[0]} />;
};
