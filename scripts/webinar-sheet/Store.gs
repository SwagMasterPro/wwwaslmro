/* Deploy this file together with Code.gs. Tested directly in Node's VM. */
const WebinarStore = (() => {
  const event = { id: "aslm-webinar-2026-10", endsAt: "2026-11-18T00:00:00+02:00", terms: "webinar-2026-10-v1" };
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
  const fail = (code) => { throw new Error(code); };
  const copy = (value) => JSON.parse(JSON.stringify(value));
  const publicRegistration = (r) => {
    if (!r) return null;
    const result = copy(r); delete result.receipt_token_hash; return result;
  };
  const newestOrder = (s, id) => Object.values(s.orders).filter(o => o.registration_id === id).sort((a, b) => Number(b.status === "paid") - Number(a.status === "paid") || b.created_at.localeCompare(a.created_at) || b.sequence - a.sequence)[0] || null;
  function enqueue(s, id, registrationId, kind, reference, now, repeatable) {
    const job = s.jobs[id];
    if (job) {
      if (repeatable) {
        job.generation++; job.available_at = now;
        if (job.status !== "leased") job.status = "pending";
      }
      return;
    }
    s.jobs[id] = { id, registration_id: registrationId, kind, order_reference: reference || null, generation: 1, attempts: 0, status: "pending", available_at: now, created_at: now, lease_id: null, lease_until: null, last_error: null };
  }
  function project(s, r, formatDate) {
    const matches = s.visible.flatMap((row, index) => row[0] === r.id ? [index] : []);
    if (matches.length > 1) fail("duplicate_sheet_id");
    let index = matches[0];
    if (index === undefined) {
      index = r.sheet_row - 2;
      if (s.visible[index]?.some(value => value !== "" && value != null)) fail("sheet_row_occupied");
    }
    const order = newestOrder(s, r.id);
    const labels = { requested: "Solicitare primită", awaiting_membership: "În așteptarea confirmării calității de membru", pending: "În așteptarea plății", paid: "Plătit" };
    const options = { member: "Membru ASLM existent", join: "Devino membru ASLM", ticket: "Particip doar la webinar" };
    const status = r.review_required ? "Plăți multiple – verificare ASLM" : r.late_payment ? "Plătit după încheiere – verificare ASLM" : r.status === "pending" && order?.status === "failed" ? "Plată eșuată / anulată – poate reîncerca" : labels[r.status];
    // Only A:I is automated. Preserve manual J:L, even after a row is moved.
    s.visible[index] = [r.id, formatDate(r.created_at), r.name, r.email, r.phone, options[r.option], r.amount_bani / 100, status, order?.order_reference || "", ...(s.visible[index]?.slice(9) || [])];
  }
  function execute(s, action, p, timestamp, formatDate) {
    const now = new Date(timestamp).toISOString();
    const closed = () => { if (timestamp >= Date.parse(event.endsAt)) fail("registration_closed"); };
    const registration = (id) => s.registrations[id] || fail("registration_missing");
    const order = (reference) => s.orders[reference] || fail("order_missing");
    switch (action) {
      case "webinar_health": return { eventId: event.id, endsAt: event.endsAt, termsVersion: event.terms, amountBani: 10000, currency: "RON", schemaVersion: 1 };
      case "webinar_register": {
        closed();
        if (!uuid.test(p.p_id) || !/^[a-f0-9]{64}$/.test(p.p_token_hash) || !["member", "join", "ticket"].includes(p.p_option) || p.p_terms_version !== event.terms || typeof p.p_name !== "string" || p.p_name.trim().length < 3 || p.p_name.length > 150 || typeof p.p_email !== "string" || p.p_email !== p.p_email.trim().toLowerCase() || p.p_email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.p_email) || typeof p.p_phone !== "string" || p.p_phone.length > 30) fail("invalid_registration");
        const existing = s.registrations[p.p_id];
        if (existing) {
          if (existing.email !== p.p_email || existing.name !== p.p_name.trim() || existing.phone !== p.p_phone || existing.option !== p.p_option || existing.receipt_token_hash !== p.p_token_hash) fail("idempotency_conflict");
          return publicRegistration(existing);
        }
        if (Object.values(s.registrations).some(r => r.email === p.p_email && r.event_id === event.id)) fail("duplicate_email");
        const r = { id: p.p_id, event_id: event.id, name: p.p_name.trim(), email: p.p_email, phone: p.p_phone, option: p.p_option, amount_bani: p.p_option === "ticket" ? 10000 : 0, receipt_token_hash: p.p_token_hash, terms_version: event.terms, status: p.p_option === "member" ? "requested" : p.p_option === "join" ? "awaiting_membership" : "pending", late_payment: false, review_required: false, created_at: now, paid_at: null, sheet_row: s.visible.length + 2 };
        s.registrations[r.id] = r; project(s, r, formatDate);
        enqueue(s, `request-attendee:${r.id}`, r.id, "email-request-attendee", null, now);
        enqueue(s, `request-admin:${r.id}`, r.id, "email-request-admin", null, now);
        return publicRegistration(r);
      }
      case "webinar_load_registration": return publicRegistration(s.registrations[p.p_id]);
      case "webinar_authorized_registration": {
        const r = s.registrations[p.p_id];
        return r && r.receipt_token_hash === p.p_token_hash ? publicRegistration(r) : null;
      }
      case "webinar_load_order": return s.orders[p.p_reference] || null;
      case "webinar_latest_order": return newestOrder(s, p.p_registration_id);
      case "webinar_reserve_order": {
        closed(); const r = registration(p.p_registration_id);
        if (r.option !== "ticket") fail("ticket_required");
        const existing = Object.values(s.orders).find(o => o.registration_id === r.id && ["creating", "pending", "paid"].includes(o.status));
        if (existing) return existing;
        if (!/^ASLMWEB-/.test(p.p_reference) || !uuid.test(p.p_reference.slice(8)) || s.orders[p.p_reference]) fail("invalid_reference");
        const o = { order_reference: p.p_reference, registration_id: r.id, amount_bani: 10000, currency: "RON", status: "creating", session_id: null, transaction_id: null, created_at: now, updated_at: now, next_check_at: now, paid_at: null, sequence: Object.keys(s.orders).length + 1 };
        s.orders[o.order_reference] = o; project(s, r, formatDate); return o;
      }
      case "webinar_attach_session": {
        const o = order(p.p_reference);
        if (typeof p.p_session !== "string" || !/^SESSION[\w-]+$/.test(p.p_session)) fail("invalid_session");
        if (o.status === "creating") { o.session_id = p.p_session; o.status = "pending"; o.updated_at = now; o.next_check_at = new Date(timestamp + 300000).toISOString(); }
        return null;
      }
      case "webinar_apply_payment": {
        const o = order(p.p_reference), r = registration(o.registration_id);
        if (o.status === "paid") return null;
        if (p.p_status === "paid") {
          if (typeof p.p_transaction_id !== "string" || !p.p_transaction_id) fail("transaction_required");
          const paidAt = p.p_paid_at || now;
          if (!Number.isFinite(Date.parse(paidAt))) fail("invalid_payment_time");
          o.status = "paid"; o.transaction_id = p.p_transaction_id; o.paid_at = paidAt;
          r.review_required = r.status === "paid" || r.review_required;
          r.late_payment = r.late_payment || Date.parse(paidAt) >= Date.parse(event.endsAt);
          r.status = "paid"; r.paid_at ||= paidAt;
          enqueue(s, `paid-attendee:${r.id}`, r.id, "email-paid-attendee", null, now);
          enqueue(s, `paid-admin:${r.id}`, r.id, "email-paid-admin", null, now);
          if (r.review_required) enqueue(s, `review-admin:${o.order_reference}`, r.id, "email-paid-admin", null, now);
        } else if (p.p_status === "failed") o.status = "failed";
        else if (p.p_status !== "pending") fail("invalid_payment_status");
        o.updated_at = now; o.next_check_at = new Date(timestamp + 900000).toISOString();
        project(s, r, formatDate); return null;
      }
      case "webinar_enqueue_bank": {
        const o = s.orders[p.p_reference];
        if (o && o.status !== "paid") {
          if (typeof p.p_digest !== "string" || p.p_digest.length > 200) fail("invalid_job_id");
          enqueue(s, `bank:${p.p_digest}`, o.registration_id, "bank", o.order_reference, now);
        }
        return null;
      }
      case "webinar_schedule_reconciliation": {
        // Still runs after registration closes and without an attendee return.
        const due = Object.values(s.orders).filter(o => ["creating", "pending"].includes(o.status) && o.next_check_at <= now).sort((a, b) => a.next_check_at.localeCompare(b.next_check_at)).slice(0, 4);
        due.forEach(o => {
          enqueue(s, `scheduled-bank:${o.order_reference}`, o.registration_id, "bank", o.order_reference, now, true);
          o.next_check_at = new Date(timestamp + 900000).toISOString();
        }); return due.length;
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
