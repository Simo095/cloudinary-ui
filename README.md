# Cloudinary Image Gallery

Questa applicazione React, costruita con Next.js, permette di visualizzare, rinominare ed eliminare immagini caricate su Cloudinary.

## Caratteristiche

- **Visualizzazione delle Immagini:** Utilizza `react-masonry-css` per una galleria responsive di immagini caricate su Cloudinary.
- **Rinominare le Immagini:** Permette di rinominare le immagini direttamente dalla galleria.
- **Eliminazione delle Immagini:** Permette di eliminare le immagini dalla galleria.
- **Modal di Anteprima:** Permette di visualizzare un'anteprima ingrandita delle immagini.
- **Gestione dello Stato con Redux Toolkit:** Utilizza Redux Toolkit per gestire lo stato dell'applicazione.
- **API Serverless Next.js:** Utilizza API serverless Next.js per interagire con l'API Cloudinary.
- **Upload immagini:** Permette di caricare immagini tramite form-data.
- **Autenticazione Cloudinary:** Autenticazione con Cloudinary tramite API KEY e API SECRET.

## Tecnologie Utilizzate

- **React:** Libreria JavaScript per la creazione di interfacce utente.
- **Next.js:** Framework React per la creazione di applicazioni web.
- **Redux Toolkit:** Libreria per la gestione dello stato dell'applicazione.
- **react-masonry-css:** Libreria per la creazione di layout a griglia masonry.
- **react-icons:** Libreria di icone React.
- **react-bootstrap:** Libreria di componenti Bootstrap per React.
- **Cloudinary:** Servizio di gestione delle immagini e dei video.
- **Formidable:** Libreria per la gestione dei form data.
- **TypeScript:** Linguaggio di programmazione per la tipizzazione statica.

## Struttura del Progetto

cloudinary-image-gallery/
├── components/
│ └── AlertModal.tsx
│ └── CloudinaryImageManager.tsx
│ └── HeaderCloudinaryManager.tsx
│ └── Loader.tsx
│ └── MasonryGallery.tsx
├── pages/
│ ├── api/
│ │ ├── cloudinary/
│ │ │ ├── delete_image.ts
│ │ │ ├── get_images.ts
│ │ │ └── upload_image.ts
│ └── index.tsx
├── redux/
│ └── reducer.ts
│ └── store.ts
├── utils/
│ └── requestCloudinary.ts
├── css/
│ └── MasonryGallery.css
│ └── Loader.css
├── .env.local
├── package.json
└── README.md

## Utilizzo

- **Visualizzazione:** La galleria mostra tutte le immagini caricate su Cloudinary.
- **Rinominare:** Clicca sull'icona di modifica per rinominare un'immagine.
- **Eliminare:** Clicca sull'icona del cestino per eliminare un'immagine.
- **Anteprima:** Clicca sull'icona dell'occhio per visualizzare un'anteprima ingrandita.

## API Serverless

- `/api/cloudinary/get_images`: Recupera tutte le immagini da Cloudinary.
- `/api/cloudinary/delete_image`: Elimina un'immagine da Cloudinary.
- `/api/cloudinary/upload_image`: Carica un'immagine su Cloudinary.

## Gestione dello Stato

- `redux/reducer.ts`: Definisce lo stato e le azioni Redux per la gestione delle immagini.

## Autore

Simone D'Angelo
