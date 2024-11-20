export interface User {
    id: number;
    userName: string; //"gmorip"
    password: string;
    enabled: boolean;
    authorities: string; // "LlenarAsistencia;LlenarNotas"
}