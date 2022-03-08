import React from "react";

export const HTTP_401_STATUS = "Non connecté";
export const HTTP_400_STATUS = "Arguments incorrects";
export const HTTP_403_STATUS = "Non autorisé";
export const HTTP_404_STATUS = "Ressource non trouvée";
export const HTTP_405_STATUS = "Méthode non authorisée";
export const HTTP_408_STATUS = "Requête non aboutie";

export const HTTP_500_STATUS = "Erreur serveur interne";
export const HTTP_503_STATUS = "Service indisponible";

const HTTP_MAP_ERROR_CODE: any = {
    400: HTTP_400_STATUS,
    401: HTTP_401_STATUS,
    403: HTTP_403_STATUS,
    404: HTTP_404_STATUS,
    405: HTTP_405_STATUS,
    408: HTTP_408_STATUS,
    500: HTTP_500_STATUS,
    503: HTTP_503_STATUS,
};

export default HTTP_MAP_ERROR_CODE;
