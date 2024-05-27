import React from "react";
import InputField from "./components/InputField";
import Result from "./components/Result";
function App() {
  const [date, setDate] = React.useState({ days: "", months: "", years: "" });
  const [notValid, setNotValid] = React.useState(null);
  const [age, setAge] = React.useState({ days: 0, months: 0, years: 0 });
  const dayRef = React.useRef(null);
  const monthRef = React.useRef(null);
  const yearRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    function handleEnter(e) {
      if (e.key === "Enter") {
        if (e.target.name === "days") monthRef.current.focus();
        else if (e.target.name === "months") yearRef.current.focus();
      }
    }
    dayRef.current.addEventListener("keydown", handleEnter);
    monthRef.current.addEventListener("keydown", handleEnter);
    yearRef.current.addEventListener("keydown", handleEnter);
  }, [notValid]);
  // Function to handle the changes in each field
  function handleChange(e) {
    const { name, value } = e.target;
    setDate((prevDate) => {
      return { ...prevDate, [name]: value };
    });
  }
  // Function to convert numbers from arabic to english
  function convertArabicToEnglish(input) {
    const numbers = {
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    };
    return input
      .split("")
      .map((num) => numbers[num] || num)
      .join("");
  }
  // Function to clear inputs each time
  function clearInputs(e){
    e.target.select();
  }
  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (date.days === "" || date.months === "" || date.years === "") return;
    date.days = convertArabicToEnglish(date.days);
    date.months = convertArabicToEnglish(date.months);
    date.years = convertArabicToEnglish(date.years);

    let shortMonths = [4, 6, 9, 11];
    let today = new Date();
    let birthDay = parseInt(date.days);
    let birthMonth = parseInt(date.months);
    let birthYear = parseInt(date.years);
    let days, years, months;
    if (
      !date.days ||
      !date.months ||
      !date.years ||
      date.days < 1 ||
      date.days > 31 ||
      date.months < 1 ||
      date.months > 12 ||
      date.years < 1900 ||
      date.years > new Date().getFullYear() ||
      isNaN(birthDay) ||
      isNaN(birthMonth) ||
      isNaN(birthYear) ||
      date.days != birthDay ||
      date.months != birthMonth ||
      date.years != birthYear ||
      (birthYear % 4 !== 0 && birthMonth === 2 && birthDay >= 29) ||
      (birthYear % 4 === 0 && birthMonth === 2 && birthDay > 29) ||
      (birthDay > 30 && shortMonths.includes(birthMonth))
    ) {
      setNotValid(true);
    } else {
      setNotValid(false);
    }
    let birthday = new Date(date.years, date.months - 1, date.days);
    years = today.getFullYear() - birthday.getFullYear();
    months = today.getMonth() - birthday.getMonth();
    days = today.getDate() - birthday.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
      months += 12;
      years--;
    }
    if (days < 0) {
      let lastDayPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).getDate();
      days = lastDayPreviousMonth - birthday.getDate() + today.getDate();
      months--;
    }
    setAge({ days, months, years });
    // if(scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(()=>{scrollRef.current.scrollIntoView({behavior: "smooth"})},0);
  }

  return (
    <div className="part-1 bg-background h-screen flex flex-col items-center justify-center gap-7 ">
      <div className="relative">
        <h1 className="text-[2rem] font-bold">AGE CALCULATOR </h1>
        <p className="line"></p>
      </div>
      <form className="flex flex-col gap-8">
        <div className="small flex gap-4">
          <InputField
            name={"days"}
            value={date.days}
            handleChange={handleChange}
            maxLength="2"
            placeholder={"01"}
            inputRef={dayRef}
            onFocus ={clearInputs}
          />
          <InputField
            name={"months"}
            value={date.months}
            handleChange={handleChange}
            maxLength="2"
            placeholder={"01"}
            inputRef={monthRef}
            onFocus ={clearInputs}
          />
          <InputField
            name={"years"}
            value={date.years}
            handleChange={handleChange}
            maxLength="4"
            placeholder={"1900"}
            inputRef={yearRef}
            onFocus ={(e)=>clearInputs(e)}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="calculate bg-green rounded-xl text-black font-bold tracking-wider uppercase text-[2rem] w-[60%] m-auto py-1"
        >
          Calculate
        </button>
      </form>
      {notValid ? (
        <h2 className="text-red text-[1.5rem] mb-4" ref={scrollRef}>Invalid Inputs </h2>
      ) : (
        <>
          {notValid === false ? (
            <div className="parent-result flex flex-col gap-5">
              <div className="flex flex-col items-center">
                <p
                  className=" uppercase text-[1.5rem] font-bold tracking-wider "
                  ref={scrollRef}
                >
                  Results
                </p>
                <p className="bg-gray h-[0.01rem] w-1/2 "></p>
              </div>
              <div className="result  flex justify-between items-center gap-7 ">
                <Result text={"DAYS"} data={age.days} />
                <Result text={"MONTHS"} data={age.months} />
                <Result text={"YEARS"} data={age.years} />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default App;
