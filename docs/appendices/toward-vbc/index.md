# Toward Value-Based Care in the US

The healthcare system in the US is by far the most expensive
healthcare system in the world, yet it does not produce outcomes to
match that spending. A large share of the gap comes from how care is
paid for: **fee-for-service** reimburses every test, visit, and
procedure as a separate billable event, which rewards volume even
when volume does not improve health. **Value-based care (VBC)**
reverses that incentive by tying payment to the cost and quality of
an entire patient's care over time rather than to the count of
services delivered.

The idea is not new — capitation, shared savings, and bundled
payments (introduced in [Chapter 16](../../chapters/16-healthcare-revenue-and-cost-analysis/index.md)
and [Chapter 17](../../chapters/17-healthcare-financial-forecasting-and-risk/index.md))
have existed for decades. What has kept value-based care from
scaling past a minority of US healthcare spending is not the
economic theory — it is a **data modeling problem**. Paying fairly
for outcomes requires connecting facts that fee-for-service billing
never had to connect: which provider actually influenced which
outcome, how sick a patient really was before treatment started, how
much of a patient's total cost of care happened outside the practice
that is being measured, and whether a cost or quality number is
being compared to a fair peer benchmark. Every one of those
questions is a graph traversal question — "follow this patient
across every provider, claim, and condition they touched, then
compare the result to a fair peer group" — and every one of them is
awkward or impossible to answer from billing tables designed to
process one claim at a time.

This appendix works through concrete examples of the graph
structures that make value-based care computable, auditable, and —
critically — **fair to all three parties who have to accept the
result**: the providers being paid, the patients receiving care, and
the payors financing it.

## The Three-Sided Fairness Problem

Every value-based payment model has to answer the same question for
three different audiences at once, and a model that satisfies only
one of them collapses:

- **Fair to providers** means a provider is not penalized for
  factors outside their control — a sicker-than-average patient
  panel, a patient's non-adherence, a complication caused by another
  clinician in the care team, or a poor social environment the
  provider cannot change. Providers who see this happen stop
  participating in value-based contracts, which is exactly what
  slowed VBC adoption through the 2010s.
- **Fair to patients** means the drive to control cost does not
  translate into under-treatment, denied referrals, or a system that
  quietly avoids sicker and more complex patients because they are
  expensive to manage well.
- **Fair to payors** means the payments made under the contract
  actually reflect the risk and cost being managed — not risk scores
  inflated by upcoding, savings claimed for cost reductions that
  would have happened anyway, or quality measures satisfied on
  paper without a matching clinical improvement.

A relational, claim-by-claim data warehouse can report volume and
unit price well, which is why it was good enough for
fee-for-service. It struggles with all three fairness questions
above, because each one requires walking a chain of relationships —
patient to condition to risk category, provider to care team to
attributed outcome, claim to episode to benchmark peer group — that
a foreign-key join can express but that becomes slow and unreadable
once the chain gets more than two or three hops long. A graph model
makes those chains the primary unit of query, which is what turns
"fairness" from a contract negotiation into something that can
actually be computed and audited.

## A Graph Model for Value-Based Care

The examples in this appendix build on a small set of node and
relationship types layered on top of the claims and provider graph
already developed in
[Chapter 14](../../chapters/14-insurance-claims-coverage-pharmacy-benefits/index.md),
[Chapter 15](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md),
and [Chapter 16](../../chapters/16-healthcare-revenue-and-cost-analysis/index.md):

| Node | Represents |
|------|------------|
| `Patient` | An individual receiving care |
| `Condition` | A diagnosed clinical condition, mapped to an ICD-10 code |
| `HCCCategory` | A Hierarchical Condition Category used for risk scoring |
| `Provider` / `ProviderGroup` | An individual clinician or the organization they bill under |
| `CareTeamRole` | A provider's specific role (attending, consulting, post-acute) within one patient's episode |
| `Episode` | A bounded period of care for one clinical event (a surgery, a pregnancy, a chronic-disease year) |
| `Claim` | A billed service, as modeled in Chapter 14 |
| `QualityMetric` | A measured clinical outcome (readmission, HbA1c control, screening completion) |
| `SocialDeterminant` | A non-clinical risk factor (housing instability, food insecurity, transportation access) |
| `Contract` | A value-based agreement between a `Payor` and a `ProviderGroup` |
| `PeerCohort` | A cluster of patients or providers judged comparable for benchmarking |

And the relationships that connect them:

```cypher
(:Patient)-[:DIAGNOSED_WITH]->(:Condition)
(:Condition)-[:MAPS_TO]->(:HCCCategory)
(:Patient)-[:HAS_RISK_FACTOR]->(:SocialDeterminant)
(:Patient)-[:PART_OF]->(:Episode)
(:Provider)-[:HAS_ROLE {role: "Attending"}]->(:CareTeamRole)-[:IN_EPISODE]->(:Episode)
(:Claim)-[:BELONGS_TO]->(:Episode)
(:Episode)-[:MEASURED_BY]->(:QualityMetric)
(:ProviderGroup)-[:PARTY_TO]->(:Contract)-[:WITH]->(:Payor)
(:Patient)-[:BENCHMARKED_AGAINST]->(:PeerCohort)
```

Nothing here replaces the claims and eligibility graph from earlier
chapters — it extends it with the handful of node types a
value-based contract actually needs to settle: risk, attribution,
episode boundaries, and peer comparison.

## Example 1: Risk-Adjusted Capitation That Resists Gaming

Chapter 16 introduced risk adjustment as scaling a capitated PMPM
payment by a patient panel's average HCC risk score. The fairness
problem is what happens *between* that clean summary number and the
individual diagnosis codes that produced it: a provider group under
financial pressure has a direct incentive to document additional
HCC-qualifying conditions (a practice payors call upcoding) even
when the clinical evidence for them is thin, which overpays that
group at every other stakeholder's expense.

A graph model makes the evidence chain behind every risk-adjusted
dollar traceable rather than trusting the diagnosis code alone. Each
`Condition` used to compute an HCC score is connected not just to
the `Patient` but to the clinical evidence that supports it:

```cypher
(:Condition {code: "E11.22", name: "T2 Diabetes w/ CKD"})
  -[:SUPPORTED_BY]->(:LabResult {test: "eGFR", value: 42})
(:Condition {code: "E11.22"})
  -[:SUPPORTED_BY]->(:Medication {name: "Metformin", active: true})
```

A condition contributing to a risk score with no connected
`LabResult`, `Medication`, or prior-year recurrence edge is exactly
the pattern a payor's auditors want surfaced automatically:

```cypher
MATCH (p:Patient)-[:DIAGNOSED_WITH]->(c:Condition)-[:MAPS_TO]->(h:HCCCategory)
WHERE NOT (c)-[:SUPPORTED_BY]->()
RETURN p.patient_id, c.code, h.category
```

This traversal is fair to all three parties at once: it protects the
**payor** from paying inflated capitation on unsupported diagnoses,
it protects **patients** because it keeps the incentive pointed at
real disease management rather than documentation volume, and it
protects **honest providers** by making the audit selective —
instead of every provider group facing suspicion, only the specific
patient-condition pairs lacking supporting evidence surface for
review.

## Example 2: Attributing Shared Savings Across a Care Team

Bundled payments and shared-savings programs pay a single amount for
an entire episode, but the episode is rarely delivered by one
provider. A hip replacement `Episode` might involve a surgeon, an
anesthesiologist, the hospital facility, a physical therapist, and a
skilled nursing facility for post-acute recovery. Fee-for-service
never had to decide how much of a savings (or overrun) each of them
caused, because each billed and was paid independently. Shared
savings has to decide exactly that, or the incentive to manage cost
collapses for anyone whose contribution can't be seen.

A graph model attaches each contributor to the episode with a
weighted edge reflecting their share of cost and their share of
control over that cost:

```cypher
(:Provider {name: "Dr. Osei", role: "Surgeon"})
  -[:CONTRIBUTED_TO {cost_share: 0.35, control_share: 0.55}]->(:Episode {id: "EP-48213"})
(:Provider {name: "Dr. Patel", role: "Anesthesiologist"})
  -[:CONTRIBUTED_TO {cost_share: 0.10, control_share: 0.10}]->(:Episode {id: "EP-48213"})
(:Facility {name: "Riverside SNF"})
  -[:CONTRIBUTED_TO {cost_share: 0.40, control_share: 0.30}]->(:Episode {id: "EP-48213"})
(:Facility {name: "Northside Hospital"})
  -[:CONTRIBUTED_TO {cost_share: 0.15, control_share: 0.05}]->(:Episode {id: "EP-48213"})
```

Distributing savings by `cost_share` alone would be fair in a purely
accounting sense but unfair operationally: the skilled nursing
facility represents 40% of the episode's cost, but a surgeon who
chose a technique that shortened the hospital stay and avoided a
SNF placement altogether exercised far more *control* over whether
that cost happened at all. Weighting the savings distribution toward
`control_share`, or blending both weights, rewards the decisions
that actually drove the outcome rather than the party that happened
to hold the largest line item — which is precisely the distinction a
flat percentage split cannot make and a weighted graph traversal
can.

## Example 3: Attributing Quality Outcomes to the Right Provider

Readmission penalties are a common flashpoint for provider
fairness complaints: a patient discharged after surgery who is
readmitted two weeks later because a primary-care follow-up never
happened should not count against the surgeon, but a naive quality
measure that simply asks "was this patient readmitted within 30 days
of this provider's procedure?" attributes the outcome to whoever
performed the procedure regardless of who actually failed to close
the loop.

A `CareTeamRole` graph lets the quality-attribution query walk
forward from the discharge event to find who held responsibility for
the specific failure that caused the readmission, rather than
defaulting to the most visible provider on the claim:

```cypher
MATCH (e:Episode)-[:MEASURED_BY]->(q:QualityMetric {type: "30-Day Readmission"})
MATCH (e)<-[:IN_EPISODE]-(:CareTeamRole {role: "Follow-Up Coordination"})<-[:HAS_ROLE]-(responsible:Provider)
MATCH (e)<-[:IN_EPISODE]-(:CareTeamRole {role: "Surgeon"})<-[:HAS_ROLE]-(surgeon:Provider)
RETURN e.id, q.result, responsible.name AS accountable_for_followup, surgeon.name AS performed_procedure
```

This is not a technicality — it changes real behavior. When the
graph can show that the follow-up-coordination role, not the
surgical role, is where a specific readmission originated, the
health system's improvement effort (and the compensation impact) can
target the actual point of failure. Surgeons who see readmissions
attributed accurately, instead of automatically, are far more likely
to stay engaged with a value-based contract instead of viewing it as
an arbitrary tax on their most complex cases.

## Example 4: Total Cost of Care Across a Multi-Payor Network

A primary-care group managing a patient's total cost of care under a
shared-savings contract is only measured fairly if the "total"
actually includes care the patient received outside that group's own
walls — a specialist visit billed to a different payor, an ER visit
at a hospital with no financial relationship to the group, or a
prescription filled through a separate pharmacy benefit manager.
Health systems call the portion of care that happens outside the
attributed network **referral leakage**, and in a claims warehouse
scoped to a single payor's own data, leaked care is often invisible
by construction — the group looks artificially efficient simply
because its most expensive patients received care nobody measured.

The `Patient` node itself is the natural join point for stitching
this together, because it is the one entity every payor's claims
data shares:

```cypher
MATCH (p:Patient)-[:PART_OF]->(e:Episode)<-[:BELONGS_TO]-(c:Claim)-[:PAID_BY]->(payor:Payor)
WHERE p.patient_id = "PT-90210"
RETURN payor.name, sum(c.allowed_amount) AS total_cost, count(c) AS claim_count
ORDER BY total_cost DESC
```

Run across an entire attributed panel, the same pattern reveals
which portion of total cost of care originated outside the
contracted `ProviderGroup`'s own claims — the leakage a
single-payor report would never show. This protects **payors** from
paying shared-savings bonuses calculated on an incomplete cost
picture, and it protects **providers** by giving them visibility
into exactly where their patients' spending is actually happening,
which is the first step toward redirecting referrals into
higher-value parts of the network instead of being blamed for costs
they never saw coming.

## Example 5: Fair Peer Benchmarks Through Graph Clustering

Value-based contracts almost always compare a provider's cost or
quality against a benchmark, and the benchmark is where a great deal
of provider distrust originates: comparing a rural family-medicine
practice with an older, sicker, socioeconomically disadvantaged
panel against a national average dominated by urban and suburban
practices produces a benchmark that no amount of good clinical
management can meet. It is not a data problem in the sense of
missing information — it is a **cohort-selection** problem, and
cohort selection is exactly what the clustering algorithms from
[Chapter 6](../../chapters/06-graph-embeddings-clustering-gnn/index.md)
are built to solve.

Rather than benchmarking every provider against one national number,
patients (or providers) are first clustered into a `PeerCohort` using
similarity across risk score, geography, and comorbidity profile —
the same graph clustering and node-similarity techniques introduced
in [Chapter 5](../../chapters/05-graph-algorithms-centrality-similarity/index.md)
for finding structurally similar nodes:

```cypher
(:Patient {risk_score: 1.8, region: "Rural-South", comorbidity_count: 4})
  -[:BENCHMARKED_AGAINST]->(:PeerCohort {id: "Rural-High-Complexity"})
(:Patient {risk_score: 0.6, region: "Urban-Northeast", comorbidity_count: 1})
  -[:BENCHMARKED_AGAINST]->(:PeerCohort {id: "Urban-Low-Complexity"})
```

A provider's cost and quality results are then compared only against
the `PeerCohort` their actual patient mix belongs to:

```cypher
MATCH (p:Patient)-[:ATTRIBUTED_TO]->(pg:ProviderGroup {id: "PG-4471"})
MATCH (p)-[:BENCHMARKED_AGAINST]->(cohort:PeerCohort)
MATCH (peer:Patient)-[:BENCHMARKED_AGAINST]->(cohort)
RETURN cohort.id, avg(p.total_cost) AS group_avg, avg(peer.total_cost) AS cohort_avg
```

This turns "beat the benchmark" from a demographic accident into a
genuine measure of care management, which is the difference between
a value-based contract that health systems trust enough to sign and
one they treat as a lottery weighted against them.

## Example 6: Social Risk Without Penalizing the Provider or the Patient

Clinical risk scores like HCC categories capture disease burden well
but say nothing about a patient's **social determinants** — housing
instability, food insecurity, or lack of transportation — even
though these factors are strongly predictive of cost and outcomes.
Leaving them out of the model creates unfairness in both directions
at once: providers serving disadvantaged populations are held to
cost and quality targets that do not account for barriers outside
their control, and patients in that same population can end up
under-treated if a plan quietly avoids enrolling members it expects
to be expensive.

Modeling `SocialDeterminant` as its own node type, connected to the
patient alongside — never merged into — clinical conditions, lets an
adjusted risk score be computed transparently instead of folding
social risk invisibly into a clinical code (a practice that
misrepresents *why* a patient is high-risk and makes the number
impossible to audit):

```cypher
(:Patient {patient_id: "PT-55210"})-[:HAS_RISK_FACTOR]->(:SocialDeterminant {type: "Housing Instability"})
(:Patient {patient_id: "PT-55210"})-[:HAS_RISK_FACTOR]->(:SocialDeterminant {type: "Transportation Access", severity: "Limited"})
```

```cypher
MATCH (p:Patient)-[:DIAGNOSED_WITH]->(:Condition)-[:MAPS_TO]->(h:HCCCategory)
OPTIONAL MATCH (p)-[:HAS_RISK_FACTOR]->(sdoh:SocialDeterminant)
RETURN p.patient_id, sum(h.weight) AS clinical_risk, count(sdoh) AS social_risk_factors
```

Keeping the two risk sources separate but queryable together means a
contract can adjust the cost benchmark for documented social risk
without ever touching the clinical HCC score itself — the provider's
clinical risk adjustment stays auditable against lab and medication
evidence exactly as in Example 1, while the social adjustment layer
is auditable on its own terms against a completely different kind of
evidence (a case-management referral, a housing-assistance
enrollment). Separating the two is what keeps either one from being
gamed by inflating the other.

## Worked Example: A Fair Shared-Savings Settlement

Bringing several of these pieces together: a `ProviderGroup`
manages a `PeerCohort`-benchmarked panel of 500 capitated lives at a
base PMPM of $45 with an average HCC risk score of 1.2 (computed and
audited as in Example 1), for a risk-adjusted annual capitation
revenue of $324,000 (`$45 × 1.2 × 500 × 12`). The graph's total cost
of care query (Example 4) — which, unlike a single-payor claims
report, includes leaked-out specialist and ER spending — finds
actual annual cost across the panel of $290,000, appropriately
compared against the group's correct `Rural-High-Complexity` peer
cohort (Example 5) rather than a national average.

That produces a raw surplus of $34,000. Before distribution, the
contract requires the panel's quality metrics (Example 3) to clear
a threshold; two of three quality measures pass, and the contract
specifies a 90% quality multiplier when one measure narrowly misses,
yielding a final shared-savings pool of $30,600. Because the episode
graph (Example 2) shows this group's savings were driven jointly by
a primary-care physician (`control_share: 0.6`) and a care-management
nurse coordinator (`control_share: 0.4`), the pool splits
$18,360 / $12,240 between them — a distribution that traces back,
edge by edge, to auditable clinical evidence, correctly scoped cost
data, a fair peer comparison, and a documented quality result. A
provider group, a health plan's actuarial team, and a state
regulator reviewing the same contract can all replay this exact
traversal and arrive at the same number, which is what "fair" has to
mean when three parties with different incentives are settling a
single payment.

## Guardrails: Keeping the Incentives Honest

Every mechanism above creates a new incentive, and every new
incentive can be gamed if the graph that enforces it is not itself
monitored. The same anomaly-detection patterns developed in
[Chapter 18](../../chapters/18-healthcare-fraud-patterns-and-detection/index.md)
and [Chapter 19](../../chapters/19-fraud-investigation-and-compliance/index.md)
for fraud rings apply directly here: a sudden spike in a provider
group's average risk score with no matching change in lab or
medication evidence (Example 1), an episode whose `CONTRIBUTED_TO`
weights shift suspiciously toward whichever provider is negotiating
the next contract, or a `PeerCohort` that a provider group has
somehow been re-assigned into right before a benchmarking cycle are
all traversal patterns a compliance graph can flag automatically.
Value-based care only stays fair over time if the graph modeling the
incentives is audited with the same rigor as the graph modeling the
care itself.

## Summary

Fee-for-service billing only ever had to answer "what was done, and
what does it cost?" — a question relational tables answer well.
Value-based care asks a fundamentally different question: "given
everything that happened to this patient, across every provider and
every payor involved, who is responsible for the outcome, and what
is a fair price for it?" That question is a multi-hop graph
traversal by nature, and the six examples in this appendix — audited
risk adjustment, weighted episode attribution, correct quality
attribution, network-wide total cost of care, peer-cohort
benchmarking, and separately modeled social risk — are what turn
"value-based care" from a payment philosophy into a system precise
enough that providers, patients, and payors can all audit the same
number and agree it is fair. Chapter 20's treatment of
[AI, LLMs, and Knowledge Graphs for Healthcare](../../chapters/20-ai-llms-and-knowledge-graphs-for-healthcare/index.md)
picks up directly from here, since these same attribution and
benchmarking graphs are exactly the structured, auditable substrate
that keeps an AI-assisted value-based care system explainable rather
than a black box.
