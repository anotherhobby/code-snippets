[
  {
    "id": "9882ff97.e0d0d",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "heatAwake",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.heatAwake }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 1130,
    "y": 660,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-full"
  },
  {
    "id": "7ff88c17.d701d4",
    "type": "inject",
    "z": "e50e4c22.d961a",
    "name": "1s",
    "props": [
      {
        "p": "payload"
      }
    ],
    "repeat": "1",
    "crontab": "",
    "once": true,
    "onceDelay": "1",
    "topic": "",
    "payload": "auto",
    "payloadType": "str",
    "x": 210,
    "y": 300,
    "wires": [
      [
        "f3f0262f.c164b8"
      ]
    ],
    "icon": "font-awesome/fa-clock-o"
  },
  {
    "id": "f3f0262f.c164b8",
    "type": "light-scheduler",
    "z": "e50e4c22.d961a",
    "settings": "6c988454.046d2c",
    "events": "[{\"start\":{\"dow\":1,\"mod\":360},\"end\":{\"dow\":1,\"mod\":1260}},{\"start\":{\"dow\":2,\"mod\":360},\"end\":{\"dow\":2,\"mod\":1260}},{\"start\":{\"dow\":4,\"mod\":360},\"end\":{\"dow\":4,\"mod\":1260}},{\"start\":{\"dow\":5,\"mod\":360},\"end\":{\"dow\":5,\"mod\":1320}},{\"start\":{\"dow\":6,\"mod\":435},\"end\":{\"dow\":6,\"mod\":1320}},{\"start\":{\"dow\":0,\"mod\":435},\"end\":{\"dow\":0,\"mod\":1290}},{\"start\":{\"dow\":3,\"mod\":360},\"end\":{\"dow\":3,\"mod\":1260}}]",
    "topic": "",
    "name": "schedule",
    "onPayload": "awake",
    "onPayloadType": "str",
    "offPayload": "asleep",
    "offPayloadType": "str",
    "onlyWhenDark": false,
    "scheduleRndMax": 0,
    "sunElevationThreshold": 6,
    "sunShowElevationInStatus": false,
    "outputfreq": "output.statechange.startup",
    "x": 360,
    "y": 300,
    "wires": [
      [
        "a5ba37dc.14c31"
      ]
    ]
  },
  {
    "id": "1e82ae63.0b2062",
    "type": "switch",
    "z": "e50e4c22.d961a",
    "name": "mode",
    "property": "payload",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "heat",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "cool",
        "vt": "str"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 950,
    "y": 700,
    "wires": [
      [
        "9882ff97.e0d0d"
      ],
      [
        "6adfb2f.7fe274c"
      ]
    ],
    "icon": "font-awesome/fa-question"
  },
  {
    "id": "35d762e8.f5e31e",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "thermostat",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 1,
    "halt_if": "",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "climate.living_room_thermostat_mode",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 790,
    "y": 700,
    "wires": [
      [
        "1e82ae63.0b2062"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-2"
  },
  {
    "id": "29fc9ec4.7ae4c2",
    "type": "function",
    "z": "e50e4c22.d961a",
    "name": "Assign Temp Preferences",
    "func": "// don't set temp when flows start\nflow.set('startup', true);\n\n// setpoints for when heat\nflow.set('heatAwake',72);\nflow.set('heatSleep',66);\nflow.set('heatAway',65);\n\n// setpoints for A/C\nflow.set('coolAwake',72);\nflow.set('coolSleep',72);\nflow.set('coolAway',76);\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 430,
    "y": 100,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-gears"
  },
  {
    "id": "77b3943a.6e138c",
    "type": "inject",
    "z": "e50e4c22.d961a",
    "name": "startup",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 200,
    "y": 100,
    "wires": [
      [
        "29fc9ec4.7ae4c2"
      ]
    ]
  },
  {
    "id": "4da56260.d4f0cc",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "set heating/cooling temperatures preferences at startup",
    "info": "",
    "x": 340,
    "y": 60,
    "wires": []
  },
  {
    "id": "fff55e4d.84f09",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "run base HVAC schedule",
    "info": "",
    "x": 250,
    "y": 260,
    "wires": []
  },
  {
    "id": "f9352125.4a7e6",
    "type": "link in",
    "z": "e50e4c22.d961a",
    "name": "set thermostat to awake",
    "links": [
      "1f4cd9d7.5d1c46",
      "2bd1573f.30a28"
    ],
    "x": 250,
    "y": 700,
    "wires": [
      [
        "c2be4e86.783b88"
      ]
    ],
    "icon": "font-awesome/fa-sun-o",
    "l": true
  },
  {
    "id": "6adfb2f.7fe274c",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "coolAwake",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.coolAwake }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 1130,
    "y": 740,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-0"
  },
  {
    "id": "e6a983d6.94b68",
    "type": "link in",
    "z": "e50e4c22.d961a",
    "name": "set thermostat to asleep",
    "links": [
      "386c338e.385d94"
    ],
    "x": 250,
    "y": 920,
    "wires": [
      [
        "43be389d.79009"
      ]
    ],
    "icon": "font-awesome/fa-moon-o",
    "l": true
  },
  {
    "id": "dcf7de9b.79a57",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "thermostat",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 1,
    "halt_if": "",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "climate.living_room_thermostat_mode",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 790,
    "y": 920,
    "wires": [
      [
        "84e1065.18524f8"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-2"
  },
  {
    "id": "84e1065.18524f8",
    "type": "switch",
    "z": "e50e4c22.d961a",
    "name": "mode",
    "property": "payload",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "heat",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "cool",
        "vt": "str"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 950,
    "y": 920,
    "wires": [
      [
        "f9b3505a.1c36a"
      ],
      [
        "36db898f.168756"
      ]
    ],
    "icon": "font-awesome/fa-question"
  },
  {
    "id": "f9b3505a.1c36a",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "heatSleep",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.heatSleep }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 1120,
    "y": 880,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-full"
  },
  {
    "id": "36db898f.168756",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "coolSleep",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.coolSleep }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 1120,
    "y": 960,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-0"
  },
  {
    "id": "a764aa99.f73b18",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "anybody",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.any_present",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 600,
    "y": 700,
    "wires": [
      [
        "35d762e8.f5e31e",
        "3958cc74.4ec994"
      ],
      [
        "3939b0b8.0cd58"
      ]
    ],
    "icon": "font-awesome/fa-home"
  },
  {
    "id": "3939b0b8.0cd58",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "away",
    "links": [
      "5650769f.d43dd8"
    ],
    "x": 770,
    "y": 760,
    "wires": [],
    "l": true
  },
  {
    "id": "9bff9e56.a7c1a",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "anybody",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.any_present",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 600,
    "y": 920,
    "wires": [
      [
        "dcf7de9b.79a57",
        "fe7bb8b.3fcb2c8"
      ],
      [
        "cc559506.077418"
      ]
    ],
    "icon": "font-awesome/fa-home"
  },
  {
    "id": "cc559506.077418",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "away",
    "links": [
      "5650769f.d43dd8"
    ],
    "x": 770,
    "y": 980,
    "wires": [],
    "l": true
  },
  {
    "id": "f4fc5748.056b9",
    "type": "link in",
    "z": "e50e4c22.d961a",
    "name": "set thermostat",
    "links": [
      "c4b3cc2e.0707c",
      "ec547c4b.7cd35"
    ],
    "x": 220,
    "y": 500,
    "wires": [
      [
        "1e09e9f5.1c3226"
      ]
    ],
    "l": true
  },
  {
    "id": "2bd1573f.30a28",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "awake",
    "links": [
      "f9352125.4a7e6"
    ],
    "x": 775,
    "y": 480,
    "wires": [],
    "icon": "font-awesome/fa-sun-o"
  },
  {
    "id": "386c338e.385d94",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "asleep",
    "links": [
      "e6a983d6.94b68"
    ],
    "x": 775,
    "y": 520,
    "wires": [],
    "icon": "font-awesome/fa-moon-o"
  },
  {
    "id": "1e09e9f5.1c3226",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "anybody",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.any_present",
    "state_type": "str",
    "state_location": "",
    "override_payload": "none",
    "entity_location": "",
    "override_data": "none",
    "blockInputOverrides": false,
    "x": 460,
    "y": 500,
    "wires": [
      [
        "1dc5b197.8f3a2e"
      ],
      [
        "6f2b70f5.a16ac"
      ]
    ],
    "icon": "font-awesome/fa-home"
  },
  {
    "id": "c4b3cc2e.0707c",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "set thermostat",
    "links": [
      "f4fc5748.056b9"
    ],
    "x": 840,
    "y": 340,
    "wires": [],
    "icon": "font-awesome/fa-thermometer-half",
    "l": true
  },
  {
    "id": "6f2b70f5.a16ac",
    "type": "link out",
    "z": "e50e4c22.d961a",
    "name": "away",
    "links": [
      "5650769f.d43dd8"
    ],
    "x": 630,
    "y": 540,
    "wires": [],
    "l": true
  },
  {
    "id": "c2be4e86.783b88",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "hold",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.thermostat_hold",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 450,
    "y": 700,
    "wires": [
      [],
      [
        "a764aa99.f73b18"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-half"
  },
  {
    "id": "43be389d.79009",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "hold",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.thermostat_hold",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 450,
    "y": 920,
    "wires": [
      [],
      [
        "9bff9e56.a7c1a"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-half"
  },
  {
    "id": "3e6786d8.447152",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "set to seasonal sleeping temp",
    "info": "",
    "x": 260,
    "y": 880,
    "wires": []
  },
  {
    "id": "515eef12.3718f8",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "set to seasonal awake temp",
    "info": "",
    "x": 260,
    "y": 660,
    "wires": []
  },
  {
    "id": "18347c46.35d2bc",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "set temp according to schedule",
    "info": "",
    "x": 270,
    "y": 460,
    "wires": []
  },
  {
    "id": "a5ba37dc.14c31",
    "type": "change",
    "z": "e50e4c22.d961a",
    "name": "apply schedule",
    "rules": [
      {
        "t": "set",
        "p": "hvac",
        "pt": "global",
        "to": "payload",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 540,
    "y": 300,
    "wires": [
      [
        "ad6d4a76.383178"
      ]
    ],
    "icon": "font-awesome/fa-calendar-check-o"
  },
  {
    "id": "3958cc74.4ec994",
    "type": "change",
    "z": "e50e4c22.d961a",
    "name": "set awake",
    "rules": [
      {
        "t": "set",
        "p": "hvac",
        "pt": "global",
        "to": "awake",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 790,
    "y": 660,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-calendar-check-o"
  },
  {
    "id": "fe7bb8b.3fcb2c8",
    "type": "change",
    "z": "e50e4c22.d961a",
    "name": "set asleep",
    "rules": [
      {
        "t": "set",
        "p": "hvac",
        "pt": "global",
        "to": "asleep",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 790,
    "y": 880,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-calendar-check-o"
  },
  {
    "id": "1dc5b197.8f3a2e",
    "type": "switch",
    "z": "e50e4c22.d961a",
    "name": "adjust temp",
    "property": "hvac",
    "propertyType": "global",
    "rules": [
      {
        "t": "eq",
        "v": "awake",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "asleep",
        "vt": "str"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 650,
    "y": 500,
    "wires": [
      [
        "2bd1573f.30a28"
      ],
      [
        "386c338e.385d94"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-2"
  },
  {
    "id": "ad6d4a76.383178",
    "type": "switch",
    "z": "e50e4c22.d961a",
    "name": "startup",
    "property": "startup",
    "propertyType": "flow",
    "rules": [
      {
        "t": "true"
      },
      {
        "t": "false"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 675,
    "y": 300,
    "wires": [
      [
        "dbef57bd.c7b2f8"
      ],
      [
        "c4b3cc2e.0707c"
      ]
    ],
    "icon": "font-awesome/fa-clock-o",
    "l": false
  },
  {
    "id": "dbef57bd.c7b2f8",
    "type": "change",
    "z": "e50e4c22.d961a",
    "name": "startup done",
    "rules": [
      {
        "t": "set",
        "p": "startup",
        "pt": "flow",
        "to": "false",
        "tot": "bool"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 830,
    "y": 280,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-clock-o"
  },
  {
    "id": "5650769f.d43dd8",
    "type": "link in",
    "z": "e50e4c22.d961a",
    "name": "set thermostat to away",
    "links": [
      "3939b0b8.0cd58",
      "6f2b70f5.a16ac",
      "a72d3af5.15593",
      "cc559506.077418"
    ],
    "x": 240,
    "y": 1160,
    "wires": [
      [
        "385cfe59.7461c2"
      ]
    ],
    "l": true
  },
  {
    "id": "cf21c52c.2f1568",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "thermostat",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 1,
    "halt_if": "",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "climate.living_room_thermostat_mode",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 610,
    "y": 1160,
    "wires": [
      [
        "a6c4095d.3dc808"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-2"
  },
  {
    "id": "a6c4095d.3dc808",
    "type": "switch",
    "z": "e50e4c22.d961a",
    "name": "mode",
    "property": "payload",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "heat",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "cool",
        "vt": "str"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 770,
    "y": 1160,
    "wires": [
      [
        "eb69cf05.2d058"
      ],
      [
        "8fcd8585.30fcd8"
      ]
    ],
    "icon": "font-awesome/fa-question"
  },
  {
    "id": "eb69cf05.2d058",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "heatAway",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.heatAway }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 940,
    "y": 1120,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-full"
  },
  {
    "id": "8fcd8585.30fcd8",
    "type": "api-call-service",
    "z": "e50e4c22.d961a",
    "name": "coolAway",
    "server": "e128f3a4.2f746",
    "version": 1,
    "debugenabled": false,
    "service_domain": "climate",
    "service": "set_temperature",
    "entityId": "climate.living_room_thermostat_mode",
    "data": "{\"temperature\": {{ flow.coolAway }}}",
    "dataType": "json",
    "mergecontext": "",
    "output_location": "",
    "output_location_type": "none",
    "mustacheAltTags": false,
    "x": 940,
    "y": 1200,
    "wires": [
      []
    ],
    "icon": "font-awesome/fa-thermometer-0"
  },
  {
    "id": "1bfcddb7.eeebfa",
    "type": "comment",
    "z": "e50e4c22.d961a",
    "name": "triggered by presence change",
    "info": "",
    "x": 260,
    "y": 1120,
    "wires": []
  },
  {
    "id": "385cfe59.7461c2",
    "type": "api-current-state",
    "z": "e50e4c22.d961a",
    "name": "hold",
    "server": "e128f3a4.2f746",
    "version": 1,
    "outputs": 2,
    "halt_if": "on",
    "halt_if_type": "str",
    "halt_if_compare": "is",
    "override_topic": false,
    "entity_id": "input_boolean.thermostat_hold",
    "state_type": "str",
    "state_location": "payload",
    "override_payload": "msg",
    "entity_location": "data",
    "override_data": "msg",
    "blockInputOverrides": false,
    "x": 450,
    "y": 1160,
    "wires": [
      [],
      [
        "cf21c52c.2f1568"
      ]
    ],
    "icon": "font-awesome/fa-thermometer-half"
  },
  {
    "id": "e128f3a4.2f746",
    "type": "server",
    "name": "Home Assistant",
    "legacy": false,
    "addon": false,
    "rejectUnauthorizedCerts": false,
    "ha_boolean": "y|yes|true|on|home|open",
    "connectionDelay": false,
    "cacheJson": true
  },
  {
    "id": "6c988454.046d2c",
    "type": "light-scheduler-settings",
    "name": "home",
    "latitude": "0",
    "longitude": "0"
  }
]