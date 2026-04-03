#!/usr/bin/env python3
import json
import re
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]

DOC_FILES = [
    ROOT / "saas/Planung Umsetzung/masterplan.md",
    *sorted((ROOT / "saas/skalierungsansätze").glob("*.md")),
]
WORKFLOW_FILES = sorted((ROOT / "saas/workflows").glob("*.json"))
BRIEF_FILE = ROOT / "outputs/scale-research/scaling-strategy-brief.md"


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="ignore")


def has_any(text: str, patterns: list[str]) -> bool:
    t = text.lower()
    return any(p.lower() in t for p in patterns)


def score_from_checks(text: str, checks: list[tuple[str, list[str], int]]):
    score = 0
    hits = []
    for name, patterns, pts in checks:
        if has_any(text, patterns):
            score += pts
            hits.append(name)
    return score, hits


def workflow_stats(files: list[Path]):
    stats = {"files": len(files), "valid_json": 0, "nodes": 0, "has_webhook": 0}
    for wf in files:
        try:
            data = json.loads(wf.read_text(encoding="utf-8"))
            stats["valid_json"] += 1
            nodes = data.get("nodes", []) if isinstance(data, dict) else []
            stats["nodes"] += len(nodes)
            names = " ".join(str(n.get("name", "")) for n in nodes if isinstance(n, dict)).lower()
            if "webhook" in names or "trigger" in names:
                stats["has_webhook"] += 1
        except Exception:
            pass
    return stats


def main():
    docs_text = "\n\n".join(read_text(p) for p in DOC_FILES)
    brief_text = read_text(BRIEF_FILE)
    all_text = docs_text + "\n\n" + brief_text

    control_checks = [
        ("control_plane", ["control plane", "n8n-internal"], 4),
        ("tenant_provisioning", ["provisioning", "onboarding"], 4),
        ("deployment_rollback", ["deployment", "rollback"], 4),
        ("monitoring", ["monitoring", "health"], 4),
        ("tenant_registry", ["internal.tenants", "tenant registry"], 4),
    ]

    data_plane_checks = [
        ("data_plane", ["data plane", "n8n-customer"], 4),
        ("tenant_resolution", ["tenant resolution", "tenant_id"], 4),
        ("schema_isolation", ["schema", "tenant_"], 4),
        ("db_user_isolation", ["dedizierter db-user", "dedicated db-user", "db-user"], 4),
        ("llm_firewall", ["llm", "prompt-firewall", "tenant-gescopte"], 4),
    ]

    scaling_checks = [
        ("queue_mode", ["queue mode", "executions_mode=queue", "executions.mode"], 4),
        ("redis", ["redis"], 4),
        ("worker", ["worker"], 4),
        ("webhook_processors_lb", ["webhook", "load balancer"], 4),
        ("multi_main_or_ha", ["multi-main", "high availability", "ha"], 4),
    ]

    ops_checks = [
        ("health_checks", ["healthcheck", "health check"], 4),
        ("alerts", ["alert", "alerting"], 4),
        ("retry_dlq", ["retry", "dead-letter", "dead letter"], 4),
        ("acceptance_criteria", ["akzeptanzkriterien", "acceptance criteria"], 4),
        ("security_hardening", ["port 5678", "ram-limits", "härtung", "haertung"], 4),
    ]

    paper_checks = [
        ("matched_paper", ["arxiv:1305.01840", "1305.01840", "decentralised orchestration"], 6),
        ("official_n8n_docs", ["docs.n8n.io/hosting/scaling", "queue-mode"], 5),
        ("evidence_vs_inference", ["observation", "inference", "risk"], 3),
        ("phased_plan", ["phase 1", "phase 2", "next steps"], 3),
        ("source_links", ["http://", "https://"], 3),
    ]

    c_score, c_hits = score_from_checks(all_text, control_checks)
    d_score, d_hits = score_from_checks(all_text, data_plane_checks)
    s_score, s_hits = score_from_checks(all_text, scaling_checks)
    o_score, o_hits = score_from_checks(all_text, ops_checks)
    p_score, p_hits = score_from_checks(brief_text, paper_checks)

    wf = workflow_stats(WORKFLOW_FILES)
    workflow_bonus = 0
    if wf["files"] >= 3 and wf["valid_json"] == wf["files"]:
        workflow_bonus = 5

    total = c_score + d_score + s_score + o_score + p_score + workflow_bonus
    total = min(total, 100)

    result = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "metric": "scaling_readiness_score",
        "unit": "points",
        "direction": "higher-is-better",
        "score": total,
        "subscores": {
            "control_plane": c_score,
            "data_plane": d_score,
            "scaling_mechanics": s_score,
            "operability": o_score,
            "paper_alignment": p_score,
            "workflow_bonus": workflow_bonus,
        },
        "hits": {
            "control_plane": c_hits,
            "data_plane": d_hits,
            "scaling_mechanics": s_hits,
            "operability": o_hits,
            "paper_alignment": p_hits,
        },
        "workflow_stats": wf,
        "inputs": {
            "docs": [str(p.relative_to(ROOT)) for p in DOC_FILES if p.exists()],
            "workflows": [str(p.relative_to(ROOT)) for p in WORKFLOW_FILES],
            "brief": str(BRIEF_FILE.relative_to(ROOT)),
        },
    }

    out_dir = ROOT / "experiments/scaling_eval/results"
    out_dir.mkdir(parents=True, exist_ok=True)
    latest = out_dir / "latest.json"
    latest.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"scaling_readiness_score={total}")
    print(f"subscores={json.dumps(result['subscores'], ensure_ascii=False)}")
    print(f"result_file={latest}")


if __name__ == "__main__":
    main()
