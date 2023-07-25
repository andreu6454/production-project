import {fireEvent, screen} from "@testing-library/react";
import Sidebar from "./Sidebar"
import {renderWithTranslations} from "shared/lib/tests/renderWithTranslations/renderWithTranslations";

describe('Sidebar tests', () => {
    test('Test render', () => {
        renderWithTranslations(<Sidebar/>);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    })
    test('Test toggle', () => {
        renderWithTranslations(<Sidebar/>);
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})