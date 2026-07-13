// Адрес API бэкенда. Поменяйте при деплое.
const API = 'https://mmm-backend-lwnf.onrender.com/api';

const ADMIN_KEY_STORAGE = 'mmm_admin_key';

function getAdminKey() {
  return sessionStorage.getItem(ADMIN_KEY_STORAGE) || '';
}

function setAdminKey(key) {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
}

function clearAdminKey() {
  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
}


const STATUS_LABELS = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Готово',
  rejected: 'Отклонено',
};

let currentStatus = '';
let currentSearch = '';
let searchTimer = null;

const tableBody = document.getElementById('tableBody');
const statsEl = document.getElementById('stats');
const apiStatus = document.getElementById('apiStatus');
const modal = document.getElementById('modal');
const form = document.getElementById('appForm');
const formError = document.getElementById('formError');

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function toast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (isError ? ' error' : '');
  t.hidden = false;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => (t.hidden = true), 2600);
}

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json', 'x-admin-key': getAdminKey() },
    ...options,
  });
  if (res.status === 401) {
    clearAdminKey();
    showLogin('Неверный ключ доступа. Попробуйте снова.');
    throw new Error('Требуется вход');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Ошибка ${res.status}`);
  return data;
}

async function loadApplications() {
  const params = new URLSearchParams();
  if (currentStatus) params.set('status', currentStatus);
  if (currentSearch) params.set('search', currentSearch);

  try {
    const { items } = await api('/applications?' + params.toString());
    renderTable(items);
    renderStats(items);
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="8" class="empty">Ошибка загрузки: ${esc(err.message)}</td></tr>`;
  }
}

function renderTable(items) {
  if (!items.length) {
    tableBody.innerHTML = `<tr><td colspan="8" class="empty">Заявок нет</td></tr>`;
    return;
  }

  tableBody.innerHTML = items
    .map(
      (a) => `
    <tr data-id="${a._id}">
      <td><b>${esc(a.name)}</b></td>
      <td>${esc(a.phone)}</td>
      <td>${esc(a.email) || '—'}</td>
      <td>${esc(a.project) || '—'}</td>
      <td class="msg" title="${esc(a.message)}">${esc(a.message) || '—'}</td>
      <td>
        <select class="status-select" data-id="${a._id}">
          ${Object.entries(STATUS_LABELS)
            .map(([v, l]) => `<option value="${v}" ${a.status === v ? 'selected' : ''}>${l}</option>`)
            .join('')}
        </select>
      </td>
      <td>${fmtDate(a.createdAt)}</td>
      <td>
        <div class="row-actions">
          <button class="btn small edit-btn" data-id="${a._id}">✎</button>
          <button class="btn small danger del-btn" data-id="${a._id}">🗑</button>
        </div>
      </td>
    </tr>`
    )
    .join('');

  window._apps = Object.fromEntries(items.map((a) => [a._id, a]));
}

function renderStats(items) {
  const counts = { new: 0, in_progress: 0, done: 0, rejected: 0 };
  items.forEach((a) => (counts[a.status] = (counts[a.status] || 0) + 1));
  statsEl.innerHTML = `
    <div class="stat"><b>${items.length}</b><span>Всего показано</span></div>
    <div class="stat"><b>${counts.new}</b><span>Новые</span></div>
    <div class="stat"><b>${counts.in_progress}</b><span>В работе</span></div>
    <div class="stat"><b>${counts.done}</b><span>Готово</span></div>
    <div class="stat"><b>${counts.rejected}</b><span>Отклонено</span></div>`;
}

function openModal(app = null) {
  form.reset();
  formError.textContent = '';
  document.getElementById('appId').value = app?._id || '';
  document.getElementById('modalTitle').textContent = app ? 'Редактировать заявку' : 'Новая заявка';
  if (app) {
    document.getElementById('fName').value = app.name || '';
    document.getElementById('fPhone').value = app.phone || '';
    document.getElementById('fEmail').value = app.email || '';
    document.getElementById('fProject').value = app.project || '';
    document.getElementById('fMessage').value = app.message || '';
    document.getElementById('fStatus').value = app.status || 'new';
  }
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

document.getElementById('newBtn').addEventListener('click', () => openModal());
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.textContent = '';
  const id = document.getElementById('appId').value;
  const payload = {
    name: document.getElementById('fName').value.trim(),
    phone: document.getElementById('fPhone').value.trim(),
    email: document.getElementById('fEmail').value.trim(),
    project: document.getElementById('fProject').value.trim(),
    message: document.getElementById('fMessage').value.trim(),
    status: document.getElementById('fStatus').value,
  };

  try {
    if (id) {
      await api('/applications/' + id, { method: 'PATCH', body: JSON.stringify(payload) });
      toast('Заявка обновлена');
    } else {
      await api('/applications', { method: 'POST', body: JSON.stringify(payload) });
      toast('Заявка создана');
    }
    closeModal();
    loadApplications();
  } catch (err) {
    formError.textContent = err.message;
  }
});

tableBody.addEventListener('click', async (e) => {
  const editId = e.target.closest('.edit-btn')?.dataset.id;
  const delId = e.target.closest('.del-btn')?.dataset.id;

  if (editId) openModal(window._apps[editId]);

  if (delId) {
    if (!confirm('Удалить заявку?')) return;
    try {
      await api('/applications/' + delId, { method: 'DELETE' });
      toast('Заявка удалена');
      loadApplications();
    } catch (err) {
      toast(err.message, true);
    }
  }
});

tableBody.addEventListener('change', async (e) => {
  const sel = e.target.closest('.status-select');
  if (!sel) return;
  try {
    await api('/applications/' + sel.dataset.id, {
      method: 'PATCH',
      body: JSON.stringify({ status: sel.value }),
    });
    toast('Статус обновлён');
    loadApplications();
  } catch (err) {
    toast(err.message, true);
    loadApplications();
  }
});

document.getElementById('statusFilters').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  currentStatus = chip.dataset.status;
  loadApplications();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearch = e.target.value.trim();
    loadApplications();
  }, 300);
});

async function checkHealth() {
  try {
    const h = await api('/health');
    apiStatus.textContent = h.db === 'connected' ? 'API и БД подключены' : 'API работает, БД отключена';
    apiStatus.style.color = h.db === 'connected' ? '#1c8a45' : '#b26a00';
  } catch {
    apiStatus.textContent = 'Нет связи с API (' + API + ')';
    apiStatus.style.color = '#c0392b';
  }
}

const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const loginKeyInput = document.getElementById('loginKey');
const loginError = document.getElementById('loginError');
const appRoot = document.getElementById('appRoot');

function showLogin(message = '') {
  appRoot.hidden = true;
  loginOverlay.hidden = false;
  loginError.textContent = message;
  loginKeyInput.value = '';
  loginKeyInput.focus();
}

function showApp() {
  loginOverlay.hidden = true;
  appRoot.hidden = false;
}

async function tryEnterApp() {
  showApp();
  await checkHealth();
  try {
    await loadApplications();
  } catch {
    // ошибка уже обработана внутри api()/loadApplications()
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setAdminKey(loginKeyInput.value.trim());
  await tryEnterApp();
});

if (getAdminKey()) {
  tryEnterApp();
} else {
  showLogin();
}