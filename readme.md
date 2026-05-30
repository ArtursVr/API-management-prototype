# API pārvaldības prototips pēc sistēmu apvienošanās

Šis repozitorijs satur bakalaura darba praktiskās daļas prototipu. Projekta mērķis ir parādīt, kā API vārteju un orķestrācijas slāni var izmantot, lai apvienotu datus no vairākām neatkarīgām informācijas sistēmām.

Prototips ir veidots kā kontrolēta demonstrācijas vide, nevis kā pilnvērtīga produkcijas sistēma. Tas parāda galvenos API pārvaldības principus: centralizētu piekļuves punktu, vienkāršotu token pārbaudi, vairāku servisu datu apvienošanu un kļūdu apstrādi API slānī.

## Projekta ideja

Pēc organizāciju apvienošanās dati bieži atrodas vairākās atšķirīgās sistēmās. Klienta lietojumprogrammai šādā situācijā nevajadzētu zināt katra servisa iekšējo struktūru un pašai apvienot datus no vairākiem avotiem.

Šajā prototipā klienta sistēma izmanto vienu API endpointu, bet orķestrācijas slānis fonā iegūst datus no statusa un maksājumu servisiem, apvienojot tos vienā atbildē.

## Komponentes

Projekts sastāv no četrām galvenajām daļām:

- **gateway** — API vārteja, kas apstrādā ienākošos pieprasījumus, pārbauda tokenu un maršrutē pieprasījumus tālāk.
- **orchestration** — serviss, kas apvieno datus no vairākiem backend servisiem.
- **status-service** — serviss, kas atgriež studenta statusa informāciju.
- **payment-service** — serviss, kas atgriež studenta maksājumu informāciju.

## Projekta struktūra

```text
api-demo/
├── gateway/
├── orchestration/
├── status-service/
├── payment-service/
├── docker-compose.yml
├── README.md
└── .gitignore
