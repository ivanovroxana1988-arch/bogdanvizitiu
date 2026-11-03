# Sales Lab — sincronizarea formularului cu Google Sheets

Registru: https://docs.google.com/spreadsheets/d/1kNagHqhKadt1KuWM8sLzz3owEpLZKeBZl2TYDaPNxCw/edit

## Autorizare, o singura data
1. In Google Cloud, activeaza Google Sheets API si creeaza un service account dedicat.
2. Creeaza o cheie JSON pentru contul tehnic; pastreaz-o secreta.
3. In registrul Google Sheets, foloseste Share pentru a acorda rolul Editor adresei client_email din contul tehnic. Nu activa accesul public.
4. In Vercel > bogdanvizitiu > Settings > Environment Variables, adauga pentru Production:
   - SALES_LAB_SHEET_ID = 1kNagHqhKadt1KuWM8sLzz3owEpLZKeBZl2TYDaPNxCw
   - GOOGLE_SHEETS_CLIENT_EMAIL = campul client_email din JSON
   - GOOGLE_SHEETS_PRIVATE_KEY = campul private_key din JSON (accepta si escape-urile pentru newline)
5. Redeploy dupa schimbarea variabilelor de mediu.

## Comportament
- Notificarea catre organizator este trimisa prin Resend inainte de sincronizarea in Sheet.
- Dupa succesul notificarii, API-ul adauga un rand in Inscrieri, cu 15 coloane.
- Statusul initial este Cerere primita, sau In asteptare daca Situatie locuri!C10 arata zero locuri disponibile.
- Doar Confirmat sau Platit ocupa din cele 15 locuri. Lista de asteptare se actualizeaza din status.
- Daca lipsesc cheile ori Google Sheets nu raspunde, formularul si confirmarea email continua; API raspunde record=email_only si in Vercel se logheaza un avertisment. Organizatorii vor transcrie cererea din email in registru.
- Nu se adauga contactul la newsletter. Nicio rezervare/checkout automat.

## Test si protectia datelor
- Verifica o trimitere cu date de test controlate, randul nou, notificarea si raspunsul catre participant.
- Sterge numai randurile de test. Nu sterge date reale.
- Nu pune private_key in GitHub, browser sau Drive. Pastreaza tabelul privat si partajeaza-l numai cu persoanele autorizate.
- Daca apare record=email_only, verifica accesul service-account la Sheet si variabilele Vercel.