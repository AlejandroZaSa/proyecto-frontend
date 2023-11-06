import { ItemTratamientoDTO } from "../clinica/ItemTratamientoDTO"

export class DetalleConsultaPqrsDTO {
    fecha: string = ""

    notasMedico: string = ""

    diagnostico: string = ""

    tratamientoDTOList: ItemTratamientoDTO[] = []

    sintomas: string = ""
}