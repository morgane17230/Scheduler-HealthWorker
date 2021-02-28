var dayjs = require("dayjs");
var locale = require("dayjs/locale/fr");
var weekday = require("dayjs/plugin/weekday");
var toObject = require("dayjs/plugin/toObject");
dayjs.extend(weekday);
dayjs.extend(toObject);

const app = {
  init: () => {
    year = dayjs().format("YYYY");
    app.getCurrentYear();
    app.getMonths();
    document
      .getElementById("prevYear")
      .addEventListener("click", app.getPrevYear);
    document
      .getElementById("prevMonth")
      .addEventListener("click", app.getPrevMonth);
    document
      .getElementById("nextYear")
      .addEventListener("click", app.getNextYear);
    document
      .getElementById("nextMonth")
      .addEventListener("click", app.getNextMonth);
  },

  getCurrentYear: () => {
    const currentYear = document.getElementById("current-year");
    currentYear.textContent = year;
    currentYear.setAttribute("year", year);
  },

  getMonths: () => {
    for (var i = 0; i < 12; i++) {
      const months = dayjs().month(i);
      app.monthsInDOM(months);
    }
  },

  monthsInDOM: (months) => {
    const template = document.getElementById("add-month");
    const clone = template.content.cloneNode(true);
    const parent = document.querySelector(".months");
    const monthContent = clone.querySelector(".month");
    monthContent.setAttribute("month", months.format("M"));
    monthContent.textContent = months.locale(locale).format("MMM");
    clone.querySelector(`.month`).addEventListener("click", app.getDays);
    document.getElementById("month").style.display = "none";
    document.querySelector(".week").style.display = "none";
    parent.appendChild(clone);
  },

  getDays: (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    let monthNum = target.getAttribute("month");
    const headerYear = document
      .getElementById("current-year")
      .getAttribute("year");
    headerDate = dayjs(headerYear)
      .month(monthNum - 1)
      .locale(locale)
      .format("YYYY-M");
    const header = document.querySelector("#current-year");
    header.setAttribute("month", monthNum);
    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },

  daysInDOM: (headerDate, i) => {
    const template = document.getElementById("add-day");
    const clone = template.content.cloneNode(true);
    const parent = document.querySelector(".week");
    const monthGrid = document.querySelector(".months");
    monthGrid.style.display = "none";
    parent.style.display = "flex";
    document.getElementById("year").style.display = "none";
    document.getElementById("month").style.display = "flex";
    document.getElementById("current-month").textContent = dayjs(
      `${headerDate}-${i}`
    )
      .locale(locale)
      .format("MMMM YYYY");
    clone
      .querySelector(".day-content")
      .setAttribute("day", dayjs(`${headerDate}-${i}`).format());
    clone.querySelector("#dateName").textContent = dayjs(`${headerDate}-${i}`)
      .locale(locale)
      .format("ddd DD");

    parent.appendChild(clone);
  },

  getPrevYear: (event) => {
    event.preventDefault();
    currentYear = document.getElementById("current-year").getAttribute("year");
    const prev = dayjs(`${currentYear}-01-01`)
      .subtract(1, "year")
      .format("YYYY");
    yearHeader = document.getElementById("current-year");
    yearHeader.setAttribute("year", prev);
    yearHeader.textContent = prev;
  },

  getPrevMonth: (event) => {
    event.preventDefault();

    currentYear = document.getElementById("current-year").getAttribute("year");
    currentMonth = document
      .querySelector("#current-year")
      .getAttribute("month");

    const prev = currentMonth - 1;
    monthHeader = document.getElementById("current-year");
    monthHeader.setAttribute("month", prev);

    const currentDate = document.getElementById("current-month");
    currentDate.setAttribute(
      "year",
      dayjs(currentYear).month(prev).locale(locale).format("YYYY")
    );
    currentDate.setAttribute(
      "month",
      dayjs(currentYear).month(prev).locale(locale).format("M")
    );

    document.getElementById("current-month").textContent = dayjs(currentYear)
      .month(prev)
      .locale(locale)
      .format("MMMM YYYY");

    headerDate = dayjs(currentYear).month(prev).locale(locale).format("YYYY-M");

    const oldDays = document.querySelectorAll(".day-content");
    for (const oldDay of oldDays) {
      oldDay.remove();
    }

    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },

  getNextYear: (event) => {
    event.preventDefault();
    currentYear = document.getElementById("current-year").getAttribute("year");
    const prev = dayjs(`${currentYear}-01-01`).add(1, "year").format("YYYY");
    yearHeader = document.getElementById("current-year");
    yearHeader.setAttribute("year", prev);
    yearHeader.textContent = prev;
  },

  getNextMonth: (event) => {
    event.preventDefault();

    currentYear = document.getElementById("current-year").getAttribute("year");
    currentMonth = document
      .querySelector("#current-year")
      .getAttribute("month");

    const next = Number(currentMonth) + 1;

    monthHeader = document.getElementById("current-year");
    monthHeader.setAttribute("month", next);

    const currentDate = document.getElementById("current-month");
    currentDate.setAttribute(
      "year",
      dayjs(currentYear).month(next).locale(locale).format("YYYY")
    );
    currentDate.setAttribute(
      "month",
      dayjs(currentYear).month(next).locale(locale).format("M")
    );

    document.getElementById("current-month").textContent = dayjs(currentYear)
      .month(next)
      .locale(locale)
      .format("MMMM YYYY");
 
    headerDate = dayjs(currentYear).month(next).locale(locale).format("YYYY-M");

    const oldDays = document.querySelectorAll(".day-content");
    for (const oldDay of oldDays) {
      oldDay.remove();
    }

    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
