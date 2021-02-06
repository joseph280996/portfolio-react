---
anchor: "Portfolio"
header: "Portfolio"
subheader: "Projects and researches that I worked and am working on."
portfolios: [
  {
    imageFileName: "portfolio/01-thumbnail.jpg",
    imageFileNameDetail: "portfolio/01-full.jpg",
    header: "Pulse Monitoring",
    subheader: "Remote Monitoring and Diagnosis",
    description: "In Traditional Chinese Medicine (TCM), the diagnosis relies on a comprehensive analysis of clinical syndromes by using four methods: inspection, auscultation and olfaction, interrogation and palpation. Pulse examination is one of two practices used in palpation. The doctors normally put three fingers on top of the patient’s wrist and determine the type of pulse with different pressing level. Each finger position is related to a specific organ. With each press and a reflection from the pulse, the doctors gain knowledge of their patient’s organ condition, which normally is combined with multiple factors, such as diet, urine color, skin color, etc. and can finalize their diagnosis. In this research, we argue that it is possible to shorten the gap to support TCM doctors to diagnose patients in distance. In this paper, we propose a new interactive design that uses existing components to demonstrate the possibility for pulse measurement. The design uses a customized circuit layout, a piezoelectric pressure sensor, Arduino Uno, Bluetooth Low Energy (BTLE) breakout and Android application. Our findings, conclusion and future work are discussed at the end of this paper.",
    extraInfo: {
      startDate: "October 2018", 
      status: "Ongoing", 
      publications: ["Lightning talk at MIT URTC 2019", "Paper submission at MIT URTC 2020"],
    },
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
    imageFileName: "portfolio/02-thumbnail.jpg",
    imageFileNameDetail: "portfolio/02-full.jpg",
    header: "Smart Home",
    subheader: "Remote Monitoring and Control of In-house Climate",
    description: "Climate control in housing units is important for the protection and comfort of the inhabitants, as well as pets, plants, goods, and plumbing infrastructure. The regional climate zone, season and weather pattern affect the challenge and cost of controlling indoor climate. During the winter, a heating system is necessary to protect the inhabitants from frigid temperatures. The systems in many residences seem to be designed for energy-saving rather than efficiency. This may lead to an uneven distribution of heat which results in some places within a residence having different temperatures from one another. This discomfort in certain locations may lead people to attempt a direct intervention, such as to use a portable heater or open the window. These direct interventions may degrade the energy efficiency, safety or control for the whole residence. Moreover, many heating and cooling systems tend to dehumidify the air, possibly lower than the comfort level. Inputs for an improved system may include temperature and humidity in multiple locations both within and external to the residence, as well as the level of radiation from the sun. Actuators for an improved system may include heating and cooling control for multiple locations, control of vents and fans, and control of window light opacity. The objective of this project is to propose a system that improve the indoor climate while maintaining safety and energy efficiency at a low cost. By using multiple sensors, actuators, and networking with the internet of things (IoT), the system may be improved. Toward the goal for this project, a prototype for a residence will be developed with multiple sensor inputs and actuator controls. The indoor climate will be monitored for alternative methods.",
    extraInfo: {startDate: "January 2020", status: "Completed"},
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
    imageFileName: "portfolio/03-thumbnail.jpg",
    imageFileNameDetail: "portfolio/03-full.jpg",
    header: "GetBoxful",
    subheader: "Driver's additional earning platform",
    description: GetBoxful is a service for Uber or Lyft driver to earn an extra income. As Uber and Lyft are having more and more driver register each day, the amount of income is becoming less and less. As a result, we tried to provide a service that can allow drivers to sell items that they see fit with the need of their daily riders. The service will provide a box for driver upon purchase to store items for sale and must be registered to a web application before they can market it to the riders.",
    extraInfo: {startDate: "January 2020", status: "Stopped"},
  }
]
---
