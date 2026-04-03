# Scaling Strategy Brief — Beschwerden SaaS (n8n Self-Hosted)

## Summary
This project already contains a strong blueprint for a **Control Plane / Data Plane** split. The recommended development path is:
1. Stabilize and secure current runtime (ports, memory limits, PostgreSQL migration).
2. Implement tenant isolation as non-negotiable infrastructure contract (schema + per-tenant DB user).
3. Introduce queue-mode execution primitives (Redis, workers, webhook pool split) only when measured load thresholds are crossed.
4. Build an internal n8n control plane for provisioning, workflow rollout, and rollback automation.

## Matching scaling paper and why it fits
**Primary match:**
- Jaradat, Dearle, Barker — *A Dataflow Language for Decentralised Orchestration of Web Service Workflows* (2013), arXiv:1305.01840.

Why this paper maps to this codebase:
- It separates workflow logic from execution placement.
- It argues that centralized orchestration introduces network and performance bottlenecks and single-point pressure.
- It reports speedup from decentralized execution in pipeline/aggregation/distribution experiments.

For this project, that maps directly to:
- **Control plane** = onboarding, deployment, policy, monitoring.
- **Data plane** = tenant-scoped execution workers handling incoming webhook/call load.

## Strongest evidence
### Observation
- `saas/Planung Umsetzung/masterplan.md` already defines control-plane tasks (provisioning, rollback, monitoring, billing) and data-plane responsibilities (public ingress, core flows, no root DB access).
- Existing strategy docs repeatedly describe tenant isolation via schemas and tenant-specific credentials.
- Workflows are already structured as separate runtime artifacts (`saas/workflows/*.json`), which supports standardized rollout.

### Observation
- Official n8n hosting docs recommend **queue mode** for scale and document workers, webhook processors, and multi-main setup constraints.

### Inference
- The current plan is architecturally consistent with both n8n operational model and decentralized workflow-execution literature.
- The main delivery gap is not concept but execution order and testable gates.

## Disagreements / gaps
1. Some docs lean toward schema-per-tenant, others mention full single-tenant stacks. A default must be chosen per tier.
2. HA assumptions are mixed: multi-main appears in docs, but enterprise feature boundaries and fallback strategy need explicit treatment.
3. No unified benchmark loop currently tied to rollout phases (latency, error rate, worker saturation, DB pool pressure).

## Clear argued development path
### Phase 1 (Now): Foundation hardening
- Close direct n8n exposure and enforce reverse-proxy-only ingress.
- Complete n8n→PostgreSQL migration and verify backups/restore.
- Enforce container memory limits and health checks.

### Phase 2: Data-plane contracts
- Implement deterministic tenant resolution at ingress.
- Enforce per-tenant DB users and schema-only privileges.
- Add prompt firewall and tenant-scoped tool access for LLM nodes.

### Phase 3: Scale primitives
- Enable `EXECUTIONS_MODE=queue` with Redis.
- Add worker pool and explicit worker concurrency policy.
- Split webhook processors behind load balancer; keep main out of webhook pool.

### Phase 4: Control plane automation
- Build internal n8n workflows for tenant provisioning, workflow deployment/rollback, and smoke tests.
- Add rollout policy: canary -> health gate -> global deployment.

### Phase 5: Evidence-driven threshold scaling
- Define measurable triggers for moving from vertical scaling to more workers/nodes.
- Track: p95 webhook latency, execution failure rate, queue depth, DB connection saturation.

## Risks
- **Risk:** Mixing control-plane and public ingress responsibilities in one instance increases blast radius.
- **Risk:** Tenant data leakage via mis-scoped DB credentials or prompt context.
- **Risk:** Premature complexity (HA/multi-main) before baseline observability.

## Open questions
1. What exact traffic threshold should trigger queue-mode activation?
2. Is multi-main needed in first 6 months, or is fast failover on single main + backup sufficient?
3. Which customers require enterprise isolation (DB/runtime-per-tenant) at launch?

## Recommended next steps (next 2 weeks)
1. Finalize one tenancy default: **schema-per-tenant standard**, dedicated stacks only for enterprise.
2. Implement automated tenant-provisioning flow in control plane.
3. Add staging load test for 5/15/25 concurrent incidents and capture queue/DB metrics.
4. Produce go/no-go checklist for first external tenant onboarding.

## Sources
- n8n docs — Scaling overview: https://docs.n8n.io/hosting/scaling/
- n8n docs — Queue mode: https://docs.n8n.io/hosting/scaling/queue-mode/
- Paper: *A Dataflow Language for Decentralised Orchestration of Web Service Workflows* (2013), arXiv:1305.01840 — https://arxiv.org/abs/1305.01840
- Google Borg (context on control/worker separation at scale): https://research.google.com/pubs/archive/43438.pdf
- Omega scheduler paper (control-plane scheduling model): https://research.google.com/pubs/archive/41684.pdf
