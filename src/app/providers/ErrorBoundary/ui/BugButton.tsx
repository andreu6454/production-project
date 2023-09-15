import {Button, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {useEffect, useState} from "react";


// Компонент для тестирования
export const BugButton = () => {
    const [error, setError] = useState(false)

    const throwError = () => setError(true)

    useEffect(() => {
        if (error) {
            throw new Error
        }
    }, [error])


    return (
        <Button theme={ButtonTheme.BACKGROUND_INVERTED} onClick={throwError}>
            throw error
        </Button>
    );
};
