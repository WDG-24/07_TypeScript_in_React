import { useActionState, useId, useState } from 'react';
import './App.css';

import z from 'zod';
import type { IceCreamOrderType } from './types';
import { iceCreamFlavours, IceCreamOrderSchema } from './schemas/iceCreamSchema';

// Typ-Definition für den Zustand der Eiscreme-Bestellung
// Dieser Typ basiert auf dem Zod Schema und repräsentiert sowohl die Formular-Daten als auch potenzielle Fehler
// scoops: string[] wird hier zur Vereinfachung durch scoops: string ersetzt
type IceCreamState = Omit<IceCreamOrderType, 'scoops'> & { error?: string; scoops: string };

const initialState: IceCreamState = {
  error: '',
  cone: true,
  cream: 0,
  scoops: '',
  spoon: false,
  sprinkles: undefined,
};

//  Action für die Verarbeitung der Eiscreme-Bestellung
async function iceCreamAction(_prev: IceCreamState, formData: FormData) {
  const rawData = Object.fromEntries(formData);

  // Transformiert die rohen Formular-Daten in das erwartete Bestellformat
  const orderToSend: IceCreamOrderType = {
    // Wandelt den komma-separierten String in ein Array um
    scoops: typeof rawData.scoops === 'string' ? rawData.scoops.split(',') : [],
    // Konvertiert den Sahne-Wert zu einer Zahl, mit Fallback auf 0
    cream: Number(rawData.cream) || 0,
    // Konvertiert Checkbox-Werte zu Boolean (Checkbox-Werte sind hier entweder "on" oder undefined)
    spoon: !!rawData.spoon,
    cone: !!rawData.cone,
    // Streusel bleiben als String oder undefined
    sprinkles: rawData.sprinkles as string | undefined,
  };

  // Validiert die Bestellung mit dem Zod-Schema
  // safeParse gibt ein Objekt mit success, data und error zurück
  const { data, error, success } = IceCreamOrderSchema.safeParse(orderToSend);
  // console.log('DATA', data);

  // Wenn Validierung erfolgreich war
  if (success) {
    console.log('Doing the fetch');
    // Hier würde normalerweise ein API-Call stattfinden
    // Formular wird auf Initial-Zustand zurückgesetzt
    return initialState;
  }

  // Bei Validierungsfehlern: Gibt den aktuellen Zustand mit Fehlermeldung zurück
  // Behält die eingegebenen Werte bei, damit der Nutzer sie korrigieren kann
  return {
    ...initialState,
    scoops: rawData.scoops as string,
    sprinkles: rawData.sprinkles as string | undefined,
    // Formatiert den Zod-Fehler in eine lesbare Fehlermeldung
    error: z.prettifyError(error),
  };
}

function App() {
  const [scoops, setScoops] = useState<string[]>([]);

  const [state, action, pending] = useActionState(iceCreamAction, initialState);

  // Generiert eine eindeutige ID für die Formular-Elemente (nptzlich, bei einer eigenen Input-Komponente)
  const id = useId();

  return (
    <div>
      <form action={action} style={{ marginTop: '20px' }}>
        <div style={{ margin: '15px 0' }}>
          <label htmlFor={`${id}-scoops`}>Ice Cream Flavors:</label>

          <select
            name='scoops-collect'
            id={`${id}-scoops-collect`}
            style={{ textTransform: 'capitalize' }}
            // Fügt die ausgewählte Sorte zum scoops-Array hinzu
            onChange={(e) => setScoops((s) => [...s, e.target.value])}
          >
            {/* Mapped über alle verfügbaren Eissorten */}
            {iceCreamFlavours.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {/* Verstecktes Input-Feld das die ausgewählten Sorten als komma-separierte 
              Liste speichert - wird beim Submit übertragen */}
          <input name='scoops' id={`${id}-scoops`} value={scoops} hidden></input>

          {/* Zeigt ausgewählte Eissorten als Buttons an */}
          <div>
            {scoops.map((s, ind) => (
              // Button zum Entfernen einer Sorte
              // toSpliced erstellt ein neues Array ohne das Element am Index ind
              <button type='button' key={s + ind} onClick={() => setScoops((p) => p.toSpliced(ind, 1))}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ margin: '15px 0' }}>
          <label>
            <input type='checkbox' name='cone' defaultChecked={state.cone} />
            Serve in cone
          </label>
        </div>

        <div style={{ margin: '15px 0' }}>
          <label>
            Sprinkles:
            <input type='text' name='sprinkles' placeholder='Enter sprinkles type' defaultValue={state.sprinkles} />
          </label>
        </div>

        <div style={{ margin: '15px 0' }}>
          <label>
            <input type='checkbox' name='spoon' defaultChecked={state.spoon} />
            Need a spoon
          </label>
        </div>

        <div style={{ margin: '15px 0' }}>
          <label>
            Cream amount (1-5):
            <input type='number' name='cream' min='0' max='5' defaultValue={state.cream} />
          </label>
        </div>

        <button type='submit'>Place Order</button>
      </form>

      {/* Zeigt Validierungsfehler an, falls vorhanden */}
      {state.error && <p>{state.error}</p>}
    </div>
  );
}

export default App;
