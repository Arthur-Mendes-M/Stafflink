import { stafflinkURL_employeePhoto } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();
allUtils.sideMenu();
allUtils.notes();

fetch("https://employees-api-oite.onrender.com/attendance", {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((attendances) => {
    createCompleteAttendanceObject(attendances).then((attendanceList) => {
      listAttendance(attendanceList)
    });
  });

function listAttendance(attendanceList) {
  document.getElementById("tbody").innerHTML = ""

  for (let i = 0; i < attendanceList.length; i++) {
    let employeePhoto = attendanceList[i].employeePhotoName;
    let empName = attendanceList[i].employeeName;
    let empSector = attendanceList[i].employeeSector;
    let empJourney = attendanceList[i].employeeJourneyInit + " - " + attendanceList[i].employeeJourneyEnd;
    let registerDate = attendanceList[i].attendancedate;
    registerDate = registerDate.split("-").reverse().join("/")
    let empEntrance = attendanceList[i].entrance;
    let empExit = attendanceList[i].departure;

    let trInfos = document.createElement("tr");

    let tdUser = document.createElement("td");

    let divUserInfos = document.createElement("div");
    divUserInfos.className = "employeeCode";

    let spanEmployeePhoto = document.createElement("span");
    spanEmployeePhoto.className = "employeePhoto";
    let imgEmployeePhoto = document.createElement("img");
    imgEmployeePhoto.src = stafflinkURL_employeePhoto + employeePhoto;
    imgEmployeePhoto.alt = "funcionário";
    spanEmployeePhoto.appendChild(imgEmployeePhoto);

    divUserInfos.append(spanEmployeePhoto, empName);

    tdUser.appendChild(divUserInfos);

    let tdSector = document.createElement("td");
    tdSector.innerText = empSector;

    let tdJourney = document.createElement("td");
    tdJourney.innerText = empJourney;

    let tdDate = document.createElement("td");
    tdDate.innerText = registerDate;

    let tdEntrance = document.createElement("td");
    tdEntrance.innerText = empEntrance;

    let tdExit = document.createElement("td");
    tdExit.innerText = empExit;

    let elementsToAdd = [
      tdUser,
      tdSector,
      tdJourney,
      tdDate,
      tdEntrance,
      tdExit,
    ];

    for (let i = 0; i < elementsToAdd.length; i++) {
      trInfos.appendChild(elementsToAdd[i]);
    }

    document.getElementById("tbody").appendChild(trInfos);
  }
}

async function createCompleteAttendanceObject(attendances) {
  let attendanceList = [];

  for (let i = 0; i < attendances.length; i++) {
    await fetch(
      `https://employees-api-oite.onrender.com/employees/${attendances[i].employeeidattendance}`
    )
      .then((data) => {
        return data.json();
      })
      .then((employee) => {
        let employeePhotoName = employee[0].employeephotoname;
        let employeeName = employee[0].name;
        let employeeSector = employee[0].sector;
        let employeeJourneyInit = employee[0].journeyinit;
        let employeeJourneyEnd = employee[0].journeyend;

        attendanceList.push({
          ...attendances[i],
          employeePhotoName,
          employeeName,
          employeeSector,
          employeeJourneyInit,
          employeeJourneyEnd,
          overrun: "00:00",
        });
      })
      .catch((error) => {
        console.log("Erro no then dos employees");
        console.log(error.message);
      });
  }

  return attendanceList;
}
