type Props={
    textLabel:string,
    placeholder:string,
    size:string,
    type:string
}
export const inputDatosData: Props[]=[
    {
       textLabel:"Nombre",
       placeholder:'ej: Jose Miguel',
       size:'xxl',
       type:'text'
    },
    {
       textLabel:"Apellido",
       placeholder:'ej: Rojas Vasquez',
       size:'xxl',
       type:'text'
    },
    
    {
       textLabel:"Número de documento",
       placeholder:'ej: 123456789',
       size:'xl',
       type:'text'
    },
    {
       textLabel:"Correo Electrónico'",
       placeholder:'ej: JoseM20@gmail.com',
       size:'xxl',
       type:"email"
    },
    {
       textLabel:"Telefono'",
       placeholder:'ej: 123546789',
       size:'xxl',
       type:"text"
    }

]