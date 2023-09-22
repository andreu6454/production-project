import {Suspense, useEffect} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppRouter} from "./providers/router";
import {Navbar} from "@/widgets/Navbar";
import {Sidebar} from "@/widgets/Sidebar";
import {useSelector} from "react-redux";
import {getUserInited, initAuthData} from "@/entities/User";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {PageLoader} from "@/widgets/PageLoader/PageLoader";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AppLoaderLayout} from "@/shared/layouts/AppLoaderLayout";
import {useAppToolbar} from "./lib/useAppToolbar";


const App = () => {
    const {theme} = useTheme()
    const inited = useSelector(getUserInited)
    const toolbar = useAppToolbar()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData())
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <div id={'app'} className={classNames('app_redesigned', {}, [theme])}>
                        <AppLoaderLayout/>
                    </div>
                }
                off={
                    <VStack max justify={"center"} align={"center"}>
                        <PageLoader/>
                    </VStack>
                }
            />
        )
    }

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <div id={'app'} className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback={""}>
                        <MainLayout
                            sidebar={<Sidebar/>}
                            content={<AppRouter/>}
                            header={<Navbar/>}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div id={'app'} className={classNames('app', {}, [theme])}>
                    <Suspense fallback={""}>
                        <Navbar/>
                        <div className={"content-page"}>
                            <Sidebar/>
                            <AppRouter/>
                        </div>
                    </Suspense>
                </div>
            }
        />
    )
};

export default App;