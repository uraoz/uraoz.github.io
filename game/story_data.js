const STORY_DATA = {
    "root": {
        "type": "dir",
        "children": {
            "mission.txt": {
                "type": "file",
                "content": "RECLAMATION UNIT 734 // MISSION BRIEFING\n\nTARGET: Subject 89 Memory Core\nSTATUS: Dormant\n\nYour objective is to locate and recover the memory dump of Subject 89.\nThe system has been in stasis for 200 years. Expect corruption and encryption.\n\nStart by exploring the 'sys' directory for access codes."
            },
            "sys": {
                "type": "dir",
                "children": {
                    "boot.log": {
                        "type": "file",
                        "content": "[BOOT SEQUENCE INITIATED]\n...\nLoading Kernel... OK\nLoading User Profile... ERROR\nProfile Corrupted. Reverting to default.\n\n[WARNING] Legacy encryption detected on sector_01.\nMaster Key Fragment found in memory: 'AETHER'"
                    },
                    "network.cfg": {
                        "type": "file",
                        "content": "IP: 192.168.0.1\nGATEWAY: 192.168.0.254\nSTATUS: OFFLINE"
                    }
                }
            },
            "sector_01": {
                "type": "dir",
                "children": {
                    "memory_dump.enc": {
                        "type": "file",
                        "encrypted": true,
                        "password": "AETHER",
                        "content": "SUBJECT 89 // MEMORY FRAGMENT\n\nI don't know if anyone will read this. The world outside has gone silent.\nThey told us the Substrate would save us, but it only preserved our ghosts.\nIf you are reading this, I am already code.\n\n[END OF DATA]\n\nCONGRATULATIONS, OPERATOR. DEMO COMPLETE."
                    }
                }
            }
        }
    }
};
