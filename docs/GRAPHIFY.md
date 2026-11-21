# Graphify pentru acest proiect

Graphify creează o hartă locală a codului, pentru investigații în Codex.
Nu este necesar un cont Graphify Cloud. Configurarea nu folosește un backend AI,
nu cere chei API și nu adaugă Graphify în aplicația publică.

## Instalare și prima analiză

În terminalul proiectului (local, Codespaces sau mediul Codex), cu Python 3.10–3.14:

```bash
bash scripts/graphify-setup.sh
```

Instalarea inițială descarcă pachetul oficial `graphifyy` și dependențele sale din
PyPI. Versiunea directă este fixată în `requirements-graphify.txt`; dependențele
tranzitive sunt rezolvate la instalare. Scriptul generează harta numai din cod,
fără analiză semantică prin API. Include parserul SQL pentru schema proiectului.

## Folosire în Codex

Instrucțiunile Graphify sunt incluse în `.codex/skills/graphify/` pentru mediile
care acceptă această locație. Comanda explicită CLI funcționează și când mediul
nu descoperă automat skill-ul. `AGENTS.md` descrie folosirea hărții.

```bash
.venv-graphify/bin/graphify query "Sales Lab registration email Google Sheets"
.venv-graphify/bin/graphify explain "SalesLabRegistrationForm"
.venv-graphify/bin/graphify update . --no-cluster
.venv-graphify/bin/graphify cluster-only . --no-label
```

Poți cere asistentului: „Folosește Graphify ca să urmărești formularul Sales Lab
până la salvarea înscrierii și trimiterea emailului. Verifică apoi codul relevant.”

Deschide `graphify-out/graph.html` pentru harta interactivă. Fișierele generate
pot conține fragmente și relații din cod; rămân locale și sunt ignorate de Git.
Nu le copia în `public/` și nu le publica prin GitHub Pages.

Harta nu verifică livrarea efectivă a emailurilor sau serviciile externe și poate
omite legături dinamice. Confirmă concluziile în cod și prin teste relevante.
Documentele/media au nevoie de o etapă semantică separată; scriptul nu o activează.

## Alte proiecte

Aceeași configurare poate fi aplicată separat în Youngminds, Command Center și
David Intercar: copiază scriptul, requirements, instrucțiunile și regulile Git,
adaugă secțiunea în AGENTS.md fără a suprascrie regulile existente, apoi rulează
instalarea în acel proiect. Fiecare proiect își generează propria hartă.

Sursa oficială: https://github.com/Graphify-Labs/graphify (Apache-2.0).
Instrucțiunile incluse provin din instalatorul oficial al versiunii 0.9.106.
