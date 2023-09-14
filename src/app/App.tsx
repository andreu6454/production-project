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
import {VStack} from "@/shared/ui/Stack";


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
        <div className={classNames('app', {}, [theme])}>

            <Suspense fallback={""}>
                <Navbar/>
                <div className={"content-page"}>
                    <Sidebar/>
                    {inited && <AppRouter/>}
                </div>
            </Suspense>

        </div>
    );
};

export default App;