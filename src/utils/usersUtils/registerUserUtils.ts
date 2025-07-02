export const documentTypesOptions:{
    key: string,
    label:string
}[]=[
    { key: 'cc', label: 'Cédula de Ciudadanía' },
    { key: 'ce', label: 'Cédula de Extranjería' },
    { key: 'ti', label: 'Tarjeta de Identidad' }
]

export const rollenOptionsAdmin:{
    key:number,
    label:string
}[]=[
    {key:2, label:'administrador'},
    {key:3, label:'administrador de bodega'}
]

export const rollenOptionsSuperAdmin:{
    key:number,
    label:string
}[]=[
    {key:1, label:'administrador superior'},
    {key:2, label:'administrador'},
    {key:3, label:'administrador de bodega'}
]