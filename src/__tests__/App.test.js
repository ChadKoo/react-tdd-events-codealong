import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom';

//Test the initial state of the page



test("pizza checkbox is initially unchecked", () => {;
 render(<App/>)

 const addPepperoni = screen.getByRole("checkbox",{ name: /add pepperoni/i})

 expect(addPepperoni).not.toBeChecked()
 
});

test("toppings list initially includes only cheese", () =>{
    render(<App/>)

    expect(screen.getAllByRole("listitem").length).toBe(1);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument()
});

//Test the effect of clicking the checkbox



test("checkboxes appear checked when users click on them", () => {
    render(<App/>)

    const addPepperoni = screen.getByRole("checkbox", {name:/add pepperoni/i});

    userEvent.click(addPepperoni)
    expect(addPepperoni).toBeChecked();
})


test("toppings appear in toppings list when checked", () => {
    render(<App/>)

    const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i});

    userEvent.click(addPepperoni)

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();   
})

test("selected topping disappears when clicked on a second time", () =>{
    render(<App/>)

    const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i})

    userEvent.click(addPepperoni)

    expect(addPepperoni).toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();

    userEvent.click(addPepperoni)

    expect(addPepperoni).not.toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
} )




