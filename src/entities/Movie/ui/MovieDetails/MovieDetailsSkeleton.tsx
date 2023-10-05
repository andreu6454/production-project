import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";


export const MovieDetailsSkeleton = () => {
    return (
        <StickyContentLayout
            left={
                <Skeleton width={302} height={453}/>
            }
            content={
                <VStack justify={'start'} align={'start'} gap={'8'}>
                    <Skeleton width={320} height={40} border={'12px'}/>
                    <Skeleton width={120} height={20} border={'12px'}/>
                    <Skeleton width={120} height={40} border={'12px'}/>
                    <VStack gap={'32'} max>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                        <HStack gap={'32'}>
                            <Skeleton width={120} height={20} border={'12px'}/>
                            <Skeleton width={240} height={20} border={'12px'}/>
                        </HStack>
                    </VStack>
                </VStack>
            }
            right={
                <VStack gap={'8'}>
                    <Skeleton width={60} height={40} border={'12px'}/>
                    <Skeleton width={60} height={20} border={'12px'}/>
                </VStack>
            }
        />
    );
};
