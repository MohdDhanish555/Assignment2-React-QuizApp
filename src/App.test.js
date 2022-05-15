import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App, { AppContext } from "./App";
import CheckboxOptions from "./components/CheckBoxOptions";
import QuestionCard from "./components/QuestionCard";
import RadioOptions from "./components/RadioOptions";
import ResultsCard from "./components/ResultsCard";
import RightBar from "./components/RightBar";
import Home from "./pages/Home";
import Results from "./pages/Results";

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
    render(
      <BrowserRouter>
        <RightBar currentQuestion={5} setCurrentQuestion={setCurrentQuestion} />
      </BrowserRouter>
    );
  });
});

const setAnswer = jest.fn();
const answer = {
  [1]: {
    data: ["Computer,false", "Mouse,true"],
    type: "checkbox",
    is_ans: true,
  },
  [2]: {
    data: ["Computer,false", "Mouse,true"],
    type: "checkbox",
    is_ans: false,
  },
  [3]: {
    data: "data",
    type: "radio",
    is_ans: true,
  },
  [4]: {
    data: "data",
    type: "radio",
    is_ans: false,
  },
  [5]: {
    data: "tech",
    type: "textInput",
    is_ans: true,
  },
  [6]: {
    data: "tech",
    type: "textInput",
    is_ans: false,
  },
  [7]: {
    data: "tech",
    type: "undefined",
    is_ans: false,
  },
  [8]: {
    data: "tech",
    type: "undefined",
    is_ans: true,
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
