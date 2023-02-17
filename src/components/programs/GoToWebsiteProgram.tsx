import { useRouter } from 'next/router';
import { HStack, Icon, Text, useBreakpointValue, useToast } from '@chakra-ui/react';
import { IoEarth } from 'react-icons/io5';

import { useUserContext } from 'contexts/user';

import type { IPCProgram } from 'types/types';

type DownloadFileProps = {
	program: IPCProgram;
};

const GoToWebsiteProgram = ({ program }: DownloadFileProps): JSX.Element => {
	const isDrawer = useBreakpointValue({ base: true, sm: false }) || false;

	return (
		<HStack
			spacing={isDrawer ? '24px' : '12px'}
			p="8px 12px"
			borderRadius="8px"
			role="group"
			onClick={() => window.open(`https://aleph.sh/vm/${program.hash}`)}
			w="100%"
			cursor="pointer"
			id="ipc-dashboard-download-button"
			_hover={{
				bg: 'blue.100',
			}}
		>
			<Icon
				as={IoEarth}
				_groupHover={{ color: 'red.800' }}
				w={isDrawer ? '24px' : '20px'}
				h={isDrawer ? '24px' : '20px'}
			/>
			<Text
				fontSize="16px"
				fontWeight="400"
				_groupHover={{
					color: 'red.800',
					fontWeight: '500',
				}}
			>
				Go to website
			</Text>
		</HStack>
	);
};

export default GoToWebsiteProgram;
