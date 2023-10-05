import {Card} from "@/shared/ui/redesigned/Card";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";


export const MovieListItemSkeleton = () => {
    return (
        <Card padding={'24'} border={'partial'} max>
            <HStack justify={'between'} align={'start'} max>
                <HStack gap={'32'}>
                    <Skeleton width={15} height={30} border={'12px'}/>
                    <Skeleton width={72} height={108}/>
                    <VStack gap={'8'}>
                        <Skeleton height={32} width={200} border={'12px'}/>
                        <Skeleton height={24} width={180} border={'12px'}/>
                        <Skeleton height={20} width={300} border={'12px'}/>
                        <Skeleton height={20} width={400} border={'12px'}/>
                    </VStack>
                </HStack>
                <VStack gap={'8'} align={'center'}>
                    <Skeleton width={45} height={45} border={'12px'}/>
                    <Skeleton width={133} height={24} border={'12px'}/>
                </VStack>
            </HStack>
        </Card>
    );
};
