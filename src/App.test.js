import { fireEvent,getByTestId ,  render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App, { AppContext } from "./App";
import CheckboxOptions from "./components/CheckBoxOptions";
import QuestionCard from "./components/QuestionCard";
import RadioOptions from "./components/RadioOptions";
import ResultsCard from "./components/ResultsCard";
import RightBar from "./components/RightBar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { StyledTextField } from "./pages/Home";
import Questions from "./pages/Questions";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const handleChange = jest.fn();
const setCurrentQuestion = jest.fn();
const checkBoxOptionsTest = [
  {
    isCorrect: true,
    option: "answer",
    value: true,
  },
  {
    isCorrect: true,
    option: "answer",
    value: false,
  },
  {
    isCorrect: false,
    option: "answer",
    value: true,
  },
  {
    isCorrect: false,
    option: "answer",
    value: false,
  },
];

const radioBoxOptionsTest = [
  { option: "Every 30 days", isCorrect: true },
  { option: "Every 10 days", isCorrect: false },
  { option: "Every 11 days", isCorrect: false },
  { option: "Every 9 days", isCorrect: false },
];

describe("SNAPSHOT testing", () => {
  test("", () => {
    const { AppComponent } = render(<App />);
    expect(AppComponent).toMatchSnapshot();
  });
});

describe("Rendering All Components", () => {
  test("APP Rendering...", () => {
    render(<App />);
  });

  test("HOME Rendering...", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test("QUESTIONS Rendering...", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <Questions />
      </BrowserRouter>,
      { wrapper }
    );
        // const PrevBtn = screen.getByTestId("next-btn");
        // fireEvent.click(PrevBtn);
  });

  test("RESULTS Rendering...", () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );
  });

  test("CHECKBOX OPTIONS Rendering...", () => {
    render(
      <CheckboxOptions
        handleChange={handleChange}
        options={checkBoxOptionsTest}
      />
    );
  });

  test("RADIO OPTIONS Rendering...", () => {
    render(
      <RadioOptions
        handleChange={handleChange}
        options={radioBoxOptionsTest}
        value="Every 30 days"
      />
    );
  });

  test("RIGHTBAR Rendering...", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <RightBar currentQuestion={5} setCurrentQuestion={setCurrentQuestion} />
      </BrowserRouter>,
      { wrapper }
    );
  });
});

const setAnswer = jest.fn();
const answer = {
  [1]: {
    data: ["Computer,false", "Mouse,true"],
    type: "checkbox",
    isAnswered: true,
  },
  [2]: {
    data: ["Computer,false", "Mouse,true"],
    type: "checkbox",
    isAnswered: false,
  },
  [3]: {
    data: "data",
    type: "radio",
    isAnswered: true,
  },
  [4]: {
    data: "data",
    type: "radio",
    isAnswered: false,
  },
  [5]: {
    data: "tech",
    type: "textInput",
    isAnswered: true,
  },
  [6]: {
    data: "tech",
    type: "textInput",
    isAnswered: false,
  },
  [7]: {
    data: "tech",
    type: "undefined",
    isAnswered: false,
  },
  [8]: {
    data: "tech",
    type: "undefined",
    isAnswered: true,
  },
};

describe("Rendering Question Card Component", () => {
  test("CHECKBOX", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question="test"
        questionType="checkbox"
        answers={[
          { option: "option1", isCorrect: true },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
  });

  test("RADIO", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question="test"
        questionType="radio"
        answers={[
          { option: "option1", isCorrect: false },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
  });

  test("TEXTINPUT", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question="test"
        questionType="textInput"
        answers={[{ option: "option", isCorrect: true }]}
      />,
      { wrapper }
    );
  });

  test("DEFAULT", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question="test"
        questionType="undefined"
        answers={[{ option: "option", isCorrect: true }]}
      />,
      { wrapper }
    );
  });
});

describe("Rendering Result Card Component", () => {
  test("CHECKBOX", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContext.Provider>
    );
    render(
      <ResultsCard
        id={5}
        question="test"
        questionType="checkbox"
        answers={[
          { option: "option1", isCorrect: true },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
  });

  test("RADIO", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContext.Provider>
    );
    render(
      <ResultsCard
        id={5}
        question="test"
        questionType="radio"
        answers={[
          { option: "option1", isCorrect: false },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
  });

  test("TEXTINPUT", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContext.Provider>
    );
    render(
      <ResultsCard
        id={5}
        question="test"
        questionType="textInput"
        answers={[{ option: "option", isCorrect: true }]}
      />,
      { wrapper }
    );
  });

  test("DEFAULT", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContext.Provider>
    );
    render(
      <ResultsCard
        id={5}
        question="test"
        questionType="undefined"
        answers={[{ option: "option", isCorrect: true }]}
      />,
      { wrapper }
    );
  });
});

// HANDLING ON CHANGE

const setName = jest.fn();

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6c300",
    },
    secondary: {
      main: "#cc0066",
    },
    tertiary: {
      main: "#00e6e6",
    },
    text: {
      primary: "#fff",
      disabled: "#fff",
    },
    action: {
      disabled: "#e6c300",
    },
  },
});

describe("Checking ONCHANGE", () => {
  test("RADIO OPTIONS", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question={"data"}
        questionType={"radio"}
        answers={[
          { option: "option1", isCorrect: false },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
    const radioBox = screen.getByDisplayValue("option1");
    fireEvent.click(radioBox, { target: { value: "option2" } });
    expect(setAnswer).toHaveBeenCalledTimes(1);
  });

  test("TEXTINPUT FIELD IN ANSWERS", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={11}
        question={"data"}
        questionType={"textInput"}
        answers={[{ option: "option1", isCorrect: true }]}
      />,
      { wrapper }
    );
    const inputBox = screen.getByDisplayValue("");
    fireEvent.change(inputBox, { target: { value: "option1" } });
    expect(setAnswer).toHaveBeenCalledTimes(1);
  });

  test("CHECKBOX OPTIONS", () => {
    const wrapper = ({ children }) => (
      <AppContext.Provider value={[answer, setAnswer]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <QuestionCard
        id={5}
        question={"data"}
        questionType={"checkbox"}
        answers={[
          { option: "option1", isCorrect: false },
          { option: "option2", isCorrect: true },
          { option: "option3", isCorrect: false },
          { option: "option4", isCorrect: false },
        ]}
      />,
      { wrapper }
    );
    const checkBox = screen.getByLabelText("option1");
    fireEvent.click(checkBox, { target: { name: "option2" } });
    expect(setAnswer).toHaveBeenCalledTimes(1);
  });

  test("INPUT FIELD OF NAME", () => {
    const wrapper = ({ children }) => (
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    );
    render(<Home />, { wrapper });
    const inputBox = screen.getByLabelText("Enter Your Name *");
    fireEvent.change(inputBox, { target: { value: "DANI" } });
  });
});
