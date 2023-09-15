import {Flex, FlexProps} from "../Flex/Flex";

type VStackProps = Omit<FlexProps, 'direction'>

/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const VStack = (props: VStackProps) => {

    return (
        <Flex direction={'column'} {...props}>
            {props.children}
        </Flex>
    );
};
