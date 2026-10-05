/* Deploy this file together with Code.gs. Tested directly in Node's VM. */
const WebinarStore = (() => {
  const event = { id: "aslm-webinar-2026-10", endsAt: "2026-11-18T00:00:00+02:00", terms: "webinar-2026-10-v2" };
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
  const fail = (code) => { throw new Error(code); };
  const copy = (value) => JSON.parse(JSON.stringify(value));
  const publicRegistration = (r) => {
    if (!r) return null;
    const result = copy(r); delete result.receipt_token_hash; return result;
  };
  function enqueue(s, id, registrationId, kind, now) {
    if (s.jobs[id]) return;
    s.jobs[id] = { id, registration_id: registrationId, kind, generation: 1, attempts: 0, status: "pending", available_at: now, created_at: now, lease_id: null, lease_until: null, last_error: null };
  }
  function project(s, r, formatDate) {
    const matches = s.visible.flatMap((row, index) => row[0] === r.id ? [index] : []);
    if (matches.length > 1) fail("duplicate_sheet_id");
    let index = matches[0];
    if (index === undefined) {
      index = r.sheet_row - 2;
      if (s.visible[index]?.some(value => value !== "" && value != null)) fail("sheet_row_occupied");
    }
    // Only A:I is automated. Preserve manual J:L, even after a row is moved.
    s.visible[index] = [r.id, formatDate(r.created_at), r.name, r.email, r.phone, "Membru ASLM existent", "", "Solicitare primită", "", ...(s.visible[index]?.slice(9) || [])];
  }
  function execute(s, action, p, timestamp, formatDate) {
    const now = new Date(timestamp).toISOString();
    const closed = () => { if (timestamp >= Date.parse(event.endsAt)) fail("registration_closed"); };
    switch (action) {
      case "webinar_health": return { eventId: event.id, endsAt: event.endsAt, termsVersion: event.terms, schemaVersion: 2 };
      case "webinar_register": {
        closed();
        if (!uuid.test(p.p_id) || !/^[a-f0-9]{64}$/.test(p.p_token_hash) || p.p_option !== "member" || p.p_terms_version !== event.terms || typeof p.p_name !== "string" || p.p_name.trim().length < 3 || p.p_name.length > 150 || typeof p.p_email !== "string" || p.p_email !== p.p_email.trim().toLowerCase() || p.p_email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.p_email) || typeof p.p_phone !== "string" || p.p_phone.length > 30) fail("invalid_registration");
        const existing = s.registrations[p.p_id];
        if (existing) {
          if (existing.email !== p.p_email || existing.name !== p.p_name.trim() || existing.phone !== p.p_phone || existing.option !== p.p_option || existing.receipt_token_hash !== p.p_token_hash) fail("idempotency_conflict");
          return publicRegistration(existing);
        }
        if (Object.values(s.registrations).some(r => r.email === p.p_email && r.event_id === event.id)) fail("duplicate_email");
        const r = { id: p.p_id, event_id: event.id, name: p.p_name.trim(), email: p.p_email, phone: p.p_phone, option: "member", receipt_token_hash: p.p_token_hash, terms_version: event.terms, status: "requested", created_at: now, sheet_row: s.visible.length + 2 };
        s.registrations[r.id] = r; project(s, r, formatDate);
        enqueue(s, `request-attendee:${r.id}`, r.id, "email-request-attendee", now);
        enqueue(s, `request-admin:${r.id}`, r.id, "email-request-admin", now);
        return publicRegistration(r);
      }
      case "webinar_load_registration": return publicRegistration(s.registrations[p.p_id]);
      case "webinar_authorized_registration": {
        const r = s.registrations[p.p_id];
        return r && r.receipt_token_hash === p.p_token_hash ? publicRegistration(r) : null;
      }
      case "webinar_claim_jobs": {
        if (!uuid.test(p.p_lease)) fail("invalid_lease");
        if (s.worker.lease_until > now && s.worker.lease_id !== p.p_lease) return [];
        s.worker = { lease_id: p.p_lease, lease_until: new Date(timestamp + 300000).toISOString() };
        const jobs = Object.values(s.jobs).filter(j => (j.status === "pending" || j.status === "leased" && j.lease_until <= now) && j.available_at <= now).sort((a, b) => a.available_at.localeCompare(b.available_at) || a.created_at.localeCompare(b.created_at)).slice(0, Math.max(1, Math.min(4, Number(p.p_limit) || 1)));
        jobs.forEach(j => { j.status = "leased"; j.lease_id = p.p_lease; j.lease_until = s.worker.lease_until; j.attempts++; });
        return jobs.map(j => ({ ...j, registration: publicRegistration(s.registrations[j.registration_id]) }));
      }
      case "webinar_finish_job": {
        const j = s.jobs[p.p_id];
        if (j && j.lease_id === p.p_lease && j.status === "leased") {
          j.status = !p.p_error && j.generation === p.p_generation ? "done" : "pending";
          j.lease_id = null; j.lease_until = null; j.last_error = p.p_error ? String(p.p_error).slice(0, 200) : null;
          j.available_at = new Date(timestamp + (p.p_error ? Math.min(3600, 30 * Math.pow(2, Math.min(j.attempts, 7))) * 1000 : 0)).toISOString();
        } return null;
      }
      case "webinar_release_worker": {
        if (s.worker.lease_id === p.p_lease) s.worker = {};
        return null;
      }
      case "webinar_check_rate": {
        if (typeof p.p_key !== "string" || !/^[a-f0-9]{64}$/.test(p.p_key)) fail("invalid_rate_key");
        Object.keys(s.rates).forEach(key => { if (Date.parse(s.rates[key].window_start) < timestamp - 86400000) delete s.rates[key]; });
        let rate = s.rates[p.p_key];
        if (!rate || Date.parse(rate.window_start) <= timestamp - 600000) rate = s.rates[p.p_key] = { window_start: now, attempts: 0 };
        return ++rate.attempts <= 10;
      }
      case "webinar_check_rates": {
        if (!Array.isArray(p.p_keys) || p.p_keys.length < 1 || p.p_keys.length > 2) fail("invalid_rate_key");
        return p.p_keys.map(key => execute(s, "webinar_check_rate", { p_key: key }, timestamp, formatDate)).every(Boolean);
      }
      default: fail("unknown_action");
    }
  }
  return { execute };
})();
