;(async function () {
  function ck(n) {
    var c = document.cookie.split('; ').find(function (x) { return x.indexOf(n + '=') === 0; });
    return c ? c.split('=')[1] : '';
  }
  var me = ck('ds_user_id'), csrf = ck('csrftoken');
  var H = {
    'x-ig-app-id': '936619743392459',
    'x-csrftoken': csrf,
    'x-requested-with': 'XMLHttpRequest'
  };
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var old = document.getElementById('ig-unfollow-ui');
  if (old) old.remove();

  var ui = document.createElement('div');
  ui.id = 'ig-unfollow-ui';
  ui.innerHTML = [
    '<style>',
    '#ig-unfollow-ui{position:fixed;inset:0;z-index:2147483647;background:#0b0b0f;color:#f5f5f7;font:15px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;display:flex;flex-direction:column}',
    '#ig-unfollow-ui *{box-sizing:border-box}',
    '#ig-unfollow-ui .bar{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 22px;border-bottom:1px solid #222;background:#111}',
    '#ig-unfollow-ui .brand h1{margin:0;font-size:18px;font-weight:700;color:#ffffff}',
    '#ig-unfollow-ui .brand .ads{margin-top:6px;font-size:12px;color:#8e8e93;line-height:1.5}',
    '#ig-unfollow-ui .brand .ads a{color:#ff9f0a;text-decoration:none;font-weight:600}',
    '#ig-unfollow-ui .brand .ads a:hover{text-decoration:underline}',
    '#ig-unfollow-ui .x{background:transparent;border:0;color:#aaa;font-size:28px;cursor:pointer;line-height:1;padding:0 6px;flex-shrink:0}',
    '#ig-unfollow-ui .x:hover{color:#fff}',
    '#ig-unfollow-ui .body{flex:1;overflow:auto;padding:28px 24px 40px;max-width:760px;margin:0 auto;width:100%}',
    '#ig-unfollow-ui .stat{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:22px}',
    '#ig-unfollow-ui .card{background:#16161c;border:1px solid #2a2a32;border-radius:14px;padding:16px 18px}',
    '#ig-unfollow-ui .card .l{color:#8e8e93;font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}',
    '#ig-unfollow-ui .card .v{font-size:28px;font-weight:700;color:#ffffff}',
    '#ig-unfollow-ui .prog{height:10px;background:#222;border-radius:999px;overflow:hidden;margin:8px 0 18px}',
    '#ig-unfollow-ui .prog > i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff375f,#ff9f0a);transition:width .25s}',
    '#ig-unfollow-ui .msg{color:#aeaeb2;margin-bottom:14px;min-height:1.4em}',
    '#ig-unfollow-ui .list{display:flex;flex-direction:column;gap:8px}',
    '#ig-unfollow-ui .row{display:flex;align-items:center;gap:12px;background:#16161c;border:1px solid #2a2a32;border-radius:12px;padding:10px 12px}',
    '#ig-unfollow-ui .av{width:44px;height:44px;border-radius:50%;object-fit:cover;background:#2a2a32;flex-shrink:0}',
    '#ig-unfollow-ui .meta{flex:1;min-width:0}',
    '#ig-unfollow-ui .uname{display:flex;align-items:center;gap:6px;flex-wrap:wrap}',
    '#ig-unfollow-ui .uname a{color:#fff;text-decoration:none;font-weight:700}',
    '#ig-unfollow-ui .uname a:hover{color:#ff9f0a}',
    '#ig-unfollow-ui .badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#8e8e93;background:#222;border-radius:999px;padding:2px 8px}',
    '#ig-unfollow-ui .badge.ver{color:#3897f0;background:rgba(56,151,240,.12)}',
    '#ig-unfollow-ui .badge.lock{color:#ff9f0a;background:rgba(255,159,10,.12)}',
    '#ig-unfollow-ui .fullname{color:#8e8e93;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}',
    '#ig-unfollow-ui button.uf{background:#2a2a32;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-weight:700;cursor:pointer;flex-shrink:0;white-space:nowrap}',
    '#ig-unfollow-ui button.uf:hover{background:#ff375f}',
    '#ig-unfollow-ui button.uf:disabled{opacity:.45;cursor:default}',
    '#ig-unfollow-ui button.uf.done{background:#1c3a2a;color:#30d158}',
    '#ig-unfollow-ui .btns{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}',
    '#ig-unfollow-ui button.act{background:#ff375f;color:#fff;border:0;border-radius:12px;padding:12px 18px;font-weight:700;cursor:pointer}',
    '#ig-unfollow-ui button.act.sec{background:#2a2a32}',
    '#ig-unfollow-ui button.act:disabled{opacity:.45;cursor:default}',
    '#ig-unfollow-ui .empty{color:#636366;padding:24px 0;text-align:center}',
    '</style>',
    '<div class="bar">',
    '  <div class="brand">',
    '    <h1>Takip etmeyenler</h1>',
    '    <div class="ads">Instagram <a href="https://instagram.com/okansariogluyt/" target="_blank" rel="noopener">okansariogluyt</a> · Twitter <a href="https://x.com/okansariogluyt" target="_blank" rel="noopener">okansariogluyt</a></div>',
    '  </div>',
    '  <button class="x" type="button" title="Kapat">×</button>',
    '</div>',
    '<div class="body">',
    '  <div class="stat">',
    '    <div class="card"><div class="l">Takip edilen</div><div class="v" id="ig-f">0</div></div>',
    '    <div class="card"><div class="l">Geri takip yok</div><div class="v" id="ig-n">0</div></div>',
    '  </div>',
    '  <div class="prog"><i id="ig-bar"></i></div>',
    '  <div class="msg" id="ig-msg">Başlıyor…</div>',
    '  <div class="list" id="ig-list"></div>',
    '  <div class="btns">',
    '    <button class="act" id="ig-copy" type="button" disabled>Listeyi kopyala</button>',
    '    <button class="act sec" id="ig-stop" type="button">Durdur</button>',
    '  </div>',
    '</div>'
  ].join('');
  document.documentElement.appendChild(ui);

  var elF = document.getElementById('ig-f');
  var elN = document.getElementById('ig-n');
  var elBar = document.getElementById('ig-bar');
  var elMsg = document.getElementById('ig-msg');
  var elList = document.getElementById('ig-list');
  var btnCopy = document.getElementById('ig-copy');
  var btnStop = document.getElementById('ig-stop');
  var stopped = false;
  var sonuc = [];

  ui.querySelector('.x').onclick = function () { stopped = true; ui.remove(); };
  btnStop.onclick = function () {
    stopped = true;
    elMsg.textContent = 'Durduruldu.';
    btnStop.disabled = true;
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function placeholderAv(username) {
    var letter = (username || '?').charAt(0).toUpperCase();
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88">' +
      '<rect width="88" height="88" rx="44" fill="#2a2a32"/>' +
      '<text x="50%" y="54%" text-anchor="middle" fill="#aeaeb2" font-size="36" font-family="-apple-system,sans-serif" dy=".1em">' +
      letter + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function picUrl(u) {
    return u.profile_pic_url_hd || u.profile_pic_url || u.hd_profile_pic_url_info && u.hd_profile_pic_url_info.url || '';
  }

  function addRow(u) {
    var row = document.createElement('div');
    row.className = 'row';
    var av = picUrl(u);
    var verified = !!(u.is_verified);
    var priv = !!(u.is_private);
    var name = u.full_name || '';
    var badges = '';
    if (verified) badges += '<span class="badge ver" title="Onaylı">✓ Onaylı</span>';
    if (priv) badges += '<span class="badge lock" title="Gizli hesap">🔒 Gizli</span>';

    var img = document.createElement('img');
    img.className = 'av';
    img.alt = '';
    img.decoding = 'async';
    img.src = placeholderAv(u.username);

    function loadPic(url) {
      return new Promise(function (resolve) {
        if (!url) return resolve(false);
        var done = false;
        function finish(ok) { if (done) return; done = true; resolve(ok); }
        img.onload = function () { finish(true); };
        img.onerror = function () { finish(false); };
        img.referrerPolicy = 'no-referrer';
        img.src = url;
      });
    }

    (async function () {
      var url = av;
      if (!await loadPic(url)) {
        try {
          var rr = await fetch('/api/v1/users/' + u.pk + '/info/', { headers: H, credentials: 'include' });
          if (rr.ok) {
            var jj = await rr.json();
            var uu = jj.user || jj;
            url = picUrl(uu);
            if (url) u.profile_pic_url = url;
          }
        } catch (e) {}
        if (!await loadPic(url)) img.src = placeholderAv(u.username);
      }
    })();

    var meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML =
      '<div class="uname">' +
      '<a href="https://instagram.com/' + esc(u.username) + '/" target="_blank" rel="noopener">@' + esc(u.username) + '</a>' +
      badges +
      '</div>' +
      (name ? '<div class="fullname">' + esc(name) + '</div>' : '');

    var btn = document.createElement('button');
    btn.className = 'uf';
    btn.type = 'button';
    btn.textContent = 'Takibi bırak';

    row.appendChild(img);
    row.appendChild(meta);
    row.appendChild(btn);
    btn.onclick = async function () {
      btn.disabled = true;
      btn.textContent = '…';
      try {
        var fd = new FormData();
        fd.append('user_id', String(u.pk));
        fd.append('container_module', 'profile');
        var r = await fetch('/api/v1/friendships/destroy/' + u.pk + '/', {
          method: 'POST',
          headers: H,
          credentials: 'include',
          body: fd
        });
        if (!r.ok) throw new Error(String(r.status));
        btn.textContent = 'Bırakıldı';
        btn.classList.add('done');
        elMsg.textContent = '@' + u.username + ' takipten çıkarıldı.';
      } catch (e) {
        btn.disabled = false;
        btn.textContent = 'Takibi bırak';
        elMsg.textContent = 'Takip bırakılamadı (@' + u.username + '): ' + e.message;
      }
    };
    elList.appendChild(row);
  }

  var following = [], maxId = '';
  elMsg.textContent = 'Takip listen çekiliyor…';
  try {
    do {
      if (stopped) return;
      var url = '/api/v1/friendships/' + me + '/following/?count=200';
      if (maxId) url += '&max_id=' + maxId;
      var r = await fetch(url, { headers: H, credentials: 'include' });
      if (!r.ok) throw new Error('Takip listesi alınamadı (' + r.status + ')');
      var j = await r.json();
      following = following.concat(j.users || []);
      maxId = j.next_max_id || '';
      elF.textContent = String(following.length);
      elMsg.textContent = 'Takip edilen: ' + following.length;
      await wait(1000);
    } while (maxId);
  } catch (e) {
    elMsg.textContent = 'Hata: ' + e.message;
    return;
  }

  elMsg.textContent = 'Kontrol ediliyor…';
  for (var i = 0; i < following.length; i++) {
    if (stopped) break;
    var u = following[i];
    try {
      var r2 = await fetch('/api/v1/friendships/show/' + u.pk + '/', { headers: H, credentials: 'include' });
      if (r2.status === 429) {
        elMsg.textContent = 'Rate limit — 60 sn bekleniyor…';
        await wait(60000);
        i--;
        continue;
      }
      if (!r2.ok) throw new Error('status ' + r2.status);
      var s = await r2.json();
      if (!s.followed_by) {
        sonuc.push(u);
        elN.textContent = String(sonuc.length);
        addRow(u);
      }
    } catch (e) {
      elMsg.textContent = 'Uyarı: @' + u.username + ' atlandı (' + e.message + ')';
    }
    var pct = Math.round(((i + 1) / following.length) * 100);
    elBar.style.width = pct + '%';
    elMsg.textContent = (i + 1) + ' / ' + following.length + ' · geri takip yok: ' + sonuc.length;
    await wait(700);
  }

  if (!stopped) {
    elMsg.textContent = 'Bitti. Seni takip etmeyen: ' + sonuc.length;
    elBar.style.width = '100%';
  }
  btnStop.disabled = true;
  if (sonuc.length) {
    btnCopy.disabled = false;
    btnCopy.onclick = function () {
      var t = sonuc.map(function (u) { return u.username; }).join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { elMsg.textContent = 'Panoya kopyalandı.'; });
      } else {
        var ta = document.createElement('textarea');
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        elMsg.textContent = 'Panoya kopyalandı.';
      }
    };
  } else if (!stopped) {
    elList.innerHTML = '<div class="empty">Hepsi seni geri takip ediyor.</div>';
  }
})();
