import { writable } from 'svelte/store';
import { getLocations } from '$lib/api/locations';

export interface Provincia {
    id: number;
    name: string;
    latitude: number | null;
    longitude: number | null;
  }
  
  export interface Distrito {
    id: number;
    name: string;
    provinciaId: number;
    provincia: Provincia;
    latitude: number | null;
    longitude: number | null;
  }
  
  export interface PostoAdministrativo {
    id: number;
    name: string;
    distritoId: number;
    distrito: Distrito;
    latitude: number | null;
    longitude: number | null;
  }
  
  export interface Bairro {
    id: number;
    name: string;
    distritoId?: number; // Optional, because it might not always belong to a Distrito
    postoAdministrativoId?: number; // Optional, because it might not always belong to a PostoAdministrativo
    latitude: number | null;
    longitude: number | null;
    distrito?: Distrito; // Optional relation
    postoAdministrativo?: PostoAdministrativo; // Optional relation
  }
  
  export interface Localidade {
    id: number;
    name: string;
    postoAdministrativoId: number;
    latitude: number | null;
    longitude: number | null;
    postoAdministrativo: PostoAdministrativo;
  }
  
  // Store type for all hierarchical locations
  export type LocationType = Localidade | Bairro;
  
  // Define a writable store to hold all locations
  export const locations = writable<LocationType[]>([]);


// Function to fetch the preprocessed locations data
export const fetchLocations = async () => {
    try {
      const rawData = await getLocations(); // Fetch hierarchical data
      //console.log('Fetched Locations:', rawData);
  
      const processedLocations: LocationType[] = [];
  
      // Traverse provinces and extract locations
      Object.entries(rawData).forEach(([provinciaName, provinciaData]: [string, any]) => {
        const provincia: Provincia = {
          id: provinciaData.id,
          name: provinciaName,
          latitude: provinciaData.latitude || null,
          longitude: provinciaData.longitude || null,
        };
  
        // Traverse districts
        if (provinciaData.Distritos) {
          Object.entries(provinciaData.Distritos).forEach(([distritoName, distritoData]: [string, any]) => {
            const distrito: Distrito = {
              id: distritoData.id,
              name: distritoName,
              provinciaId: provincia.id,
              provincia,
              latitude: distritoData.latitude || null,
              longitude: distritoData.longitude || null,
            };
  
            // Traverse bairros
            if (distritoData.Bairros) {
              distritoData.Bairros.forEach((bairro: any) => {
                const bairroData: Bairro = {
                  id: bairro.id,
                  name: bairro.name,
                  distritoId: distrito.id,
                  latitude: bairro.latitude || null,
                  longitude: bairro.longitude || null,
                  distrito,
                };
                processedLocations.push(bairroData);
              });
            }
  
            // Traverse postos administrativos
            if (distritoData.PostosAdministrativos) {
              Object.entries(distritoData.PostosAdministrativos).forEach(([postoName, postoData]: [string, any]) => {
                const postoAdministrativo: PostoAdministrativo = {
                  id: postoData.id,
                  name: postoName,
                  distritoId: distrito.id,
                  distrito,
                  latitude: postoData.latitude || null,
                  longitude: postoData.longitude || null,
                };
  
                // Traverse localidades
                if (postoData.Localidades) {
                  postoData.Localidades.forEach((localidade: any) => {
                    const localidadeData: Localidade = {
                      id: localidade.id,
                      name: localidade.name,
                      postoAdministrativoId: postoAdministrativo.id,
                      latitude: localidade.latitude || null,
                      longitude: localidade.longitude || null,
                      postoAdministrativo,
                    };
                    processedLocations.push(localidadeData);
                  });
                }
              });
            }
          });
        }
      });
  
      // Update the store with the flat array
      locations.set(processedLocations);
    } catch (error) {
      console.error('Error fetching locations data:', (error as Error).message);
    }
  };
  
