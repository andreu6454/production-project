import {render, screen} from "@testing-library/react"
import {Button, ThemeButton} from "shared/ui/Button/Button";

describe('Button tests', () => {
    test('Test render', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    })
    test('Test clear theme',()=>{
        render(<Button theme={ThemeButton.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
        screen.debug();
    })
})