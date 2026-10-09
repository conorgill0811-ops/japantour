# AI 101 — Tour Lab (Week 6, Path B)

A data-driven virtual tour on the same grid globe as the Flight Lab. The app reads stop records from `places.js`, checks them, draws a marker for each usable stop, and flies the camera to the selected stop.

The three example stops are **invented placeholders** near the class teaching origin (−75.93, 40.33). They are not real campus locations.

## Files
| File | Job |
|---|---|
| index.html | Page structure: panel, buttons, globe area |
| style.css | Colors, spacing, layout |
| places.js | **Your data**: one record per stop |
| tour-core.js | Rules: which stop is next, is a record usable |
| app.js | Connects data, rules, buttons, and the Cesium globe |
| tests.html / tests.js | Checks for the rules and your data |

## Run
Same as the Flight Lab: publish with GitHub Pages (Deploy from a branch → main → /(root)) or serve locally (`python -m http.server 8000`). Internet and WebGL are needed for the globe; CesiumJS 1.145 loads from Cesium's CDN. No ion token. If the globe fails, the stop panel and buttons still work.

## One record
```js
{ name: "", lon: 0, lat: 0, description: "", photo: "", photoAlt: "", source: "", checked: "YYYY-MM-DD" }
```
Longitude comes first (east/west, negative in Pennsylvania). Leave anything you have not verified blank. The app lists incomplete records under "Needs verification" instead of guessing.

## Test
Open tests.html. Then do the manual checks on Canvas page 05 (Tour checks). Optional: `node tests.js`.

## Limits
Virtual tour only: a camera flight is not a walking route, travel time, or accessibility guide. Grid globe, no imagery or terrain. Facts are only as good as your sources.

## Student additions — complete before submission
Audience: Travelers planning a first trip to Japan from New York.

Purpose: I want to help first-time Japan visitors from New York plan a Tokyo–Osaka–Hiroshima route using verified location data. Before sharing, I will verify every coordinate against a map source and record the date checked.

Feature changed: Tokyo / Osaka / Hiroshima / Home buttons select the first usable stop in that city group. If none is usable, the panel displays a message. Pure selection logic is in tour-core.js.

Stops (in order; all coordinates pending, no sources or check dates supplied):
1. Haneda Airport, Tokyo
2. Akihabara
3. Yokohama Bay – Mikasa Museum (Memorial Ship Mikasa)
4. Tokyo Skytree
5. Yushukan Museum
6. Imperial Palace
7. Ueno Zoo
8. Shibuya Crossing
9. Osaka (city center)
10. Osaka Castle
11. Osaka Aquarium
12. Hiroshima (city center)
13. Atomic Bomb Dome
14. Hiroshima Peace Memorial Museum
15. JFK Airport, New York (return home)

CesiumJS version: 1.145.

Run steps: From this folder, run `python -m http.server 8000`, then open `http://localhost:8000/index.html` and `http://localhost:8000/tests.html`.

AI assistance accepted/rejected: TODO — complete yourself.
Tests and evidence: TODO — run and record yourself.
Partner feedback: TODO — complete a partner run-through and record feedback.
Known limitations: TODO — assess and document yourself.

## References
https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyTo
https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html
https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/
