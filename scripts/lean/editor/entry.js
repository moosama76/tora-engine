/* global document,location,URLSearchParams,fetch */
const query = new URLSearchParams(location.search);
const project = query.get('project');

function showBootError(error) {
  document.body.className = 'tora-review';
  document.body.innerHTML = `
    <main class="tora-creator-wrap">
      <div class="tora-creator-card">
        <h2>Tora editor needs a server restart</h2>
        <p>${String(error?.message ?? error).replace(/[<>&]/g, '')}</p>
        <p>Stop and re-run <code>npm run dev:editor</code> in your terminal, then refresh this page.</p>
      </div>
    </main>
  `;
}

async function fetchReviewMetadata(projectId) {
  const projectURL = '/api/projects/' + encodeURIComponent(projectId);
  return fetch(projectURL + '/review', {cache: 'no-store'})
    .then(response => response.ok ? response.json() : undefined)
    .catch(() => undefined);
}

async function tryOpenDemo(projectId) {
  const res = await fetch('/api/demos/open', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: projectId}),
  }).catch(() => undefined);
  if (!res?.ok) return undefined;
  return res.json().catch(() => undefined);
}

try {
  if (query.get('view') === 'new' || !project) {
    const {openIntake} = await import('./review-intake.js');
    await openIntake(query.get('intake'));
  } else {
    let activeId = project;
    let metadata = await fetchReviewMetadata(activeId);
    if (!metadata) {
      const opened = await tryOpenDemo(activeId);
      if (opened?.projectId) {
        activeId = opened.projectId;
        if (activeId !== project) {
          query.set('project', activeId);
          globalThis.history.replaceState(null, '', '?' + query);
        }
        metadata = await fetchReviewMetadata(activeId);
      }
    }
    if (metadata) {
      const {openReview} = await import('./review-editor.js');
      await openReview(activeId, metadata);
    } else {
      const {openIntake} = await import('./review-intake.js');
      await openIntake(query.get('intake'));
    }
  }
} catch (error) {
  showBootError(error);
}
