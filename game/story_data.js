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
                                        "contentPath": "content/mcmurdo/kovacs_diary.txt"
                                    },
                                    "miller_notes.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/miller_notes.txt"
                                    },
                                    "chen_personal.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/chen_personal.txt"
                                    }
                                }
                            },
                            "supply_logs": {
                                "type": "dir",
                                "children": {
                                    "inventory_check.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/inventory_check.txt"
                                    },
                                    "automated_reports.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/automated_reports.log"
                                    }
                                }
                            },
                            "personnel_records": {
                                "type": "dir",
                                "children": {
                                    "staff_list.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/staff_list.txt"
                                    }
                                }
                            },
                            "weather_data": {
                                "type": "dir",
                                "children": {
                                    "2157_09_01.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/2157_09_01.log"
                                    },
                                    "2157_09_02.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/2157_09_02.log"
                                    },
                                    "2157_09_03.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/2157_09_03.log"
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
                                        "contentPath": "content/mcmurdo/anomaly_report.txt"
                                    },
                                    "sample_analysis.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/sample_analysis.log"
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
                                        "contentPath": "content/mcmurdo/station_list.txt"
                                    },
                                    "sync_status.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/sync_status.log"
                                    }
                                }
                            },
                            "admin": {
                                "type": "dir",
                                "children": {
                                    "access_log.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/access_log.txt"
                                    },
                                    "recovery_protocol.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/recovery_protocol.txt"
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
