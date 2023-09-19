import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Page.module.scss'
import {memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef} from "react";
import {useInfiniteScroll} from "@/shared/lib/useInfiniteScroll/useInfiniteScroll";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getScrollRestorationByPath, scrollRestorationActions} from "@/widgets/Page/ScrollRestoration";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "@/app/providers/StoreProvider";
import {useThrottle} from "@/shared/lib/hooks/useThrottle/useThrottle";
import {TestsProps} from "@/shared/types/tests";
import {toggleFeatures} from "@/shared/lib/features";

interface PageProps extends TestsProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = "PAGE_ID"
export const Page = memo((props: PageProps) => {
    const {className, children, onScrollEnd} = props

    const wrapperRef = useRef() as MutableRefObject<HTMLElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollRestorationByPath(state, pathname)
    )

    useInfiniteScroll({
        triggerRef,
        wrapperRef : toggleFeatures({
            name: 'isAppRedesigned',
            on: () => null,
            off: ()=> wrapperRef
        }),
        callback: onScrollEnd
    })

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    }, []);

    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestorationActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 500)


    toggleFeatures({
        name: "isAppRedesigned",
        on: () => cls.PageRedesigned,
        off: () => cls.Page
    })

    return (
        <main
            onScroll={onScrollHandler}
            ref={wrapperRef}
            className={
                classNames(
                    toggleFeatures({
                        name: "isAppRedesigned",
                        on: () => cls.PageRedesigned,
                        off: () => cls.Page
                    }), {}, [className])
            }
            id={PAGE_ID}
            data-testid={props["data-testid"] ?? 'Page'}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
        </main>
    );
});
