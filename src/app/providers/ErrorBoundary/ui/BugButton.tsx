import {Button} from "shared/ui/Button/Button";
import {useEffect, useState} from "react";


// Компонент для тестирования
export const BugButton = () => {
    const [error, setError] = useState(false)

    const throwError = () => setError(true)

    useEffect(() => {
        if (error === true) {
            throw new Error
        }
    }, [error])


    return (
        <Button onClick={throwError}>
            throw error
        </Button>
    );
};
