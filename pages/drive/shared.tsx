import { VStack } from '@chakra-ui/react';

import DriveCards from 'components/cards/DriveCards';
import Navigation from 'components/navigation/Navigation';
import LabelBadge from 'components/LabelBadge';

import { useDriveContext } from 'contexts/drive';

const Shared = (): JSX.Element => {
	const { sharedFiles } = useDriveContext();

	return (
		<Navigation>
			<VStack w="100%" spacing="48px" align="start">
				<LabelBadge label="Share with me" />
				<DriveCards files={sharedFiles.filter((elem) => !elem.deletedAt)} />
			</VStack>
		</Navigation>
	);
};

export default Shared;
