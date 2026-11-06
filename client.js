window.__ModuleLoader__.load({
  id: 'dsh-reminder-timeline',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'reminder.timeline';
    const PANEL_ID = 'reminders';
    const STYLE_ATTR = 'dsh-reminder-timeline';
    const PREFS_KEY = 'dsh-reminder-timeline.prefs.v1';
    const WATERMARK_KEY = 'dsh-reminder-timeline.delivery-watermark.v1';
    const SEEN_KEY = 'dsh-reminder-timeline.seen-watermark.v1';
    const DEFAULT_PREFS = { toastOnDelivery: true, capsuleEnabled: true };

    /* ---------------------------------------------------------------- locale */

    const DICTIONARIES = {
      zh: {
        'panel.label': '提醒',
        'page.title': '提醒',
        'page.activeCount': '{n} 条进行中',
        'page.pausedCount': '{n} 条已暂停',
        'page.nextLine': '下一条在 {countdown}',
        'footer.hint': '共 {n} 条提醒 · 由「自动化任务」创建，也可以在聊天里说「提醒我…」',
        'state.loading': '正在读取提醒…',
        'state.error': '读取提醒失败（{code}）',
        'state.empty': '还没有定时提醒',
        'state.emptyHint': '在聊天里让 Agent 设置提醒，或到「自动化任务」页面创建。',
        'section.active': '进行中',
        'section.paused': '已暂停',
        'section.ended': '已结束',
        'bucket.today': '今天',
        'bucket.tomorrow': '明天',
        'bucket.week': '7 天内',
        'bucket.later': '更远',
        'action.refresh': '刷新',
        'action.retry': '重试',
        'action.openSession': '打开会话',
        'prefs.delivery': '到点横幅',
        'prefs.capsule': '悬浮胶囊',
        'capsule.aria': '下一条提醒：{title}，{countdown}',
        'capsule.lead': '下一条',
        'status.active': '进行中',
        'status.paused': '已暂停',
        'status.ended': '已结束',
        'status.delivering': '投递中',
        'countdown.days': '{d} 天 {h} 小时后',
        'countdown.hours': '{h} 小时 {m} 分后',
        'countdown.minutes': '{m} 分钟后',
        'countdown.soon': '即将触发',
        'countdown.past': '已到时间，等待投递',
        'countdown.unknown': '时间未知',
        'target.session': '投递到当前会话',
        'target.newOnce': '投递到固定新会话',
        'target.new': '每次新建会话',
        'target.unknown': '会话',
        'last.never': '尚未投递',
        'last.delivered': '上次投递 {time}',
        'rule.once': '一次性',
        'rule.daily': '每天 {time}',
        'rule.everyDays': '每 {n} 天 {time}',
        'rule.weekly': '每周 {days} {time}',
        'rule.weeklyNoDay': '每周',
        'rule.everyWeeks': '每 {n} 周 {days} {time}',
        'rule.monthly': '每月 {time}',
        'rule.monthlyDay': '每月 {day} 日 {time}',
        'rule.monthlyLast': '每月最后一个{day} {time}',
        'rule.yearly': '每年 {time}',
        'rule.hourly': '每 {n} 小时',
        'rule.minutely': '每 {n} 分钟',
        'rule.everySeconds': '每 {n}',
        'rule.cron': 'Cron：{expr}',
        'rule.raw': '{rule}',
        'rule.custom': '自定义重复',
        'rule.count': '共 {n} 次',
        'rule.until': '至 {date}',
        'toast.delivered.title': '提醒已触发',
        'toast.openSession': '打开会话',
        'toast.openPanel': '查看提醒',
        'toast.dismiss': '关闭提醒',
        'common.untitled': '未命名提醒',
        'common.unknownTime': '时间未知',
        'common.unknown': '未知',
        'unit.days': '{n} 天',
        'unit.hours': '{n} 小时',
        'unit.minutes': '{n} 分钟',
        'unit.seconds': '{n} 秒',
        'list.separator': '、',
      },
      en: {
        'panel.label': 'Reminders',
        'page.title': 'Reminders',
        'page.activeCount': '{n} active',
        'page.pausedCount': '{n} paused',
        'page.nextLine': 'next {countdown}',
        'footer.hint': '{n} reminders · created on the Automation tasks page, or just ask in chat',
        'state.loading': 'Loading reminders…',
        'state.error': 'Could not load reminders ({code})',
        'state.empty': 'No reminders scheduled yet',
        'state.emptyHint': 'Ask the Agent to schedule a reminder in chat, or create one on the Automation tasks page.',
        'section.active': 'Active',
        'section.paused': 'Paused',
        'section.ended': 'Ended',
        'bucket.today': 'Today',
        'bucket.tomorrow': 'Tomorrow',
        'bucket.week': 'Next 7 days',
        'bucket.later': 'Later',
        'action.refresh': 'Refresh',
        'action.retry': 'Retry',
        'action.openSession': 'Open conversation',
        'prefs.delivery': 'Delivery banner',
        'prefs.capsule': 'Floating pill',
        'capsule.aria': 'Next reminder: {title}, {countdown}',
        'capsule.lead': 'Next',
        'status.active': 'Active',
        'status.paused': 'Paused',
        'status.ended': 'Ended',
        'status.delivering': 'Delivering',
        'countdown.days': 'in {d}d {h}h',
        'countdown.hours': 'in {h}h {m}m',
        'countdown.minutes': 'in {m}m',
        'countdown.soon': 'due now',
        'countdown.past': 'due, waiting for delivery',
        'countdown.unknown': 'time unknown',
        'target.session': 'Delivers to this conversation',
        'target.newOnce': 'Delivers to a reused conversation',
        'target.new': 'New conversation each run',
        'target.unknown': 'Conversation',
        'last.never': 'Not delivered yet',
        'last.delivered': 'Last delivered {time}',
        'rule.once': 'One-off',
        'rule.daily': 'Daily at {time}',
        'rule.everyDays': 'Every {n} days at {time}',
        'rule.weekly': 'Weekly on {days} at {time}',
        'rule.weeklyNoDay': 'Weekly',
        'rule.everyWeeks': 'Every {n} weeks on {days} at {time}',
        'rule.monthly': 'Monthly at {time}',
        'rule.monthlyDay': 'Monthly on day {day} at {time}',
        'rule.monthlyLast': 'Monthly on the last {day} at {time}',
        'rule.yearly': 'Yearly at {time}',
        'rule.hourly': 'Every {n} hours',
        'rule.minutely': 'Every {n} minutes',
        'rule.everySeconds': 'Every {n}',
        'rule.cron': 'Cron: {expr}',
        'rule.raw': '{rule}',
        'rule.custom': 'Custom repeat',
        'rule.count': '{n} times in total',
        'rule.until': 'until {date}',
        'toast.delivered.title': 'Reminder delivered',
        'toast.openSession': 'Open conversation',
        'toast.openPanel': 'View reminders',
        'toast.dismiss': 'Dismiss reminder',
        'common.untitled': 'Untitled reminder',
        'common.unknownTime': 'Time unknown',
        'common.unknown': 'Unknown',
        'unit.days': '{n} days',
        'unit.hours': '{n} hours',
        'unit.minutes': '{n} minutes',
        'unit.seconds': '{n} seconds',
        'list.separator': ', ',
      },
    };

    /* ----------------------------------------------------------------- utils */

    const WEEKDAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const shortWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
    const longWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    function weekdayAnchor(index) {
      // 2026-01-04 is a Sunday.
      return new Date(Date.UTC(2026, 0, 4 + index));
    }

    function dayNameFromIndex(index, long) {
      if (!Number.isInteger(index) || index < 0 || index > 6) return null;
      return (long ? longWeekday : shortWeekday).format(weekdayAnchor(index));
    }

    function dayNameFromCode(code, long) {
      if (typeof code !== 'string') return code;
      const index = WEEKDAY_CODES.indexOf(code.slice(-2).toUpperCase());
      return (long ? longWeekday : shortWeekday).format(weekdayAnchor(index < 0 ? 0 : index));
    }

    function makeTx(translate) {
      return function tx(key, params) {
        let text;
        try {
          text = params === undefined ? translate(key) : translate(key, params);
        } catch (error) {
          text = key;
        }
        if (typeof text !== 'string') text = String(key);
        if (params) {
          text = text.replace(/\{(\w+)\}/g, (match, name) =>
            Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
          );
        }
        return text;
      };
    }

    function formatDateTime(ms) {
      if (!Number.isFinite(ms)) return null;
      try {
        const text = dateTimeFormat.format(new Date(ms));
        // zh/ja often join the weekday directly to the date; add one space for readability.
        return text.replace(/([日号])([周週][一二三四五六日天])/, '$1 $2');
      } catch (error) {
        return null;
      }
    }

    function joinList(items, tx) {
      return items.filter(Boolean).join(tx('list.separator'));
    }

    function nextRunOf(entry) {
      if (!entry || typeof entry !== 'object') return null;
      const scheduled = typeof entry.scheduledAt === 'string' ? Date.parse(entry.scheduledAt) : NaN;
      const floor = typeof entry.deliveryFloorEndsAt === 'string' ? Date.parse(entry.deliveryFloorEndsAt) : NaN;
      const values = [scheduled, floor].filter((value) => Number.isFinite(value));
      if (values.length === 0) return null;
      return Math.max(...values);
    }

    function countdownText(target, now, tx) {
      if (target === null) return tx('countdown.unknown');
      const delta = target - now;
      if (delta <= 0) return tx('countdown.past');
      const minutes = Math.floor(delta / 60000);
      if (minutes < 1) return tx('countdown.soon');
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      if (days > 0) return tx('countdown.days', { d: days, h: hours });
      if (hours > 0) return tx('countdown.hours', { h: hours, m: minutes % 60 });
      return tx('countdown.minutes', { m: minutes });
    }

    function humanSpan(seconds, tx) {
      if (!Number.isFinite(seconds) || seconds <= 0) return tx('common.unknown');
      if (seconds % 86400 === 0) return tx('unit.days', { n: seconds / 86400 });
      if (seconds % 3600 === 0) return tx('unit.hours', { n: seconds / 3600 });
      if (seconds % 60 === 0) return tx('unit.minutes', { n: seconds / 60 });
      return tx('unit.seconds', { n: seconds });
    }

    function startOfDay(ms) {
      const date = new Date(ms);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }

    function bucketOf(entry, now) {
      const next = nextRunOf(entry);
      if (next === null) return 'later';
      const today = startOfDay(now);
      const tomorrow = today + 86400000;
      const dayAfter = tomorrow + 86400000;
      if (next < tomorrow) return 'today';
      if (next < dayAfter) return 'tomorrow';
      if (next < now + 7 * 86400000) return 'week';
      return 'later';
    }

    function urgencyOf(entry, now) {
      const next = nextRunOf(entry);
      if (next === null) return 'unknown';
      if (next - now <= 0) return 'overdue';
      if (next - now <= 30 * 60 * 1000) return 'soon';
      if (startOfDay(next) === startOfDay(now)) return 'today';
      return 'far';
    }

    function promptPreview(text) {
      if (typeof text !== 'string') return '';
      const line =
        text
          .split(/\r?\n/)
          .map((value) => value.trim())
          .find((value) => value.length > 0) || '';
      const compact = line.replace(/\s+/g, ' ');
      return compact.length > 160 ? `${compact.slice(0, 157)}…` : compact;
    }

    function parseDateStamp(head, value) {
      const match = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?Z?$/.exec(String(value || '').trim());
      if (!match) return null;
      const zone = /TZID=([^;]+)/.exec(head);
      return {
        date: `${match[1]}-${match[2]}-${match[3]}`,
        time: `${match[4]}:${match[5]}`,
        zone: zone ? zone[1] : /Z$/.test(String(value).trim()) ? 'UTC' : null,
      };
    }

    function parseRrule(raw) {
      const parsed = {
        freq: null,
        interval: 1,
        byday: [],
        bymonthday: [],
        bysetpos: [],
        count: null,
        until: null,
        dtstart: null,
      };
      if (typeof raw !== 'string') return parsed;
      for (const line of raw.split(/\r?\n/)) {
        const colon = line.indexOf(':');
        if (colon < 0) continue;
        const head = line.slice(0, colon);
        const value = line.slice(colon + 1).trim();
        if (head.startsWith('DTSTART')) {
          parsed.dtstart = parseDateStamp(head, value);
        } else if (head === 'RRULE') {
          for (const part of value.split(';')) {
            const eq = part.indexOf('=');
            if (eq < 0) continue;
            const key = part.slice(0, eq).trim().toUpperCase();
            const val = part.slice(eq + 1).trim();
            if (key === 'FREQ') parsed.freq = val.toUpperCase();
            else if (key === 'INTERVAL') parsed.interval = Number.parseInt(val, 10) || 1;
            else if (key === 'BYDAY') parsed.byday = val.split(',').map((item) => item.trim().toUpperCase()).filter(Boolean);
            else if (key === 'BYMONTHDAY') parsed.bymonthday = val.split(',').map((item) => Number.parseInt(item, 10)).filter(Number.isFinite);
            else if (key === 'BYSETPOS') parsed.bysetpos = val.split(',').map((item) => Number.parseInt(item, 10)).filter(Number.isFinite);
            else if (key === 'COUNT') parsed.count = Number.parseInt(val, 10) || null;
            else if (key === 'UNTIL') parsed.until = val;
          }
        }
      }
      return parsed;
    }

    function formatUntil(value) {
      const match = /^(\d{4})(\d{2})(\d{2})/.exec(String(value || ''));
      return match ? `${match[1]}-${match[2]}-${match[3]}` : String(value || '');
    }

    function describeRrule(raw, tx) {
      const parsed = parseRrule(raw);
      const time = parsed.dtstart && parsed.dtstart.time ? parsed.dtstart.time : '';
      const interval = parsed.interval > 1 ? parsed.interval : 1;
      let text;
      if (parsed.freq === 'WEEKLY' && parsed.byday.length > 0) {
        const days = joinList(parsed.byday.map((code) => dayNameFromCode(code, false)), tx);
        text = interval === 1 ? tx('rule.weekly', { days, time }) : tx('rule.everyWeeks', { n: interval, days, time });
      } else if (parsed.freq === 'MONTHLY') {
        if (parsed.byday.length > 0 && parsed.bysetpos.indexOf(-1) >= 0) {
          text = tx('rule.monthlyLast', { day: dayNameFromCode(parsed.byday[0], true), time });
        } else if (parsed.bymonthday.length > 0) {
          text = tx('rule.monthlyDay', { day: parsed.bymonthday[0], time });
        } else {
          text = tx('rule.monthly', { time });
        }
      } else if (parsed.freq === 'DAILY') {
        text = interval === 1 ? tx('rule.daily', { time }) : tx('rule.everyDays', { n: interval, time });
      } else if (parsed.freq === 'YEARLY') {
        text = tx('rule.yearly', { time });
      } else if (parsed.freq === 'HOURLY') {
        text = tx('rule.hourly', { n: interval });
      } else if (parsed.freq === 'MINUTELY') {
        text = tx('rule.minutely', { n: interval });
      } else {
        text = tx('rule.raw', { rule: String(raw || '') });
      }
      if (parsed.count) text += ' · ' + tx('rule.count', { n: parsed.count });
      if (parsed.until) text += ' · ' + tx('rule.until', { date: formatUntil(parsed.until) });
      return text;
    }

    function describeTiming(entry, tx) {
      if (!entry || typeof entry !== 'object') return tx('rule.custom');
      switch (entry.kind) {
        case 'at':
        case 'after':
          return tx('rule.once');
        case 'every':
          return tx('rule.everySeconds', { n: humanSpan(Number(entry.everySeconds), tx) });
        case 'daily':
          return tx('rule.daily', { time: entry.time || '' });
        case 'weekly': {
          const weekdays = Array.isArray(entry.weekdays)
            ? entry.weekdays.map((value) => dayNameFromIndex(Number(value), false)).filter(Boolean)
            : [];
          return tx('rule.weekly', {
            days: weekdays.length > 0 ? joinList(weekdays, tx) : tx('rule.weeklyNoDay'),
            time: entry.time || '',
          });
        }
        case 'cron':
          return tx('rule.cron', { expr: entry.expression || '' });
        case 'rrule':
          return describeRrule(entry.rrule, tx);
        default:
          return tx('rule.custom');
      }
    }

    function targetText(entry, tx) {
      const kind = entry && entry.target ? entry.target.kind : null;
      if (kind === 'session') return tx('target.session');
      if (kind === 'new_once') return tx('target.newOnce');
      if (kind === 'new') return tx('target.new');
      return tx('target.unknown');
    }

    function openableSessionId(entry) {
      if (!entry) return null;
      if (entry.target && entry.target.kind === 'session' && entry.target.sessionId) return entry.target.sessionId;
      if (entry.lastDelivery && entry.lastDelivery.targetSessionId) return entry.lastDelivery.targetSessionId;
      return null;
    }

    function firstUpcoming(records) {
      let best = null;
      let bestRun = null;
      for (const entry of records) {
        if (!entry || entry.status !== 'active') continue;
        const run = nextRunOf(entry);
        if (run === null) continue;
        if (bestRun === null || run < bestRun) {
          best = entry;
          bestRun = run;
        }
      }
      return best === null ? null : { entry: best, run: bestRun };
    }

    function lastDeliveryText(entry, tx) {
      const receipt = entry && entry.lastDelivery;
      if (!receipt || !receipt.deliveredAt) return tx('last.never');
      const when = formatDateTime(Date.parse(receipt.deliveredAt));
      return when ? tx('last.delivered', { time: when }) : tx('last.never');
    }

    /* --------------------------------------------------------------- storage */

    function storageGet(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }

    function storageSet(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {}
    }

    function readTime(key, fallback) {
      const raw = storageGet(key);
      if (raw === null || raw === '') return fallback;
      const value = Number(raw);
      return Number.isFinite(value) ? value : fallback;
    }

    function readPrefs() {
      try {
        const raw = JSON.parse(storageGet(PREFS_KEY) || 'null');
        if (raw && typeof raw === 'object') {
          return {
            toastOnDelivery: raw.toastOnDelivery !== false,
            capsuleEnabled: raw.capsuleEnabled !== false,
          };
        }
      } catch (error) {}
      return { ...DEFAULT_PREFS };
    }

    function writePrefs(prefs) {
      storageSet(PREFS_KEY, JSON.stringify(prefs));
    }

    /* ------------------------------------------------------- shared schedule store */

    const EMPTY_SNAPSHOT = Object.freeze({
      phase: 'loading',
      records: [],
      error: null,
      updatedAt: 0,
      unread: 0,
      notices: [],
    });
    const NOOP_SUBSCRIBE = () => () => {};
    const getEmptySnapshot = () => EMPTY_SNAPSHOT;

    function createReminderStore(ctx, prefs) {
      let snapshot = EMPTY_SNAPSHOT;
      const listeners = new Set();
      let deliveryWatermark = readTime(WATERMARK_KEY, null);
      let seenWatermark = readTime(SEEN_KEY, null);
      let refreshRequest = 0;
      let refreshing = false;
      let queued = false;
      let noticeSeq = 0;
      let started = false;
      let stopped = false;
      const cleanup = [];

      function publish(patch) {
        snapshot = { ...snapshot, ...patch };
        for (const listener of listeners) {
          try {
            listener();
          } catch (error) {}
        }
      }

      function taskDeliveryTime(entry) {
        const raw = entry && entry.lastDelivery && entry.lastDelivery.deliveredAt;
        const value = raw ? Date.parse(raw) : NaN;
        return Number.isFinite(value) ? value : null;
      }

      function addNotices(notices) {
        if (notices.length === 0) return;
        const next = [
          ...snapshot.notices,
          ...notices.map((notice) => ({ ...notice, id: `notice-${++noticeSeq}` })),
        ];
        publish({ notices: next.slice(-4) });
      }

      function processRecords(records) {
        const now = Date.now();
        let maxDelivery = null;
        const delivered = [];
        for (const entry of records) {
          const at = taskDeliveryTime(entry);
          if (at === null) continue;
          if (maxDelivery === null || at > maxDelivery) maxDelivery = at;
          if (deliveryWatermark !== null && at > deliveryWatermark) delivered.push(entry);
        }
        if (deliveryWatermark === null) {
          deliveryWatermark = Math.max(now, maxDelivery === null ? 0 : maxDelivery);
          storageSet(WATERMARK_KEY, String(deliveryWatermark));
        } else if (maxDelivery !== null && maxDelivery > deliveryWatermark) {
          deliveryWatermark = maxDelivery;
          storageSet(WATERMARK_KEY, String(deliveryWatermark));
        }
        if (seenWatermark === null) {
          seenWatermark = now;
          storageSet(SEEN_KEY, String(seenWatermark));
        }
        let unread = 0;
        for (const entry of records) {
          const at = taskDeliveryTime(entry);
          if (at !== null && at > seenWatermark) unread += 1;
        }
        publish({ phase: 'ready', records, error: null, updatedAt: now, unread });
        if (prefs.toastOnDelivery && delivered.length > 0) {
          const fresh = delivered.filter((entry) => {
            const at = taskDeliveryTime(entry);
            return at !== null && at > now - 10 * 60 * 1000;
          });
          if (fresh.length > 0) {
            addNotices(
              fresh.map((entry) => ({
                kind: 'delivery',
                taskId: entry.id,
                title: entry.title || '',
                prompt: promptPreview(entry.prompt),
                sessionId: entry.lastDelivery && entry.lastDelivery.targetSessionId ? entry.lastDelivery.targetSessionId : null,
              })),
            );
          }
        }
      }

      async function refresh() {
        if (refreshing) {
          queued = true;
          return;
        }
        refreshing = true;
        const request = ++refreshRequest;
        publish({ phase: snapshot.records.length > 0 ? 'refreshing' : 'loading', error: null });
        try {
          const result = await ctx.remote.schedule.catalog();
          if (stopped || request !== refreshRequest) return;
          if (result && result.ok === true && Array.isArray(result.value)) {
            processRecords(result.value);
          } else {
            const code = result && result.error && result.error.code ? result.error.code : 'read-failed';
            publish({ phase: 'error', error: code });
          }
        } catch (error) {
          if (stopped || request !== refreshRequest) return;
          publish({ phase: 'error', error: error && error.code ? error.code : 'read-failed' });
        } finally {
          refreshing = false;
          if (queued) {
            queued = false;
            if (!stopped) refresh();
          }
        }
      }

      function dismiss(id) {
        if (!snapshot.notices.some((notice) => notice.id === id)) return;
        publish({ notices: snapshot.notices.filter((notice) => notice.id !== id) });
      }

      function markSeen() {
        if (snapshot.unread === 0 && seenWatermark !== null && seenWatermark >= Date.now() - 60000) {
          return;
        }
        seenWatermark = Date.now();
        storageSet(SEEN_KEY, String(seenWatermark));
        publish({ unread: 0 });
      }

      function start() {
        if (started || stopped) return;
        started = true;
        refresh();
        try {
          const off = ctx.remote.$on('schedule/changed', () => refresh());
          if (typeof off === 'function') cleanup.push(off);
        } catch (error) {}
        try {
          const off = ctx.on('connection/reset', () => refresh());
          if (typeof off === 'function') cleanup.push(off);
        } catch (error) {}
        const poll = window.setInterval(() => refresh(), 30000);
        const onVisibility = () => {
          if (document.visibilityState === 'visible') refresh();
        };
        document.addEventListener('visibilitychange', onVisibility);
        cleanup.push(() => {
          window.clearInterval(poll);
          document.removeEventListener('visibilitychange', onVisibility);
        });
      }

      function stop() {
        stopped = true;
        for (const dispose of cleanup) {
          try {
            dispose();
          } catch (error) {}
        }
        cleanup.length = 0;
      }

      function subscribe(listener) {
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      }

      return {
        start,
        stop,
        refresh,
        dismiss,
        markSeen,
        notify: () => publish({}),
        subscribe,
        getSnapshot: () => snapshot,
      };
    }

    /* ------------------------------------------------------------- components */

    function ReminderIcon(props) {
      props = props || {};
      const store = props.store;
      const subscribe = store ? store.subscribe : NOOP_SUBSCRIBE;
      const getSnapshot = store ? store.getSnapshot : getEmptySnapshot;
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot);
      const size = typeof props.size === 'number' && props.size > 0 ? props.size : 18;
      const unread = snapshot && snapshot.unread > 0;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': true,
          focusable: false,
          style: { display: 'block' },
        },
        h('path', {
          d: 'M12 3.2a5.3 5.3 0 0 0-5.3 5.3v3.1l-1.5 3a1 1 0 0 0 .9 1.5h11.8a1 1 0 0 0 .9-1.5l-1.5-3V8.5A5.3 5.3 0 0 0 12 3.2Z',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M9.9 18.6a2.2 2.2 0 0 0 4.2 0',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
        }),
        unread
          ? h('circle', {
              cx: 18.4,
              cy: 5.6,
              r: 3.2,
              fill: 'var(--dsw-alias-state-error-primary)',
              stroke: 'var(--dsw-alias-bg-base)',
              strokeWidth: 1.2,
            })
          : null,
      );
    }

    function UpcomingCapsule(props) {
      props = props || {};
      const store = props.store;
      const subscribe = store ? store.subscribe : NOOP_SUBSCRIBE;
      const getSnapshot = store ? store.getSnapshot : getEmptySnapshot;
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot);
      const tx = React.useMemo(() => makeTx(typeof props.t === 'function' ? props.t : (key) => key), [props.t]);
      const prefs = props.prefs || DEFAULT_PREFS;
      const [now, setNow] = React.useState(() => Date.now());
      React.useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
      }, []);
      if (!prefs.capsuleEnabled) return null;
      const upcoming = firstUpcoming(snapshot.records);
      if (upcoming === null) return null;
      const title = upcoming.entry.title || tx('common.untitled');
      const countdown = countdownText(upcoming.run, now, tx);
      const label = tx('capsule.aria', { title, countdown });
      const urgency = urgencyOf(upcoming.entry, now);
      return h(
        'button',
        {
          type: 'button',
          className: 'drt-capsule',
          'data-urgency': urgency,
          'aria-label': label,
          onClick: () => {
            if (typeof props.openPanel === 'function') props.openPanel();
          },
        },
        h('span', { className: 'drt-capsule-dot', 'aria-hidden': true }),
        h('span', { className: 'drt-capsule-lead' }, tx('capsule.lead')),
        h('span', { className: 'drt-capsule-count' }, countdown),
        h('span', { className: 'drt-capsule-title' }, title),
      );
    }

    function Toast(props) {
      const notice = props.notice;
      const tx = props.tx;
      const store = props.store;
      const eyebrow = tx('toast.delivered.title');
      return h(
        'div',
        { className: 'drt-toast', role: 'status', 'data-kind': notice.kind },
        h(
          'div',
          { className: 'drt-toast-head' },
          h('span', { className: 'drt-toast-eyebrow' }, eyebrow),
          h(
            'button',
            {
              type: 'button',
              className: 'drt-toast-close',
              'aria-label': tx('toast.dismiss'),
              onClick: () => {
                if (notice.kind === 'delivery') store.markSeen();
                store.dismiss(notice.id);
              },
            },
            '×',
          ),
        ),
        h('div', { className: 'drt-toast-title' }, notice.title || tx('common.untitled')),
        notice.prompt ? h('div', { className: 'drt-toast-body' }, notice.prompt) : null,
        h(
          'div',
          { className: 'drt-toast-actions' },
          notice.sessionId
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'drt-toast-action',
                  onClick: () => {
                    store.markSeen();
                    props.openSession(notice.sessionId);
                    store.dismiss(notice.id);
                  },
                },
                tx('toast.openSession'),
              )
            : null,
          h(
            'button',
            {
              type: 'button',
              className: 'drt-toast-action',
              onClick: () => {
                props.openPanel();
                store.dismiss(notice.id);
              },
            },
            tx('toast.openPanel'),
          ),
        ),
      );
    }

    function ToastQueue(props) {
      props = props || {};
      const store = props.store;
      const subscribe = store ? store.subscribe : NOOP_SUBSCRIBE;
      const getSnapshot = store ? store.getSnapshot : getEmptySnapshot;
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot);
      const tx = React.useMemo(() => makeTx(typeof props.t === 'function' ? props.t : (key) => key), [props.t]);
      if (!snapshot || !snapshot.notices || snapshot.notices.length === 0) return null;
      return h(
        'div',
        { className: 'drt-toasts' },
        snapshot.notices.map((notice) =>
          h(Toast, {
            key: notice.id,
            notice,
            tx,
            store,
            openSession: props.openSession,
            openPanel: props.openPanel,
          }),
        ),
      );
    }

    function ReminderRow(props) {
      const entry = props.entry;
      const now = props.now;
      const tx = props.tx;
      const openSession = props.openSession;
      const status = entry.status === 'paused' ? 'paused' : entry.status === 'ended' ? 'ended' : 'active';
      const next = nextRunOf(entry);
      const sessionId = openableSessionId(entry);
      const endedAt = entry.lastDelivery && entry.lastDelivery.deliveredAt ? Date.parse(entry.lastDelivery.deliveredAt) : NaN;
      const when = status === 'ended' ? (Number.isFinite(endedAt) ? endedAt : next) : next;
      const tone = entry.executionActive
        ? 'warn'
        : status === 'paused'
          ? 'warn'
          : status === 'ended'
            ? 'idle'
            : 'active';
      const badge = entry.executionActive
        ? tx('status.delivering')
        : status === 'paused'
          ? tx('status.paused')
          : status === 'ended'
            ? tx('status.ended')
            : null;
      const urgency = status === 'active' ? urgencyOf(entry, now) : null;
      const meta = [describeTiming(entry, tx), targetText(entry, tx), lastDeliveryText(entry, tx)];

      return h(
        'li',
        { className: 'drt-item', 'data-state': status, 'data-urgency': urgency || undefined },
        h('span', { className: 'drt-dot', 'aria-hidden': true }),
        h(
          'div',
          {
            className: 'drt-card',
            title: typeof entry.prompt === 'string' && entry.prompt ? entry.prompt.slice(0, 600) : undefined,
          },
          h(
            'div',
            { className: 'drt-card-top' },
            h(
              'div',
              { className: 'drt-card-main' },
              h(
                'div',
                { className: 'drt-row' },
                h('span', { className: 'drt-when' }, formatDateTime(when) || tx('common.unknownTime')),
                badge ? h('span', { className: 'drt-badge', 'data-tone': tone }, badge) : null,
              ),
              h('div', { className: 'drt-item-title' }, entry.title || tx('common.untitled')),
            ),
            h(
              'div',
              { className: 'drt-card-side' },
              status === 'active'
                ? h(
                    'span',
                    { className: 'drt-countdown', 'data-urgency': urgency },
                    countdownText(next, now, tx),
                  )
                : null,
              sessionId
                ? h(
                    'button',
                    {
                      type: 'button',
                      className: 'drt-open',
                      onClick: () => openSession(sessionId),
                    },
                    tx('action.openSession'),
                  )
                : null,
            ),
          ),
          h(
            'div',
            { className: 'drt-meta' },
            meta.flatMap((text, index) => [
              index > 0
                ? h('span', { key: `sep-${index}`, className: 'drt-meta-sep', 'aria-hidden': true }, '·')
                : null,
              h('span', { key: `item-${index}` }, text),
            ]),
          ),
        ),
      );
    }

    function Section(props) {
      const tx = props.tx;
      return h(
        'section',
        { className: 'drt-section' },
        h(
          'h2',
          { className: 'drt-section-title' },
          tx(props.titleKey),
          h('span', { className: 'drt-count' }, String(props.items.length)),
        ),
        h(
          'ol',
          { className: 'drt-timeline' },
          props.items.map((entry) =>
            h(ReminderRow, {
              key: entry.id || entry.title,
              entry,
              now: props.now,
              tx,
              openSession: props.openSession,
            }),
          ),
        ),
      );
    }

    function ReminderPage(props) {
      props = props || {};
      const translate = typeof props.t === 'function' ? props.t : (key) => key;
      const tx = React.useMemo(() => makeTx(translate), [translate]);
      const store = props.store;
      const prefs = props.prefs || DEFAULT_PREFS;
      const openSession = typeof props.openSession === 'function' ? props.openSession : () => {};
      const [now, setNow] = React.useState(() => Date.now());
      const [prefsState, setPrefsState] = React.useState(() => ({ ...prefs }));
      const subscribe = store ? store.subscribe : NOOP_SUBSCRIBE;
      const getSnapshot = store ? store.getSnapshot : getEmptySnapshot;
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot);

      React.useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
      }, []);

      React.useEffect(() => {
        if (store) store.markSeen();
      }, [store, snapshot.updatedAt]);

      const updatePrefs = (patch) => {
        Object.assign(prefs, patch);
        try {
          writePrefs(prefs);
        } catch (error) {}
        setPrefsState({ ...prefs });
        if (store) store.notify();
      };

      const groups = React.useMemo(() => {
        const buckets = { today: [], tomorrow: [], week: [], later: [] };
        const paused = [];
        const ended = [];
        for (const entry of snapshot.records) {
          if (!entry || typeof entry !== 'object') continue;
          if (entry.status === 'ended') ended.push(entry);
          else if (entry.status === 'paused') paused.push(entry);
          else buckets[bucketOf(entry, now)].push(entry);
        }
        const byNext = (a, b) => {
          const left = nextRunOf(a);
          const right = nextRunOf(b);
          return (left === null ? Number.MAX_SAFE_INTEGER : left) - (right === null ? Number.MAX_SAFE_INTEGER : right);
        };
        for (const key of Object.keys(buckets)) buckets[key].sort(byNext);
        paused.sort(byNext);
        ended.sort((a, b) => {
          const left = Date.parse((a.lastDelivery && a.lastDelivery.deliveredAt) || a.updatedAt || '') || 0;
          const right = Date.parse((b.lastDelivery && b.lastDelivery.deliveredAt) || b.updatedAt || '') || 0;
          return right - left;
        });
        return { buckets, paused, ended };
      }, [snapshot.records, now]);

      const activeCount =
        groups.buckets.today.length +
        groups.buckets.tomorrow.length +
        groups.buckets.week.length +
        groups.buckets.later.length;
      const first =
        groups.buckets.today[0] ||
        groups.buckets.tomorrow[0] ||
        groups.buckets.week[0] ||
        groups.buckets.later[0] ||
        null;
      const firstRun = first ? nextRunOf(first) : null;
      const parts = [tx('page.activeCount', { n: activeCount })];
      if (groups.paused.length > 0) parts.push(tx('page.pausedCount', { n: groups.paused.length }));
      if (first && firstRun !== null) parts.push(tx('page.nextLine', { countdown: countdownText(firstRun, now, tx) }));
      const subtitle = parts.join(' · ');
      const busy = snapshot.phase === 'loading' || snapshot.phase === 'refreshing';
      const showEmpty = snapshot.phase !== 'loading' && snapshot.records.length === 0 && !snapshot.error;

      const sections = [];
      for (const key of ['today', 'tomorrow', 'week', 'later']) {
        if (groups.buckets[key].length > 0) {
          sections.push(
            h(Section, {
              key,
              tx,
              titleKey: `bucket.${key}`,
              items: groups.buckets[key],
              now,
              openSession,
            }),
          );
        }
      }

      return h(
        'div',
        { className: 'drt-page' },
        h(
          'div',
          { className: 'drt-inner' },
          h(
            'header',
            { className: 'drt-head' },
            h(
              'div',
              { className: 'drt-head-top' },
              h(
                'div',
                { className: 'drt-head-text' },
                h(
                  'div',
                  { className: 'drt-title-row' },
                  h('h1', { className: 'drt-title' }, tx('page.title')),
                  activeCount > 0 ? h('span', { className: 'drt-title-count' }, String(activeCount)) : null,
                ),
                h(
                  'div',
                  { className: 'drt-subrow' },
                  h('p', { className: 'drt-subtitle' }, subtitle),
                  h(
                    'div',
                    { className: 'drt-toolbar' },
                    h(
                      'label',
                      { className: 'drt-check' },
                      tx('prefs.delivery'),
                      h('input', {
                        type: 'checkbox',
                        checked: prefsState.toastOnDelivery,
                        onChange: (event) => updatePrefs({ toastOnDelivery: event.target.checked }),
                      }),
                    ),
                    h(
                      'label',
                      { className: 'drt-check' },
                      tx('prefs.capsule'),
                      h('input', {
                        type: 'checkbox',
                        checked: prefsState.capsuleEnabled,
                        onChange: (event) => updatePrefs({ capsuleEnabled: event.target.checked }),
                      }),
                    ),
                  ),
                ),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'drt-refresh',
                  'data-busy': busy ? 'true' : 'false',
                  onClick: () => {
                    if (store) store.refresh();
                  },
                  disabled: busy,
                },
                h(
                  'span',
                  { className: 'drt-refresh-icon', 'aria-hidden': true },
                  h(
                    'svg',
                    { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', focusable: false },
                    h('path', {
                      d: 'M20 11a8 8 0 1 0-2.3 6.7',
                      stroke: 'currentColor',
                      strokeWidth: 1.8,
                      strokeLinecap: 'round',
                    }),
                    h('path', {
                      d: 'M20 4v7h-7',
                      stroke: 'currentColor',
                      strokeWidth: 1.8,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    }),
                  ),
                ),
                tx('action.refresh'),
              ),
            ),
          ),
          snapshot.error
            ? h(
                'div',
                { className: 'drt-notice', role: 'alert' },
                h('span', null, tx('state.error', { code: snapshot.error })),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'drt-link',
                    onClick: () => {
                      if (store) store.refresh();
                    },
                  },
                  tx('action.retry'),
                ),
              )
            : null,
          snapshot.phase === 'loading' && snapshot.records.length === 0
            ? h('p', { className: 'drt-muted' }, tx('state.loading'))
            : null,
          showEmpty
            ? h(
                'div',
                { className: 'drt-empty' },
                h('p', { className: 'drt-empty-title' }, tx('state.empty')),
                h('p', { className: 'drt-muted' }, tx('state.emptyHint')),
              )
            : null,
          ...sections,
          groups.paused.length > 0
            ? h(Section, {
                tx,
                titleKey: 'section.paused',
                items: groups.paused,
                now,
                openSession,
              })
            : null,
          groups.ended.length > 0
            ? h(
                'details',
                { className: 'drt-ended' },
                h('summary', null, `${tx('section.ended')} (${groups.ended.length})`),
                h(Section, {
                  tx,
                  titleKey: 'section.ended',
                  items: groups.ended,
                  now,
                  openSession,
                }),
              )
            : null,
          snapshot.records.length > 0
            ? h('p', { className: 'drt-footnote' }, tx('footer.hint', { n: snapshot.records.length }))
            : null,
        ),
      );
    }

    /* ------------------------------------------------------------------ style */

    const CSS = `
      .drt-page {
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding: 26px 30px 48px;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        line-height: 1.5;
      }
      .drt-inner { max-width: 880px; margin: 0 auto; }
      .drt-head {
        margin-bottom: 18px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .drt-head-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .drt-head-text { min-width: 0; flex: 1; }
      .drt-title-row { display: flex; align-items: center; gap: 8px; }
      .drt-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.01em; }
      .drt-title-count {
        padding: 1px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 600;
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
      }
      .drt-subrow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px 16px;
        flex-wrap: wrap;
        margin-top: 6px;
      }
      .drt-subtitle { margin: 0; font-size: 12px; color: var(--dsw-alias-label-secondary); }
      .drt-refresh {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        min-height: 30px;
        padding: 4px 13px;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: border-color 0.15s ease, background 0.15s ease;
      }
      .drt-refresh:hover:not(:disabled) { border-color: var(--dsw-alias-border-l2); background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent); }
      .drt-refresh:disabled { opacity: 0.55; cursor: default; }
      .drt-refresh-icon { display: inline-flex; }
      .drt-refresh[data-busy='true'] .drt-refresh-icon svg { animation: drt-spin 0.9s linear infinite; }
      .drt-toolbar { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
      .drt-check {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--dsw-alias-label-secondary);
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
      }
      .drt-check input {
        appearance: none;
        width: 34px;
        height: 21px;
        margin: 0;
        position: relative;
        border-radius: 999px;
        background: color-mix(in srgb, var(--dsw-alias-label-secondary) 26%, transparent);
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.18s ease;
      }
      .drt-check input::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: var(--dsw-alias-label-secondary);
        transition: transform 0.18s ease, background 0.18s ease;
      }
      .drt-check input:checked { background: var(--dsw-alias-label-primary); }
      .drt-check input:checked::after {
        transform: translateX(13px);
        background: var(--dsw-alias-bg-base);
      }
      .drt-check input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
      .drt-muted { margin: 8px 0; font-size: 12px; color: var(--dsw-alias-label-secondary); }
      .drt-notice {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 18px;
        padding: 10px 14px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent);
        border-radius: 10px;
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
        font-size: 12px;
      }
      .drt-link { border: 0; padding: 0; background: transparent; color: var(--dsw-alias-brand-primary); font: inherit; font-size: 12px; cursor: pointer; }
      .drt-empty {
        margin-top: 18px;
        padding: 22px 20px;
        border: 1px dashed var(--dsw-alias-border-l1);
        border-radius: 12px;
        text-align: center;
      }
      .drt-empty-title { margin: 0; font-size: 14px; font-weight: 550; }
      .drt-section { margin-top: 20px; }
      .drt-section-title {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin: 0 0 10px;
        font-size: 12px;
        font-weight: 600;
        color: var(--dsw-alias-label-secondary);
        letter-spacing: 0.02em;
      }
      .drt-count {
        padding: 0 6px;
        border-radius: 999px;
        background: color-mix(in srgb, currentColor 9%, transparent);
        font-size: 10.5px;
        font-weight: 400;
        opacity: 0.8;
      }
      .drt-timeline { position: relative; margin: 0; padding: 0; list-style: none; }
      .drt-timeline::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 12px;
        bottom: 12px;
        width: 1px;
        background: var(--dsw-alias-border-l1);
      }
      .drt-item { position: relative; padding-left: 26px; }
      .drt-item + .drt-item { margin-top: 10px; }
      .drt-dot {
        position: absolute;
        left: 1px;
        top: 17px;
        width: 9px;
        height: 9px;
        box-sizing: border-box;
        border: 2px solid var(--dsw-alias-brand-primary);
        border-radius: 50%;
        background: var(--dsw-alias-bg-base);
      }
      .drt-item[data-state='paused'] .drt-dot { border-color: var(--dsw-alias-state-warn-primary); }
      .drt-item[data-state='ended'] .drt-dot { border-color: var(--dsw-alias-state-idle-primary); }
      .drt-item[data-urgency='today'] .drt-dot {
        border-color: var(--dsw-alias-state-success-primary);
        background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 28%, var(--dsw-alias-bg-base));
      }
      .drt-item[data-urgency='soon'] .drt-dot {
        border-color: var(--dsw-alias-state-warn-primary);
        background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, var(--dsw-alias-bg-base));
        animation: drt-dot-pulse 2s ease-out infinite;
      }
      .drt-item[data-urgency='overdue'] .drt-dot {
        border-color: var(--dsw-alias-state-error-primary);
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 50%, var(--dsw-alias-bg-base));
      }
      @keyframes drt-dot-pulse {
        0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-warn-primary) 35%, transparent); }
        70%, 100% { box-shadow: 0 0 0 5px transparent; }
      }
      @keyframes drt-spin {
        to { transform: rotate(360deg); }
      }
      .drt-card {
        padding: 13px 16px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
        transition: border-color 0.15s ease;
      }
      .drt-card:hover { border-color: var(--dsw-alias-border-l2); }
      .drt-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
      .drt-card-main { min-width: 0; flex: 1; }
      .drt-card-side { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
      .drt-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 10px; }
      .drt-when { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
      .drt-countdown {
        padding: 2px 9px;
        border-radius: 999px;
        font-size: 11.5px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, currentColor 11%, transparent);
      }
      .drt-countdown[data-urgency='today'] { color: var(--dsw-alias-state-success-primary); }
      .drt-countdown[data-urgency='soon'] { color: var(--dsw-alias-state-warn-primary); }
      .drt-countdown[data-urgency='overdue'] { color: var(--dsw-alias-state-error-primary); }
      .drt-badge {
        padding: 1px 7px;
        border-radius: 999px;
        font-size: 10.5px;
        line-height: 1.6;
        color: var(--dsw-alias-label-secondary);
        background: color-mix(in srgb, currentColor 8%, transparent);
      }
      .drt-badge[data-tone='warn'] { color: var(--dsw-alias-state-warn-primary); }
      .drt-badge[data-tone='idle'] { color: var(--dsw-alias-label-secondary); }
      .drt-badge[data-tone='active'] { color: var(--dsw-alias-state-success-primary); }
      .drt-item-title { margin-top: 5px; font-size: 15px; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }
      .drt-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 8px;
        margin-top: 8px;
        font-size: 11.5px;
        color: var(--dsw-alias-label-secondary);
      }
      .drt-meta > span { overflow-wrap: anywhere; }
      .drt-meta-sep { opacity: 0.45; }
      .drt-open {
        padding: 2px 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: transparent;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        font-size: 11.5px;
        line-height: 1.6;
        cursor: pointer;
        transition: border-color 0.15s ease, background 0.15s ease;
      }
      .drt-open:hover {
        border-color: var(--dsw-alias-border-l2);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent);
      }
      .drt-ended { margin-top: 24px; }
      .drt-ended > summary {
        display: flex;
        align-items: center;
        gap: 6px;
        list-style: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        color: var(--dsw-alias-label-secondary);
        user-select: none;
        padding: 4px 0;
      }
      .drt-ended > summary::-webkit-details-marker { display: none; }
      .drt-ended > summary::before {
        content: '▸';
        font-size: 10px;
        opacity: 0.55;
        transition: transform 0.15s ease;
      }
      .drt-ended[open] > summary::before { transform: rotate(90deg); }
      .drt-ended > summary:hover { color: var(--dsw-alias-label-primary); }
      .drt-ended .drt-section { margin-top: 12px; }
      .drt-ended .drt-section-title { display: none; }
      .drt-footnote {
        margin: 28px 0 0;
        font-size: 11px;
        color: var(--dsw-alias-label-secondary);
        opacity: 0.75;
      }
      .drt-toasts {
        position: fixed;
        right: 18px;
        bottom: 72px;
        z-index: 60;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        width: min(340px, calc(100vw - 36px));
        max-height: calc(100vh - 130px);
        overflow-y: auto;
        pointer-events: auto;
      }
      .drt-capsule {
        position: fixed;
        right: 18px;
        bottom: 16px;
        z-index: 59;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        max-width: calc(100vw - 36px);
        padding: 7px 13px;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 11.5px;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: 0 8px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
        transition: border-color 0.15s ease;
      }
      .drt-capsule:hover { border-color: var(--dsw-alias-brand-primary); }
      .drt-capsule[data-urgency='today'] .drt-capsule-dot { background: var(--dsw-alias-state-success-primary); }
      .drt-capsule[data-urgency='soon'] .drt-capsule-dot {
        background: var(--dsw-alias-state-warn-primary);
        animation: drt-dot-pulse 2s ease-out infinite;
      }
      .drt-capsule[data-urgency='overdue'] .drt-capsule-dot { background: var(--dsw-alias-state-error-primary); }
      .drt-capsule[data-urgency='soon'] .drt-capsule-count { color: var(--dsw-alias-state-warn-primary); }
      .drt-capsule[data-urgency='overdue'] .drt-capsule-count { color: var(--dsw-alias-state-error-primary); }
      .drt-capsule[data-urgency='soon'] {
        border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 55%, var(--dsw-alias-border-l2));
      }
      .drt-capsule-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--dsw-alias-brand-primary);
        flex-shrink: 0;
      }
      .drt-capsule-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
      .drt-capsule-lead {
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        white-space: nowrap;
      }
      .drt-capsule-title {
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: 0;
        transition: max-width 0.18s ease, opacity 0.18s ease;
      }
      .drt-capsule-title::before {
        content: '·';
        margin-right: 6px;
        opacity: 0.5;
      }
      .drt-capsule:hover .drt-capsule-title,
      .drt-capsule:focus-visible .drt-capsule-title {
        max-width: 240px;
        opacity: 1;
      }
      .drt-toast {
        box-sizing: border-box;
        padding: 12px 14px 11px;
        border: 1px solid var(--dsw-alias-border-l2);
        border-left: 3px solid var(--dsw-alias-brand-primary);
        border-radius: 12px;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 10px 30px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);
        animation: drt-toast-in 0.18s ease-out;
      }
      .drt-toast[data-kind='delivery'] { border-left-color: var(--dsw-alias-brand-primary); }
      .drt-toast-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .drt-toast-eyebrow { font-size: 11px; font-weight: 600; color: var(--dsw-alias-brand-primary); letter-spacing: 0.02em; }
      .drt-toast-close {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 15px;
        line-height: 1;
        cursor: pointer;
      }
      .drt-toast-close:hover { background: color-mix(in srgb, currentColor 8%, transparent); color: var(--dsw-alias-label-primary); }
      .drt-toast-title { margin-top: 3px; font-size: 13.5px; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }
      .drt-toast-body {
        margin-top: 4px;
        font-size: 11.5px;
        color: var(--dsw-alias-label-secondary);
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .drt-toast-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 9px; }
      .drt-toast-action {
        border: 0;
        padding: 0;
        background: transparent;
        color: var(--dsw-alias-brand-primary);
        font: inherit;
        font-size: 11.5px;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .drt-toast-action:hover { opacity: 0.8; }
      @keyframes drt-toast-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .drt-toast { animation: none; }
        .drt-refresh[data-busy='true'] .drt-refresh-icon svg { animation: none; }
        .drt-item[data-urgency='soon'] .drt-dot,
        .drt-capsule[data-urgency='soon'] .drt-capsule-dot { animation: none; }
      }
      @media (max-width: 640px) {
        .drt-page { padding: 18px 16px 36px; }
        .drt-head { flex-wrap: wrap; gap: 10px; }
      }
    `;

    /* ------------------------------------------------------------------- apply */

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, DICTIONARIES), 'reminder-timeline: dictionaries');
      const translate = ctx.locale.bind(NS);

      ctx.effect(() => {
        const style = document.createElement('style');
        style.dataset.plugin = STYLE_ATTR;
        style.textContent = CSS;
        document.head.append(style);
        return () => style.remove();
      }, 'reminder-timeline: styles');

      const prefs = readPrefs();
      const store = createReminderStore(ctx, prefs);
      ctx.effect(() => {
        store.start();
        return () => store.stop();
      }, 'reminder-timeline: schedule store');

      const openSession = (sessionId) => {
        try {
          ctx.uiWorkspace.openSession(sessionId);
        } catch (error) {}
      };
      const openPanel = () => {
        try {
          ctx.layout.selectPanel(PANEL_ID);
        } catch (error) {}
      };

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: PANEL_ID,
            locale: NS,
            inject: () => ({
              t: translate,
              store,
              prefs,
              openSession,
            }),
          },
          ReminderPage,
        ),
      );

      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 5,
            locale: NS,
            label: () => translate('panel.label'),
            inject: () => ({ store }),
          },
          ReminderIcon,
        ),
      );

      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register(
          {
            name: 'shell.overlay',
            id: 'reminder-timeline.toasts',
            order: 20,
            locale: NS,
            inject: () => ({ store, t: translate, openSession, openPanel }),
          },
          ToastQueue,
        ),
      );

      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register(
          {
            name: 'shell.overlay',
            id: 'reminder-timeline.capsule',
            order: 10,
            locale: NS,
            inject: () => ({ store, t: translate, prefs, openPanel }),
          },
          UpcomingCapsule,
        ),
      );
    }

    return {
      name: 'reminder-timeline',
      inject: ['slots', 'locale', 'remote', 'remote.schedule', 'uiWorkspace', 'layout'],
      apply,
    };
  },
});
