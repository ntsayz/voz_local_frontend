import { type PostoAdministrativo, type Bairro} from '$lib/stores/locations';

export function hasRole(requiredRole: string, userRole: string): boolean {
    return userRole === requiredRole;
  }
  
export function isBairro(item: Bairro | PostoAdministrativo): item is Bairro {
    return (item as Bairro).postoAdministrativoId !== undefined;
}
