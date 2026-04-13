# 🎯 SSE Interview Study Plan – Akash Sachdeva
**Interview Date:** Thursday, 16 April 2026 | 11:00 – 12:30 BST (MS Teams)  
**Interviewers:** Stephanie Smillie & Andrew Whyte  
**Format:** Competency-based questions + Role-specific technical questions  
**Time Available:** ~3 Days (13 Apr – 15 Apr 2026)

---

## 📊 Gap Analysis: Your Strengths vs. JD Requirements

| JD Requirement | Your Strength | Gap Level |
|---|---|---|
| IP/Ethernet data networks | ✅ 12+ years – BGP, OSPF, MPLS, IS-IS, EVPN | 🟢 None |
| Routing protocol design & deployment | ✅ Nokia, Ericsson, Cisco/Juniper hands-on | 🟢 None |
| Wireless technologies | ✅ LTE/5G backhaul, RAN Sharing, IPSec | 🟡 Minor – review microwave specifics |
| Fibre optic cabling | ✅ Fibre-based transport in Nokia role | 🟡 Minor – know connector types, loss budgets |
| SDH/PDH multiplexers | ⚠️ Not explicitly listed in CV | 🔴 Key Gap – needs focused study |
| Microwave radio | ⚠️ Related backhaul experience | 🔴 Key Gap – study point-to-point MW links |
| SCADA integration with data networks | ⚠️ Mentioned interest in cover letter | 🔴 Key Gap – biggest new area |
| Custom tool development | ✅ Python automation (30% effort reduction) | 🟢 None |
| OT / Critical Infrastructure context | ⚠️ Telecom background, new to energy OT | 🟡 Study SSE/energy sector context |
| Standards, specifications, architecture docs | ✅ MOPs, SOPs, network diagrams | 🟢 None |

---

## 📅 3-Day Study Schedule

### 🗓️ Day 1 – Monday 13 April: Core Technical Gaps (SDH + SCADA)

#### Morning (2–3 hrs): SDH / PDH Fundamentals
- [ ] What is SDH (Synchronous Digital Hierarchy) and how does it differ from PDH?
- [ ] Key SDH containers: VC-12, VC-3, VC-4 and their payloads
- [ ] STM-1, STM-4, STM-16, STM-64 frame rates and capacities
- [ ] SDH multiplexing hierarchy: tributaries → virtual containers → STM frames
- [ ] SDH network elements: ADM (Add/Drop Multiplexer), DCS (Digital Cross Connect), Regenerator
- [ ] SDH topologies: Point-to-Point, Ring (MS-SPRing, SNCP), Mesh
- [ ] SDH overhead bytes: RSOH (Regenerator Section), MSOH (Multiplex Section), POH (Path Overhead)
- [ ] Protection mechanisms: MSP (1+1, 1:N), SNCP path protection
- [ ] Difference between PDH (E1/E3/E4) and SDH – why SDH replaced PDH in most deployments
- [ ] How SDH connects to IP/MPLS networks (packet over SDH, ML-PPP)

**Key resource:** Search "SDH tutorial ITU-T G.707" and Cisco SDH overview docs

#### Afternoon (2–3 hrs): SCADA & OT Networks
- [ ] What is SCADA? (Supervisory Control and Data Acquisition)
- [ ] Key components: RTU (Remote Terminal Unit), MTU (Master Terminal Unit), HMI, Historian
- [ ] SCADA vs IT networks: air-gapped/semi-isolated, real-time control, low tolerance for latency/packet loss
- [ ] OT protocols: DNP3, IEC 60870-5-101/104, IEC 61850, Modbus
- [ ] How SCADA networks integrate with IP/WAN data networks in utilities
- [ ] SCADA security considerations: IEC 62443, NERC CIP, segmentation/firewalling
- [ ] Role of telecom infrastructure (SDH/microwave/fibre) in connecting RTUs back to control centre
- [ ] What is a Distribution Control Centre (DCC)? How does SSE use it?
- [ ] How SSE specifically uses SCADA for electricity distribution monitoring

**Key resource:** ENISA SCADA guide, IEC 60870 wiki, SSE annual report (skim)

---

### 🗓️ Day 2 – Tuesday 14 April: Microwave Radio + OT/Telecom Architecture

#### Morning (2–3 hrs): Microwave Radio
- [ ] Point-to-point microwave: frequency bands (2GHz–80GHz), rain fade, path planning
- [ ] Fresnel zone clearance and line-of-sight requirements
- [ ] Modulation schemes: QPSK, 16QAM, 64QAM, 256QAM – trade-off between throughput and resilience
- [ ] Adaptive modulation (ACM) – how it maintains link availability in rain
- [ ] Licensed vs. unlicensed spectrum; Ofcom licensing in UK
- [ ] Hot-standby (1+1) protection for microwave links
- [ ] E-band (70-80 GHz) for high-capacity short-haul links
- [ ] Microwave in utility/energy networks: why it's preferred over fibre in some cases (remote substations)
- [ ] Integration with SDH/Ethernet backhaul networks
- [ ] Common vendors: Ericsson MINI-LINK, Nokia (Alcatel-Lucent) 9500 MPR, Huawei OptiX RTN

#### Afternoon (2–3 hrs): OT Telecoms Architecture for Utilities
- [ ] Typical SSE-style distribution network architecture: substation → DCC communication path
- [ ] Protection telecom circuits (teleprotection): POTT, PUTT, differential protection via telecoms
- [ ] How fibre, SDH, microwave, and IP work together in a layered utility network
- [ ] Role of MPLS in utility WAN networks
- [ ] Network segmentation between OT and IT (DMZ, data diodes, firewalls)
- [ ] IEC 61850 GOOSE and Sampled Values over Ethernet – real-time substation comms
- [ ] Quality of Service (QoS) for critical SCADA/protection traffic over IP networks
- [ ] Key standards to mention: IEC 61968/61970 (Common Information Model), IEC 61850

---

### 🗓️ Day 3 – Wednesday 15 April: Competency Prep + Role Alignment + Final Review

#### Morning (2–3 hrs): Competency-Based Answers (STAR Format)

Prepare **3 strong STAR stories** for each competency below:

##### 1. Designing/Implementing Complex Technical Solutions
> *"Tell me about a time you designed or delivered a complex network solution."*
- **STAR:** Nokia role → designing and validating backhaul for 5G gNodeBs with Network Slicing + IPRAN
- Highlight: translated business requirement (5G go-live) into practical telecoms architecture

##### 2. Leading / Influencing Without Authority
> *"Describe a time you led a cross-functional technical initiative."*
- **STAR:** Nokia/Ericsson → leading protocol validation across geographically distributed teams
- Highlight: cross-team coordination, mentoring, technical documentation (MOPs/checklists)

##### 3. Problem Solving Under Pressure
> *"Tell me about a time things went wrong and how you handled it."*
- **STAR:** Root cause analysis on a production defect (choose a specific incident from Nokia/Ericsson)
- Highlight: structured RCA, systematic debugging, driving resolution to closure

##### 4. Adapting to New Technologies / Continuous Learning
> *"Tell me about a time you had to learn something new quickly."*
- **STAR:** Learning SRv6 / EVPN at Ericsson while actively testing → AI-assisted automation approach
- Highlight: proactive learning, applied knowledge to delivery

##### 5. Creating/Improving Processes and Standards
> *"Give an example of when you improved a process or created documentation standards."*
- **STAR:** Python automation reducing regression effort by 30%; Infoblox IPAM reducing OPEX by 30%
- Highlight: measurable impact, scalability, repeatability

##### 6. Stakeholder Communication
> *"Describe how you've communicated complex technical concepts to non-technical stakeholders."*
- **STAR:** Client-facing support at Ericsson/Nokia – demos, PoC presentations, technical briefings

#### Afternoon (2 hrs): Role Alignment + Final Preparation

##### Know Your "Why SSE" Story
- SSE is investing **£33bn in electricity infrastructure by 2030** → this is a growth area
- Their OT telecoms are safety-critical: monitoring and controlling plant and **safety systems**
- Your motivation: move from pure IP/telecom testing into design and architecture ownership; contribute to energy transition with critical infrastructure experience

##### Key Technical Questions to Prepare For
- [ ] "Walk me through how you would design a resilient WAN for connecting 50 remote substations to a DCC."
- [ ] "How would you integrate a SCADA system with an existing IP/MPLS network?"
- [ ] "What is SDH and when would you choose it over pure IP/Ethernet transport?"
- [ ] "How would you ensure QoS for real-time protection traffic over a shared IP network?"
- [ ] "What experience do you have with Ethernet/IP-based OT environments?"
- [ ] "How have you approached creating technical standards or architecture documents?"
- [ ] "Describe a tool you built – what problem did it solve and how?"

##### Your Key Differentiation Points
1. **12+ years multi-vendor** (Nokia, Ericsson, Cisco, Juniper) – rare breadth
2. **Python automation** – quantified impact (30% effort reduction) → directly maps to "creating custom tools" in JD
3. **End-to-end network lifecycle** – design, testing, deployment, operations, documentation
4. **Quick learner** – EVPN, SRv6, AI-assisted automation all adopted proactively
5. **SME-level routing depth** – BGP, OSPF, MPLS, IS-IS → directly maps to "strong knowledge and experience in data networks"

##### Questions to Ask the Interviewers
- "What does a typical day look like for the SSE - distributed or embedded at a specific DCC?"
- "What is the current technology mix – what proportion is SDH vs. packet-based transport?"
- "What are the most urgent technical challenges facing the OT telecoms team right now?"
- "How does the team approach standards and architecture documentation – are there existing frameworks?"
- "What does career progression look like within the OT Telecoms group?"

---

## 🔑 Top Concepts Cheatsheet (Quick Reference)

### SDH Quick Reference
| Term | Meaning |
|---|---|
| STM-1 | 155 Mbit/s basic SDH frame |
| STM-4 | 622 Mbit/s (4× STM-1) |
| STM-16 | 2.5 Gbit/s |
| VC-4 | 140 Mbit/s payload container |
| ADM | Add/Drop Multiplexer – key SDH network element |
| MS-SPRing | Multiplex Section Shared Protection Ring |
| SNCP | Subnetwork Connection Protection (1+1 path protection) |

### SCADA / OT Quick Reference
| Term | Meaning |
|---|---|
| SCADA | Supervisory Control and Data Acquisition |
| RTU | Remote Terminal Unit – field device interface |
| HMI | Human Machine Interface – operator view |
| DNP3 | Distributed Network Protocol – common SCADA comms |
| IEC 60870-5-104 | SCADA over TCP/IP |
| IEC 61850 | Modern substation automation standard |
| GOOSE | Generic Object Oriented Substation Events (real-time) |
| DCC | Distribution Control Centre – SSE operations hub |

### Microwave Quick Reference
| Term | Meaning |
|---|---|
| ACM | Adaptive Coded Modulation – adjusts in rain |
| ATPC | Automatic Transmit Power Control |
| Fresnel Zone | Must be 60%+ clear for LOS microwave |
| E-band | 70–80 GHz, multi-Gbps, short hop |
| 1+1 HSB | Hot Standby protection for microwave |

---

## 📋 Final Day Checklist (Morning of 16 April)
- [ ] MS Teams link is working and tested
- [ ] Camera angle, lighting, and microphone checked
- [ ] Professional background / virtual background set
- [ ] CV, JD, and your STAR stories printed or on second screen
- [ ] A glass of water nearby
- [ ] Log in 5–10 minutes early
- [ ] Deep breath – you have 12 years of solid experience backing you!

---

## 📚 Recommended Free Resources

| Topic | Resource |
|---|---|
| SDH basics | [ITU-T G.707](https://www.itu.int/rec/T-REC-G.707) / YouTube: "SDH explained" |
| SCADA / OT | ENISA ICS/SCADA report (free PDF); "SCADA for Beginners" YouTube |
| Microwave radio | Ericsson MINI-LINK overview docs; "Microwave radio fundamentals" YouTube |
| IEC 61850 | OMICRON IEC 61850 primer (free PDF) |
| OT security | IEC 62443 overview, NCSC OT guidance (UK gov) |
| SSE company context | [SSE Annual Report 2024](https://www.sse.com/investors) |
| Competency interviews | "STAR method" CIPD guide; Glassdoor SSE reviews |

---

*Good luck, Akash! Your IP/data networking depth is a major strength — focus your prep energy on SDH, SCADA, and microwave, and tie everything back to how it supports SSE's mission of safe, reliable energy infrastructure.* 🚀
