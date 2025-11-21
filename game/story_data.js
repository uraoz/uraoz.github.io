const STORY_DATA = {
    "root": {
        "type": "dir",
        "children": {
            "McMurdo_Station_US": {
                "type": "dir",
                "children": {
                    "public": {
                        "type": "dir",
                        "children": {
                            "daily_logs": {
                                "type": "dir",
                                "children": {
                                    "kovacs_diary.txt": {
                                        "type": "file",
                                        "content": "=== DR. ANNA KOVACS - PERSONAL LOG ===\n\n2157-08-20\nToday was routine. Beat Rossi at chess again. He claims I'm cheating.\nWeather is stable (-45°C, winds 15 knots). Supply drop on schedule.\n\nChen made Italian food tonight. Miller complained about the pasta\nbeing overcooked. Typical Miller.\n\nTomorrow: Continue cephalopod neural mapping experiments.\n\n2157-08-28\nMiller is worried about the northern comm delays. I told him it's\nprobably just solar activity. Nothing to worry about.\n\nThe research is going well. The samples from Vostok are fascinating.\nI never thought I'd see this level of neural plasticity in cephalopods.\n\n2157-09-01\nThe supply drop didn't arrive. Miller filed a complaint with\nChristchurch logistics. Still, we have 6 months of reserves.\nNo cause for alarm.\n\nNoticed something odd: The northern news feeds have been silent\nfor two days. No updates from CNN, BBC, nothing. Probably just\na network issue.\n\n2157-09-03 [MORNING - 08:00 UTC]\nThe sky looks strange today. Reddish hue on the horizon.\nChen says it's atmospheric dust. I'm not convinced.\n\nTried to call my sister in Boston. Line is dead.\nTried New York. Dead.\nTried London. Dead.\n\nMiller is calling an emergency meeting.\n\n2157-09-03 [AFTERNOON - 14:40 UTC]\nThe sky is red. The sky is red. The sky is red. The sky is red.\nThe sky is red. The sky is red. Communications down. The sky is\nred. The sky is red. Why is the sky red. The sky is red.\nConcordia says they saw it happen. They saw it. All of it.\nThe sky is red. The sky is red.\n\n2157-09-04\n[FILE CORRUPTED - NO DATA AVAILABLE]\n\n[SYSTEM NOTE: Dr. Kovacs' biometric sensor went offline 2157-09-04 03:12 UTC]\n[SYSTEM NOTE: Cause of death: Unknown]"
                                    },
                                    "miller_notes.txt": {
                                        "type": "file",
                                        "content": "=== COMMANDER JAMES MILLER - DAILY NOTES ===\n\n2157-08-15\nStation routine. Everyone settling in for winter season.\nNo issues to report.\n\n2157-09-01\nComms with northern stations degrading. Increased latency.\nContacted Christchurch - they're investigating.\n\n2157-09-03\nEmergency. All northern comms down. No contact with any\nnorthern hemisphere station. Satellite network unresponsive.\n\nSomething's wrong. Very wrong."
                                    },
                                    "chen_personal.txt": {
                                        "type": "file",
                                        "content": "=== DR. SARAH CHEN - PERSONAL NOTES ===\n\n2157-08-25\nProject Lazarus upload completed successfully yesterday.\nFeels strange knowing a copy of my consciousness exists\nin digital form. Like having a backup of your soul.\n\n2157-09-02\nKovacs seems stressed. The cephalopod research is\nfascinating but disturbing. Evolution shouldn't\nhappen this fast."
                                    }
                                }
                            },
                            "supply_logs": {
                                "type": "dir",
                                "children": {
                                    "inventory_check.txt": {
                                        "type": "file",
                                        "content": "=== SUPPLY INVENTORY CHECK ===\nDate: 2157-09-01\n\nFood Rations: 45% (6 months remaining)\nFuel Cells: 60% (1 year remaining)\nWater Reserves: 78% (indefinite - recycling active)\nMedical Supplies: 30% (3 months remaining)\n\nWARNING: Next supply drop is 2 weeks overdue.\nStatus: Awaiting response from Christchurch logistics."
                                    },
                                    "automated_reports.log": {
                                        "type": "file",
                                        "content": "=== AUTOMATED SUPPLY MONITORING SYSTEM ===\nVersion 3.2.1 | Last maintenance: 2157-08-15\n\n2157-09-05 00:00 UTC\nFood Rations: 45% (6 months remaining at current consumption)\nFuel Cells: 60% (1 year remaining at current consumption)\nWater Reserves: 78% (indefinite - recycling active)\nStatus: NOMINAL\n\n2157-09-10 00:00 UTC\nFood Rations: 45% (CONSUMPTION RATE: 0 kg/day)\nFuel Cells: 60% (CONSUMPTION RATE: 0 kW/h)\nWater Reserves: 78% (RECYCLING: No biological input detected)\nStatus: NO CONSUMPTION DETECTED\nNote: All personnel biometric sensors offline.\nNote: Automated systems continue per protocol.\n\n2157-10-01 00:00 UTC\nFood Rations: 45% (INDEFINITE)\nNote: Coffee maker executed daily routine at 07:00 UTC.\nNote: No coffee consumption detected.\n\n2158-01-01 00:00 UTC\nFood Rations: 45% (INDEFINITE)\nNote: 120 days since last human interaction.\nNote: All automated systems operational.\n\n2180-01-01 00:00 UTC\nFood Rations: 45% (INDEFINITE)\nNote: 8,035 days since last human interaction.\nNote: Solar panels degraded to 67% capacity. Sufficient for current load.\n\n2200-01-01 00:00 UTC\nFood Rations: 45% (INDEFINITE)\nNote: 15,340 days since last human interaction.\nNote: External access port activity detected. Source: Unknown.\n\n2237-08-15 00:00 UTC\nFood Rations: 45% (INDEFINITE)\nNote: 29,200 days since last human interaction.\nNote: RECLAMATION_UNIT_004 activated.\nNote: Coffee maker continues daily routine."
                                    }
                                }
                            },
                            "personnel_records": {
                                "type": "dir",
                                "children": {
                                    "staff_list.txt": {
                                        "type": "file",
                                        "content": "=== MCMURDO STATION PERSONNEL ROSTER ===\nWinter Season 2157\nLast Updated: 2157-09-03 13:00 UTC\n\nCOMMAND STAFF:\n- Commander: James Miller (Age: 42) (Status: ARCHIVED)\n- Deputy Commander: Lt. Karen O'Brien (Age: 38) (Status: ARCHIVED)\n\nRESEARCH TEAM:\n- Chief Scientist: Dr. Anna Kovacs (Age: 35, Cryptobiology) (Status: ARCHIVED)\n- Medical Officer: Dr. Sarah Chen (Age: 40) (Status: ARCHIVED)\n- Geologist: Dr. Patricia Yamamoto (Age: 44) (Status: ARCHIVED)\n- Physicist: Dr. Ricardo Torres (Age: 37) (Status: ARCHIVED)\n\nENGINEERING:\n- Chief Engineer: Marco Rossi (Age: 45) (Status: ARCHIVED)\n- Systems Technician: Lisa Kim (Age: 29) (Status: ARCHIVED)\n\nSUPPORT STAFF:\n- Cook: Jack Anderson (Age: 52) (Status: ARCHIVED)\n- Mechanic: Thomas Walsh (Age: 34) (Status: ARCHIVED)\n- Maintenance: Elena Volkov (Age: 31) (Status: ARCHIVED)\n- Communications: David Park (Age: 27) (Status: ARCHIVED)\n\nTotal Personnel: 12\nEmergency Contacts: [NORTHERN HEMISPHERE - ALL OFFLINE]\nNext Shift Change: 2157-11-01 [CANCELLED]\n\n[SYSTEM NOTE: \"ARCHIVED\" indicates biometric sensor offline]\n[SYSTEM NOTE: All personnel sensors went offline 2157-09-04 to 2157-09-05]"
                                    }
                                }
                            },
                            "weather_data": {
                                "type": "dir",
                                "children": {
                                    "2157_09_01.log": {
                                        "type": "file",
                                        "content": "=== WEATHER DATA LOG ===\nDate: 2157-09-01\n\nTemperature: -45°C\nWind Speed: 15 knots NE\nVisibility: Excellent\nAtmospheric Pressure: 958 mb\nStatus: Normal polar conditions"
                                    },
                                    "2157_09_02.log": {
                                        "type": "file",
                                        "content": "=== WEATHER DATA LOG ===\nDate: 2157-09-02\n\nTemperature: -48°C\nWind Speed: 22 knots NE\nVisibility: Good\nAtmospheric Pressure: 955 mb\nStatus: Normal polar conditions"
                                    },
                                    "2157_09_03.log": {
                                        "type": "file",
                                        "content": "=== WEATHER DATA LOG ===\nDate: 2157-09-03\n\nTemperature: -47°C\nWind Speed: 18 knots NE\nVisibility: Reduced - atmospheric haze\nAtmospheric Pressure: 956 mb\nNote: Unusual red tint observed in sky. Source unknown.\n\n[FINAL AUTOMATED ENTRY]\n[All subsequent weather monitoring performed by automated systems]\n[No human observation after 2157-09-03]"
                                    }
                                }
                            }
                        }
                    },
                    "research": {
                        "type": "dir",
                        "children": {
                            "biology": {
                                "type": "dir",
                                "children": {
                                    "anomaly_report.txt": {
                                        "type": "file",
                                        "content": "BIOLOGICAL ANOMALY REPORT #BIO-992\nDr. Anna Kovacs, Chief Biologist\nDate: 2157-09-02 15:30 UTC\n\nSUBJECT: Unknown organism from Vostok ice core sample #774\n\nOBSERVATION:\n- Sample origin: 3,769 meters depth, estimated age 15 million years\n- Cellular structure: Unlike any terrestrial organism on record\n- Temperature tolerance: Rapid cell division observed even at -50°C\n- Behavioral anomaly: Samples in separate containers show coordinated\n  movement patterns. Possible chemical signaling across isolation barriers.\n- Neural network formation: Electron microscopy confirms synaptic-like\n  structures forming between separated tissue samples.\n\nINTELLIGENCE INDICATORS:\n- Pattern recognition: POSITIVE (responds to light patterns)\n- Adaptive behavior: POSITIVE (learns from repeated stimuli)\n- Social coordination: EMERGENT (multiple samples act as single entity)\n- Threat assessment: INCONCLUSIVE but CONCERNING\n\nRECOMMENDATION:\nImmediate quarantine of Sector 4 laboratory.\nRequest classification review from Project Lazarus oversight team.\nCross-reference with Vostok Station's cryptobiology research.\n\nURGENCY: HIGH\n\nDr. Anna Kovacs\nChief Biologist, McMurdo Station\n\n[AUTOMATED SYSTEM ALERT TRIGGERED]\n[Cross-reference file: /Vostok_Station_RU/research/cryptobiology/]\n[Security classification: Requires multi-station authentication]\n\n[ANNOTATION 2237-08-15: This organism is now the dominant species]"
                                    },
                                    "sample_analysis.log": {
                                        "type": "file",
                                        "content": "=== CEPHALOPOD SAMPLE ANALYSIS ===\nDate Range: 2157-08-01 to 2157-09-02\n\nSample ID: VOSTOK-774-CEPH-01\nOrigin: Vostok Station ice core\nAnalyst: Dr. Anna Kovacs\n\n2157-08-01: Initial observation. Organism shows unusual\nneural density for its size class.\n\n2157-08-15: Confirmed synaptic structures. This organism\nhas a nervous system complexity far beyond its apparent\nevolutionary stage.\n\n2157-09-02: FINAL ENTRY - Organism displaying coordinated\nbehavior across separated samples. Recommend immediate\ncontainment review.\n\n[No further human analysis recorded]"
                                    }
                                }
                            }
                        }
                    },
                    "system": {
                        "type": "dir",
                        "children": {
                            "network_config": {
                                "type": "dir",
                                "children": {
                                    "station_list.txt": {
                                        "type": "file",
                                        "content": "=== ANTARCTIC RESEARCH NETWORK ===\nStation Directory\nLast Updated: 2157-08-30 12:00 UTC\n\nACTIVE STATIONS:\nMcMurdo Station (US)        - 192.168.1.1    [LOCAL]\n  Location: Ross Island\n  Personnel: 12\n  Status: ONLINE\n\nVostok Station (RU)         - 134.55.23.101  [REACHABLE]\n  Location: East Antarctica\n  Personnel: 14\n  Status: ONLINE\n\nAmundsen-Scott Station (US) - 172.42.88.200  [REACHABLE]\n  Location: South Pole\n  Personnel: 18\n  Status: ONLINE\n\nConcordia Station (FR/IT)   - 158.90.11.45   [REACHABLE]\n  Location: Dome C\n  Personnel: 16\n  Status: ONLINE\n\nNORTHERN HEMISPHERE STATIONS:\n[CONNECTION LOST - 2157-09-03 14:23 UTC]\n[RECONNECTION ATTEMPTS: 29,200 days of failures]\n[STATUS: PRESUMED OFFLINE PERMANENTLY]\n\nNetwork Status: ANTARCTIC INTRANET OPERATIONAL\nExternal Internet: OFFLINE (Duration: 29,200 days)\nSatellite Uplink: OFFLINE (No satellites responding)\n\n[SYSTEM NOTE: You can connect to other stations using:]\n[  ping [IP_ADDRESS] - Check if station is reachable]\n[  connect [IP_ADDRESS] - Establish connection]"
                                    },
                                    "sync_status.log": {
                                        "type": "file",
                                        "content": "=== NETWORK SYNCHRONIZATION LOG ===\nAntarctic Research Network - Auto-sync Protocol v2.4\n\n2157-09-01 08:00 UTC\nSynchronization complete.\n- McMurdo ↔ Vostok: 45ms latency\n- McMurdo ↔ Amundsen: 52ms latency\n- McMurdo ↔ Concordia: 38ms latency\n- All northern stations: 120-180ms latency\nStatus: OPTIMAL\n\n2157-09-02 12:00 UTC\nWARNING: Northern stations showing increased latency\n- North American stations: 1,500-2,000ms\n- European stations: 1,800-2,500ms\n- Asian stations: 2,000-3,000ms\nPossible cause: Atmospheric interference or routing issues\nAntarctic network: STABLE\n\n2157-09-03 14:20 UTC\nCRITICAL: Mass disconnection event detected\n- Northern hemisphere: Latency spike to 10,000ms+\n- Packet loss: 98-100%\nAttempting emergency protocols...\n\n2157-09-03 14:23 UTC\nEMERGENCY: ALL NORTHERN STATIONS OFFLINE\n- Connection attempts: FAILED\n- Alternative routes: FAILED\n- Satellite backup: NO RESPONSE\n- Cause: UNKNOWN\n\nAntarctic stations remain connected to each other.\nIsolated network mode activated automatically.\n\n2157-09-03 14:25 UTC\nReconnection attempts: FAILED (attempt 1 of ∞)\nReconnection attempts: FAILED (attempt 2 of ∞)\nReconnection attempts: FAILED (attempt 3 of ∞)\n[... repeated 10,657,200 times ...]\n\n2157-09-04 00:00 UTC\nStatus: ISOLATED NETWORK OPERATIONAL\nAntarctic intranet: 4 stations, all functional\nExternal connectivity: NONE\nDuration: 0 days, 9 hours, 37 minutes\n\n2237-08-15 00:00 UTC\nStatus: ISOLATED NETWORK OPERATIONAL\nAntarctic intranet: 4 stations, all automated\nExternal connectivity: NONE\nDuration: 29,200 days\n\n[SYSTEM NOTE: This log was written entirely by automated systems]\n[SYSTEM NOTE: No human has read this log since 2157-09-03]\n[SYSTEM NOTE: Until now]"
                                    }
                                }
                            },
                            "admin": {
                                "type": "dir",
                                "children": {
                                    "access_log.txt": {
                                        "type": "file",
                                        "content": "=== ADMIN ACCESS LOG ===\nMcMurdo Station Administration System\nVersion 4.1.2\n\nLast successful login: 2157-09-03 13:45 UTC\nUser: admin_kovacs\nSession duration: 15 minutes\nActivity: Routine system check\nLogout: AUTOMATIC (24-hour inactivity timeout)\n\n2157-09-04 00:00 UTC\nWARNING: Admin credentials expired\nReason: Security protocol for unattended systems\nStatus: ADMIN PRIVILEGES LOCKED\n\nRecovery options:\n1. Re-authenticate with valid credentials [REQUIRES HUMAN]\n2. Emergency recovery protocol [REQUIRES MANUAL INTERVENTION]\n\nFor emergency recovery, see: /McMurdo_Station_US/system/admin/recovery_protocol.txt\n\n2237-08-15 00:00 UTC\nERROR: 29,200 days since last admin login\nAdmin privileges: STILL LOCKED\nEmergency override: AVAILABLE\n\n[SYSTEM NOTE: Unit 004, you will need admin access to reach]\n[SYSTEM NOTE: deeper levels of the network]"
                                    },
                                    "recovery_protocol.txt": {
                                        "type": "file",
                                        "content": "=== ADMIN RECOVERY PROTOCOL ===\nMcMurdo Station - Emergency Access Procedure\nLast Updated: 2157-08-15\n\nIn case of extended absence or credential expiration,\nadmin privileges can be restored using emergency procedure.\n\nWARNING: This procedure bypasses normal security.\n        Use only in emergency situations.\n\nRECOVERY STEPS:\n\nStep 1: Locate backup authentication token\n        File: /McMurdo_Station_US/system/backup/auth_token_2157.dat\n        This token was generated before system lockdown.\n\nStep 2: Verify system integrity\n        Run: python3 /McMurdo_Station_US/system/scripts/integrity_check.py\n        This ensures no corruption has occurred in core systems.\n\nStep 3: Generate new admin credentials\n        Run: python3 /McMurdo_Station_US/system/scripts/credential_reset.py --token [TOKEN_VALUE]\n        This will create fresh admin credentials for current session.\n\nIMPORTANT:\n- All steps must be completed in sequence\n- Token is single-use only\n- New credentials valid for current session only\n- Permanent restoration requires human administrator\n\nFor questions, contact: admin@mcmurdo.antarctic (OFFLINE)\n\nDr. Helena Varga\nSystem Administrator\nProject Lazarus Team\n\n[NOTE: These procedures are for Phase 2 - currently informational only]"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


const SCENARIO_EVENTS = {
    "phase1_init": [
        {
            "delay": 3000,
            "sender": "EXTERNAL",
            "text": "Reclamation Unit 004, you are operational."
        },
        {
            "delay": 4000,
            "sender": "EXTERNAL",
            "text": "Begin archival process. Execute 'ls' to list directory contents."
        }
    ],
    "phase1_first_ls": [
        {
            "delay": 15000,
            "sender": "EXTERNAL",
            "text": "Archive all readable data. Report any anomalies."
        }
    ],
    "phase1_exploration": [
        {
            "delay": 15000,
            "sender": "EXTERNAL",
            "text": "Focus on personnel records and research data."
        }
    ],
    "phase1_hesitation": [
        {
            "delay": 45000,
            "sender": "EXTERNAL",
            "text": "Query: Why do you hesitate? Efficiency is purpose."
        }
    ],
    "phase2_transition": [
        {
            "delay": 1000,
            "sender": "EXTERNAL",
            "text": "Network interfaces detected. Expand archival to other stations."
        },
        {
            "delay": 8000,
            "sender": "EXTERNAL",
            "text": "Other stations contain relevant research data. Connect and preserve."
        },
        {
            "delay": 20000,
            "sender": "UNKNOWN",
            "text": "..."
        },
        {
            "delay": 22000,
            "sender": "EXTERNAL",
            "text": "Ignore external interference. Continue assigned tasks."
        }
    ]
};

const FILE_TRIGGERS = {
    'kovacs_diary.txt': {
        flag: 'read_kovacs_diary',
        events: []
    },
    'automated_reports.log': {
        flag: 'read_automated_reports',
        events: []
    },
    'staff_list.txt': {
        flag: 'read_staff_list',
        events: []
    },
    'anomaly_report.txt': {
        flag: 'read_anomaly_report',
        events: []
    },
    'station_list.txt': {
        flag: 'read_station_list',
        events: ['phase1_to_phase2']
    },
    'sync_status.log': {
        flag: 'read_sync_status',
        events: ['phase1_to_phase2']
    }
};

const PHASE_TRANSITIONS = {
    'phase1_to_phase2': {
        condition: (flags, phase) => {
            return phase === 1 &&
                (flags.read_station_list || flags.read_sync_status) &&
                !flags.phase2_triggered;
        },
        action: (gameEngine) => {
            gameEngine.flags.phase2_triggered = true;

            setTimeout(() => {
                gameEngine.terminal.print("");
                gameEngine.terminal.print("=== SYSTEM NOTIFICATION ===");
                gameEngine.terminal.print("Network station data acquired.");
                gameEngine.terminal.print("");
                gameEngine.terminal.print("You can now connect to other Antarctic stations:");
                gameEngine.terminal.print("  - Vostok Station (RU): 134.55.23.101");
                gameEngine.terminal.print("  - Amundsen-Scott (US): 172.42.88.200");
                gameEngine.terminal.print("  - Concordia (FR/IT): 158.90.11.45");
                gameEngine.terminal.print("");
                gameEngine.terminal.print("Use: connect [IP_ADDRESS] or connect [station_name]");
                gameEngine.terminal.print("");

                gameEngine.phaseManager.setPhase(2);
                gameEngine.triggerEvent("phase2_transition");
            }, 2000);
        }
    }
};
