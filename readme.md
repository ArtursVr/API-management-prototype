\# API pārvaldības prototips informācijas sistēmu integrācijai pēc apvienošanās



Šis repozitorijs satur bakalaura darba praktiskās daļas prototipu, kas demonstrē API pārvaldības pieeju informācijas sistēmu integrācijai pēc organizāciju apvienošanās.



Prototips ir izstrādāts kontrolētai testēšanas videi, lai demonstrētu API vārtejas, orkestrācijas slāņa, vairāku servisu datu apvienošanas un vienkāršotas piekļuves kontroles principus.



\## Projekta mērķis



Prototipa mērķis ir parādīt, kā API vārtejas un orķestrācijas slāņa izmantošana var samazināt klienta sistēmas integrācijas sarežģītību situācijā, kur dati jāiegūst no vairākām neatkarīgām informācijas sistēmām.



\## Arhitektūra



Prototips sastāv no šādām komponentēm:



\- \*\*API Gateway\*\* — nodrošina centralizētu piekļuves punktu, token pārbaudi un pieprasījumu maršrutēšanu.

\- \*\*Orchestration Service\*\* — apvieno vairāku servisu atbildes vienotā datu modelī.

\- \*\*Status Service\*\* — nodrošina studenta statusa informāciju.

\- \*\*Payment Service\*\* — nodrošina studenta maksājumu informāciju.



\## Projekta struktūra



api-demo/

├── gateway/

├── orchestration/

├── status-service/

├── payment-service/

├── docker-compose.yml

├── README.md

└── .gitignore

