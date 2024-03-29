---
anchor: "Projects"
header: "Projects"
subheader: "Projects and researches that I worked and am working on."
projects: [
  {
    anchor: "pulse-monitoring-1",
    imageFileName: "projects/pulsemonitoring-p1-thumbnail.jpg",
    imageFileNameDetail: "projects/pulsemonitoring-p1.jpg",
    header: "Pulse Monitoring Part 1",
    subheader: "Remote Monitoring and Diagnosis",
    date: "October 2018",
    contentSections: [
      {
        sectionHeader: "Description",
        sectionText: "Together with professor Chen-Hsiang Yu at WIT, in this project, we tried to designed a device that capable of collecting and visualizing wrist pulse data to help traditional Chinese medicine (TCM) practitioners in diagnosing their patients. There have been three parts of the project, the first which focus on the ability to remotely diagnosing their patient, the second which is more of an optimization to the first and the last one is more data analysis focused."
      },
      {
        sectionHeader: "Background information",
        sectionText: "In Traditional Chinese Medicine, the diagnosing process consist of  use three fingers and put on the wrist of their patient, usually the index, the middle and the ring finger, "
      },
      {
        sectionHeader: "Design Details",
        sectionText: "For the first implementation of the project, we developed and designed a system that allows doctors to diagnose their patient remotely. The values from the sensor was gathers and publish to any BLE connected device using Arduino Uno R3. The patient, using their mobile device, can connect to the hardware system for data gathering , contact the doctors and let he/she control a 3D printed device for different level of pressure on a pulse location. On the doctor side, he/she will use a mobile device which connects to a remote web server through WebSocket to communicate with the patient along with receiving the pulse data from the sensor. After the process is done, doctors can save this information in the server's database and can get back to it at a later date and time. For more information, the link to the GitHub repositories was put at the end of the blog for further reference on the implementation details.",
      },
      {
        sectionHeader: "Result",
        sectionText: "By the end of the project, we were able to develop said device and publish our work to IEEE MIT URTC 2020 with the pitch of our ideas with the Lightning talk at IEEE MIT URTC 2019."
      }
    ],
    links: [
      {
        name: "Android Application",
        description: "The Android API 29 implementation of the system's UI",
        url: "https://github.com/joseph280996/Pulse-Monitoring"
      }, 
      {
        name: "Server Application",
        description: "The Node.js, Express.js, MongoDB implementation of the system",
        url: "https://github.com/joseph280996/Pulse-Monitoring-Server"
      }
    ] 
  },
  {
    anchor: "pulse-monitoring-2",
    imageFileName: "projects/pulsemonitoring-p2-thumbnail.jpg",
    imageFileNameDetail: "projects/pulsemonitoring-p2.jpg",
    header: "Pulse Monitoring Part 2",
    subheader: "Pulse Diagnosis Device",
    date: "October 2018",
    contentSections: [
      {
        sectionHeader: "Description",
        sectionText: "Continue from the first part, we begin to optimized our system. As discussed in our paper for the first part, we discover that during BLE transmission, the system experience some data loss which is very crucial for doctors to diagnose their patient as well as reducing the reliability of the system. In this part, we're focusing more on improving the data gathering rate and transmission for better real-time visualization. "
      },
      {
        sectionHeader: "Design Details",
        sectionText: "We revised our system design and decided to replace the Arduino micro-controller with a Raspberry Pi mini computer for a more robust computational operation. Due to this replacement, we have to attached a Analog to Digital Converter (ADC) between our circuit and our mini-computer's GPIO pin, which previously handled by Arduino since it has the ADC embedded inside. We also simplified our software system design by removing all the remote diagnosis part, including the 3D printed finger and both application for doctor and patient, and move the frontend onto the Raspberry PI which is displayed using a LED screen. This helps enhancing the data transmission for better real-time user experience by reducing the time taken for data transmission."
      },
      {
        sectionHeader: "Result",
        sectionText: "By the end of the project, we were able to develop said device and publish our work to IEEE MIT URTC 2020 with the pitch of our ideas with the Lightning talk at IEEE MIT URTC 2019."
      }
    ],
    links: [
      {
        name: "Android Application",
        description: "The Android API 29 implementation of the system's UI",
        url: "https://github.com/joseph280996/Pulse-Monitoring"
      }, 
      {
        name: "Server Application",
        description: "The Node.js, Express.js, MongoDB implementation of the system",
        url: "https://github.com/joseph280996/Pulse-Monitoring-Server"
      }
    ] 
  },
  {
    anchor: "hvac",
    imageFileName: "projects/HVAC-improvement-thumbnail.jpg",
    imageFileNameDetail: "projects/HVAC-improvement.jpg",
    header: "Smart Home",
    subheader: "Remote Monitoring and Control of In-house Climate",
    contentSections: [
      {
        sectionHeader: "Description",
        sectionText: The goal of the project is to propose a novel HVAC system that capable of taking temperature data from multiple rooms and redirect the heat flow from one room to another for better efficiency in heat management. The system also taking the outdoor weather into consideration for when to turn on heater, open the window or turn on the AC.",
      }
    ],
    extraInfo: ["Start Date: January 2020", "Status: Completed"],
    links: [
      {
        name: "Web Application",
        description: "The ReactJS implementation using TypeScript of the system's UI",
        url: "https://github.com/joseph280996/smart-home-ui",
      }, 
      {
        name: "Server Application",
        description: "The Node.js, Express.js, MongoDB implementation of the system",
        url: "https://github.com/joseph280996/smart-home-server"
      },
      {
        name: "Raspberry Pi",
        description: "The Node.js application on Raspberry Pi",
        url: "https://github.com/joseph280996/smart-home-raspPi",
      }
    ]
  },
  {
    anchor: "keyboard",
    imageFileName: "projects/Dactyl-Manuform-Keyboard-thumbnail.png",
    imageFileNameDetail: "projects/Dactyl-Manuform-Keyboard.png",
    header: "Personal Keyboard",
    subheader: "3D printed Ergonomic Keyboard named Dactyl Manuform",
    contentSections: [
      {
        sectionHeader: "Parts",
      },
      {
        sectionHeader: "3D Print the parts",
      },
      {
        sectionHeader: "Panting the parts",
      },
      {
        sectionHeader: "Circuit matrix",
      },
      {
        sectionHeader: "Soldering",
      },
      {
        sectionHeader: "Switch Modding",
      },
      {
        sectionHeader: "Assembling",
      },
      {
        sectionHeader: "Final Product",
      },
      {
        sectionHeader: "Thoughts",
      }
    ],
    extraInfo: ["Start Date: January 2021", "Status: Completed"],
  },
]
---
