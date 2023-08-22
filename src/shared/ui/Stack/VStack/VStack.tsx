import React from 'react';
import {Flex, FlexProps} from "@/shared/ui/Stack/Flex/Flex";

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {

    return (
        <Flex direction={'column'} {...props}>
            {props.children}
        </Flex>
    );
};
