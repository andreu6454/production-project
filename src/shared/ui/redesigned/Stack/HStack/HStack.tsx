import {Flex, FlexProps} from "@/shared/ui/redesigned/Stack/Flex/Flex";


type HStackProps = Omit<FlexProps, 'direction'>


export const HStack = (props: HStackProps) => {

    return (
        <Flex direction={"row"} {...props}>
            {props.children}
        </Flex>
    );
};
