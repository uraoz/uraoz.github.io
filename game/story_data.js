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
                            "weather_data": {
                                "type": "dir",
                                "children": {
                                    "2157_09_01.log": {
                                        "type": "file",
                                        "content": "DATE: 2157-09-01\nTEMP: -45C\nWIND: 80km/h NE\nVISIBILITY: 50m\nNOTE: Storm approaching from sector 4."
                                    },
                                    "2157_09_02.log": {
                                        "type": "file",
                                        "content": "DATE: 2157-09-02\nTEMP: -48C\nWIND: 110km/h NE\nVISIBILITY: 0m\nNOTE: External sensors offline."
                                    }
                                }
                            },
                            "supply_logs": {
                                "type": "dir",
                                "children": {
                                    "inventory_check.txt": {
                                        "type": "file",
                                        "content": "Food Rations: 45% (CRITICAL)\nFuel Cells: 60%\nMedical Supplies: 30%\n\nWARNING: Next supply drop is 2 weeks overdue."
                                    }
                                }
                            },
                            "personnel_records": {
                                "type": "dir",
                                "children": {
                                    "staff_list.txt": {
                                        "type": "file",
                                        "content": "Commander: J. Miller\nChief Scientist: Dr. A. Kovacs\nMedical Officer: Dr. S. Chen\nEngineer: M. Rossi\n..."
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
                                        "content": "REPORT ID: BIO-992\nSUBJECT: Unknown biological samples from ice core 774.\n\nCellular structure does not match any known terrestrial organism.\nRapid cell division observed even at -50C.\nRequesting immediate quarantine of Sector 4.\n"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
