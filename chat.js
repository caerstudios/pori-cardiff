/* ============================================================
   PORI CARDIFF — CHAT WIDGET
   chat.js
============================================================ */
(function () {
  'use strict';

  var REPLIES = {
    menu: {
      label: '🍳 View our menu',
      response: 'Our full menu is available on this page — scroll down to explore our brunch dishes, sandos, and drinks. Something for everyone 🙌'
    },
    booking: {
      label: '📅 Make a booking',
      response: "We'd love to have you! Head to our Reserve a Table section to pick your date, time, and party size."
    },
    find: {
      label: '📍 Find us',
      response: "We're at 4 Trade Street, Cardiff, CF10 5DR — just behind Cardiff Central station. Easy to find, worth the walk 📍"
    },
    hours: {
      label: '⏰ Opening hours',
      response: "We're open Tuesday to Sunday for brunch and lunch. Check our Google listing for the latest hours as these may vary."
    }
  };

  function injectWidget() {
    // Trigger button
    var trigger = document.createElement('button');
    trigger.className = 'pori-chat-trigger';
    trigger.id = 'pori-chat-trigger';
    trigger.setAttribute('aria-label', 'Chat with Pori Cardiff');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML =
      '<span class="pori-chat-trigger-icon" aria-hidden="true">🥯</span>' +
      '<span class="pori-chat-dot" id="pori-chat-dot" aria-hidden="true"></span>';

    // Panel
    var panel = document.createElement('div');
    panel.className = 'pori-chat-panel';
    panel.id = 'pori-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Pori Cardiff chat');
    panel.setAttribute('aria-hidden', 'true');

    panel.innerHTML =
      '<div class="pori-chat-header">' +
        '<div class="pori-chat-header-left">' +
          '<div class="pori-chat-header-logo" id="pori-chat-logo-wrap">' +
            '<img src="images/pori-logo.png" alt="Pori Cardiff" id="pori-chat-logo-img" ' +
                 'onerror="document.getElementById(\'pori-chat-logo-img\').style.display=\'none\';" ' +
                 'style="width:28px;height:28px;object-fit:contain;display:block;">' +
          '</div>' +
          '<div>' +
            '<span class="pori-chat-header-name">Pori Cardiff</span>' +
            '<span class="pori-chat-header-sub">Chat with us</span>' +
          '</div>' +
        '</div>' +
        '<button class="pori-chat-close" id="pori-chat-close" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div class="pori-chat-body" id="pori-chat-body"></div>' +
      '<div class="pori-chat-footer"><span>Powered by Pori</span></div>';

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    var dot = document.getElementById('pori-chat-dot');
    var body = document.getElementById('pori-chat-body');
    var isOpen = false;

    function openChat() {
      isOpen = true;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      dot.classList.add('hidden');
      if (body.children.length === 0) showOpening();
      setTimeout(function () { scrollBottom(); }, 50);
    }

    function closeChat() {
      isOpen = false;
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function () {
      if (isOpen) { closeChat(); } else { openChat(); }
    });

    document.getElementById('pori-chat-close').addEventListener('click', closeChat);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeChat();
    });

    function addMsg(text, who) {
      var m = document.createElement('div');
      m.className = 'pori-msg pori-msg--' + who;
      m.textContent = text;
      body.appendChild(m);
      scrollBottom();
    }

    function showOpening() {
      addMsg('Hi there 👋 Welcome to Pori Cardiff. How can we help you today?', 'bot');
      showQuickReplies();
    }

    function showQuickReplies() {
      var wrap = document.createElement('div');
      wrap.className = 'pori-chat-qr';
      wrap.id = 'pori-chat-qr';

      Object.keys(REPLIES).forEach(function (key) {
        var btn = document.createElement('button');
        btn.className = 'pori-chat-qr-btn';
        btn.textContent = REPLIES[key].label;
        btn.addEventListener('click', function () { handleReply(key); });
        wrap.appendChild(btn);
      });

      body.appendChild(wrap);
      scrollBottom();
    }

    function handleReply(key) {
      var qr = document.getElementById('pori-chat-qr');
      if (qr) qr.remove();

      addMsg(REPLIES[key].label, 'user');

      setTimeout(function () {
        addMsg(REPLIES[key].response, 'bot');
        showFollowUp();
      }, 320);
    }

    function showFollowUp() {
      var wrap = document.createElement('div');
      wrap.className = 'pori-chat-followup';

      var text = document.createElement('span');
      text.className = 'pori-chat-followup-text';
      text.textContent = 'Anything else we can help with?';

      var restart = document.createElement('button');
      restart.className = 'pori-chat-restart';
      restart.textContent = 'Start over';
      restart.addEventListener('click', function () {
        while (body.firstChild) body.removeChild(body.firstChild);
        showOpening();
      });

      wrap.appendChild(text);
      wrap.appendChild(restart);
      body.appendChild(wrap);
      scrollBottom();
    }

    function scrollBottom() {
      body.scrollTop = body.scrollHeight;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();
