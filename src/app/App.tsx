import {Suspense, useEffect} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppRouter} from "@/app/providers/router";
import {Navbar} from "@/widgets/Navbar";
import {Sidebar} from "@/widgets/Sidebar";
import {useSelector} from "react-redux";
import {getUserInited, initAuthData} from "@/entities/User";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {PageLoader} from "@/widgets/PageLoader/PageLoader";
import {VStack} from "@/shared/ui/deprecated/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {MainLayout} from "@/shared/layouts/MainLayout";


const App = () => {
    const {theme} = useTheme()
    const inited = useSelector(getUserInited)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch]);

    if (!inited) {
        return (
            <VStack max justify={"center"} align={"center"}>
                <PageLoader/>
            </VStack>
        )
    }

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <div className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback={""}>
                        <MainLayout
                            sidebar={<Sidebar/>}
                            content={<AppRouter/>}

                            header={<Navbar/>}
                            toolbar={<div>123123</div>}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div className={classNames('app', {}, [theme])}>
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