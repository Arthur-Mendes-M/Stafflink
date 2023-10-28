import { allUtils } from "../../../patternScripts/main.js";
import { employeesTableControl } from "./table/index.js";

allUtils.access();

allUtils.sideMenu();
allUtils.notes();
allUtils.handlePageByCustomLink(document.querySelector(".option.newEmployee"));

employeesTableControl();

fetch("https://employees-api-oite.onrender.com/employees", {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    list(json);
  });

function list(json) {
  for (let i = 0; i < json.length; i++) {
    let employeeCode = json[i].id;
    let employeeName = json[i].name;
    let employeeRole = json[i].office;
    let employeeEmail = json[i].email;
    let employeePis = json[i].pis;
    let employeeHired = json[i].hiring;
    let employeeJourneyStart = json[i].journeyinit;
    let employeeJourneyEnd = json[i].journeyend;

    let trInfos = document.createElement("tr");

    let tdEmployeeCode = document.createElement("td");
    let divEmployeeCode = document.createElement("div");
    divEmployeeCode.className = "employeeCode";

    let spanEmployeePhoto = document.createElement("span");
    spanEmployeePhoto.className = "employeePhoto";
    let imgEmployeePhoto = document.createElement("img");
    imgEmployeePhoto.src = "https://source.unsplash.com/random/dog";
    imgEmployeePhoto.alt = "funcionário";
    spanEmployeePhoto.appendChild(imgEmployeePhoto);

    let spanEmployeeNumber = document.createElement("span");
    spanEmployeeNumber.innerText = employeeCode;

    divEmployeeCode.appendChild(spanEmployeePhoto);
    divEmployeeCode.appendChild(spanEmployeeNumber);

    tdEmployeeCode.appendChild(divEmployeeCode);

    let tdEmployeeName = document.createElement("td");
    tdEmployeeName.innerText = employeeName;

    let spanEmployeeRole = document.createElement("span");
    spanEmployeeRole.innerText = employeeRole;
    spanEmployeeRole.classList.add("office");

    tdEmployeeName.appendChild(spanEmployeeRole);
    tdEmployeeName.classList.add("employee");

    let tdEmployeeEmail = document.createElement("td");
    tdEmployeeEmail.innerText = employeeEmail;

    let tdEmployeePis = document.createElement("td");
    tdEmployeePis.innerText = employeePis;

    let tdEmployeeHired = document.createElement("td");
    tdEmployeeHired.innerText = employeeHired;

    let tdEmployeeJourney = document.createElement("td");
    tdEmployeeJourney.innerText = `${employeeJourneyStart} - ${employeeJourneyEnd}`;

    let tdViewMore = document.createElement("td");
    tdViewMore.classList.add("actions");
    let buttonViewMore = document.createElement("button");
    buttonViewMore.type = "button";
    buttonViewMore.className = "viewMore";

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");

    // Adicionar os caminhos do SVG
    const paths = [
      ["M9.65625 1.93127L13.5188 1.93127V5.79377"],
      ["M5.79377 13.5188H1.93127L1.93127 9.65625"],
      ["M13.5188 1.93127L9.01251 6.43752"],
      ["M1.93127 13.5188L6.43752 9.01251"],
    ];

    paths.forEach((pathData) => {
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData[0]);
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.appendChild(path);
    });

    // Anexar o SVG ao botão e o botão à célula
    buttonViewMore.appendChild(svg);
    tdViewMore.appendChild(buttonViewMore);

    let elementsToAdd = [
      tdEmployeeCode,
      tdEmployeeName,
      tdEmployeeEmail,
      tdEmployeePis,
      tdEmployeeHired,
      tdEmployeeJourney,
      tdViewMore
    ];

    for (let i = 0; i < elementsToAdd.length; i++) {
      trInfos.appendChild(elementsToAdd[i]);
    }

    document.getElementById("tbody").appendChild(trInfos);
  }
}
