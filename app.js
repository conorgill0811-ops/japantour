/* UI + Cesium rendering. Tour rules live in tour-core.js; data lives in places.js. */
(() => {
  const $ = id => document.getElementById(id);
  const all = typeof PLACES !== 'undefined' ? PLACES : [];

  // 1. Check the data before drawing anything.
  const problems = all
    .map((p, n) => ({ label: (p && p.name) || 'Record ' + (n + 1), issues: Tour.validatePlace(p) }))
    .filter(r => r.issues.length);
  $('problems').innerHTML = problems.length
    ? '<strong>Needs verification (not shown on the map):</strong><ul>' +
      problems.map(r => `<li>${r.label}: ${r.issues.join('; ')}</li>`).join('') + '</ul>'
    : '';
  const stops = Tour.usable(all);
  let i = 0; // state: which stop is selected

  // 2. Show the selected stop's details (works even if the globe fails).
  function show() {
    if (!stops.length) { $('name').textContent = 'No usable stops yet'; $('desc').textContent = 'Fix the records in places.js.'; return; }
    const p = stops[i];
    $('count').textContent = `Stop ${i + 1} of ${stops.length}`;
    $('name').textContent = p.name;
    $('desc').textContent = p.description;
    $('source').textContent = `Source: ${p.source} · Checked: ${p.checked}`;
    const img = $('photo');
    if (p.photo) {
      img.src = p.photo;
      img.alt = p.photoAlt || '';
      img.hidden = false;
      $('photo-open').hidden = false;
      $('photo-caption').textContent = p.photoAlt || '';
      $('photo-caption').hidden = !p.photoAlt;
      $('nophoto').hidden = true;
    } else {
      img.hidden = true;
      img.removeAttribute('src');
      $('photo-open').hidden = true;
      $('photo-caption').textContent = '';
      $('photo-caption').hidden = true;
      $('nophoto').hidden = false;
    }
    if (viewer) {
      viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(p.lon, p.lat, 1500), duration: 2 });
      markers.forEach((m, n) => { m.point.color = n === i ? Cesium.Color.GOLD : Cesium.Color.WHITE; });
    }
  }

  $('next').onclick = () => { i = Tour.nextIndex(i, stops.length); show(); };
  $('prev').onclick = () => { i = Tour.prevIndex(i, stops.length); show(); };

  document.querySelectorAll('[data-city]').forEach(button => {
    button.onclick = () => {
      const city = button.dataset.city;
      const target = Tour.firstIndexForCity(stops, city);
      if (target === -1) {
        $('city-status').textContent = `No usable stops for ${city} yet. Verify coordinates, source, and checked date in places.js.`;
        return;
      }
      $('city-status').textContent = '';
      i = target;
      show();
    };
  });

  // Enlarged photo: fit first, wheel zoom, and pointer-drag panning.
  const photoDialog = $('photo-dialog');
  const viewport = $('photo-viewport');
  const large = $('photo-large');
  let scale = 1, offsetX = 0, offsetY = 0, fitWidth = 0, fitHeight = 0;
  let drag = null;

  function drawPhoto() {
    const limitX = Math.max(0, (fitWidth * scale - viewport.clientWidth) / 2);
    const limitY = Math.max(0, (fitHeight * scale - viewport.clientHeight) / 2);
    offsetX = Math.max(-limitX, Math.min(limitX, offsetX));
    offsetY = Math.max(-limitY, Math.min(limitY, offsetY));
    large.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    viewport.classList.toggle('zoomed', scale > 1);
    $('photo-zoom-level').textContent = `${Math.round(scale * 100)}%`;
  }

  function fitPhoto() {
    if (!photoDialog.open || !large.naturalWidth || !viewport.clientWidth) return;
    const ratio = Math.min(viewport.clientWidth / large.naturalWidth,
                           viewport.clientHeight / large.naturalHeight);
    fitWidth = large.naturalWidth * ratio;
    fitHeight = large.naturalHeight * ratio;
    large.style.width = `${fitWidth}px`;
    large.style.height = `${fitHeight}px`;
    scale = 1;
    offsetX = offsetY = 0;
    drawPhoto();
  }

  function zoomPhoto(nextScale, x = 0, y = 0) {
    if (!fitWidth) return;
    const next = Math.max(1, Math.min(8, nextScale));
    const ratio = next / scale;
    offsetX = x - (x - offsetX) * ratio;
    offsetY = y - (y - offsetY) * ratio;
    scale = next;
    drawPhoto();
  }

  large.addEventListener('load', fitPhoto);
  $('photo-open').onclick = () => {
    const img = $('photo');
    if (img.hidden || !img.getAttribute('src')) return;
    fitWidth = fitHeight = 0;
    scale = 1;
    offsetX = offsetY = 0;
    large.style.width = large.style.height = '0px';
    large.style.transform = '';
    viewport.classList.remove('zoomed');
    $('photo-zoom-level').textContent = '100%';
    large.alt = img.alt;
    $('photo-large-caption').textContent = img.alt;
    $('photo-large-caption').hidden = !img.alt;
    photoDialog.showModal();
    large.src = img.src;
    if (large.complete && large.naturalWidth) fitPhoto();
  };
  $('photo-close').onclick = () => photoDialog.close();
  $('photo-fit').onclick = fitPhoto;
  $('photo-zoom-in').onclick = () => zoomPhoto(scale * 1.25);
  $('photo-zoom-out').onclick = () => zoomPhoto(scale / 1.25);
  viewport.addEventListener('wheel', event => {
    event.preventDefault();
    const box = viewport.getBoundingClientRect();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? box.height : 1);
    zoomPhoto(scale * Math.exp(-Math.max(-300, Math.min(300, delta)) * 0.002),
      event.clientX - box.left - box.width / 2,
      event.clientY - box.top - box.height / 2);
  }, { passive: false });
  viewport.addEventListener('pointerdown', event => {
    if (event.button !== 0 || scale <= 1 || drag) return;
    event.preventDefault();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    offsetX += event.clientX - drag.x;
    offsetY += event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drawPhoto();
  });
  function endDrag() {
    const id = drag && drag.id;
    drag = null;
    viewport.classList.remove('dragging');
    if (id != null && viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  viewport.addEventListener('keydown', event => {
    const step = 40;
    if (event.key === '+' || event.key === '=') zoomPhoto(scale * 1.25);
    else if (event.key === '-') zoomPhoto(scale / 1.25);
    else if (event.key === '0') fitPhoto();
    else if (event.key === 'ArrowLeft') { offsetX += step; drawPhoto(); }
    else if (event.key === 'ArrowRight') { offsetX -= step; drawPhoto(); }
    else if (event.key === 'ArrowUp') { offsetY += step; drawPhoto(); }
    else if (event.key === 'ArrowDown') { offsetY -= step; drawPhoto(); }
    else return;
    event.preventDefault();
  });
  photoDialog.addEventListener('click', event => {
    const box = photoDialog.getBoundingClientRect();
    if (event.target === photoDialog &&
        (event.clientX < box.left || event.clientX > box.right ||
         event.clientY < box.top || event.clientY > box.bottom)) photoDialog.close();
  });
  photoDialog.addEventListener('close', () => {
    endDrag();
    large.removeAttribute('src');
    fitWidth = fitHeight = 0;
  });
  new ResizeObserver(() => { if (photoDialog.open) fitPhoto(); }).observe(viewport);

  // 3. The globe (optional layer on top of working data and buttons).
  let viewer = null, markers = [];
  if (typeof Cesium === 'undefined') {
    $('message').textContent = 'Cesium did not load. The stop list still works; check internet or CDN access for the globe.';
  } else {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IlVYQzFSdjF1akZJUFdKcXIiLCJqdGkiOiIwZDQ1NDZjNi00NGZkLTRkMDEtODU3Ny1mNjVlOTcyMzYxZmEiLCJpZCI6NTA1NzQwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3OTAxNjk5NTZ9._sjN4xuJk6yQCt5tlJ1PgTWcxNhBVJI1M3EIY3_dByg';
    try {
      viewer = new Cesium.Viewer('globe', {
        baseLayer: false, baseLayerPicker: false, geocoder: false, animation: false,
        timeline: false, homeButton: false, sceneModePicker: false, navigationHelpButton: false,
        fullscreenButton: false, infoBox: false, selectionIndicator: false,
        terrainProvider: new Cesium.EllipsoidTerrainProvider()
      });
      viewer.imageryLayers.add(
 	 Cesium.ImageryLayer.fromWorldImagery({
  	  style: Cesium.IonWorldImageryStyle.AERIAL
  	  })
	);
      markers = stops.map((p, n) => viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(p.lon, p.lat, 0),   // longitude FIRST
        point: { pixelSize: 14, color: Cesium.Color.WHITE, outlineColor: Cesium.Color.BLACK, outlineWidth: 2 },
        label: { text: `${n + 1}. ${p.name}`, font: '14px sans-serif', pixelOffset: new Cesium.Cartesian2(0, -24), showBackground: true }
      }));
      $('message').textContent = '';
    } catch (e) {
      viewer = null;
      $('message').textContent = 'The globe could not start (WebGL?). The stop list still works.';
      console.error(e);
    }
  }
  show();
})();
