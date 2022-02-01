import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public descricao: string
    public nivel: string
    public area: string
    public postagem: Postagem[]
}