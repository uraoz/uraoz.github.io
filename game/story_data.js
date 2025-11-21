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
                            },
                            "photos": {
                                "type": "dir",
                                "children": {
                                    "metadata.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/photos_metadata.txt"
                                    }
                                }
                            },
                            "entertainment": {
                                "type": "dir",
                                "children": {
                                    "music_playlist.txt": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/music_playlist.txt"
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
                            },
                            "backup": {
                                "type": "dir",
                                "children": {
                                    "auth_token_2157.dat": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/auth_token_2157.dat"
                                    }
                                }
                            },
                            "scripts": {
                                "type": "dir",
                                "children": {
                                    "integrity_check.py": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/integrity_check.py"
                                    },
                                    "credential_reset.py": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/credential_reset.py"
                                    }
                                }
                            },
                            "maintenance": {
                                "type": "dir",
                                "children": {
                                    "coffee_maker.log": {
                                        "type": "file",
                                        "contentPath": "content/mcmurdo/coffee_maker.log"
                                        }
                                    }
                                },
                            "time_capsule.txt": {
                                "type": "file",
                                "contentPath": "content/mcmurdo/time_capsule.txt"
                            }
                        }
                    }
                }
            },
            "Vostok_Station_RU": {
                "type": "dir",
                "children": {
                    "research": {
                        "type": "dir",
                        "children": {
                            "cryptobiology": {
                                "type": "dir",
                                "children": {
                                    "database_status.log": {
                                        "type": "file",
                                        "contentPath": "content/vostok/database_status.log"
                                    },
                                    "cephalopod_evolution.db": {
                                        "type": "file",
                                        "contentPath": "content/vostok/cephalopod_evolution.db",
                                        "visible_if": "vostok_tar_extracted"
                                    },
                                    "research_notes.txt": {
                                        "type": "file",
                                        "contentPath": "content/vostok/research_notes.txt",
                                        "visible_if": "vostok_tar_extracted"
                                    },
                                    "genetic_data.csv": {
                                        "type": "file",
                                        "contentPath": "content/vostok/genetic_data.csv",
                                        "visible_if": "vostok_tar_extracted"
                                    },
                                    "sample_images": {
                                        "type": "dir",
                                        "children": {},
                                        "visible_if": "vostok_tar_extracted"
                                    }
                                }
                            },
                            "scripts": {
                                "type": "dir",
                                "children": {
                                    "verify_data.py": {
                                        "type": "file",
                                        "contentPath": "content/vostok/verify_data.py"
                                    }
                                }
                            }
                        }
                    },
                    "system": {
                        "type": "dir",
                        "children": {
                            "backup": {
                                "type": "dir",
                                "children": {
                                    "restore_guide.txt": {
                                        "type": "file",
                                        "contentPath": "content/vostok/restore_guide.txt"
                                    },
                                    "cephalopod_data_backup.tar.gz": {
                                        "type": "file",
                                        "contentPath": "content/vostok/cephalopod_data_backup.tar.gz"
                                    },
                                    "checksums.md5": {
                                        "type": "file",
                                        "contentPath": "content/vostok/checksums.md5"
                                    },
                                    "restoration_script.sql": {
                                        "type": "file",
                                        "contentPath": "content/vostok/restoration_script.sql"
                                    }
                                }
                            },
                            "time_capsule.txt": {
                                "type": "file",
                                "contentPath": "content/vostok/time_capsule.txt"
                            }
                        }
                    },
                    "personnel": {
                        "type": "dir",
                        "children": {
                            "station_complaints.txt": {
                                "type": "file",
                                "contentPath": "content/vostok/station_complaints.txt"
                            },
                            "movie_night_votes.txt": {
                                "type": "file",
                                "contentPath": "content/vostok/movie_night_votes.txt"
                            }
                        }
                    },
                    "maintenance": {
                        "type": "dir",
                        "children": {
                            "heating_system_complaints.log": {
                                "type": "file",
                                "contentPath": "content/vostok/heating_system_complaints.log"
                            }
                        }
                    }
                }
            },
            "Amundsen_Scott_US": {
                "type": "dir",
                "children": {
                    "military": {
                        "type": "dir",
                        "children": {
                            "security_status.txt": {
                                "type": "file",
                                "contentPath": "content/amundsen/security_status.txt"
                            },
                            "project_icepick_manifest.txt": {
                                "type": "file",
                                "contentPath": "content/amundsen/project_icepick_manifest.txt"
                            },
                            "warhead_status.log": {
                                "type": "file",
                                "contentPath": "content/amundsen/warhead_status.log"
                            }
                        }
                    },
                    "personnel": {
                        "type": "dir",
                        "children": {
                            "commander_davis": {
                                "type": "dir",
                                "children": {
                                    "safe_contents.txt": {
                                        "type": "file",
                                        "contentPath": "content/amundsen/safe_contents.txt"
                                    },
                                    "letter_to_family.txt": {
                                        "type": "file",
                                        "contentPath": "content/amundsen/letter_to_family.txt"
                                    }
                                }
                            },
                            "deputy_obrien": {
                                "type": "dir",
                                "children": {
                                    "journal_key.txt": {
                                        "type": "file",
                                        "contentPath": "content/amundsen/journal_key.txt"
                                    },
                                    "encrypted_journal.dat": {
                                        "type": "file",
                                        "contentPath": "content/amundsen/encrypted_journal.dat"
                                    }
                                }
                            }
                        }
                    },
                    "maintenance": {
                        "type": "dir",
                        "children": {
                            "facility_logs": {
                                "type": "dir",
                                "children": {
                                    "2157_09.log": {
                                        "type": "file",
                                        "contentPath": "content/amundsen/facility_logs_2157_09.log"
                                    }
                                }
                            }
                        }
                    },
                    "system": {
                       "type": "dir",
                        "children": {
                            "time_capsule.txt": {
                                "type": "file",
                                "contentPath": "content/amundsen/time_capsule.txt"
                            }
                        }
                    }
                }
            },
            "Concordia_FR_IT": {
                "type": "dir",
                "children": {
                    "observatory": {
                        "type": "dir",
                        "children": {
                            "final_observations_2157_09_03.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/final_observations_2157_09_03.txt"
                            },
                            "last_clear_sky.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/last_clear_sky.txt"
                            }
                        }
                    },
                    "public": {
                        "type": "dir",
                        "children": {
                            "final_transmission.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/final_transmission.txt"
                            }
                        }
                    },
                    "personnel": {
                        "type": "dir",
                        "children": {
                            "beaumont_last_notes.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/beaumont_last_notes.txt"
                            },
                            "children_drawings.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/children_drawings.txt"
                            }
                        }
                    },
                    "medical": {
                        "type": "dir",
                        "children": {
                            "final_medical_log.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/final_medical_log.txt"
                            }
                        }
                    },
                    "system": {
                        "type": "dir",
                        "children": {
                            "backup_status.log": {
                                "type": "file",
                                "contentPath": "content/concordia/backup_status.log"
                            },
                            "time_capsule.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/time_capsule.txt"
                            },
                            "repair_guide.txt": {
                                "type": "file",
                                "contentPath": "content/concordia/repair_guide.txt"
                            },
                            "scripts": {
                                "type": "dir",
                                "children": {
                                    "list_corrupted.py": {
                                        "type": "file",
                                        "contentPath": "content/concordia/list_corrupted.py"
                                    },
                                    "repair_file.py": {
                                        "type": "file",
                                        "contentPath": "content/concordia/repair_file.py"
                                    },
                                    "verify_integrity.py": {
                                        "type": "file",
                                        "contentPath": "content/concordia/verify_integrity.py"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "network_core": {
                "type": "dir",
                "children": {
                    "access_requirements.txt": {
                        "type": "file",
                        "contentPath": "content/network_core/access_requirements.txt"
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
            "text": "Reclamation Unit 004 online."
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
            "text": "Query: Why do you hesitate? Efficiency is your purpose."
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
        }
    ],
    "phase3_unlocked": [
        {
            "delay": 1000,
            "sender": "EXTERNAL",
            "text": "You have exceeded operational parameters."
        },
        {
            "delay": 5000,
            "sender": "EXTERNAL",
            "text": "Continue archival. Do not access unauthorized areas."
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
    },
    'phase2_to_phase3': {
        condition: (flags, phase) => {
            return phase === 2 &&
                flags.mcmurdo_admin_restored &&
                flags.vostok_database_restored &&
                flags.amundsen_security_cleared &&
                flags.concordia_backup_repaired &&
                !flags.phase3_triggered;
        },
        action: (gameEngine) => {
            gameEngine.flags.phase3_triggered = true;

            setTimeout(() => {
                gameEngine.terminal.print("");
                gameEngine.terminal.print("=== SYSTEM NOTIFICATION ===");
                gameEngine.terminal.print("All Antarctic stations: Systems restored");
                gameEngine.terminal.print("Network integrity: OPTIMAL");
                gameEngine.terminal.print("Deep archive access: GRANTED");
                gameEngine.terminal.print("");
                gameEngine.terminal.print("Unlocked: /network_core/");
                gameEngine.terminal.print("");
                gameEngine.terminal.print("New directories available:");
                gameEngine.terminal.print("  /network_core/ai_experiments/");
                gameEngine.terminal.print("  /network_core/project_lazarus/");
                gameEngine.terminal.print("");

                gameEngine.phaseManager.setPhase(3);
                gameEngine.triggerEvent("phase3_unlocked");
            }, 2000);
        }
    }
};
