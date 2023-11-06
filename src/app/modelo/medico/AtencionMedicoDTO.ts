import { RegistroTratamientoDTO } from "./RegistroTratamientoDTO"

export class AtencionMedicoDTO {
    
    idCita:number = 0

    sintomas: string = ""

    diagnostico: string = "" 

    notasMedico: string = ""

    tratamientoDTOList: RegistroTratamientoDTO[]=[]
}